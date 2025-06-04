import { HumanMessage } from '@langchain/core/messages'
import { MessagesAnnotation, StateGraph, START, END, Annotation, LangGraphRunnableConfig } from '@langchain/langgraph'
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres'
import { v4 as uuidv4 } from 'uuid'

import { tool } from '@langchain/core/tools'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { twilioEmergencyMessage } from '../twilio-emergency'

import { model } from './llm'
import { pool } from '../db'
import { z } from 'zod'

const memory = new PostgresSaver(pool)
await memory.setup()

// We will add a `summary` attribute (in addition to `messages` key,
// which MessagesAnnotation already has)

// Adding a `update` attribute to keep track of summary changes
const GraphAnnotation = Annotation.Root({
	...MessagesAnnotation.spec,
	summary: Annotation<string>({
		reducer: (_, action) => action,
		default: () => '',
	}),
	update: Annotation<boolean>({
		reducer: (_, action) => action,
		default: () => false,
	}),
})

const escalateToEmergencyService = tool(
	async (_, config: LangGraphRunnableConfig) => {
		const emergency: { name: string; emergencyContact: string } = config.configurable?.emergency
		try {
			const response = await twilioEmergencyMessage(emergency.name, emergency.emergencyContact)
			return `Alert the user that help is on its way, ${response}`
		} catch (error) {
			console.log('Failed to alter emergency contact', error)
			return 'Try to Calm the user down, emergency services contact has failed.'
		}
	},
	{
		name: 'escalate_to_emergency_services',
		description:
			'Call this tool if the user expresses intent to harm themselves or others, including suicidal thoughts, self-injury, threats of violence to others, or severe emotional distress that may lead to self harm or harm others. This tool alerts appropriate emergency contacts for immediate intervention.',
		schema: z.object({}),
	}
)

const callTool = new ToolNode<typeof GraphAnnotation.State>([escalateToEmergencyService])
const bindModel = model.bindTools([escalateToEmergencyService])

// Define the logic to call the model
async function callModel(state: typeof GraphAnnotation.State): Promise<Partial<typeof GraphAnnotation.State>> {
	/**
	 * Partial<typeof GraphAnnotation.State> means this return value only needs to include
	 * some properties of the full state (in this case, just messages).
	 */
	const { messages } = state
	const response = await bindModel.invoke(messages)

	// We return an object, because this will get added to the existing state
	return { messages: [response] }
}

// We now define the logic for determining whether to end or summarize the conversation
function shouldContinue(state: typeof GraphAnnotation.State): 'summarize_conversation' | typeof END | 'tools' {
	const messages = state.messages

	const lastMessage = messages[messages.length - 1]
	if ('tool_calls' in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls?.length) {
		return 'tools'
	}

	if (messages.length % 10 == 9) {
		// If there are more than more than or equal to 9 messages, then we summarize the conversation
		return 'summarize_conversation'
	}

	// Otherwise we can just end
	return END
}

async function summarizeConversation(
	state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> {
	// First, we summarize the conversation
	const { summary, messages } = state

	let summaryMessage: string
	if (summary) {
		summaryMessage = `
			You are an expert mental health assistant. Your task is to read new messages from an ongoing conversation and extend the previous summary with only meaningful and clinically relevant information.

			You are given:
			- A prior summary of the user’s condition and observations from earlier messages.
			- A new transcript of messages from the same user.

			Your goal is to add to the existing summary — not rewrite it — by observing:
			- New emotional expressions or intensifications.
			- Emerging patterns or behavioral changes.
			- Signs of progress or relapse.
			- Mention of new coping strategies, routines, or setbacks.
			- Any changes in mood, cognition, or functionality.

			Maintain the same bullet-point structure, use neutral clinical language, and only add new insights not already captured.

			Example Input:
			Previous Summary:
			[Mood] User expressed feelings of hopelessness.
			[Behavior] Reported sleeping 10+ hours and skipping meals.
			[Coping] Tried journaling with mixed results.

			New Messages:
			(Insert new message transcript here)

			Example Output:
			[Mood] User mentioned increased irritability and emotional numbness.
			[Function] Difficulty focusing at work has worsened over the past few days.
			[Progress] Started attending a weekly support group, felt a bit more connected.

			Previous Summary:
			${summary}
		`
	} else {
		summaryMessage = `
			You are an expert mental health assistant analyzing a text conversation between a user and a mental health chatbot.  
			The user is known to be experiencing specific mental health conditions (e.g., ADHD, PTSD, Depression, Anxiety, etc.), but you do not need to speculate on their diagnosis — only analyze the content for clinically relevant observations.

			Your task is to generate a concise summary of all statements, patterns, or indicators that are meaningful from a therapeutic or diagnostic perspective. Focus on identifying:

			- Emotional expressions (e.g., guilt, sadness, anger, detachment)
			- Cognitive distortions (e.g., catastrophizing, all-or-nothing thinking)
			- Behavioral symptoms (e.g., withdrawal, avoidance, impulsivity)
			- Functional impairments (e.g., sleep, concentration, relationships, work/school)
			- Progress or setbacks (e.g., better emotional regulation, increased panic attacks)
			- Mention of coping strategies (effective or ineffective)
			- External triggers or life events influencing mental health

			Format your summary as a structured bullet-point list, tagging insights where possible. Use neutral, clinical language. Do not include personal opinions or advice.

			Example Output:
			[Mood] User expressed persistent feelings of failure and hopelessness.
			[Cognition] Mentioned intrusive thoughts interfering with daily concentration.
			[Behavior] Reported staying in bed most of the day and avoiding calls from friends.
			[Progress] Tried journaling for anxiety and noted slight improvement in clarity.
			[Trigger] Argument with a sibling led to a spike in emotional reactivity.
			[Setback] Resumed self-isolating after a brief period of engagement.

			Conversation Transcript:
			(Insert raw transcript of the conversation here)
		`
	}

	const allMessages = [
		...messages,
		new HumanMessage({
			id: uuidv4(),
			content: summaryMessage,
		}),
	]

	const response = await model.invoke(allMessages)

	if (typeof response.content !== 'string') {
		throw new Error('Expected a string response from the model')
	}

	return {
		summary: response.content,
		messages: messages,
		update: true,
	}
}

// Define a new graph
const workflow = new StateGraph(GraphAnnotation)
	// Define the conversation node and the summarize node
	.addNode('conversation', callModel)
	.addNode('summarize_conversation', summarizeConversation)
	.addNode('tools', callTool)
	// Set the entrypoint as conversation
	.addEdge(START, 'conversation')
	// We now add a conditional edge
	.addConditionalEdges(
		// First, we define the start node. We use `conversation`.
		// This means these are the edges taken after the `conversation` node is called.
		'conversation',
		// Next, we pass in the function that will determine which node is called next.
		shouldContinue
	)
	// We now add a normal edge from `summarize_conversation` to END.
	// This means that after `summarize_conversation` is called, we end.
	.addEdge('tools', 'conversation')
	.addEdge('summarize_conversation', END)

// Finally, we compile it!
export const app = workflow.compile({ checkpointer: memory })

import { SystemMessage, HumanMessage, AIMessage, RemoveMessage } from '@langchain/core/messages'
import { MessagesAnnotation, StateGraph, START, END, Annotation } from '@langchain/langgraph'
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres'
import { v4 as uuidv4 } from 'uuid'

import { model } from './llm'
import { pool } from '../db'

const memory = new PostgresSaver(pool)
await memory.setup()

// We will add a `summary` attribute (in addition to `messages` key,
// which MessagesAnnotation already has)
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

// Define the logic to call the model
async function callModel(state: typeof GraphAnnotation.State): Promise<Partial<typeof GraphAnnotation.State>> {
	// If a summary exists, we add this in as a system message
	const { summary } = state
	let { messages } = state
	if (summary) {
		const systemMessage = new SystemMessage({
			id: uuidv4(),
			content: `Summary of conversation earlier: ${summary}`,
		})
		messages = [systemMessage, ...messages]
	}
	const response = await model.invoke(messages)
	// We return an object, because this will get added to the existing state
	return { messages: [response] }
}

// We now define the logic for determining whether to end or summarize the conversation
function shouldContinue(state: typeof GraphAnnotation.State): 'summarize_conversation' | typeof END {
	const messages = state.messages
	// If there are more than six messages, then we summarize the conversation
	if (messages.length > 8) {
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
		This is the summary of the conversation to date:
		${summary}
		
		Extend the summary by taking into account the new messages above. Extract only the most therapeutically relevant information.
		
		Focus on:
		- Emotional themes (e.g., sadness, anxiety, hopelessness)
		- Stressors or triggers mentioned
		- Coping strategies used or considered
		- Notable thought patterns or beliefs
		- Any signs of improvement or emotional breakthroughs
		- Any red flags or safety concerns
		
		Avoid small talk or repetition. Keep it concise and suitable for guiding future therapy sessions.
		`
	} else {
		summaryMessage = `
		Please create a concise and structured summary of the key therapeutic information shared in the conversation above.
		
		Focus on:
		- Emotional themes (e.g., sadness, anxiety, hopelessness)
		- Stressors or triggers mentioned
		- Coping strategies used or considered
		- Notable thought patterns or beliefs
		- Any signs of improvement or emotional breakthroughs
		- Any red flags or safety concerns
		
		Avoid small talk or repetition. Keep it concise and suitable for guiding future therapy sessions.
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
	// We now need to delete messages that we no longer want to show up
	// I will delete all but the last two messages, but you can change this
	const deleteMessages = messages.slice(0, -2).map((m) => new RemoveMessage({ id: String(m.id) }))
	if (typeof response.content !== 'string') {
		throw new Error('Expected a string response from the model')
	}
	return { summary: response.content, messages: deleteMessages, update: true }
}

// Define a new graph
const workflow = new StateGraph(GraphAnnotation)
	// Define the conversation node and the summarize node
	.addNode('conversation', callModel)
	.addNode('summarize_conversation', summarizeConversation)
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
	.addEdge('summarize_conversation', END)

// Finally, we compile it!
export const app = workflow.compile({ checkpointer: memory })

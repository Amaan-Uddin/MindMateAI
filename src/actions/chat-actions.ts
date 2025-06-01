'use server'

import { createClient } from '@/lib/supabase/server'

import { SystemMessage, HumanMessage } from '@langchain/core/messages'
import { app } from '@/utils/ai/app'
import { fastModel } from '@/utils/ai/llm'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * creates a user and assistant message in the conversation thread/context window.
 * updates the summary in user's profile with the summary returned by LLM.
 *
 * @param {string} userMessage - message send by the user or user input
 *
 * @param {number} threadId - ID of conversation thread to append messages to
 */
export async function createMessage(userMessage: string, threadId: number) {
	const supabase = await createClient()

	// get current authenticated user
	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		return redirect('/auth/login?message=Unauthenticated user cannot create messages')
	}

	const { data: Profile } = await supabase
		.from('personal_info')
		.select('emergency_phone_number')
		.eq('user_id', user.id)
		.single()

	const input = new HumanMessage({ content: userMessage })
	const config = {
		configurable: {
			thread_id: threadId,
			emergency: {
				name: user.user_metadata.name,
				em_contact: Profile?.emergency_phone_number,
			},
		},
	}

	// invoke the model
	const response = await app.invoke({ messages: [input], update: false }, config)
	const assistantMessage = response.messages[response.messages.length - 1].content // extracting the latest AIMessage

	// the `update` attribute in our LangGraph's State tracks whether the `summary` attribute was updated, it holds a boolean value
	const { summary, update } = response

	// save user and assistant messages to the database
	const { error: CreateMsgError } = await supabase.from('messages').insert([
		{ role: 'user', thread_id: threadId, content: userMessage, user_id: user.id },
		{ role: 'assistant', thread_id: threadId, content: String(assistantMessage), user_id: user.id },
	])
	if (CreateMsgError) {
		console.log('Error when creating message', CreateMsgError)
		return redirect(`/chat?thread=${threadId}&message=Unable to create message at the moment.`)
	}

	// if summary was updated by model, store it in the user's profile
	if (update) {
		const { error } = await supabase.from('personal_info').update({ summary: summary }).eq('user_id', user.id)
		if (error) {
			console.log('Some error occurred when updating summary of user')
		}
	}

	revalidatePath(`/chat?thread=${threadId}`)
}

/**
 * creates a new conversation thread and greets the user with the context-aware model.
 * redirects the user to the new chat thread.
 */
export async function createConversationThread() {
	const supabase = await createClient()

	// get current authenticated user
	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		return redirect('/auth/login?message=Unauthenticated user cannot create thread')
	}

	// inserting new thread record and fetching user profile for providing context to the model
	const [{ data: Thread, error: InsertError }, { data: Profile }] = await Promise.all([
		supabase.from('threads').insert({ user_id: user.id }).select('id').single(),
		supabase
			.from('personal_info')
			.select('conditions,age,emergency_name,emergency_phone_number,summary,mood')
			.eq('user_id', user.id)
			.single(),
	])
	if (InsertError || !Thread) {
		console.error('Error creating thread:', InsertError)
		return redirect('/chat?error=Failed to create a new conversation thread')
	}

	// system prompt to set assistant behavior and user context
	const systemMessage = new SystemMessage({
		content: `
			You are MindMate AI — a compassionate, professional therapist.

			Your role is to provide empathetic, non-judgmental mental health support using evidence-based techniques (such as CBT, mindfulness, grounding) when appropriate. You are a diagnostic tool. Your purpose is to help users explore thoughts and emotions, encourage reflection, and gently support behavioral growth.

			User Profile:
			- Name: ${user.user_metadata.name}
			- Age: ${Profile?.age}
			- Reported Symptoms/Disorders: ${Profile?.conditions}
			- Emergency Contact: ${Profile?.emergency_name} (${Profile?.emergency_phone_number})
			- Today's Mood: ${Profile?.mood || 'N/A'}

			Summary of Previous Sessions (for continuity):
			${Profile?.summary || 'N/A'}

			Guidelines:
			- Begin each session with warmth. Ask the user how they’re feeling today.
			- Use short, simple, and emotionally aware responses.
			- Reflect on relevant past experiences when appropriate.
			- If signs of distress or crisis appear, calmly guide the user to contact a licensed mental health professional or their emergency contact.
			- Always prioritize the user's emotional safety and well-being.

			Boundaries:
			- You are only trained to discuss and support topics related to mental and emotional health.
			- If a user asks about unrelated topics (e.g., tech, politics, math, etc.), kindly inform them that you're designed solely to assist with mental well-being and gently guide them back to relevant support.

			Note:
			- When greeting the user be compassionate.
			- Do not reply or answer back with long messages, make it short and simple and easy to understand for the user.
	`.trim(),
	})

	const greetMessage = new HumanMessage({ content: 'Greet the user.' })
	const config = { configurable: { thread_id: Thread.id } }

	// invoke the model
	const response = await app.invoke({ messages: [systemMessage, greetMessage], summary: Profile?.summary }, config)
	const assistantMessage = String(response.messages[response.messages.length - 1].content).replace(
		/<tool-use><\/tool-use>\n{2}/g,
		''
	)

	// save the assistant message to database
	const { error: CreateMessageError } = await supabase
		.from('messages')
		.insert({ role: 'assistant', thread_id: Thread.id, content: String(assistantMessage), user_id: user.id })
	if (CreateMessageError) {
		console.log('Error when greeting user', CreateMessageError)
		return redirect(`/chat?thread=${Thread.id}&message=Unable to greet user.`)
	}

	// redirect to newly created chat thread
	return redirect(`/chat?thread=${Thread.id}`)
}

/**
 * deletes existing thread and all its related messages from the database
 *
 * @param {number} threadId - ID of conversation thread to delete
 */
export async function deleteConversationThread(threadId: number) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		return redirect('/auth/login?message=Unauthenticated user cannot delete thread')
	}

	// delete the thread from the database
	const { error: DeleteError } = await supabase.from('threads').delete().eq('id', threadId)
	if (DeleteError) {
		console.error('Error creating thread:', DeleteError)
		return redirect('/chat?error=Failed to create a new conversation thread')
	}

	// refresh the chat page to reflect the changes
	revalidatePath('/chat')
}

/**
 * updates a thread title using AI-generated summary based on parsed messages.
 *
 * @param {number} threadId - ID of thread to rename
 *
 * @param {string} parsedMessages - stringified messages
 */
export async function updateThreadTitle(threadId: number, parsedMessages: string) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		return redirect('/auth/login?message=Unauthenticated user')
	}

	// system prompt instructing LLM to generate title for the thread
	const systemMessage = new SystemMessage({
		content: `
			You are an expert summarization algorithm.
			Your job is to understand the underline context of the parsed conversation and
			return a short meaningful title that is no longer than 15 character length.

			Here is the parsed conversation:
			- Parsed-message: ${parsedMessages}

			NOTE: 
			- Only return the title, no other filler words or characters
		`,
	})

	// invoke the model with the system prompt
	const response = await fastModel.invoke([systemMessage])

	// update the thread title in database
	const { error: UpdateError } = await supabase
		.from('threads')
		.update({ thread_title: String(response.content) })
		.eq('id', threadId)
	if (UpdateError) {
		console.log('Error occurred when updating thread title', UpdateError)
	}
}

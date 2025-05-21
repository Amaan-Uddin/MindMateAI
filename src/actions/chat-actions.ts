'use server'

import { createClient } from '@/lib/supabase/server'

import { SystemMessage, HumanMessage } from '@langchain/core/messages'
import { app } from '@/utils/ai/app'
import { model } from '@/utils/ai/llm'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMessage(userMessage: string, threadId: number, messages_len: number) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user cannot create messages')
	}

	const { data: Profile } = await supabase.from('personal_info').select('summary').eq('user_id', user.id).single()

	// we set the threadId as our configurable to setup or use existing context window
	// use it when invoking the model
	const input = new HumanMessage({ content: userMessage })

	const config = { configurable: { thread_id: threadId } }
	const response = await app.invoke({ messages: [input], summary: Profile?.summary, update: false }, config)
	// console.log(response.messages, response.summary, response.messages.length)
	const assistantMessage = response.messages[response.messages.length - 1].content // extracting the latest AIMessage

	// the `update` variable in our graph state tracks when the `summary` variable is updated
	const { summary, update } = response

	const { error: CreateMsgError } = await supabase.from('messages').insert([
		{ role: 'user', thread_id: threadId, content: userMessage, user_id: user.id },
		{ role: 'assistant', thread_id: threadId, content: String(assistantMessage), user_id: user.id },
	])
	if (CreateMsgError) {
		console.log('Error when creating message', CreateMsgError)
		redirect(`/chat?thread=${threadId}&message=Unable to create message at the moment.`)
	}

	// if there was an update to the `summary` variable then we also update the user summary in `profile_info`
	// this way we can provide some meaningful context to the llm on new conversation threads
	if (update) {
		const { error } = await supabase.from('personal_info').update({ summary: summary }).eq('user_id', user.id)
		if (error) {
			console.log('Some error occurred when updating summary of user')
		}
	}

	revalidatePath(`/chat?thread=${threadId}`)
}

export async function createConversationThread() {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user cannot create thread')
	}

	const { data: Thread, error: InsertError } = await supabase
		.from('threads')
		.insert({ user_id: user.id })
		.select('id')
		.single()
	if (InsertError || !Thread) {
		console.error('Error creating thread:', InsertError)
		redirect('/chat?error=Failed to create a new conversation thread')
	}

	const { data: Profile } = await supabase
		.from('personal_info')
		.select('conditions,age,emergency_name,emergency_phone_number,summary,mood')
		.eq('user_id', user.id)
		.single()

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

	const response = await app.invoke({ messages: [systemMessage, greetMessage] }, config)
	// console.log(response.messages, response.summary)
	const assistantMessage = response.messages[response.messages.length - 1].content

	const { error: CreateMessageError } = await supabase
		.from('messages')
		.insert({ role: 'assistant', thread_id: Thread.id, content: String(assistantMessage), user_id: user.id })
	if (CreateMessageError) {
		console.log('Error when greeting user', CreateMessageError)
		redirect(`/chat?thread=${Thread.id}&message=Unable to greet user.`)
	}

	redirect(`/chat?thread=${Thread.id}`)
}

export async function deleteConversationThread(threadId: number) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user cannot delete thread')
	}

	const { error: DeleteError } = await supabase.from('threads').delete().eq('id', threadId)
	if (DeleteError) {
		console.error('Error creating thread:', DeleteError)
		redirect('/chat?error=Failed to create a new conversation thread')
	}
	revalidatePath('/chat')
}

export async function updateThreadTitle(threadId: number, messages: string) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user')
	}

	const systemMessage = new SystemMessage({
		content: `
			You are an expert summarization algorithm.
			Your job is to understand the underline context of the parsed conversation and
			return a short meaningful title that is no longer than 15 character length.

			Here is the parsed conversation:
			- Parsed-message: ${messages}

			NOTE: 
			- Only return the title, no other filler words or characters
		`,
	})
	const response = await model.invoke([systemMessage])

	const { error: UpdateError } = await supabase
		.from('threads')
		.update({ thread_title: String(response.content) })
		.eq('id', threadId)
	if (UpdateError) {
		console.log('Error occurred when updating thread title', UpdateError)
	}
}

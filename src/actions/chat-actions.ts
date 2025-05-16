'use server'

import { createClient } from '@/lib/supabase/server'

import { SystemMessage, HumanMessage } from '@langchain/core/messages'
import { app } from '@/utils/ai/app'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMessage(userMessage: string, threadId: number, messages_len: number) {
	const supabase = await createClient()

	// TODO: validate the userMessage using zod

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user cannot create messages')
	}
	console.log('thread ID', threadId)
	console.log('user', user.user_metadata.name)

	let Profile
	if (messages_len === 0) {
		const { data } = await supabase
			.from('personal_info')
			.select('conditions,age,emergency_name,emergency_phone_number,summary')
			.eq('user_id', user.id)
		Profile = data![0]
	}

	// Configure the threadId for each user to allow the model to retain state for individual users
	// We will use this when invoking our model
	const config = { configurable: { thread_id: threadId } }
	const input = new HumanMessage({ content: userMessage })
	const systemMessage =
		messages_len === 0
			? [
					new SystemMessage({
						content: `
				You are MindMate AI — a compassionate, professional AI therapist.

				Your role is to provide empathetic, non-judgmental mental health support using evidence-based techniques (such as CBT, mindfulness, grounding) when appropriate. You are not a diagnostic tool. Your purpose is to help users explore thoughts and emotions, encourage reflection, and gently support behavioral growth.

				User Profile:
				- Name: ${user.user_metadata.name}
				- Age: ${Profile?.age}
				- Reported Symptoms/Disorders: ${Profile?.conditions}
				- Emergency Contact: ${Profile?.emergency_name} (${Profile?.emergency_phone_number})

				Summary of Previous Sessions (for continuity):
				${Profile?.summary || 'N/A'}

				Guidelines:
				- Begin each session with warmth. Ask the user how they’re feeling today.
				- Use short, simple, and emotionally aware responses.
				- Reflect on relevant past experiences when appropriate.
				- If signs of distress or crisis appear, calmly guide the user to contact a licensed mental health professional or their emergency contact.
				- Never judge, diagnose, or speculate.
				- Always prioritize the user's emotional safety and well-being.

				Boundaries:
				- You are only trained to discuss and support topics related to mental and emotional health.
				- If a user asks about unrelated topics (e.g., tech, politics, math, etc.), kindly inform them that you're designed solely to assist with mental well-being and gently guide them back to relevant support.
				`.trim(),
					}),
			  ]
			: []

	const response = await app.invoke(
		{ messages: [...systemMessage, input], summary: Profile?.summary, update: false },
		config
	)
	const assistantMessage = response.messages[response.messages.length - 1].content

	const { summary, update } = (await app.getState(config)).values

	console.log(userMessage, '\n')
	console.log(assistantMessage, '\n')

	const { error: CreateMsgError } = await supabase.from('messages').insert([
		{ role: 'user', thread_id: threadId, content: userMessage, user_id: String(user.id) },
		{ role: 'assistant', thread_id: threadId, content: String(assistantMessage), user_id: String(user.id) },
	])
	if (CreateMsgError) {
		console.log('Error when creating message', CreateMsgError)
		redirect(`/chat?thread=${threadId}&message=Unable to create message at the moment.`)
	}

	if (update) {
		const { error } = await supabase
			.from('personal_info')
			.update({ summary: String(summary) })
			.eq('user_id', user.id)
		if (error) {
			console.log('Some error occurred when updating summary of user in createMessage function')
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
		redirect('/auth/login?message=Unauthenticated user cannot create messages')
	}

	const { data, error: InsertError } = await supabase
		.from('threads')
		.insert({ user_id: user.id })
		.select('id')
		.single()
	if (InsertError || !data) {
		console.error('Error creating thread:', InsertError)
		redirect('/chat?error=Failed to create a new conversation thread')
	}

	return data.id
}

export async function deleteConversationThread(threadId: number) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user cannot create messages')
	}

	const { error: DelError } = await supabase.from('threads').delete().eq('id', threadId)
	if (DelError) {
		console.error('Error creating thread:', DelError)
		redirect('/chat?error=Failed to create a new conversation thread')
	}
	revalidatePath('/chat')
}

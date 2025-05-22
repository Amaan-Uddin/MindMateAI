import { createClient } from '@/lib/supabase/server'
import { JSX } from 'react'

import { ChatInterface } from '@/components/chat-components/ChatInterface'

import { updateThreadTitle } from '@/actions/chat-actions'

interface Props {
	thread: number
	userId: string
}

/**
 * ChatMessages component - fetches and renders chat messages for a given thread and user.
 *
 * @param {Object} props - Component props.
 * @param {number} props.thread - The ID of the chat thread.
 * @param {string} props.userId - The ID of the user whose messages should be fetched.
 *
 * @returns {Promise<JSX.Element>} The ChatInterface component populated with messages.
 */
export async function ChatMessages({ thread, userId }: Props): Promise<JSX.Element> {
	const supabase = await createClient()

	const { data: MessageData, error: MessageError } = await supabase
		.from('messages')
		.select('id,content,role')
		.eq('user_id', userId)
		.eq('thread_id', thread)
		.order('id', { ascending: true })
	if (MessageError || !MessageData) {
		console.log('Error while retrieving messages', MessageError)
	}

	const messageLength = MessageData!.length

	if (messageLength == 9) {
		const parsedMessages = JSON.stringify(MessageData)
		await updateThreadTitle(thread, parsedMessages)
	}

	return <ChatInterface threadId={thread} messages={MessageData || []} />
}

import { createClient } from '@/lib/supabase/server'

import { ChatInterface } from '@/components/chat-components/ChatInterface'
import { updateThreadTitle } from '@/actions/chat-actions'

interface Props {
	thread: number
	userId: string
}

export default async function ChatMessages({ thread, userId }: Props) {
	// await new Promise((resolve) => setTimeout(resolve, 10000))
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

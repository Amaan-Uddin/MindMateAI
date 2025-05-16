import { createClient } from '@/lib/supabase/server'
import ChatInterface from '@/components/chat-components/ChatInterface'

export default async function ChatMessages({ thread, userId }: { thread: number; userId: string }) {
	const supabase = await createClient()

	const { data: MsgData, error: MsgError } = await supabase
		.from('messages')
		.select('*')
		.eq('user_id', userId)
		.eq('thread_id', thread)
	if (MsgError || !MsgData) {
		console.log('Error while retrieving messages', MsgError)
	}

	return <ChatInterface threadId={thread} messages={MsgData || []} />
}

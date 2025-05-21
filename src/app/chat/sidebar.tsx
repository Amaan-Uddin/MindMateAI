import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

import { ConversationSidebar } from '@/components/chat-components/ConversationSidebar'

interface Props {
	thread: number | null
	userId: string
}

export default async function Sidebar({ thread, userId }: Props) {
	// await new Promise((resolve) => setTimeout(resolve, 10000))
	const supabase = await createClient()

	const { data, error } = await supabase
		.from('threads')
		.select('id,thread_title')
		.eq('user_id', userId)
		.order('created_at', { ascending: false })
	if (error) {
		console.log('Something went wrong when trying to fetch thread id')
	}

	// check if threadId exist in users thread collection
	if (thread) {
		const exists = data?.some((item) => item.id === thread)
		if (!exists) return redirect('/dashboard')
	}

	return <ConversationSidebar allThreads={data!} />
}

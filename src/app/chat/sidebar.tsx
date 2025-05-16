import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

import ConversationSidebar from '@/components/chat-components/ConversationSidebar'

export default async function Sidebar({ thread, userId }: { thread: number | null; userId: string }) {
	// await new Promise((resolve) => setTimeout(resolve, 10000))
	const supabase = await createClient()

	const { data, error } = await supabase.from('threads').select('id').eq('user_id', userId)
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

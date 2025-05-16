import ConversationSidebar from '@/components/chat-components/ConversationSidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Sidebar({ thread, userId }: { thread: number | null; userId: string }) {
	const supabase = await createClient()

	const { data, error } = await supabase.from('threads').select('id').eq('user_id', userId)
	if (error) {
		console.log('Something went wrong when trying to fetch thread id')
	}

	if (thread) {
		const exists = data?.some((item) => item.id === thread)
		if (!exists) return redirect('/dashboard')
	}

	return <ConversationSidebar allThreads={data!} />
}

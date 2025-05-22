import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX } from 'react'

import { ConversationSidebar } from '@/components/chat-components/ConversationSidebar'

interface Props {
	thread: number | null
	userId: string
}

/**
 * Sidebar component - fetches and displays current conversation threads.
 * Redirects to dashboard if the provided thread ID is not found in the user's thread list.
 *
 * @param {Object} props - Component props.
 * @param {number | null} props.thread - The currently selected thread ID, or null.
 * @param {string} props.userId - The ID of the user whose threads should be fetched.
 *
 * @returns {Promise<JSX.Element>} The ConversationSidebar component with all user threads.
 */
export async function Sidebar({ thread, userId }: Props): Promise<JSX.Element> {
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

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX, Suspense } from 'react'

import { SidebarComponent } from './sidebar'
import { ChatMessages } from './chat-messages'
import { StartNewConversation } from './start-new-conversation'

import { Button } from '@/components/ui/button'
import { SidebarSkeleton } from '@/components/skeleton-loaders/sidebar-skeleton'
import { ChatSkeleton } from '@/components/skeleton-loaders/chat-skeleton'

import { createConversationThread } from '@/actions/chat-actions'

/**
 * ChatPage component - renders the main chat interface and sidebar thread collection.
 *
 * @param {Object} props - Component props.
 * @param {Promise<{ thread: string }>} props.searchParams - Promise resolving to the search parameters from the URL, containing the thread ID.
 *
 * @returns {Promise<JSX.Element>} The rendered chat page.
 */
export default async function ChatPage({
	searchParams,
}: {
	searchParams: Promise<{ thread: string }>
}): Promise<JSX.Element> {
	const { thread } = await searchParams

	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login')
	}

	return (
		<div className="flex h-screen">
			<div className="w-64 border-r h-full p-4">
				<Button className="w-full mb-4" variant="outline" onClick={createConversationThread}>
					New Chat
				</Button>
				<Suspense fallback={<SidebarSkeleton />}>
					<SidebarComponent thread={parseInt(thread)} userId={user.id} />
				</Suspense>
			</div>
			<main className="flex-1 p-4 overflow-hidden">
				{thread ? (
					<Suspense fallback={<ChatSkeleton />}>
						<ChatMessages thread={parseInt(thread)} />
					</Suspense>
				) : (
					<StartNewConversation />
				)}
			</main>
		</div>
	)
}

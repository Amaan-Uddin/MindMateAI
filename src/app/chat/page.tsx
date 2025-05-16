import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import Sidebar from './sidebar'
import StartNewConversation from './start-new-conversation'
import ChatMessages from './chat-messages'
import { Button } from '@/components/ui/button'
import { SidebarSkeleton } from '@/components/skeleton-loaders/sidebar-skeleton'
import { ChatSkeleton } from '@/components/skeleton-loaders/chat-skeleton'

import { createConversationThread } from '@/actions/chat-actions'

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ thread: string }> }) {
	const { thread } = await searchParams

	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login')
	}

	return (
		<div className="flex h-screen">
			<div className="w-64 border-r h-full p-4">
				<Button className="w-full mb-4" variant="outline" onClick={createConversationThread}>
					New Chat
				</Button>
				<Suspense fallback={<SidebarSkeleton />}>
					<Sidebar thread={parseInt(thread)} userId={user.id} />
				</Suspense>
			</div>
			<main className="flex-1 p-4 overflow-hidden">
				{thread ? (
					<Suspense fallback={<ChatSkeleton />}>
						<ChatMessages thread={parseInt(thread)} userId={user.id} />
					</Suspense>
				) : (
					<StartNewConversation />
				)}
			</main>
		</div>
	)
}

import ChatInterface from '@/components/chat-components/ChatInterface'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import Sidebar from './sidebar'
import StartNewConversation from './start-new-conversation'
import ChatMessages from './chat-messages'
import { Suspense } from 'react'

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
			<Sidebar thread={parseInt(thread)} userId={user.id} />
			<main className="flex-1 p-4 overflow-hidden">
				{thread ? (
					<Suspense fallback={<p>Loading...</p>}>
						<ChatMessages thread={parseInt(thread)} userId={user.id} />
					</Suspense>
				) : (
					<StartNewConversation />
				)}
			</main>
		</div>
	)
}

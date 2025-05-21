'use client'

import Link from 'next/link'
import { useOptimistic } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { deleteConversationThread } from '@/actions/chat-actions'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trash } from 'lucide-react'

interface ConversationSidebarProps {
	allThreads: {
		id: number
		thread_title: string | null
	}[]
}

export function ConversationSidebar({ allThreads }: ConversationSidebarProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentThread = parseInt(searchParams.get('thread') || '') // using the current thread to indicate whether we should navigate to /chat or stay on current route if the thread being deleted is not the current thread
	const [optimisticThreads, deleteOptimisticThreads] = useOptimistic(allThreads, (state, deletedThread) =>
		state.filter((thread) => thread.id !== deletedThread)
	)

	return (
		<div>
			<h2 className="text-lg font-medium mb-4">Past Conversations</h2>
			<ScrollArea className="h-[calc(100vh-160px)] pr-2 space-y-2">
				{optimisticThreads.map((thread, index) => (
					<div key={thread.id} className="flex justify-between items-center">
						<Link
							href={`/chat?thread=${thread.id}`}
							className="w-full flex flex-col items-start text-left truncate"
						>
							<span className="font-medium truncate w-full">
								{thread.thread_title !== null ? thread.thread_title : `New conversation ${index}`}
							</span>
						</Link>
						<form
							action={async () => {
								deleteOptimisticThreads(thread.id)
								try {
									await deleteConversationThread(thread.id)
								} catch (err) {
									console.error('error while deleting thread, on client-side', err)
								}
								if (currentThread === thread.id) {
									router.push('/chat')
								}
							}}
						>
							<Button variant="ghost" className="hover:text-red-500">
								<Trash className="h-2 w-2" />
							</Button>
						</form>
					</div>
				))}
			</ScrollArea>
		</div>
	)
}

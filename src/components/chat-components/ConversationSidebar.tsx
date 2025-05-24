'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { JSX, useOptimistic } from 'react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trash } from 'lucide-react'

import { deleteConversationThread } from '@/actions/chat-actions'

interface ConversationSidebarProps {
	allThreads: {
		id: number
		thread_title: string | null
	}[]
}

/**
 * ConversationSidebar component - displays a list of current conversation threads.
 * Allows optimistic deletion of threads and handles navigation when the current thread is deleted.
 *
 * @param {Object} props - Component props.
 * @param {Array<Thread>} props.allThreads - Array of all conversation threads.
 *
 * @returns {JSX.Element} The sidebar JSX element showing conversation threads.
 */
export function ConversationSidebar({ allThreads }: ConversationSidebarProps): JSX.Element {
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
				{optimisticThreads.map((thread) => (
					<div key={thread.id} className="flex justify-between items-center">
						<Link
							href={`/chat?thread=${thread.id}`}
							className="w-full flex flex-col items-start text-left truncate"
						>
							<span className="font-medium truncate w-full">
								{thread.thread_title !== null ? thread.thread_title : `New conversation`}
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

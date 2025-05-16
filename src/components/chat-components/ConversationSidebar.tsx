'use client'

import { createConversationThread, deleteConversationThread } from '@/actions/chat-actions'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { Trash } from 'lucide-react'
import { useOptimistic, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConversationSidebar({ allThreads }: { allThreads: { id: number }[] }) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentThread = parseInt(searchParams.get('thread') || '')
	const [optimisticThreads, deleteOptimisticThreads] = useOptimistic(allThreads, (state, deletedThread) =>
		state.filter((thread) => thread.id !== deletedThread)
	)
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateThread = async () => {
		setIsLoading(true)
		const newThreadId = await createConversationThread()
		setIsLoading(false)
		if (newThreadId) {
			router.push(`/chat?thread=${newThreadId}`)
		}
	}
	return (
		<div className="w-64 border-r h-full p-4">
			<Button className="w-full mb-4" variant="outline" onClick={handleCreateThread} disabled={isLoading}>
				New Chat
			</Button>

			<h2 className="text-lg font-medium mb-4">Past Conversations</h2>
			<ScrollArea className="h-[calc(100vh-160px)] pr-2 space-y-2">
				{optimisticThreads.map((thread) => (
					<div key={thread.id} className="flex justify-between items-center">
						<Link
							href={`/chat?thread=${thread.id}`}
							className="w-full flex flex-col items-start text-left truncate"
						>
							<span className="font-medium truncate w-full">Conversation {thread.id}</span>
						</Link>
						<form
							action={async () => {
								deleteOptimisticThreads(thread.id)
								try {
									await deleteConversationThread(thread.id)
								} catch (err) {
									console.error(err)
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

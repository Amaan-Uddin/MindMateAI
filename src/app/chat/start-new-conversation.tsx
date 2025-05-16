'use client'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { createConversationThread } from '@/actions/chat-actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StartNewConversation() {
	const router = useRouter()
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
		<Button onClick={handleCreateThread} disabled={isLoading}>
			{isLoading ? 'Starting...' : 'Start conversation'} <MessageCircle />
		</Button>
	)
}

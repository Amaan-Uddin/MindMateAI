'use client'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { createConversationThread } from '@/actions/chat-actions'

import { useState } from 'react'

export default function StartNewConversation() {
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateThread = async () => {
		setIsLoading(true)
		await createConversationThread()
		setIsLoading(false)
	}

	return (
		<Button onClick={handleCreateThread} disabled={isLoading}>
			{isLoading ? 'Starting...' : 'Start conversation'} <MessageCircle />
		</Button>
	)
}

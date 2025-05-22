'use client'
import { JSX, useState } from 'react'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

import { createConversationThread } from '@/actions/chat-actions'

/**
 * StartNewConversation component - renders a button to initiate a new conversation thread.
 * Shows a loading state while the thread is being created.
 *
 * @returns {JSX.Element} A button element to start a new conversation.
 */
export function StartNewConversation(): JSX.Element {
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

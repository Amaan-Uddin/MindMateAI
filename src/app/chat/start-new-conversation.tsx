'use client'
import { JSX } from 'react'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

import { useCreateThread } from '@/hooks/useCreateThread'

/**
 * StartNewConversation component - renders a button to initiate a new conversation thread.
 * Shows a loading state while the thread is being created.
 *
 * @returns {JSX.Element} A button element to start a new conversation.
 */
export function StartNewConversation(): JSX.Element {
	const { isLoading, handleCreateThread } = useCreateThread()

	return (
		<Button onClick={handleCreateThread} disabled={isLoading} className="mt-5 sm:mt-0">
			{isLoading ? 'Starting...' : 'Start conversation'} <MessageCircle />
		</Button>
	)
}

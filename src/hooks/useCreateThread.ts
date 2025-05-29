'use client'
import { useState } from 'react'
import { createConversationThread } from '@/actions/chat-actions'

export function useCreateThread() {
	const [isLoading, setIsLoading] = useState(false)

	const handleCreateThread = async () => {
		setIsLoading(true)
		try {
			await createConversationThread()
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		handleCreateThread,
	}
}

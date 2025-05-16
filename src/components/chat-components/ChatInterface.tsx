'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState, useOptimistic, useTransition } from 'react'

import { createMessage } from '@/actions/chat-actions'
import type { Message } from '@/utils/types/messages-type'

export default function ChatInterface({ threadId, messages }: { threadId: number; messages: Message[] }) {
	const [isMounted, setIsMounted] = useState(false)
	const { theme } = useTheme()

	const [optimisticMessages, addOptimisticMessages] = useOptimistic(
		messages,
		(state: Message[], userMessage: string) => [
			...state,
			{
				id: Date.now(),
				content: userMessage,
				role: 'user',
			},
		]
	)

	const [isPending, startTransition] = useTransition()

	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]')
		if (viewport) {
			viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
		}
	}, [optimisticMessages])

	const handleTextareaInput = () => {
		const textarea = textareaRef.current
		if (textarea) {
			// Reset height to auto to get accurate scrollHeight
			textarea.style.height = 'auto'
			// Set height to scrollHeight, up to max-height (controlled by CSS)
			textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
		}
	}

	if (!isMounted) return null // Prevent server-side rendering issues

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)] w-full max-w-3xl mx-auto">
			<ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
				<div className="w-full flex justify-center">
					<span className="text-muted-foreground py-1">Start Conversation with MindMate ai</span>
				</div>
				{optimisticMessages.map((message) => (
					<div
						key={message.id}
						className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-[70%] rounded-lg p-2.5 ${
								message.role === 'user'
									? 'bg-primary text-primary-foreground'
									: theme === 'dark'
									? 'bg-muted text-muted-foreground'
									: 'bg-muted text-foreground'
							}`}
						>
							{message.role === 'user'
								? message.content
								: message.content.split('\n').map((paragraph, index) => (
										<p key={index} className="mb-2 last:mb-0">
											{paragraph}
										</p>
								  ))}
						</div>
					</div>
				))}
			</ScrollArea>
			<div className="sticky bottom-[50px] bg-background border-t p-4">
				<form
					action={async (data) => {
						const userMessage = data.get('user-message') as string
						if (!userMessage?.trim()) return

						addOptimisticMessages(userMessage)
						startTransition(async () => {
							try {
								await createMessage(userMessage, threadId, messages.length)
							} catch (error) {
								addOptimisticMessages('')
								console.error('Failed to send message', error)
							}
						})
					}}
					className="flex gap-2 max-w-3xl mx-auto"
				>
					<Textarea
						name="user-message"
						placeholder="Type your message..."
						className="flex-1 text-base min-h-[40px] max-h-[150px] overflow-auto resize-none rounded-md border border-input bg-background px-3 py-2"
						autoComplete="off"
						onInput={handleTextareaInput}
						disabled={isPending}
					/>
					<Button type="submit" className="h-10 w-16" disabled={isPending}>
						<Send className="h-5 w-5" />
					</Button>
				</form>
			</div>
		</div>
	)
}

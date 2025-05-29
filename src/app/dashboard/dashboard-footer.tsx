import Link from 'next/link'
import { JSX } from 'react'

import { Button } from '@/components/ui/button'
import { GuidanceButton } from '@/components/dashboard-components/guidance-button'
import { createConversationThread } from '@/actions/chat-actions'

/**
 * DashboardFooter component - displays support and guidance options for users,
 * including a chat link to "MindMate" and access to mental health resources.
 *
 * @returns {JSX.Element} A section containing two informational cards with links to chat and guidance resources.
 */
export function DashboardFooter(): JSX.Element {
	return (
		<section>
			<header className="mb-4">
				<h1 className="text-[28px] font-bold">Need Support or Guidance?</h1>
			</header>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
				<div className="rounded-xl border bg-background text-foreground shadow-sm p-6">
					<h2 className="text-xl font-semibold mb-4">Talk to MindMate</h2>
					<p className="text-muted-foreground mb-4">
						MindMate is a thoughtful companion, here to listen, offer gentle support, and help you navigate
						difficult moments with care.
					</p>
					{/* <Link href="/chat"> */}
					<Button onClick={createConversationThread} className="p-5">
						Start Chatting
					</Button>
					{/* </Link> */}
				</div>

				<div className="rounded-xl border bg-background text-foreground shadow-sm p-6">
					<h2 className="text-xl font-semibold mb-4">Mental Health Guidance</h2>
					<p className="text-muted-foreground mb-4">
						Discover tips for mental and physical well-being, take self-assessments, and explore our
						wellness library for thoughtful guidance.
					</p>

					<GuidanceButton />
				</div>
			</div>
		</section>
	)
}

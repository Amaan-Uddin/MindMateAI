'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { handleMoodUpdate } from '@/actions/dashboard-actions'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const moods = [
	{ value: 'amazing', emoji: '😁', label: 'Amazing' },
	{ value: 'good', emoji: '🙂', label: 'Good' },
	{ value: 'okay', emoji: '😐', label: 'Okay' },
	{ value: 'sad', emoji: '😢', label: 'Sad' },
	{ value: 'angry', emoji: '😠', label: 'Angry' },
]

export function MoodSelector() {
	const [selectedMood, setSelectedMood] = useState<string | null>(null)
	const [moodSubmitted, setMoodSubmitted] = useState(false)

	const handleMoodSelection = (mood: string) => {
		setSelectedMood(mood)
	}

	const handleMoodSubmit = async () => {
		if (selectedMood) {
			setMoodSubmitted(true)
			await handleMoodUpdate(selectedMood)
		}
	}

	return (
		<Card className="max-w-2xl p-6 shadow-none">
			<CardContent className="p-0">
				{!moodSubmitted ? (
					<>
						<div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
							{moods.map((mood) => (
								<button
									key={mood.value}
									onClick={() => handleMoodSelection(mood.value)}
									className={cn(
										'rounded-xl border p-4 flex flex-col items-center justify-center transition-all text-center',
										selectedMood === mood.value
											? 'border-primary bg-primary/10 ring-2 ring-primary'
											: 'border-muted hover:border-primary/50'
									)}
								>
									<span className="text-3xl">{mood.emoji}</span>
									<span className="text-sm mt-2 font-medium text-foreground">{mood.label}</span>
								</button>
							))}
						</div>

						<Button onClick={handleMoodSubmit} disabled={!selectedMood} className="w-full">
							Submit
						</Button>
					</>
				) : (
					<div className="text-center px-4">
						<p className="text-lg mb-3 text-muted-foreground">Thanks for sharing your mood!</p>
						<p className="text-sm text-muted-foreground">
							Acknowledging your feelings is the first step to managing them.
						</p>

						<Link
							href="/chat"
							className="inline-block mt-6 text-sm underline text-primary hover:text-primary/80 transition"
						>
							Talk to MindMate about how you're feeling
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

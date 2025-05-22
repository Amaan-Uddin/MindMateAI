import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX } from 'react'

import { ConditionCard } from '@/components/mental-hub-components/condition-card'

import { conditions } from '@/lib/hub-data'

/**
 * MentalHealthHubPage component - main page for the mental health hub.
 * Displays a grid of mental health condition cards.
 *
 * @returns {Promise<JSX.Element>} The mental health hub page layout with condition cards.
 */
export default async function MentalHealthHubPage(): Promise<JSX.Element> {
	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login')
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-primary">Mental Health Hub</h1>
					<p className="text-muted-foreground">Select a condition</p>
				</header>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
					{conditions.map((condition) => (
						<ConditionCard key={condition.id} condition={condition} />
					))}
				</div>
			</div>
		</div>
	)
}

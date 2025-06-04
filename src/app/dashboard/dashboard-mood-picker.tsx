import { createClient } from '@/lib/supabase/server'
import { JSX } from 'react'

import { MoodSelector } from '@/components/dashboard-components/mood-selector'

interface MoodPickerProps {
	userId: string
}

/**
 * DashboardMoodPicker component - displays a mood selection UI if the user has not already selected a mood.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userId - The ID of the user to check mood status for.
 *
 * @returns {Promise<JSX.Element | null>} The mood selector component or null if mood is already set.
 */
export async function DashboardMoodPicker({ userId }: MoodPickerProps): Promise<JSX.Element | null> {
	const supabase = await createClient()

	const { data } = await supabase.from('personal_info').select('mood').eq('user_id', userId).single()

	// if (data?.mood) return null

	return (
		<section>
			<header className="mb-4">
				<h1 className="text-[28px] font-bold">How are you feeling today?</h1>
			</header>
			<MoodSelector mood={data?.mood} />
		</section>
	)
}

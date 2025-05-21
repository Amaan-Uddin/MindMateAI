import { createClient } from '@/lib/supabase/server'

import { MoodSelector } from '@/components/dashboard-components/mood-selector'

interface MoodPickerProps {
	userId: string
}
export async function DashboardMoodPicker({ userId }: MoodPickerProps) {
	const supabase = await createClient()

	const { data } = await supabase.from('personal_info').select('mood').eq('user_id', userId).single()

	if (data?.mood) return null

	return (
		<div>
			<header className="mb-4">
				<h1 className="text-[28px] font-bold">How are you feeling today?</h1>
			</header>
			<MoodSelector />
		</div>
	)
}

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardMoodPicker } from './mood-picker'

export default async function DashboardPage() {
	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login')
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6">
			<div className="max-w-4xl mx-auto">
				<DashboardMoodPicker userId={user.id} />
			</div>
		</div>
	)
}

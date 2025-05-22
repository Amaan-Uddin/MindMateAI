import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { DashboardMoodPicker } from './mood-picker'
import { JSX } from 'react'

/**
 * DashboardPage component - main dashboard page that checks user authentication and renders the mood picker.
 * Redirects to login if the user is not authenticated.
 *
 * @returns {Promise<JSX.Element>} The dashboard page layout with mood picker.
 */
export default async function DashboardPage(): Promise<JSX.Element> {
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
				<DashboardMoodPicker userId={user.id} />
			</div>
		</div>
	)
}

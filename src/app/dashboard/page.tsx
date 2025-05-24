import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX } from 'react'

import { DashboardMoodPicker } from './dashboard-mood-picker'
import { DashboardFooter } from './dashboard-footer'
import { DashboardWellnessLibrary } from './dashboard-wellness-library'

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
			<div className="max-w-4xl mx-auto  mt-6 mb-12">
				<DashboardMoodPicker userId={user.id} />
			</div>
			<div className="max-w-4xl mx-auto my-24">
				<DashboardWellnessLibrary />
			</div>
			<div className="max-w-4xl mx-auto my-24">
				<DashboardFooter />
			</div>
		</div>
	)
}

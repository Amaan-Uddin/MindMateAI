import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX } from 'react'

import { OnboardingForm } from '@/components/onboarding-components/onboarding'

/**
 * GetStartedPage component - renders the onboarding form centered on the page.
 *
 * @returns {Promise<JSX.Element>} The onboarding page layout with the OnboardingForm component.
 */
export default async function GetStartedPage(): Promise<JSX.Element> {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login')
	}

	return (
		<div className="flex min-h-screen w-full justify-center">
			<div className="w-full max-w-2xl mx-auto">
				<OnboardingForm />
			</div>
		</div>
	)
}

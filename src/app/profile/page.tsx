import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX, Suspense } from 'react'

import { ProfileContent } from './profile-content'
import { ProfileSkeleton } from '@/components/skeleton-loaders/profile-skeleton'

/**
 * ProfilePage component - renders ProfileContent with user details inside Suspense.
 *
 * @returns {Promise<JSX.Element>}
 */
export default async function ProfilePage(): Promise<JSX.Element> {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login')
	}

	return (
		<>
			<Suspense fallback={<ProfileSkeleton />}>
				<ProfileContent userId={user.id} name={user.user_metadata.name} email={user.email!} />
			</Suspense>
		</>
	)
}

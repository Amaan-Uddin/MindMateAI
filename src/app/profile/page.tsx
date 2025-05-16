import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import ProfileContent from './profile-content'

export default async function ProfilePage() {
	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login')
	}
	return (
		<>
			<Suspense fallback={<p className="text-center py-10">Loading...</p>}>
				<ProfileContent userId={user.id} name={user.user_metadata.name} email={user.email!} />
			</Suspense>
		</>
	)
}

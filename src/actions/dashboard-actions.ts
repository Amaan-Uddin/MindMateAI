'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function handleMoodUpdate(moodValue: string) {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated user')
	}

	const { error: UpdateError } = await supabase
		.from('personal_info')
		.update({ mood: moodValue })
		.eq('user_id', user.id)
	if (UpdateError) {
		console.log('Error occurred when updating user mood', UpdateError)
	}
}

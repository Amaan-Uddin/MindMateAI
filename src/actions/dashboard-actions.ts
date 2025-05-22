'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * update mood column in user's profile
 *
 * @param {string} moodValue - 'amazing' | 'good' | 'okay' | 'sad' | 'angry'
 */
export async function updateMoodValue(moodValue: string) {
	const supabase = await createClient()

	// get the current authenticated user
	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		return redirect('/auth/login?message=Unauthenticated user')
	}

	// update mood value in database
	const { error: UpdateError } = await supabase
		.from('personal_info')
		.update({ mood: moodValue })
		.eq('user_id', user.id)
	if (UpdateError) {
		console.log('Error occurred when updating user mood', UpdateError)
	}
}

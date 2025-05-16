'use server'

import { createClient } from '@/lib/supabase/server'
import { ProfileFormValues, profileSchema } from '@/utils/validation/profileSchema'
import { redirect } from 'next/navigation'

export async function createUserProfile(data: ProfileFormValues) {
	const supabase = await createClient()

	const result = profileSchema.safeParse(data)
	if (!result.success) return redirect('/get-started?page=personal-info&message=Invalid form submission')

	const { age, phoneNumber, conditions, emergencyName, emergencyNumber } = result.data
	const parseAge = parseInt(age)

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated, user cannot create profile')
	}

	const { error } = await supabase.from('personal_info').insert({
		age: parseAge,
		phone_number: phoneNumber,
		conditions,
		emergency_name: emergencyName,
		emergency_phone_number: emergencyNumber,
		user_id: user.id,
	})

	if (error) if (!result.success) return redirect('/get-started?page=personal-info&message=Invalid form submission')

	redirect('/dashboard')
}
export async function updateUserProfile(data: ProfileFormValues) {
	const supabase = await createClient()

	const result = profileSchema.safeParse(data)
	if (!result.success) return redirect('/get-started?page=personal-info&edit=true&message=Invalid form submission')

	const { age, phoneNumber, conditions, emergencyName, emergencyNumber } = result.data
	const parseAge = parseInt(age)

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated, user cannot update profile')
	}

	const { error } = await supabase
		.from('personal_info')
		.update({
			age: parseAge,
			phone_number: phoneNumber,
			conditions,
			emergency_name: emergencyName,
			emergency_phone_number: emergencyNumber,
		})
		.eq('user_id', user.id)

	if (error)
		if (!result.success)
			return redirect('/get-started?page=personal-info&edit=true&message=Invalid form submission')

	redirect('/dashboard')
}

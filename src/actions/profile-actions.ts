'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { ProfileFormValues, profileSchema } from '@/utils/validation/profileSchema'

/**
 * creates a new user profile and stores personal information in `personal_info` table
 *
 * @param {ProfileFormValues} data - the form data containing age, phone number, medical conditions, and emergency contact details, validated by `profileSchema`
 */
export async function createUserProfile(data: ProfileFormValues): Promise<void> {
	const supabase = await createClient()

	// get current authenticated user
	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated, user cannot create profile')
	}

	// validate the data with profileSchema defined using zod
	const result = profileSchema.safeParse(data)
	if (!result.success) redirect('/get-started?page=personal-info&message=Invalid form submission')

	// unpack the result data
	const { age, phoneNumber, conditions, emergencyName, emergencyNumber } = result.data
	const parseAge = parseInt(age)

	// insert personal information record to database
	const { error } = await supabase.from('personal_info').insert({
		age: parseAge,
		phone_number: phoneNumber,
		conditions,
		emergency_name: emergencyName,
		emergency_phone_number: emergencyNumber,
		user_id: user.id,
	})
	if (error) {
		console.log('Failed to create user profile in db', error)
		redirect('/get-started?page=personal-info&message=Failed to create profile')
	}

	redirect('/dashboard')
}

/**
 * updates an existing user profile with new personal information in the `personal_info` table.
 *
 * @param {ProfileFormValues} data - the form data containing updated age, phone number, medical conditions, and emergency contact details, validated by `profileSchema`
 */
export async function updateUserProfile(data: ProfileFormValues): Promise<void> {
	const supabase = await createClient()

	const {
		data: { user },
		error: AuthError,
	} = await supabase.auth.getUser()
	if (AuthError || !user) {
		redirect('/auth/login?message=Unauthenticated, user cannot update profile')
	}

	const result = profileSchema.safeParse(data)
	if (!result.success) redirect('/get-started?page=personal-info&edit=true&message=Invalid form submission')

	const { age, phoneNumber, conditions, emergencyName, emergencyNumber } = result.data
	const parseAge = parseInt(age)

	// update the user's personal information in database
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
	if (error) {
		console.log('Failed to update user profile in db', error)
		redirect('/get-started?page=personal-info&message=Failed to update profile')
	}

	redirect('/dashboard')
}

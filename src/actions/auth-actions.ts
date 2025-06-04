'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { loginSchema, signupSchema, SignupFormValues, LoginFormValues } from '@/utils/validation/authSchema'

/**
 * registers a new user to the database and redirects them to `/get-started` route
 *
 * @param {SignupFormValues} data - the form data containing user's name, email and password for signup
 */
export async function signup(data: SignupFormValues): Promise<never> {
	const supabase = await createClient()

	// validate the data with signupSchema defined using zod
	const result = signupSchema.safeParse({ name: data.name, email: data.email, password: data.password })
	if (!result.success) redirect('/auth/login?message=Invalid form submission')

	// unpack result data
	const { name, email, password } = result.data

	// performing user signup with email and password, data is stored in supabase postgres db
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	})
	if (error) {
		console.log('error occurred during signup', error)
		redirect(`/auth/login?message=Failed to sign up user`)
	}

	redirect('/get-started?page=profile')
}

/**
 * sign-in unauthenticated user with password and redirects them to `/dashboard` route
 *
 * @param {LoginFormValues} data - the form data containing user's email and password for login
 */
export async function login(data: LoginFormValues) {
	const supabase = await createClient()

	const result = loginSchema.safeParse({ email: data.email, password: data.password })
	if (!result.success) redirect('/auth/login?message=Invalid form submission')

	const { email, password } = result.data

	const { error } = await supabase.auth.signInWithPassword({ email, password })
	if (error) {
		console.log('error occurred during login', error)
		redirect(`/auth/login?message=Failed to sign in user.`)
	}

	redirect('/dashboard')
}

/**
 * ends user session and removes auth cookies from client, redirects to `/` route
 */
export async function logout() {
	const supabase = await createClient()

	const { error } = await supabase.auth.signOut()
	if (error) {
		console.log('error occurred during logout', error)
		redirect(`/auth/login?message=Logout failed. Error occurred`)
	}

	redirect('/')
}

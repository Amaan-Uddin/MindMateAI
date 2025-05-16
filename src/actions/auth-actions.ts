'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { loginSchema, signupSchemaServer } from '@/utils/validation/authSchema'

export async function signup(data: { name: string; email: string; password: string }) {
	const supabase = await createClient()

	const parseResult = signupSchemaServer.safeParse({ name: data.name, email: data.email, password: data.password })
	if (!parseResult.success) {
		redirect('/auth/login?message=Invalid form submission')
	}
	const { name, email, password } = parseResult.data

	const {
		data: { user },
		error,
	} = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	})

	if (error) {
		redirect(`/auth/login?message=${error.message}`)
	}

	revalidatePath('/', 'layout')
	redirect('/get-started?page=profile')
}

export async function login(data: { email: string; password: string }) {
	const supabase = await createClient()

	const parseResult = loginSchema.safeParse({ email: data.email, password: data.password })
	if (!parseResult.success) {
		redirect('/auth/login?message=Invalid form submission')
	}
	const { email, password } = parseResult.data

	const { error } = await supabase.auth.signInWithPassword({ email, password })

	if (error) {
		console.log(error)
		redirect(`/auth/login?message=${error.message}`)
	}

	revalidatePath('/', 'layout')
	redirect('/dashboard')
}

export async function logout() {
	const supabase = await createClient()

	const { error } = await supabase.auth.signOut()

	if (error) {
		redirect(`/auth/login?message=${error.message}`)
	}

	redirect('/')
}

'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { JSX } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import { signupSchema, SignupFormValues } from '@/utils/validation/authSchema'
import { signup } from '@/actions/auth-actions'

/**
 * SignUpForm renders a user registration form for creating a new account.
 *
 * It uses React Hook Form with Zod schema validation (`signupSchema`)
 * and submits the data using the `signup` function.
 *
 * The form includes input fields for:
 * - Full name
 * - Email
 * - Password
 *
 * @param {Object} props - React component props extended from a <div> element.
 * @param {string} [props.className] - Optional Tailwind CSS class for outermost wrapper.
 * @returns {JSX.Element} The rendered signup form component.
 */
export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const submitSignupForm: SubmitHandler<SignupFormValues> = async (data) => {
		try {
			await signup({ name: data.name, email: data.email, password: data.password })
		} catch (error: unknown) {
			console.error(error)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl font-bold">Sign up</CardTitle>
					<CardDescription>Create a new account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(submitSignupForm)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="name">Full Name</Label>
								<Input id="name" type="text" placeholder="John Doe" {...register('name')} />
								{errors.name?.message && <span className="text-red-500">{errors.name.message}</span>}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
								{errors.email?.message && <span className="text-red-500">{errors.email.message}</span>}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" type="password" {...register('password')} />
								{errors.password?.message && (
									<span className="text-red-500">{errors.password.message}</span>
								)}
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? 'Creating an account...' : 'Sign up'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<Link href="/auth/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

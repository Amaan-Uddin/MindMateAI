'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { JSX, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

import { loginSchema, LoginFormValues } from '@/utils/validation/authSchema'
import { login } from '@/actions/auth-actions'

type LoginFormProps = React.ComponentPropsWithoutRef<'div'> & {
	ErrorMessage?: string
}

/**
 * LoginForm renders a user login interface with email and password fields.
 *
 * It uses React Hook Form integrated with Zod schema validation (`loginSchema`)
 * and submits the form data using the `login` function.
 *
 * @param {Object} props - Props for the LoginForm component.
 * @param {string} [props.className] - Optional Tailwind CSS class for styling the container.
 * @param {string} [props.ErrorMessage] - Optional error message to display via toast notification.
 * @returns {JSX.Element} The rendered login form component.
 */
export function LoginForm({ className, ErrorMessage, ...props }: LoginFormProps): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const submitLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
		try {
			await login({ email: data.email, password: data.password })
		} catch (error: unknown) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (ErrorMessage) {
			toast.error(ErrorMessage)
		}
	}, [ErrorMessage])

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl font-bold">Login</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(submitLoginForm)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
								{errors.email?.message && <span className="text-red-500">{errors.email.message}</span>}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/auth/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
								<Input id="password" type="password" {...register('password')} />
								{errors.password?.message && (
									<span className="text-red-500">{errors.password.message}</span>
								)}
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? 'Logging in...' : 'Login'}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<Link href="/auth/sign-up" className="underline underline-offset-4">
								Sign up
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

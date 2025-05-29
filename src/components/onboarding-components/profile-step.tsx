'use client'

import { useRouter } from 'next/navigation'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { JSX } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { ProfileFormValues } from '@/utils/validation/profileSchema'

const conditionsList = ['Anxiety', 'Depression', 'Stress', 'Bipolar', 'ADHD', 'PTSD', 'OCD', 'Insomnia', 'Paranoia']

interface Props {
	register: UseFormRegister<ProfileFormValues>
	errors: FieldErrors<ProfileFormValues>
	router: ReturnType<typeof useRouter>
	edit: string | null
}

/**
 * ProfileStep component - renders a user profile form which includes age, phone number, and health conditions.
 * Displays validation errors and handles navigation to the next step.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.register - React Hook Form register function for form inputs.
 * @param {Object} props.errors - Validation errors object from React Hook Form.
 * @param {import('next/router').NextRouter} props.router - Next.js router instance for navigation.
 * @param {boolean} props.edit - Flag indicating if the form is in edit mode.
 *
 * @returns {JSX.Element} The profile step form JSX element.
 */
export function ProfileStep({ register, errors, router, edit }: Props): JSX.Element {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-2">
				<Label htmlFor="age">Your Age</Label>
				<Input id="age" type="text" autoComplete="off" placeholder="Ex: 18" {...register('age')} />
				{errors.age?.message && <span className="text-red-500">{errors.age.message}</span>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="phone">Phone Number</Label>
				<div className="flex">
					<div className="flex items-center justify-center bg-muted px-3 border border-r-0 border-input rounded-l-md text-muted-foreground">
						+91
					</div>
					<Input
						autoComplete="off"
						id="phone"
						type="tel"
						placeholder="98765-43210"
						className="rounded-l-none"
						{...register('phoneNumber')}
					/>
				</div>
				{errors.phoneNumber?.message && <span className="text-red-500">{errors.phoneNumber.message}</span>}
			</div>
			<div className="grid gap-2">
				<Label>Do you have any of these conditions?</Label>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					{conditionsList.map((condition) => (
						<div key={condition} className="flex items-center">
							<Input
								className="shrink-0 size-4 mr-2"
								type="checkbox"
								id={condition}
								value={condition}
								{...register('conditions')}
							/>
							<label htmlFor={condition}>{condition}</label>
						</div>
					))}
				</div>
			</div>
			<Button
				type="button"
				className="w-fit self-end"
				onClick={() =>
					edit
						? router.replace('/get-started?page=emergency-contact&edit=true')
						: router.replace('/get-started?page=emergency-contact')
				}
			>
				Next
			</Button>
		</div>
	)
}

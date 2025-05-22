'use client'

import { useRouter } from 'next/navigation'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { JSX } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProfileFormValues } from '@/utils/validation/profileSchema'

interface Props {
	register: UseFormRegister<ProfileFormValues>
	errors: FieldErrors<ProfileFormValues>
	router: ReturnType<typeof useRouter>
	isSubmitting: boolean
	edit: string | null
}

/**
 * EmergencyContactStep component - renders the emergency contact form step with name and phone number inputs,
 * shows validation errors, and provides navigation buttons for going back or submitting the form.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.register - React Hook Form register function for form inputs.
 * @param {Object} props.errors - Validation errors object from React Hook Form.
 * @param {import('next/router').NextRouter} props.router - Next.js router instance for navigation.
 * @param {boolean} props.isSubmitting - Indicates if the form submission is in progress.
 * @param {boolean} props.edit - Flag indicating if the form is in edit mode.
 *
 * @returns {JSX.Element} The emergency contact form step JSX element.
 */
export function EmergencyContactStep({ register, errors, router, isSubmitting, edit }: Props): JSX.Element {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-2">
				<Label htmlFor="emergency-name">Contact Name</Label>
				<Input
					id="emergency-name"
					autoComplete="off"
					type="text"
					placeholder="Full Name"
					{...register('emergencyName')}
				/>
				{errors.emergencyName?.message && <span className="text-red-500">{errors.emergencyName.message}</span>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="emergency-number">Contact Number</Label>
				<div className="flex">
					<div className="flex items-center justify-center bg-muted px-3 border border-r-0 border-input rounded-l-md text-muted-foreground">
						+91
					</div>
					<Input
						id="emergency-number"
						autoComplete="off"
						type="tel"
						placeholder="98765-43210"
						className="rounded-l-none"
						{...register('emergencyNumber')}
					/>
				</div>
				{errors.emergencyNumber?.message && (
					<span className="text-red-500">{errors.emergencyNumber.message}</span>
				)}
			</div>
			<div className="flex justify-between">
				<Button
					onClick={() =>
						edit
							? router.replace('/get-started?page=profile&edit=true')
							: router.replace('/get-started?page=profile')
					}
					type="button"
					variant="outline"
					className="w-fit"
				>
					Back
				</Button>
				<Button type="submit" className="w-fit" disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	)
}

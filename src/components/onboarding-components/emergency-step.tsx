'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ProfileFormValues } from '@/utils/validation/profileSchema'
import { useRouter } from 'next/navigation'

interface Props {
	register: UseFormRegister<ProfileFormValues>
	errors: FieldErrors<ProfileFormValues>
	router: ReturnType<typeof useRouter>
	isSubmitting: boolean
	edit: string | null
}

export function EmergencyContactStep({ register, errors, router, isSubmitting, edit }: Props) {
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

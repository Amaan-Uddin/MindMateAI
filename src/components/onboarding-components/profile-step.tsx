'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ProfileFormValues } from '@/utils/validation/profileSchema'
import { useRouter } from 'next/navigation'

const conditionsList = [
	'Anxiety',
	'Depression',
	'ADHD',
	'PTSD',
	'Bipolar Disorder',
	'OCD',
	'Eating Disorder',
	'Insomnia',
	'None',
]

interface Props {
	register: UseFormRegister<ProfileFormValues>
	errors: FieldErrors<ProfileFormValues>
	router: ReturnType<typeof useRouter>
	edit: string | null
}

export function ProfileStep({ register, errors, router, edit }: Props) {
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
				<div className="grid grid-cols-2 gap-2">
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

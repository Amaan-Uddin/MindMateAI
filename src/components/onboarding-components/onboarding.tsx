'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { JSX, useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileStep } from './profile-step'
import { EmergencyContactStep } from './emergency-step'
import { OnboardingSkeleton } from '../skeleton-loaders/onboarding-skeleton'

import { profileSchema, ProfileFormValues } from '@/utils/validation/profileSchema'
import { createUserProfile, updateUserProfile } from '@/actions/profile-actions'

/**
 * OnboardingForm component handles the multi-step user onboarding flow.
 *
 * It supports two steps:
 *  - Profile: Collects user's age, phone number, and health conditions.
 *  - Emergency Contact: Collects emergency contact name and number.
 *
 * The current step is determined by the `page` query parameter.
 * The form supports an "edit" mode (via `edit=true` query param), which loads existing user data for update.
 * Redirects unauthenticated users to the login page.
 * Redirects users to `/profile` if profile already exists and not in edit mode.
 *
 * @component
 * @returns {JSX.Element} The onboarding form UI.
 */
export function OnboardingForm(): JSX.Element {
	const router = useRouter()
	const searchParams = useSearchParams()
	const page = searchParams.get('page') || 'profile'
	const edit = searchParams.get('edit')

	const [loadingProfile, setLoadingProfile] = useState(true)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			age: undefined,
			phoneNumber: '',
			conditions: [],
			emergencyName: '',
			emergencyNumber: '',
		},
	})

	const submitForm: SubmitHandler<ProfileFormValues> = async (data) => {
		if (edit === 'true') await updateUserProfile(data)
		else await createUserProfile(data)
		router.push('/dashboard')
	}

	// useEffect to populate form fields
	useEffect(() => {
		if (edit !== 'true') return
		const fetchProfile = async () => {
			const supabase = createClient()
			const {
				data: { user },
				error: AuthError,
			} = await supabase.auth.getUser()

			if (AuthError || !user) {
				console.error('User not authenticated:', AuthError)
				setLoadingProfile(false)
				router.replace('/auth/login?message=User not authenticated')
			}

			const { data, error } = await supabase
				.from('personal_info')
				.select('age,conditions,emergency_name,emergency_phone_number,phone_number')
				.eq('user_id', user!.id)
				.single()

			if (error) {
				console.error('Error fetching profile:', error)
			} else if (data) {
				setValue('age', data.age?.toString() || '')
				setValue('phoneNumber', data.phone_number || '')
				setValue('conditions', data.conditions || [])
				setValue('emergencyName', data.emergency_name || '')
				setValue('emergencyNumber', data.emergency_phone_number || '')
			}
			console.log(data)

			setLoadingProfile(false)
		}

		fetchProfile()
	}, [edit, setValue])

	// useEffect to check if user profile already exist
	useEffect(() => {
		if (!edit && page) {
			const checkProfile = async () => {
				const supabase = createClient()
				const {
					data: { user },
					error: AuthError,
				} = await supabase.auth.getUser()

				if (AuthError || !user) {
					console.error('User not authenticated:', AuthError)
					setLoadingProfile(false)
					router.replace('/auth/login?message=User not authenticated')
				}

				const { data } = await supabase.from('personal_info').select('id').eq('user_id', user!.id).single()
				if (data) {
					console.log('User profile already exists, redirecting to /profile')
					router.push('/profile')
				}
				setLoadingProfile(false)
			}
			checkProfile()
		}
	}, [page, edit])

	useEffect(() => {
		if (!searchParams.get('page')) {
			router.replace('/get-started?page=profile')
		}
	}, [searchParams, router])

	if (loadingProfile) {
		return <OnboardingSkeleton page={page} />
	}

	return (
		<div className="flex justify-center p-4 sm:p-6">
			<Card key={page} className="w-full mx-auto">
				<CardHeader>
					<CardTitle className="text-3xl font-bold">
						{page === 'emergency-contact' ? 'Emergency Contact' : 'Profile'}
					</CardTitle>
					<CardDescription>
						{page === 'emergency-contact'
							? 'Add a trusted contact for emergency assistance.'
							: 'Create a tailored wellness experience.'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(submitForm)}>
						{page === 'profile' && (
							<ProfileStep register={register} errors={errors} router={router} edit={edit} />
						)}
						{page === 'emergency-contact' && (
							<EmergencyContactStep
								register={register}
								errors={errors}
								router={router}
								isSubmitting={isSubmitting}
								edit={edit}
							/>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

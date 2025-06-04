'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type WellnessLibType = {
	id: number
	title: string
	video_id: string
	tags: string[] | null
}

/**
 * fetches a list of recommended YouTube videos for the user based on their mental health conditions.
 * @returns  {Promise<Array|null>} a list of video objects with id, title, video_id, and tags.
 */
export async function getYoutubeVideos(): Promise<Array<WellnessLibType> | null> {
	const supabase = await createClient()

	// get current authenticated user
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login?message=Unauthenticated user cannot access Wellness Library')
	}

	// fetch all user conditions data
	const { data: UserData, error: FetchError } = await supabase
		.from('personal_info')
		.select('conditions')
		.eq('user_id', user.id)
		.single()
	if (FetchError) {
		console.error('Error occurred while fetching user conditions', FetchError)
	}
	if (!UserData || UserData.conditions.length === 0) {
		return redirect('/profile?message=User has no conditions, please select atleast one condition')
	}

	// fetch all Youtube videos related to the user's conditions
	const { data } = await supabase
		.from('youtube_videos')
		.select('id,title,video_id,tags')
		.overlaps('tags', UserData.conditions!)

	return data
}

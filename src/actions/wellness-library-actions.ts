'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getYoutubeVideos() {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login?message=Unauthenicated user cannot access Wellness Library')
		// TODO: add a toast notification
	}

	const { data: SelectConditions, error: SelectError } = await supabase
		.from('personal_info')
		.select('conditions')
		.eq('user_id', user.id)
		.single()
	if (SelectError) {
		console.error('Error occurred while fetching user conditions', SelectError)
	}
	if (!SelectConditions || SelectConditions.conditions.length === 0) {
		redirect('/profile?message=User has no conditions, please select atleast one condition')
		// TODO: add a toast notification
	}

	const { data, error } = await supabase
		.from('youtube_videos')
		.select('id,title,video_id,tags')
		.overlaps('tags', SelectConditions.conditions!)
	if (error) {
		console.error('Error occurred while fetching user conditions', error)
	}

	return data
}

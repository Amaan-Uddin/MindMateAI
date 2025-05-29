import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { JSX, Suspense } from 'react'

import { VideoLibrary } from './video-library'
import { VideoCardSkeleton } from '@/components/skeleton-loaders/video-card-skeleton'

/**
 * WellnessLibraryPage component - renders the VideoLibrary component displaying YouTube videos.
 *
 * @returns {Promise<JSX.Element>} The Wellness Library page JSX element.
 */

export default async function WellnessLibraryPage(): Promise<JSX.Element> {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		return redirect('/auth/login')
	}

	return (
		<div className="min-h-screen bg-background px-4 py-6 sm:px-6">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-primary">Wellness Library</h1>
					<p className="text-muted-foreground">Youtube Videos</p>
				</header>
				<Suspense fallback={<VideoCardSkeleton />}>
					<VideoLibrary />
				</Suspense>
			</div>
		</div>
	)
}

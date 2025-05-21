import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

import { VideoLibrary } from './video-library'
import { Suspense } from 'react'
import { VideoCardSkeleton } from '@/components/skeleton-loaders/video-card-skeleton'

export default async function WellnessLibraryPage() {
	const supabase = await createClient()

	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login')
	}
	return (
		<div className="min-h-screen bg-background p-4 sm:p-6">
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

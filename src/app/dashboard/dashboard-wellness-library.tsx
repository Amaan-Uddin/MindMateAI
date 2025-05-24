import Link from 'next/link'
import { JSX, Suspense } from 'react'

import { VideoLibrary } from '../wellness-library/video-library'
import { Button } from '@/components/ui/button'
import { VideoCardSkeleton } from '@/components/skeleton-loaders/video-card-skeleton'
import { MoveRight } from 'lucide-react'

/**
 * DashboardWellnessLibrary component - displays a preview of the wellness video library on the dashboard.
 * It shows a few videos and provides a link to explore the full wellness library.
 *
 * @returns {Promise<JSX.Element>} A section with a heading, video previews, and a link to the full library.
 */
export async function DashboardWellnessLibrary(): Promise<JSX.Element> {
	return (
		<section>
			<header className="mb-4">
				<h1 className="text-[28px] font-bold">Explore our Wellness Library...</h1>
			</header>
			<Suspense fallback={<VideoCardSkeleton />}>
				<VideoLibrary items={3} />
			</Suspense>
			<Link href={'/wellness-library'}>
				<Button
					variant="link"
					size="lg"
					className="w-full text-primary hover:text-primary/90 hover:no-underline mt-6"
				>
					Explore More
					<MoveRight className="w-4 h-4 mr-0.5" />
				</Button>
			</Link>
		</section>
	)
}

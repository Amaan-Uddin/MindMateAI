import { notFound } from 'next/navigation'
import { JSX } from 'react'

import { VideoCards } from '@/components/wellness-library-components/video-cards'

import { getYoutubeVideos } from '@/actions/wellness-library-actions'

/**
 * VideoLibrary component - fetches YouTube videos and renders them as a responsive grid of VideoCards.
 * Redirects to notFound if no videos are available.
 *
 * @returns {Promise<JSX.Element>}
 */
export async function VideoLibrary(): Promise<JSX.Element> {
	const videos = await getYoutubeVideos()
	if (!videos || videos.length === 0) return notFound()
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
			{videos.map((video) => (
				<VideoCards key={video.id} data={video} />
			))}
		</div>
	)
}

import { getYoutubeVideos } from '@/actions/wellness-library-actions'
import { VideoCards } from '@/components/wellness-library-components/video-cards'
import { notFound } from 'next/navigation'

export async function VideoLibrary() {
	// await new Promise((resolve) => setTimeout(resolve, 1000))
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

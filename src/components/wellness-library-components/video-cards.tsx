import Link from 'next/link'
import Image from 'next/image'
import { JSX } from 'react'

interface VideCardProps {
	data: {
		id: number
		title: string
		video_id: string
		tags: string[] | null
	}
}

/**
 * VideoCards component renders a clickable card linking to a YouTube video.
 *
 * Each card shows the video thumbnail, title, and optional tags.
 * Clicking the card opens the video in a new tab.
 *
 * @param {Object} props - Component props.
 * @param {VideCardProps['data']} props.data - Data object containing video details.
 * @param {string} props.data.video_id - YouTube video ID.
 * @param {string} props.data.title - Title of the video.
 * @param {string[]} [props.data.tags] - Optional list of tags related to the video.
 *
 * @returns {JSX.Element} A clickable video card.
 */
export function VideoCards({ data }: VideCardProps): JSX.Element {
	return (
		<Link
			href={`https://www.youtube.com/watch?v=${data.video_id}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Watch ${data.title} on YouTube`}
		>
			<div className="aspect-video w-full">
				<div className="relative group w-fit">
					<Image
						src={`https://i.ytimg.com/vi/${data.video_id}/maxresdefault.jpg`}
						alt={`${data.title} thumbnail`}
						width={400}
						height={300}
						className="rounded-lg"
					/>

					<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-12 h-12 text-white"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</div>
				</div>

				<div className="flex flex-col gap-2 items-start py-3">
					{data.tags && data.tags.length > 0 ? (
						<ul className="flex flex-wrap gap-2 justify-center">
							{data.tags.map((tag) => (
								<li
									key={tag}
									className="text-xs px-2 py-1 rounded-full 
					bg-green-500 text-green-50 
					dark:bg-green-700  
					hover:bg-green-600 dark:hover:bg-green-800 
					font-semibold"
								>
									{tag}
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm text-muted-foreground text-center">No tags available</p>
					)}

					<h3 className="text-base font-semibold text-foreground line-clamp-2">{data.title}</h3>
				</div>
			</div>
		</Link>
	)
}

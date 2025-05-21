export function VideoCardSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
			{Array(3)
				.fill(0)
				.map((_, i) => (
					<div className="aspect-video w-full animate-pulse" key={i}>
						<div className="relative w-fit">
							<div className="w-[288px] h-[162px] bg-muted rounded-lg" />

							<div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
								<div className="w-12 h-12 bg-white/20 rounded-full" />
							</div>
						</div>

						<div className="flex flex-col gap-2 items-start py-3">
							<div className="flex flex-wrap gap-2">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="h-5 w-16 bg-muted rounded-full" />
								))}
							</div>

							<div className="w-[288px] h-5 bg-muted rounded" />
							<div className="w-[288px] h-5 bg-muted rounded" />
						</div>
					</div>
				))}
		</div>
	)
}

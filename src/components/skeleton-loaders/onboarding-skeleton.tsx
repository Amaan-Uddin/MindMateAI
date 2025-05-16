import { Card, CardContent, CardHeader } from '../ui/card'

interface Props {
	page: string
}
export function OnboardingSkeleton({ page }: Props) {
	return (
		<div className="flex justify-center p-4 sm:p-6 animate-pulse">
			<Card className="w-full mx-auto">
				<CardHeader>
					<div className="h-8 w-1/3 bg-muted rounded mb-2" />
					<div className="h-4 w-1/2 bg-muted rounded" />
				</CardHeader>
				<CardContent>
					{page === 'profile' && (
						<div className="flex flex-col gap-6">
							{/* Age */}
							<div className="grid gap-2">
								<div className="h-4 w-24 bg-muted rounded" />
								<div className="h-10 w-full bg-muted rounded" />
							</div>

							{/* Phone Number */}
							<div className="grid gap-2">
								<div className="h-4 w-36 bg-muted rounded" />
								<div className="flex">
									<div className="w-14 h-10 bg-muted rounded-l-md border border-input border-r-0" />
									<div className="h-10 w-full bg-muted rounded-r-md border border-input" />
								</div>
							</div>

							{/* Conditions */}
							<div className="grid gap-2">
								<div className="h-4 w-64 bg-muted rounded" />
								<div className="grid grid-cols-2 gap-2">
									{Array(9)
										.fill(0)
										.map((_, i) => (
											<div key={i} className="flex items-center gap-2">
												<div className="size-4 bg-muted rounded" />
												<div className="h-4 w-24 bg-muted rounded" />
											</div>
										))}
								</div>
							</div>

							{/* Next Button */}
							<div className="h-10 w-24 bg-muted rounded self-end" />
						</div>
					)}

					{page === 'emergency-contact' && (
						<div className="flex flex-col gap-6">
							{/* Emergency Name */}
							<div className="grid gap-2">
								<div className="h-4 w-36 bg-muted rounded" />
								<div className="h-10 w-full bg-muted rounded" />
							</div>

							{/* Emergency Phone */}
							<div className="grid gap-2">
								<div className="h-4 w-44 bg-muted rounded" />
								<div className="flex">
									<div className="w-14 h-10 bg-muted rounded-l-md border border-input border-r-0" />
									<div className="h-10 w-full bg-muted rounded-r-md border border-input" />
								</div>
							</div>

							{/* Back & Submit buttons */}
							<div className="flex justify-between">
								<div className="h-10 w-24 bg-muted rounded" />
								<div className="h-10 w-24 bg-muted rounded" />
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

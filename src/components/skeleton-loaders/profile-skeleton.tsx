import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ProfileSkeleton() {
	return (
		<div className="space-y-6 max-w-2xl mx-auto my-4 animate-pulse">
			<div>
				<div className="w-[117px] h-10 bg-muted rounded mb-4" />
			</div>

			<Card>
				<CardHeader>
					<div className="h-6 w-1/3 bg-muted rounded" />
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-muted rounded-full" />
									<div className="w-28 h-4 bg-muted rounded" />
								</div>
								<div className="w-40 h-4 bg-muted rounded" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<div className="h-6 w-1/3 bg-muted rounded" />
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[...Array(2)].map((_, i) => (
							<div key={i} className="flex justify-between items-center">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-muted rounded-full" />
									<div className="w-28 h-4 bg-muted rounded" />
								</div>
								<div className="w-40 h-4 bg-muted rounded" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

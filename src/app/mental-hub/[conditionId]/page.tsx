import { notFound } from 'next/navigation'
import Link from 'next/link'
import { conditions, conditionPrompts } from '@/lib/hub-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

export default async function ConditionPage({ params }: { params: Promise<{ conditionId: string }> }) {
	const { conditionId } = await params

	const condition = conditions.find((c) => c.id === conditionId)
	if (!condition) notFound()

	return (
		<div className="bg-background flex items-center justify-center p-4 sm:p-6 ">
			<Card className="w-full max-w-lg gap-2">
				<CardHeader className="border-b border-border">
					<CardTitle className="flex items-center gap-3 text-2xl font-bold">
						<span className="text-3xl">{condition.icon}</span>
						<span>{condition.name} Support</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-6 space-y-6">
					{/* Some note or info */}
					<div className="rounded-md bg-muted p-4">
						<h3 className="text-sm font-semibold text-muted-foreground mb-2">What You'll Get</h3>
						<p className="text-sm text-foreground">{conditionPrompts[condition.id]}</p>
					</div>
					<p className="text-muted-foreground text-sm">
						Explore personalized support for {condition.name.toLowerCase()} with our tools.
					</p>
					{/* Buttons */}
					<div className="flex flex-col gap-3">
						<Link href={'/chat'}>
							<Button
								className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200"
								size="lg"
							>
								Start AI Chat
							</Button>
						</Link>
						<Link href={`/mental-hub/${conditionId}/assessment`}>
							<Button
								variant="outline"
								className="w-full border-border hover:bg-muted transition-colors duration-200"
								size="lg"
							>
								Take Assessment
							</Button>
						</Link>
						<Link href={'/mental-hub'}>
							<Button variant="link" size="lg" className="w-full text-primary hover:text-primary/80">
								<MoveLeft className="w-4 h-4 mr-0.5" />
								Go back
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

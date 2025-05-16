import { Condition } from '@/utils/types/mental-hub-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export function ConditionCard({ condition }: { condition: Condition }) {
	return (
		<Link href={`/mental-hub/${condition.id}`} className="h-full">
			<Card className="h-full flex flex-col justify-between hover:shadow-md transition-shadow gap-2">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span className="text-2xl">{condition.icon}</span>
						{condition.name}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{condition.description}</CardDescription>
				</CardContent>
			</Card>
		</Link>
	)
}

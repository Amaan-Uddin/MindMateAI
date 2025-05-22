import Link from 'next/link'
import { JSX } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Condition } from '@/utils/types/mental-hub-types'

/**
 * ConditionCard component - displays a mental health condition with icon, name, and description.
 * Links to the detailed condition page.
 *
 * @param {Object} props - Component props.
 * @param {Condition} props.condition - The mental health condition data.
 *
 * @returns {JSX.Element} The condition card element.
 */
export function ConditionCard({ condition }: { condition: Condition }): JSX.Element {
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

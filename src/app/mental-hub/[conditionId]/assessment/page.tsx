import { notFound } from 'next/navigation'
import { Assessment } from './assessment'
import { conditions, assessmentQuestions } from '@/lib/hub-data'

export default async function AssessmentPage({ params }: { params: Promise<{ conditionId: string }> }) {
	const { conditionId } = await params

	const condition = conditions.find((c) => c.id === conditionId)
	if (!condition) notFound()

	return (
		<div className="bg-background flex [flex items-center justify-center p-4 sm:p-6">
			<Assessment condition={condition} questions={assessmentQuestions[condition.id]} />
		</div>
	)
}

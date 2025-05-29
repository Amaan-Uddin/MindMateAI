import { JSX } from 'react'
import { notFound } from 'next/navigation'

import { Assessment } from './assessment'

import { conditions, assessmentQuestions } from '@/lib/hub-data'

interface Props {
	params: Promise<{ conditionId: string }>
}

/**
 * AssessmentPage component - renders the assessment form for a specified mental health condition.
 * Redirects to notFound if the condition ID is invalid.
 *
 * @param {Object} props - Component props.
 * @param {Promise<{ conditionId: string }>} props.params - Promise resolving to route params containing the condition ID.
 *
 * @returns {Promise<JSX.Element>} The assessment page JSX element wrapped in a promise.
 */
export default async function AssessmentPage({ params }: Props): Promise<JSX.Element> {
	const { conditionId } = await params

	const condition = conditions.find((c) => c.id === conditionId)
	if (!condition) notFound()

	return (
		<div className="bg-background flex items-center justify-center px-4 py-6 sm:px-6">
			<Assessment condition={condition} questions={assessmentQuestions[condition.id]} />
		</div>
	)
}

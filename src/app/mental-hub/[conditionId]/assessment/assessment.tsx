'use client'

import { useRouter } from 'next/navigation'
import { JSX, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MoveLeft, Info } from 'lucide-react'

import { Condition, Questions, Result } from '@/utils/types/mental-hub-types'

interface Props {
	condition: Condition
	questions: Questions[]
}

/**
 * Assessment component renders some questions for a specific condition and calculates the assessment result based on user answers.
 *
 * @param {Object} props - Component props.
 * @param {Condition} props.condition - The condition object containing id, name, icon, etc.
 * @param {Question[]} props.questions - Array of questions for the assessment, each with options.
 *
 * @returns {JSX.Element} JSX element rendering the assessment UI.
 */
export function Assessment({ condition, questions }: Props): JSX.Element {
	const router = useRouter()
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<number[]>([])
	const [result, setResult] = useState<Result | null>(null)

	const interpretResults = (answers: number[]): Result => {
		const score = answers.reduce((total, answer) => total + answer, 0)
		const maxScore = questions.length * 3
		const percentage = (score / maxScore) * 100

		if (percentage < 25) {
			return { level: 'Low', message: 'Minimal symptoms. Monitor if concerned.' }
		} else if (percentage < 50) {
			return { level: 'Moderate', message: 'Some symptoms. Consider professional help.' }
		} else if (percentage < 75) {
			return { level: 'High', message: 'Significant symptoms. Consult a professional.' }
		} else {
			return { level: 'Severe', message: 'Severe symptoms. Seek help urgently.' }
		}
	}

	const handleAnswer = (answerIndex: number) => {
		const newAnswers = [...answers, answerIndex]
		setAnswers(newAnswers)

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		} else {
			setResult(interpretResults(newAnswers))
		}
	}

	const handleRedirect = () => {
		router.push('/chat')
	}

	const handleRestart = () => {
		router.push('/mental-hub')
	}

	return (
		<Card
			key={result ? 'result' : 'questions'}
			className="w-[700px] mx-auto shadow-lg transition-all duration-300 hover:shadow-xl animate-in fade-in"
		>
			{result ? (
				<>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span className="text-2xl">{condition.icon}</span>
							{condition.name} Assessment Results
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={`p-4 rounded-lg mb-6 ${
								result.level === 'Low'
									? 'bg-green-100 text-green-800'
									: result.level === 'Moderate'
									? 'bg-yellow-100 text-yellow-800'
									: result.level === 'High'
									? 'bg-orange-100 text-orange-800'
									: 'bg-red-100 text-red-800'
							}`}
						>
							<h3 className="font-semibold text-lg mb-2">{result.level} Level</h3>
							<p>{result.message}</p>
						</div>
						<div className="mb-6 border rounded-md px-4 py-3 bg-secondary">
							<h3 className="font-bold text-lg mb-1 flex items-center gap-1.5">
								<Info className="w-4 h-4" /> Note
							</h3>
							<p className="text-muted-foreground">
								This is not a diagnostic tool. Consult a professional for a diagnosis.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 w-full">
							<Button onClick={handleRedirect}>Get AI Guidance</Button>
							<Button variant="outline" onClick={handleRestart}>
								<MoveLeft className="w-4 h-4 mr-0.5" />
								Back to Hub
							</Button>
						</div>
					</CardContent>
				</>
			) : (
				<>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span className="text-2xl">{condition.icon}</span>
							{condition.name} Assessment
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
						<p className="text-sm text-muted-foreground mb-4">
							Question {currentQuestionIndex + 1} of {questions.length}
						</p>
						<h3 className="text-lg font-medium mb-4">{questions[currentQuestionIndex].question}</h3>
						<div className="space-y-3">
							{questions[currentQuestionIndex].options.map((option, index) => (
								<Button
									key={index}
									variant="outline"
									className="w-full text-left justify-start"
									onClick={() => handleAnswer(index)}
								>
									{option}
								</Button>
							))}
						</div>
						<Button variant="link" onClick={handleRestart} className="mt-4">
							<MoveLeft className="w-4 h-4 mr-0.5" />
							Cancel
						</Button>
					</CardContent>
				</>
			)}
		</Card>
	)
}

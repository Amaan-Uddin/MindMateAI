export enum ConditionId {
	Anxiety = 'anxiety',
	Depression = 'depression',
	Stress = 'stress',
	Bipolar = 'bipolar',
	ADHD = 'adhd',
	PTSD = 'ptsd',
	OCD = 'ocd',
	Insomnia = 'insomnia',
	Paranoia = 'paranoia',
}

export type Condition = {
	id: ConditionId
	name: string
	icon: string
	description: string
}

export type Questions = {
	question: string
	options: string[]
}

export type AssessmentQuestion = {
	[key in ConditionId]: Questions[]
}

export type ConditionPrompt = {
	[key in ConditionId]: string
}

export type Result = {
	level: 'Low' | 'Moderate' | 'High' | 'Severe'
	message: string
}

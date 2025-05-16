import { Condition, AssessmentQuestion, ConditionPrompt, ConditionId } from '@/utils/types/mental-hub-types'

export const conditions: Condition[] = [
	{
		id: ConditionId.Anxiety,
		name: 'Anxiety',
		icon: '😰',
		description: 'Persistent worry, fear, or unease about everyday situations',
	},
	{
		id: ConditionId.Depression,
		name: 'Depression',
		icon: '😔',
		description: 'Persistent sadness and loss of interest in activities',
	},
	{
		id: ConditionId.Stress,
		name: 'Stress',
		icon: '😓',
		description: 'Overwhelm from life pressures',
	},
	{
		id: ConditionId.Bipolar,
		name: 'Bipolar Disorder',
		icon: '🔄',
		description: 'Unusual shifts in mood, energy, and activity levels',
	},
	{
		id: ConditionId.ADHD,
		name: 'ADHD',
		icon: '🧠',
		description: 'Difficulty paying attention, hyperactivity, and impulsiveness',
	},
	{
		id: ConditionId.PTSD,
		name: 'PTSD',
		icon: '⚡',
		description: 'Flashbacks, nightmares, and anxiety after traumatic events',
	},
	{
		id: ConditionId.OCD,
		name: 'OCD',
		icon: '🔄',
		description: 'Recurring unwanted thoughts leading to repetitive behaviors',
	},
	{
		id: ConditionId.Insomnia,
		name: 'Insomnia',
		icon: '😴',
		description: 'Persistent difficulty falling or staying asleep',
	},
	{
		id: ConditionId.Paranoia,
		name: 'Paranoia',
		icon: '👁️',
		description: 'Intense, irrational distrust of others',
	},
	{
		id: ConditionId.Addiction,
		name: 'Addiction',
		icon: '⛓️',
		description: 'Compulsive substance use or behavior despite harmful consequences',
	},
	{
		id: ConditionId.EatingDisorders,
		name: 'Eating Disorders',
		icon: '🍽️',
		description: 'Abnormal eating habits that negatively impact health',
	},
	{
		id: ConditionId.Phobia,
		name: 'Phobias',
		icon: '😱',
		description: 'Extreme, irrational fear of specific objects or situations',
	},
	{
		id: ConditionId.Anger,
		name: 'Anger Issues',
		icon: '😠',
		description: 'Difficulty controlling anger that affects daily life',
	},
]

export const assessmentQuestions: AssessmentQuestion = {
	[ConditionId.Anxiety]: [
		{
			question: 'How often do you feel nervous, anxious, or on edge?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question: 'How difficult is it for you to relax?',
			options: ['Not difficult at all', 'Somewhat difficult', 'Very difficult', 'Extremely difficult'],
		},
		{
			question: 'How often do you worry too much about different things?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question:
				'How often do you feel physical symptoms like racing heart, sweating, or shortness of breath when anxious?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question: 'How much does anxiety interfere with your daily activities?',
			options: ['Not at all', 'A little bit', 'Quite a bit', 'A lot'],
		},
	],
	[ConditionId.Depression]: [
		{
			question: 'How often do you have little interest or pleasure in doing things?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question: 'How often do you feel down, depressed, or hopeless?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question: 'How difficult is it for you to fall asleep, stay asleep, or sleeping too much?',
			options: ['Not difficult at all', 'Somewhat difficult', 'Very difficult', 'Extremely difficult'],
		},
		{
			question: 'How often do you feel tired or have little energy?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
		{
			question: 'How often do you have thoughts that you would be better off dead or of hurting yourself?',
			options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
		},
	],
	[ConditionId.Stress]: [
		{
			question: 'How often do you feel overwhelmed by daily tasks?',
			options: ['Never', 'Sometimes', 'Often', 'Always'],
		},
		{
			question: 'How difficult is it to cope with stress?',
			options: ['Not difficult', 'Somewhat', 'Very', 'Extremely'],
		},
		{
			question: 'How often do you feel irritable due to stress?',
			options: ['Never', 'Sometimes', 'Often', 'Always'],
		},
		{
			question: 'How much does stress affect your sleep?',
			options: ['Not at all', 'A little', 'Quite a bit', 'A lot'],
		},
		{
			question: 'How often do you experience physical tension?',
			options: ['Never', 'Sometimes', 'Often', 'Always'],
		},
	],
	[ConditionId.Bipolar]: [
		{
			question:
				"Have you experienced periods of feeling so 'high', energetic, or irritable that others thought you were not your normal self?",
			options: ['No, never', 'Yes, but rarely', 'Yes, occasionally', 'Yes, frequently'],
		},
		{
			question:
				'How often do you experience dramatic shifts between feeling elated and feeling deeply depressed?',
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: "During 'high' periods, how often do you need much less sleep than usual?",
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: "How often do you have periods where your thoughts race so fast you can't keep up with them?",
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question:
				'Have your mood swings caused significant problems in your work, social activities, or relationships?',
			options: ['No, never', 'Yes, but rarely', 'Yes, occasionally', 'Yes, frequently'],
		},
	],
	[ConditionId.ADHD]: [
		{
			question: 'How often do you have difficulty staying focused on tasks that require sustained mental effort?',
			options: ['Never', 'Rarely', 'Sometimes', 'Very often'],
		},
		{
			question: 'How often do you find yourself fidgeting or unable to sit still?',
			options: ['Never', 'Rarely', 'Sometimes', 'Very often'],
		},
		{
			question: 'How often do you feel restless or as if driven by a motor?',
			options: ['Never', 'Rarely', 'Sometimes', 'Very often'],
		},
		{
			question: 'How often do you make careless mistakes or have difficulty paying attention to details?',
			options: ['Never', 'Rarely', 'Sometimes', 'Very often'],
		},
		{
			question: 'How often do you interrupt others or have difficulty waiting your turn?',
			options: ['Never', 'Rarely', 'Sometimes', 'Very often'],
		},
	],
	[ConditionId.PTSD]: [
		{
			question:
				'Have you experienced or witnessed a traumatic event that involved actual or threatened death, serious injury, or sexual violence?',
			options: ['No', 'Yes, once', 'Yes, multiple times'],
		},
		{
			question: 'How often do you have unwanted, upsetting memories about a traumatic event?',
			options: ['Not at all', 'Once a week or less', 'Several times a week', 'Daily or almost daily'],
		},
		{
			question:
				'How often do you avoid external reminders of the traumatic event (people, places, conversations)?',
			options: ['Not at all', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: 'How much have your reactions to trauma affected your relationships or daily activities?',
			options: ['Not at all', 'Slightly', 'Moderately', 'Severely'],
		},
		{
			question: 'How often do you feel on guard, watchful, or easily startled?',
			options: ['Not at all', 'Rarely', 'Sometimes', 'Often'],
		},
	],
	[ConditionId.OCD]: [
		{
			question: 'How often do you have unwanted, intrusive thoughts that cause anxiety?',
			options: ['Never', 'Occasionally', 'Frequently', 'Constantly'],
		},
		{
			question:
				'How much time do you spend on repetitive behaviors or mental acts (like checking, counting, or cleaning)?',
			options: ['None', 'Less than 1 hour a day', '1-3 hours a day', 'More than 3 hours a day'],
		},
		{
			question: 'How much distress do you experience when unable to perform your rituals or compulsions?',
			options: ['None', 'Mild distress', 'Moderate distress', 'Severe distress'],
		},
		{
			question: 'How much do these obsessions or compulsions interfere with your normal routine?',
			options: ['Not at all', 'Slightly', 'Significantly', 'Extremely'],
		},
		{
			question: 'How often do you try to suppress or ignore obsessive thoughts?',
			options: ['Never', 'Occasionally', 'Frequently', 'Constantly'],
		},
	],
	[ConditionId.Insomnia]: [
		{
			question: 'How often do you have difficulty falling asleep?',
			options: ['Rarely or never', 'Sometimes', 'Often', 'Almost every night'],
		},
		{
			question: 'How often do you wake up during the night and have difficulty returning to sleep?',
			options: ['Rarely or never', 'Sometimes', 'Often', 'Almost every night'],
		},
		{
			question: 'How often do you wake up earlier than desired and are unable to fall back asleep?',
			options: ['Rarely or never', 'Sometimes', 'Often', 'Almost every night'],
		},
		{
			question: 'How satisfied are you with your current sleep pattern?',
			options: ['Very satisfied', 'Somewhat satisfied', 'Somewhat dissatisfied', 'Very dissatisfied'],
		},
		{
			question: 'How much does your sleep problem interfere with your daily functioning?',
			options: ['Not at all', 'A little', 'Quite a bit', 'Very much'],
		},
	],
	[ConditionId.Paranoia]: [
		{
			question: 'How often do you feel that people are trying to harm you or take advantage of you?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How often do you feel that you cannot trust others with information about yourself?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How often do you interpret neutral events as having personal significance?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How often do you feel like others are watching or talking about you?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How much do these suspicious thoughts affect your relationships or daily life?',
			options: ['Not at all', 'Slightly', 'Moderately', 'Severely'],
		},
	],
	[ConditionId.Addiction]: [
		{
			question: 'How often do you find that you use substances or engage in behaviors more than you intended?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How often have you wanted to cut down but found it difficult to do so?',
			options: ['Never', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question:
				'How much time do you spend obtaining, using, or recovering from the effects of substances or behaviors?',
			options: ['None', 'A little', 'Quite a bit', 'A lot'],
		},
		{
			question: 'Have you given up important activities because of your substance use or behaviors?',
			options: ['No', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question:
				'Do you continue to use substances or engage in behaviors despite knowing they cause physical or psychological problems?',
			options: ['No', 'Rarely', 'Sometimes', 'Often'],
		},
	],
	[ConditionId.EatingDisorders]: [
		{
			question: 'How often do you feel that food controls your life?',
			options: ['Never', 'Occasionally', 'Frequently', 'Always'],
		},
		{
			question: 'How often do you make yourself sick or use laxatives when you feel uncomfortably full?',
			options: ['Never', 'Occasionally', 'Frequently', 'Always'],
		},
		{
			question: 'How concerned are you about your weight or body shape?',
			options: ['Not concerned', 'Slightly concerned', 'Moderately concerned', 'Extremely concerned'],
		},
		{
			question: 'Have others expressed concern about your eating habits or weight?',
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: 'Do you experience guilt or shame about eating?',
			options: ['Never', 'Occasionally', 'Frequently', 'Always'],
		},
	],
	[ConditionId.Phobia]: [
		{
			question: 'Do you have an intense fear of a specific object, place, or situation?',
			options: ['No', "Yes, but it's mild", "Yes, it's moderate", "Yes, it's severe"],
		},
		{
			question: 'How often do you avoid situations because of your fear?',
			options: ['Never', 'Occasionally', 'Frequently', 'Always'],
		},
		{
			question: 'When exposed to your fear, how intense is your anxiety?',
			options: ['Not anxious', 'Mildly anxious', 'Moderately anxious', 'Severely anxious'],
		},
		{
			question: 'Do you recognize that your fear is excessive or unreasonable?',
			options: ['Yes, completely', 'Somewhat', 'Not really', 'Not at all'],
		},
		{
			question: 'How much does this fear interfere with your normal routine or relationships?',
			options: ['Not at all', 'Slightly', 'Moderately', 'Severely'],
		},
	],
	[ConditionId.Anger]: [
		{
			question: 'How often do you find yourself feeling angry?',
			options: ['Rarely', 'Occasionally', 'Frequently', 'Almost always'],
		},
		{
			question: 'How difficult is it for you to control your anger?',
			options: ['Not difficult', 'Somewhat difficult', 'Very difficult', 'Extremely difficult'],
		},
		{
			question: 'How often do you express your anger in destructive ways (yelling, breaking things)?',
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: 'Have others commented on your anger or suggested you get help?',
			options: ['Never', 'Rarely', 'Sometimes', 'Often'],
		},
		{
			question: 'How much has anger affected your relationships or daily life?',
			options: ['Not at all', 'Slightly', 'Moderately', 'Significantly'],
		},
	],
}

export const conditionPrompts: ConditionPrompt = {
	[ConditionId.Anxiety]: 'Coping strategies for managing anxiety',
	[ConditionId.Depression]: 'Strategies to manage depression symptoms',
	[ConditionId.Stress]: 'Techniques to reduce stress and resilience',
	[ConditionId.Bipolar]: 'Tools for managing bipolar mood swings',
	[ConditionId.ADHD]: 'Techniques for improving ADHD focus',
	[ConditionId.PTSD]: 'Coping mechanisms for PTSD symptoms',
	[ConditionId.OCD]: 'Strategies for reducing OCD behaviors',
	[ConditionId.Insomnia]: 'Habits for improving sleep quality',
	[ConditionId.Paranoia]: 'Approaches for managing paranoid thoughts',
	[ConditionId.Addiction]: 'Strategies for addiction recovery',
	[ConditionId.EatingDisorders]: 'Resources for healthier eating habits',
	[ConditionId.Phobia]: 'Techniques for overcoming specific phobias',
	[ConditionId.Anger]: 'Techniques for controlling anger issues',
}

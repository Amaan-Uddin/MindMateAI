import { ChatGroq } from '@langchain/groq'

export const model = new ChatGroq({
	model: process.env.MODEL_NAME!,
	temperature: 0,
})

export const fastModel = new ChatGroq({
	model: process.env.FAST_MODEL_NAME!,
	temperature: 0,
})

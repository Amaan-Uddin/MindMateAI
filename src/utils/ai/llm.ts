import { ChatGroq } from '@langchain/groq'

export const model = new ChatGroq({
	model: process.env.MODEL_NAME!,
	temperature: 0,
})

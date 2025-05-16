import { z } from 'zod'

export const signupSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters' })
		.regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const signupSchemaServer = z.object({
	name: z
		.string()
		.min(2)
		.regex(/^[a-zA-Z\s]+$/),
	email: z.string().email(),
	password: z.string().min(6),
})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export type SignupFormValues = z.infer<typeof signupSchema>
export type LoginFormValues = z.infer<typeof loginSchema>

import { z } from 'zod'
import validator from 'validator'

export const profileSchema = z.object({
	age: z.coerce.string().min(1, 'Age is required'),
	phoneNumber: z
		.string()
		.min(10, 'Must be a valid mobile number')
		.max(10, 'Must be a valid mobile number')
		.refine(validator.isMobilePhone),
	conditions: z.array(z.string()).min(1, 'Select at least one condition'),
	emergencyName: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters' })
		.regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces' }),
	emergencyNumber: z
		.string()
		.min(10, 'Must be a valid mobile number')
		.max(10, 'Must be a valid mobile number')
		.refine(validator.isMobilePhone),
})

export type ProfileFormValues = z.infer<typeof profileSchema>

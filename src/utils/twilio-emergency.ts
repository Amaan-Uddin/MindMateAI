// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from 'twilio'

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export async function twilioEmergencyMessage({ name, em_contact }: { name: string; em_contact: string }) {
	const message = await client.messages.create({
		body: `This is MindMate AI. ${name} may be at risk of self-harm. Please contact them immediately and consider sending emergency responders. Your support is critical right now.`,
		from: '+12792218445',
		to: em_contact,
	})

	return message.body
}

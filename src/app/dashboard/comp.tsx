import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function COmp() {
	const supabase = await createClient()
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()
	if (authError || !user) {
		redirect('/auth/login')
	}
	return (
		<>
			<p>Hello {user?.user_metadata.name}</p>
			<Link href={`/chat`}>Chat</Link>
		</>
	)
}

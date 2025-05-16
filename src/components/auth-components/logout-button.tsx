import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth-actions'

export function LogoutButton() {
	return (
		<form action={logout}>
			<Button>Logout</Button>
		</form>
	)
}

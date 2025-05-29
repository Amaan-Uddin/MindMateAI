import { Button } from '@/components/ui/button'
import { logout } from '@/actions/auth-actions'

export function LogoutButton({ className, handleClick }: { className?: string; handleClick?: () => void }) {
	return (
		<form action={logout}>
			<Button onClick={handleClick} className={className}>
				Logout
			</Button>
		</form>
	)
}

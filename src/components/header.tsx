import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from './ui/button'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from './auth-components/logout-button'
import { NavLinks } from './nav-links'

export default async function Header() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<header className="py-4">
			<nav className="container flex items-center justify-between">
				<div className="flex gap-10 sm:gap-20 items-baseline">
					<Link href="/" className="text-3xl font-bold">
						MindMate
					</Link>
					{user !== null ? <NavLinks /> : null}
				</div>
				<div className="flex items-center justify-between gap-6">
					<ThemeToggle />
					{user !== null ? (
						<>
							<Link href={'/profile'}>
								<Button variant="outline">Profile</Button>
							</Link>
							<LogoutButton />
						</>
					) : (
						<Link href={'/auth/login'}>
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</nav>
		</header>
	)
}

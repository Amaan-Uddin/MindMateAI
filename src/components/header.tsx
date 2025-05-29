import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { LogoutButton } from './auth-components/logout-button'
import { NavLinks } from './nav-links'
import { MobileNav } from './mobile-nav'

export async function Header() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<header className="py-4  bg-secondary md:bg-transparent relative">
			<nav className="container mx-auto px-7 flex items-center justify-between">
				<div className="flex gap-10 items-baseline">
					<Link href="/" className="text-3xl font-bold">
						MindMate
					</Link>
					{user !== null ? <NavLinks className="md:flex hidden" /> : null}
				</div>
				<div className="md:flex items-center justify-between gap-6 hidden">
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
				<div className="md:hidden">
					<MobileNav />
				</div>
			</nav>
		</header>
	)
}

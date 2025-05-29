'use client'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import { Menu, X } from 'lucide-react'

import { NavLinks } from './nav-links'
import { LogoutButton } from './auth-components/logout-button'

export function MobileNav() {
	const [open, setOpen] = useState(false)
	function handleClick() {
		setOpen(false)
	}
	return (
		<div className="flex flex-col">
			<div className="flex gap-2 z-10">
				<ThemeToggle />
				<Button variant={'outline'} onClick={() => setOpen(!open)}>
					{open ? <X /> : <Menu />}
				</Button>
			</div>
			<div
				className={cn(
					'fixed inset-0 translate-y-[68px] z-[5] bg-black pointer-events-auto',
					open ? 'opacity-30 h-screen' : 'opacity-0 h-0'
				)}
				onClick={() => setOpen(false)}
			></div>
			<div
				className={cn(
					'absolute inset-0 bg-secondary h-fit px-7 mx-auto z-[9]',
					open ? 'translate-y-[68px]' : 'translate-y-[-332px]'
				)}
			>
				<NavLinks className="pb-4" handleClick={handleClick} />
				<hr />
				<div className="flex flex-col gap-3 px-2 pb-6 pt-4">
					<Link href={'/profile'}>
						<Button variant="outline" className="w-1/4" onClick={handleClick}>
							Profile
						</Button>
					</Link>
					<LogoutButton className="w-1/4" handleClick={handleClick} />
				</div>
			</div>
		</div>
	)
}

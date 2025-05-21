'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'

export function NavLinks() {
	const pathname = usePathname()

	return (
		<ul className="flex gap-5 text-sm font-medium">
			<li>
				<Link href="/dashboard">
					<Button
						variant="link"
						className={cn(
							'text-accent-foreground decoration-primary',
							pathname.startsWith('/dashboard') ? 'underline decoration-primary' : ''
						)}
					>
						Dashboard
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/chat">
					<Button
						variant="link"
						className={cn(
							'text-accent-foreground decoration-primary',
							pathname.startsWith('/chat') ? 'underline decoration-primary' : ''
						)}
					>
						AI Chat
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/mental-hub">
					<Button
						variant="link"
						className={cn(
							'text-accent-foreground decoration-primary',
							pathname.startsWith('/mental-hub') ? 'underline decoration-primary' : ''
						)}
					>
						Mental Hub
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/wellness-library">
					<Button
						variant="link"
						className={cn(
							'text-accent-foreground decoration-primary',
							pathname.startsWith('/wellness-library') ? 'underline decoration-primary' : ''
						)}
					>
						Wellness Library
					</Button>
				</Link>
			</li>
		</ul>
	)
}

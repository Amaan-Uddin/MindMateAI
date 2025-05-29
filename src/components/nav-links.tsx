'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function NavLinks({ className, handleClick }: { className?: string; handleClick?: () => void }) {
	const pathname = usePathname()

	return (
		<ul className={`gap-5 text-sm font-medium ${className}`}>
			<li>
				<Link href="/dashboard">
					<Button
						onClick={handleClick}
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
						onClick={handleClick}
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
						onClick={handleClick}
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
						onClick={handleClick}
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

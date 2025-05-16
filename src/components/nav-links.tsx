'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/button'
import clsx from 'clsx'

export function NavLinks() {
	const pathname = usePathname()

	return (
		<ul className="flex gap-5 text-sm font-medium">
			<li>
				<Link href="/dashboard">
					<Button
						variant="link"
						className={clsx({
							'text-primary underline': pathname.startsWith('/dashboard'),
						})}
					>
						Dashboard
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/chat">
					<Button
						variant="link"
						className={clsx({
							'text-primary underline': pathname.startsWith('/chat'),
						})}
					>
						AI Chat
					</Button>
				</Link>
			</li>
			<li>
				<Link href="/mental-hub">
					<Button
						variant="link"
						className={clsx({
							'text-primary underline': pathname.startsWith('/mental-hub'),
						})}
					>
						Mental Hub
					</Button>
				</Link>
			</li>
		</ul>
	)
}

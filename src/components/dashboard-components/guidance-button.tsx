'use client'
import Link from 'next/link'
import { JSX, useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'

/**
 * GuidanceButton - lets user hover over and select which page they would like to navigate to.
 *
 * @returns {JSX.Element} Guidance drowpdown menu button
 */
export function GuidanceButton(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<DropdownMenu open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal={false}>
			<DropdownMenuTrigger asChild>
				<Button onMouseEnter={() => setIsOpen(true)} className="p-5">
					Get Guidance
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				onMouseLeave={() => setIsOpen(false)}
				onCloseAutoFocus={(e) => {
					e.preventDefault()
				}}
			>
				<Link href={'/mental-hub'}>
					<DropdownMenuItem>Mental Hub</DropdownMenuItem>
				</Link>
				<Link href={'/wellness-library'}>
					<DropdownMenuItem>Wellness Library</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

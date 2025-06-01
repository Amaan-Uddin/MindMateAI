'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarClose } from 'lucide-react'

import { useCreateThread } from '@/hooks/useCreateThread'

interface Props {
	children: React.ReactNode
}

export function PageSidebar({ children }: Props) {
	const [open, setOpen] = useState(false)
	const { isLoading, handleCreateThread } = useCreateThread()
	return (
		<div>
			<div
				className={cn(
					'absolute inset-0 translate-y-[-24px] w-64 border-r h-full p-4 z-[8] bg-background',
					open ? 'translate-x-[0px] opacity-100' : 'translate-x-[-256px] opacity-0'
				)}
			>
				<div className="flex gap-2 w-full">
					<Button className="w-3/4 mb-4" variant="outline" onClick={handleCreateThread} disabled={isLoading}>
						{isLoading ? 'Creating New Chat' : 'New Chat'}
					</Button>
					<Button onClick={() => setOpen(false)} className="w-1/4" variant={'outline'}>
						<SidebarClose />
					</Button>
				</div>
				{children}
			</div>
			<div
				className={cn(
					'fixed inset-0 translate-y-[68px] z-[5] bg-black pointer-events-auto',
					open ? 'opacity-30 h-screen' : 'opacity-0 h-0'
				)}
				onClick={() => setOpen(false)}
			></div>
			<div className="p-4 absolute translate-y-[-24px] z-[7]">
				<Button onClick={() => setOpen(true)} variant={'outline'}>
					<Sidebar />
				</Button>
			</div>
		</div>
	)
}

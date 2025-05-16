import { ScrollArea } from '@/components/ui/scroll-area'

export function SidebarSkeleton() {
	return (
		<div>
			<h2 className="text-lg font-medium mb-4">Past Conversations</h2>
			<ScrollArea className="h-[calc(100vh-160px)] pr-2 space-y-2">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="flex justify-between items-center py-1.5 rounded hover:bg-muted/40">
						<div className="flex flex-col w-full text-left space-y-1 truncate">
							<div className="h-5 bg-muted rounded w-3/4" />
						</div>
						<div>
							<div className="h-5 w-6 bg-muted rounded" />
						</div>
					</div>
				))}
			</ScrollArea>
		</div>
	)
}

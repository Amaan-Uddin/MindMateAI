import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatSkeleton() {
	return (
		<div className="flex flex-col h-[calc(100vh-4rem)] w-full max-w-3xl mx-auto">
			{/* Scroll Area */}
			<ScrollArea className="flex-1 p-4 overflow-y-auto">
				<div className="w-full h-full">
					<div className="w-full h-[400px] bg-muted animate-pulse rounded-lg" />
				</div>
			</ScrollArea>

			{/* Input Area */}
			<div className="sticky bottom-[50px] bg-background border-t px-4 pt-2 pb-4">
				<form className="flex gap-2 max-w-3xl mx-auto w-full">
					<div className="flex-1 h-10 bg-muted animate-pulse rounded-md" />
					<div className="h-10 w-16 animate-pulse bg-muted text-muted rounded-md"></div>
				</form>
			</div>
		</div>
	)
}

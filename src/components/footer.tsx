export function Footer() {
	return (
		<footer className="py-4">
			<div className="container flex flex-col items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted-foreground sm:flex-row">
				<p>MindMate.ai &copy;{new Date().getFullYear()}. All rights reserved.</p>
			</div>
		</footer>
	)
}

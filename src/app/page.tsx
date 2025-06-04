import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br dark:from-background dark:to-background px-4 mt-5">
			<div className="max-w-3xl w-full text-center">
				<h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Welcome to MindMate AI</h1>
				<p className="text-xl md:text-2xl text-muted-foreground mb-8">
					A safe space to talk, reflect, and receive compassionate support
				</p>

				<Card className="mb-8">
					<CardContent className="p-5">
						<p className="text-muted-foreground mb-6">
							MindMate AI provides a judgment-free environment where you can openly discuss your thoughts,
							feelings, and challenges. Our AI companion listens attentively and responds with empathy,
							offering perspective and support when you need it most.
						</p>

						<div className="flex flex-col md:flex-row gap-4 justify-center">
							<Link href="/auth/sign-up">
								<Button className="px-8 py-3" size="lg">
									Get Started
								</Button>
							</Link>

							<Link href="/about">
								<Button variant="outline" className="px-8 py-3" size="lg">
									Learn More
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				<p className="text-sm text-muted-foreground">
					MindMate AI is not a replacement for professional mental health services. If you&apos;re
					experiencing a crisis, please contact emergency services or a mental health professional.
				</p>
			</div>
		</div>
	)
}

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br dark:from-background dark:to-background p-4">
			<Card className="max-w-3xl w-full">
				<CardContent className="p-8">
					<h1 className="text-3xl font-bold text-primary mb-6">About MindMate AI</h1>

					<section className="mb-8">
						<h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
							Why We Built MindMate AI
						</h2>
						<p className="text-muted-foreground mb-4">
							Sometimes life feels heavy, and it’s not easy to find someone to talk to. We made MindMate
							AI to give you a space where you can share your thoughts and feelings without judgment. Our
							goal is simple: to listen, to support, and to remind you that you are not alone.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
							How MindMate AI Helps You
						</h2>
						<p className="text-muted-foreground mb-4">
							MindMate AI is powered by smart technology using GROQ APIs and the Llama AI models. It
							understands your feelings and talks to you with kindness. You can also explore our Wellness
							Library — full of easy exercises, calming activities, and helpful articles made to lift your
							mood.
						</p>
						<p className="text-muted-foreground">
							If you ever feel you need real help, we make it easy for you to connect with professional
							therapists. Everything is here to support your journey, one small step at a time.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
							Your Privacy Matters
						</h2>
						<p className="text-muted-foreground">
							We know how important your privacy is. That’s why we use Supabase to keep your data safe and
							secure. Your conversations stay private. We never share your information without your
							permission.
						</p>
					</section>

					<div className="text-center mt-8">
						<Link href="/">
							<Button className=" px-6 py-2" size="lg">
								Return to Home
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

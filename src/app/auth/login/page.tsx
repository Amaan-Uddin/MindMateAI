import { LoginForm } from '@/components/auth-components/login-form'

export default async function Page({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
	const { message } = await searchParams

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm ErrorMessage={message} />
			</div>
		</div>
	)
}

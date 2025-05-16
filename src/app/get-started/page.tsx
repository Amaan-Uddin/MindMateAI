import { OnboardingForm } from '@/components/onboarding-components/onboarding'

export default function Page() {
	return (
		<div className="flex min-h-svh w-full justify-center p-6 md:p-10">
			<div className="w-full max-w-2xl">
				<OnboardingForm />
			</div>
		</div>
	)
}

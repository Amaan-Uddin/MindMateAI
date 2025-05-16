import { Suspense } from 'react'
import COmp from './comp'

export default async function DashboardPage() {
	return (
		<div className="flex w-full items-center justify-center gap-2">
			<h1>Dashboard</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<COmp />
			</Suspense>
		</div>
	)
}

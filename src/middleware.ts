import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
	// Update the session first to ensure cookies are properly managed
	const response = await updateSession(request)

	// Only proceed with auth checks for protected routes
	if (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname === '/') {
		// Create Supabase client
		const supabase = await createClient()

		// Check if user is authenticated
		const {
			data: { user },
		} = await supabase.auth.getUser()

		// If authenticated, redirect away from auth pages
		if (user) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		}
	}

	// Return the response from updateSession for non-auth routes
	// or for unauthenticated users on auth routes
	return response
}

export const config = {
	matcher: [
		// Match auth routes for redirection
		'/auth/:path*',

		// Match all routes that should have session management
		// but exclude static files and assets
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}

import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip locale handling for admin and API routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        // Handle admin authentication
        if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
            const token = request.cookies.get('admin_session')?.value;

            if (!token) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            const session = await verifySession(token);

            if (!session) {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        }

        // Redirect logged-in users away from login page
        if (pathname === '/admin/login') {
            const token = request.cookies.get('admin_session')?.value;

            if (token) {
                const session = await verifySession(token);
                if (session) {
                    return NextResponse.redirect(new URL('/admin', request.url));
                }
            }
        }

        return NextResponse.next();
    }

    // Handle internationalization for all other routes
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Match all paths except static files and api
        '/((?!_next|.*\\..*).*)',
    ],
};

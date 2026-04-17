import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession, verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { error: 'Password is required' },
                { status: 400 }
            )
        }

        if (!verifyPassword(password)) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Create session token
        const session = await createSession()

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set('admin_session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        )
    }
}

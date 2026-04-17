import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// SECURITY: Fail fast if JWT_SECRET is not set - never use a default
const secretKey = process.env.JWT_SECRET
if (!secretKey) {
    console.error('CRITICAL: JWT_SECRET environment variable must be set')
}
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null

export interface SessionPayload {
    isAdmin: boolean
    expiresAt: Date
}

export async function createSession(): Promise<string> {
    if (!encodedKey) {
        throw new Error('JWT_SECRET is not configured')
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    const session = await new SignJWT({ isAdmin: true, expiresAt })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)

    return session
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
    if (!encodedKey) {
        return null
    }

    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as unknown as SessionPayload
    } catch {
        return null
    }
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token) return null

    return verifySession(token)
}

export function verifyPassword(password: string): boolean {
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
        console.error('ADMIN_PASSWORD not set in environment')
        return false
    }
    return password === adminPassword
}


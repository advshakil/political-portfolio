import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Opinion from '@/models/Opinion'
import { getSession } from '@/lib/auth'

// SECURITY: Escape special regex characters to prevent ReDoS attacks
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await dbConnect()

        // Parse request body
        const body = await request.json()
        const { name, message } = body

        // Validate required fields
        if (!name || !message) {
            return NextResponse.json(
                { error: 'Name and message are required' },
                { status: 400 }
            )
        }

        // SECURITY: Input length validation
        if (typeof name !== 'string' || name.length > 100) {
            return NextResponse.json(
                { error: 'Name must be 100 characters or less' },
                { status: 400 }
            )
        }

        if (typeof message !== 'string' || message.length > 5000) {
            return NextResponse.json(
                { error: 'Message must be 5000 characters or less' },
                { status: 400 }
            )
        }

        // Get IP address and user agent for tracking
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        // Create new opinion
        const opinion = await Opinion.create({
            name: name.trim(),
            message: message.trim(),
            ipAddress,
            userAgent,
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Opinion submitted successfully',
                data: {
                    id: opinion._id,
                    createdAt: opinion.createdAt,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error saving opinion:', error)
        return NextResponse.json(
            { error: 'Failed to save opinion. Please try again.' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        // SECURITY: Require admin authentication for viewing opinions
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            )
        }

        await dbConnect()

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const search = searchParams.get('search') || ''
        const dateFrom = searchParams.get('from') || ''
        const dateTo = searchParams.get('to') || ''

        const skip = (page - 1) * limit

        // Build query
        const query: Record<string, unknown> = {}
        if (search) {
            // SECURITY: Escape regex to prevent ReDoS attacks
            const escapedSearch = escapeRegex(search)
            query.$or = [
                { name: { $regex: escapedSearch, $options: 'i' } },
                { message: { $regex: escapedSearch, $options: 'i' } },
            ]
        }

        // Date range filter
        if (dateFrom || dateTo) {
            query.createdAt = {}
            if (dateFrom) {
                (query.createdAt as Record<string, Date>).$gte = new Date(dateFrom)
            }
            if (dateTo) {
                const toDate = new Date(dateTo)
                toDate.setHours(23, 59, 59, 999)
                    ; (query.createdAt as Record<string, Date>).$lte = toDate
            }
        }

        const [opinions, total] = await Promise.all([
            Opinion.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('-userAgent')
                .lean(),
            Opinion.countDocuments(query),
        ])

        return NextResponse.json({
            success: true,
            data: opinions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching opinions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch opinions' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // SECURITY: Require admin authentication for deleting opinions
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            )
        }

        await dbConnect()

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Opinion ID is required' },
                { status: 400 }
            )
        }

        const result = await Opinion.findByIdAndDelete(id)

        if (!result) {
            return NextResponse.json(
                { error: 'Opinion not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Opinion deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting opinion:', error)
        return NextResponse.json(
            { error: 'Failed to delete opinion' },
            { status: 500 }
        )
    }
}

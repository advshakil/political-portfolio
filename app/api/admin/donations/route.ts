import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Donation from '@/models/Donation'
import { getSession } from '@/lib/auth'

// SECURITY: Escape special regex characters to prevent ReDoS attacks
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function GET(request: NextRequest) {
    try {
        // SECURITY: Require admin authentication for viewing donations
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
        const status = searchParams.get('status') || ''
        const dateFrom = searchParams.get('from') || ''
        const dateTo = searchParams.get('to') || ''

        const skip = (page - 1) * limit

        // Build query
        const query: Record<string, unknown> = {}

        if (search) {
            // SECURITY: Escape regex to prevent ReDoS attacks
            const escapedSearch = escapeRegex(search)
            query.$or = [
                { donorName: { $regex: escapedSearch, $options: 'i' } },
                { email: { $regex: escapedSearch, $options: 'i' } },
                { invoiceId: { $regex: escapedSearch, $options: 'i' } },
                { transactionId: { $regex: escapedSearch, $options: 'i' } },
            ]
        }

        if (status && status !== 'all') {
            query.status = status
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

        const [donations, total, stats] = await Promise.all([
            Donation.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Donation.countDocuments(query),
            // Get stats
            Donation.aggregate([
                {
                    $facet: {
                        totalAmount: [
                            { $match: { status: 'completed' } },
                            { $group: { _id: null, total: { $sum: '$amount' } } },
                        ],
                        totalCount: [{ $count: 'count' }],
                        completedCount: [
                            { $match: { status: 'completed' } },
                            { $count: 'count' },
                        ],
                        todayCount: [
                            {
                                $match: {
                                    createdAt: {
                                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                    },
                                },
                            },
                            { $count: 'count' },
                        ],
                        thisWeekCount: [
                            {
                                $match: {
                                    createdAt: {
                                        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                                    },
                                },
                            },
                            { $count: 'count' },
                        ],
                    },
                },
            ]),
        ])

        const statsData = stats[0]

        return NextResponse.json({
            success: true,
            data: donations,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            stats: {
                totalAmount: statsData.totalAmount[0]?.total || 0,
                totalCount: statsData.totalCount[0]?.count || 0,
                completedCount: statsData.completedCount[0]?.count || 0,
                todayCount: statsData.todayCount[0]?.count || 0,
                thisWeekCount: statsData.thisWeekCount[0]?.count || 0,
            },
        })
    } catch (error) {
        console.error('Error fetching donations:', error)
        return NextResponse.json(
            { error: 'Failed to fetch donations' },
            { status: 500 }
        )
    }
}

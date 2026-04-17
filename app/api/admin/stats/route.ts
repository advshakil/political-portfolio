import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Opinion from '@/models/Opinion'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        // SECURITY: Require admin authentication for viewing stats
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 401 }
            )
        }

        await dbConnect()

        const now = new Date()
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

        const [total, today, thisWeek] = await Promise.all([
            Opinion.countDocuments(),
            Opinion.countDocuments({ createdAt: { $gte: todayStart } }),
            Opinion.countDocuments({ createdAt: { $gte: weekStart } }),
        ])

        // Get recent 5 opinions
        const recent = await Opinion.find()
            .select('name message createdAt')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean()

        return NextResponse.json({
            total,
            today,
            thisWeek,
            recent,
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        )
    }
}

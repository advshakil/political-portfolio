import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const videos = await Video.find({}).sort({ createdAt: -1 })
        return NextResponse.json({ success: true, count: videos.length, data: videos })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { youtubeId, title, titleBn } = await request.json()
        
        if (!youtubeId || !title || !titleBn) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
        }

        await dbConnect()
        const video = await Video.create({ youtubeId, title, titleBn })
        
        return NextResponse.json({ success: true, data: video })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to add video' }, { status: 500 })
    }
}

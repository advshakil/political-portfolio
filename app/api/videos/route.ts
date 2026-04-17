import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video'

export async function GET() {
    try {
        await dbConnect()
        const videos = await Video.find({ isActive: true })
        return NextResponse.json({ success: true, count: videos.length, data: videos })
    } catch (error) {
        console.error('Fetch videos error:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch videos' }, { status: 500 })
    }
}

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Video from '@/models/Video'
import { getSession } from '@/lib/auth'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession()
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        await dbConnect()
        const deleted = await Video.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
    }
}

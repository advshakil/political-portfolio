import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Opinion from '@/models/Opinion'

export async function GET() {
    try {
        await dbConnect()

        const opinions = await Opinion.find()
            .select('name message ipAddress createdAt')
            .sort({ createdAt: -1 })
            .lean()

        // Convert to CSV
        const headers = ['Name', 'Message', 'IP Address', 'Date']
        const rows = opinions.map((op) => [
            `"${(op.name || 'Anonymous').replace(/"/g, '""')}"`,
            `"${(op.message || '').replace(/"/g, '""')}"`,
            `"${op.ipAddress || 'N/A'}"`,
            `"${new Date(op.createdAt).toLocaleString('en-US')}"`,
        ])

        const csv = [
            headers.join(','),
            ...rows.map((row) => row.join(',')),
        ].join('\n')

        // Add BOM for proper UTF-8 encoding in Excel
        const bom = '\uFEFF'
        const csvWithBom = bom + csv

        return new NextResponse(csvWithBom, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="opinions-${new Date().toISOString().split('T')[0]}.csv"`,
            },
        })
    } catch (error) {
        console.error('Export error:', error)
        return NextResponse.json(
            { error: 'Failed to export opinions' },
            { status: 500 }
        )
    }
}

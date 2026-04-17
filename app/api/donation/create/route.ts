import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Donation from '@/models/Donation'

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const body = await request.json()
        const { donorName, email, amount, paymentReference } = body

        // Validate required fields
        if (!donorName || !email || !amount) {
            return NextResponse.json(
                { error: 'Donor name, email, and amount are required' },
                { status: 400 }
            )
        }

        // Validate amount
        const numAmount = parseFloat(amount)
        if (isNaN(numAmount) || numAmount < 10) {
            return NextResponse.json(
                { error: 'Minimum donation amount is ৳10' },
                { status: 400 }
            )
        }

        // Generate a unique reference ID
        const referenceId = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

        // Create pending donation record (manual donation)
        const donation = await Donation.create({
            donorName: donorName.trim(),
            email: email.trim().toLowerCase(),
            amount: numAmount,
            invoiceId: referenceId,
            paymentReference: paymentReference?.trim() || null,
            status: 'pending',
        })

        return NextResponse.json({
            success: true,
            referenceId: referenceId,
            donationId: donation._id.toString(),
            message: 'Donation registered successfully. Please complete the payment using the provided details.',
        })
    } catch (error) {
        console.error('Error creating donation:', error)
        return NextResponse.json(
            { error: 'Failed to create donation. Please try again.' },
            { status: 500 }
        )
    }
}

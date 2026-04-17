import mongoose from 'mongoose'

export interface IDonation {
    _id: mongoose.Types.ObjectId
    donorName: string
    email: string
    amount: number
    invoiceId?: string
    transactionId?: string
    paymentReference?: string
    status: 'pending' | 'completed' | 'cancelled' | 'failed'
    paymentMethod?: string
    senderNumber?: string
    metadata?: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
}

const donationSchema = new mongoose.Schema(
    {
        donorName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 10,
        },
        invoiceId: {
            type: String,
            required: false,
            unique: false,
            index: true,
        },
        transactionId: {
            type: String,
            default: null,
        },
        paymentReference: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled', 'failed'],
            default: 'pending',
            index: true,
        },
        paymentMethod: {
            type: String,
            default: null,
        },
        senderNumber: {
            type: String,
            default: null,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
)

// Index for efficient queries
donationSchema.index({ createdAt: -1 })
donationSchema.index({ status: 1, createdAt: -1 })

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', donationSchema)

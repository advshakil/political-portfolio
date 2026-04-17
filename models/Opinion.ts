import mongoose from 'mongoose'

const opinionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        ipAddress: {
            type: String,
            default: null,
        },
        userAgent: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

// Index for faster queries
opinionSchema.index({ createdAt: -1 })

export default mongoose.models.Opinion || mongoose.model('Opinion', opinionSchema)

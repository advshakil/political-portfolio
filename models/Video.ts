import mongoose, { Schema, Document } from 'mongoose'

export interface IVideo extends Document {
    youtubeId: string
    title: string
    titleBn: string
    isActive: boolean
    createdAt: Date
}

const VideoSchema: Schema = new Schema({
    youtubeId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    titleBn: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema)

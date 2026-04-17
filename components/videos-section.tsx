"use client"

import { useLocale } from "next-intl"
import { Play, Eye, ThumbsUp, Loader2 } from "lucide-react"
import { useEffect, useState, useMemo } from "react"

interface VideoData {
    youtubeId: string
    title: string
    titleBn: string
}

export function VideosSection() {
    const locale = useLocale()
    const [videos, setVideos] = useState<VideoData[]>([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)

    // Default video in case API fails or is empty
    const defaultVideo = {
        youtubeId: "tmd1v6GigeU",
        title: "Campaign Message",
        titleBn: "প্রচারণা বার্তা"
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch('/api/videos')
                const data = await res.json()
                if (data.success && data.data.length > 0) {
                    setVideos(data.data)
                    // Pick a random index
                    setCurrentIndex(Math.floor(Math.random() * data.data.length))
                } else {
                    setVideos([defaultVideo])
                    setCurrentIndex(0)
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error)
                setVideos([defaultVideo])
                setCurrentIndex(0)
            } finally {
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    const activeVideo = useMemo(() => {
        if (currentIndex === null || !videos[currentIndex]) return defaultVideo
        return videos[currentIndex]
    }, [currentIndex, videos])

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-white">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 right-[10%] w-64 h-64 bg-[#006A4E]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-[5%] w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#006A4E]/10 text-[#006A4E] rounded-full">
                            <Play className="w-4 h-4" fill="currentColor" />
                            <span className="text-sm font-semibold">
                                {locale === "bn" ? "ভিডিও মেসেজ" : "Video Message"}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            {locale === "bn" ? (
                                <>আমাদের<br /><span className="text-[#006A4E]">দৃষ্টিভঙ্গি</span></>
                            ) : (
                                <>Our<br /><span className="text-[#006A4E]">Vision</span></>
                            )}
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                            {locale === "bn"
                                ? "একটি উন্নত ভবিষ্যতের জন্য আমাদের পরিকল্পনা ও প্রতিশ্রুতি জানুন। আপনার এলাকার উন্নয়নে আমরা প্রতিশ্রুতিবদ্ধ।"
                                : "Learn about our plans and commitments for a better future. We are committed to the development of your area."}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Eye className="w-5 h-5 text-[#006A4E]" />
                                <span className="font-semibold">
                                    {locale === "bn" ? "৫.২ হাজার ভিউ" : "5.2K Views"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <ThumbsUp className="w-5 h-5 text-accent" />
                                <span className="font-semibold">
                                    {locale === "bn" ? "৩২১ লাইক" : "321 Likes"}
                                </span>
                            </div>
                        </div>

                        {/* Decorative line */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-1 w-16 bg-[#006A4E] rounded-full" />
                            <div className="h-1 w-8 bg-accent rounded-full" />
                            <div className="h-1 w-4 bg-gray-300 rounded-full" />
                        </div>
                    </div>

                    {/* Right Column - Video */}
                    <div className="relative group">
                        {/* Decorative frame */}
                        <div className="absolute -inset-3 bg-gradient-to-br from-[#006A4E] to-accent rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

                        {/* Main video container */}
                        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl min-h-[300px] flex flex-col">
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center bg-gray-900 aspect-video">
                                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                                </div>
                            ) : (
                                <div className="relative aspect-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
                                        title={locale === "bn" ? activeVideo.titleBn : activeVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            )}

                            {/* Bottom bar */}
                            <div className="bg-gradient-to-r from-[#006A4E] to-[#005540] p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white" fill="white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">
                                                {loading ? "..." : (locale === "bn" ? activeVideo.titleBn : activeVideo.title)}
                                            </h3>
                                            <p className="text-white/60 text-xs">
                                                {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "Advocate Shakil Ahmad"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-white text-xs font-semibold">
                                            {locale === "bn" ? "নতুন" : "New"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

"use client"

import dynamic from "next/dynamic"
import { GSAPProvider } from "@/lib/gsap-provider"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OpinionForm } from "@/components/opinion-form"
import { Footer } from "@/components/footer"
import { CandidateProfile } from "@/components/candidate-profile"

// Lazy load below-the-fold components for better performance
const VideosSection = dynamic(() => import("@/components/videos-section").then(mod => ({ default: mod.VideosSection })), {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
})

const CommunityStats = dynamic(() => import("@/components/community-stats").then(mod => ({ default: mod.CommunityStats })), {
    loading: () => <div className="h-64 bg-gray-100 animate-pulse" />
})

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => ({ default: mod.AboutSection })), {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
})

const PhotoGallery = dynamic(() => import("@/components/photo-gallery").then(mod => ({ default: mod.PhotoGallery })), {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
})

const FocusAreas = dynamic(() => import("@/components/focus-areas").then(mod => ({ default: mod.FocusAreas })), {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
})

export default function Home() {
    return (
        <GSAPProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <HeroSection />
                    <OpinionForm />
                    <VideosSection />
                    <CommunityStats />
                    <CandidateProfile />
                    <AboutSection />
                    <PhotoGallery />
                    <FocusAreas />
                </main>
                <Footer />
            </div>
        </GSAPProvider>
    )
}

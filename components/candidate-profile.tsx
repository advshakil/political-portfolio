"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import { useGSAP } from "@/lib/gsap-provider"
import { Scale, Award, Users, MapPin } from "lucide-react"

export function CandidateProfile() {
    const locale = useLocale()
    const { gsap, isReady } = useGSAP()
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!isReady || !sectionRef.current) return

        gsap.fromTo(
            sectionRef.current.querySelectorAll('.animate-item'),
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        )
    }, [isReady, gsap])

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-12 animate-item">
                    <span className="inline-block px-4 py-2 bg-[#006A4E]/10 text-[#006A4E] rounded-full text-sm font-semibold mb-4">
                        {locale === "bn" ? "নেতৃত্বের পরিচিতি" : "Meet The Leader"}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        {locale === "bn" ? "জনতার জননেতা" : "Voice of the People"}
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

                    {/* Left - Main Image Card */}
                    <div className="animate-item relative">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent via-red-600 to-rose-700 min-h-[550px] lg:min-h-[650px] shadow-2xl">

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#006A4E] rounded-bl-[100px]" />

                            {/* Name at top */}
                            <div className="absolute top-24 left-6 right-6 z-20">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                                    {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "Advocate Shakil Ahmad"}
                                </h2>
                                <p className="text-white/80 text-lg mt-2">
                                    {locale === "bn" ? "সুপ্রীম কোর্ট আইনজীবী" : "Supreme Court Lawyer"}
                                </p>
                            </div>

                            {/* Main Image */}
                            <div className="absolute bottom-0 left-0 right-0 h-[70%]">
                                <Image
                                    src="/portfolio.png"
                                    alt="Shakil Ahmad"
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />
                            </div>

                            {/* Bottom Badge */}
                            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-[#006A4E] font-black text-sm">NCP</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">
                                            {locale === "bn" ? "মেহেরপুর-২" : "Meherpur-2"}
                                        </p>
                                        <p className="text-white/70 text-sm">
                                            {locale === "bn" ? "গাংনী উপজেলা" : "Gangni Upazila"}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <p className="text-white font-bold text-2xl">২০২৫</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col gap-6">

                        {/* Top Row - Two Images */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Image 2 */}
                            <div className="animate-item relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] ring-4 ring-orange-400 ring-offset-2 shadow-xl">
                                <Image
                                    src="/activity/09.jpeg"
                                    alt="Activity Photo 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 3 */}
                            <div className="animate-item relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] ring-4 ring-[#006A4E] ring-offset-2 shadow-xl">
                                <Image
                                    src="/activity/01.jpeg"
                                    alt="Activity Photo 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="animate-item bg-gray-50 rounded-2xl p-6 lg:p-8 flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {locale === "bn" ? "নেতৃত্ব সম্পর্কে" : "About The Leader"}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-[#006A4E]/10 rounded-lg flex items-center justify-center shrink-0">
                                        <Scale className="w-5 h-5 text-[#006A4E]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {locale === "bn" ? "অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট" : "Advocate, Supreme Court of Bangladesh"}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {locale === "bn" ? "দীর্ঘদিন আইন পেশায় সম্মানজনক অবদান" : "Honorable contribution in legal profession"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                                        <Award className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {locale === "bn" ? "কেন্দ্রীয় যুগ্ম মুখ্য-সমন্বয়ক, এনসিপি" : "Central Joint Chief Coordinator, NCP"}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {locale === "bn" ? "জাতীয় নাগরিক পার্টির কেন্দ্রীয় নেতৃত্ব" : "Central leadership of National Citizens Party"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {locale === "bn" ? "স্পেশাল পাবলিক প্রসিকিউটর" : "Special Public Prosecutor"}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {locale === "bn" ? "সহকারী অ্যাটর্নি জেনারেল পদমর্যাদার" : "Assistant Attorney General rank"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {locale === "bn" ? "মেহেরপুর-২ (গাংনী) আসন" : "Meherpur-2 (Gangni) Constituency"}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {locale === "bn" ? "এলাকার মানুষের সেবায় নিবেদিতপ্রাণ" : "Dedicated to serving the people of the area"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <blockquote className="text-gray-700 italic text-lg">
                                    "{locale === "bn"
                                        ? "ন্যায়বিচার ও উন্নয়নের পক্ষে, আপনার পাশে সর্বক্ষণ।"
                                        : "For justice and development, always by your side."}"
                                </blockquote>
                                <p className="text-[#006A4E] font-semibold mt-2">
                                    — {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "Advocate Shakil Ahmad"}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </section >
    )
}

"use client"

import { useLocale } from "next-intl"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface StatItem {
    value: number
    suffix: string
}

export function CommunityStats() {
    const locale = useLocale()
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const stats: StatItem[] = [
        { value: 2063, suffix: "+" },
        { value: 12, suffix: "+" },
        { value: 45000, suffix: "" },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-20 bg-gradient-to-br from-[#8B0000] via-[#A52A2A] to-[#DC143C] overflow-hidden"
        >
            {/* Cross pattern background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M30 20v20M20 30h20'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Shapla Background Image - Right Side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-1/6 pointer-events-none opacity-35 md:opacity-45">
                <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
                    <Image
                        src="/shapla.png"
                        alt=""
                        fill
                        className="object-contain"
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Top Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left - Title */}
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            {locale === "bn" ? (
                                <>
                                    <span className="text-white">জনগণের</span><br />
                                    <span className="text-yellow-300">সাথে আছি</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-white">Standing With</span><br />
                                    <span className="text-yellow-300">The People</span>
                                </>
                            )}
                        </h2>
                    </div>

                    {/* Right - Description */}
                    <div className="space-y-4 lg:text-right">
                        <p className="text-white text-lg leading-relaxed font-medium">
                            {locale === "bn"
                                ? "আপনাদের বিশ্বাস ও ভালোবাসায় আমরা এগিয়ে যাচ্ছি।"
                                : "Moving forward with your trust and love."}
                        </p>
                        <p className="text-yellow-200 text-lg leading-relaxed">
                            {locale === "bn"
                                ? "প্রতিটি গ্রাম, প্রতিটি মহল্লায় পৌঁছে যাচ্ছে আমাদের বার্তা।"
                                : "Our message is reaching every village, every neighborhood."}
                        </p>
                        <p className="text-yellow-200 text-lg leading-relaxed">
                            {locale === "bn"
                                ? "আপনাদের কণ্ঠস্বর হয়ে কাজ করছি নিরলসভাবে।"
                                : "Working tirelessly as your voice."}
                        </p>
                        <p className="text-white/80 text-base leading-relaxed mt-4">
                            {locale === "bn"
                                ? "গত এক বছরে হাজার হাজার পরিবারের সাথে সাক্ষাৎ করেছি, তাদের সমস্যা শুনেছি এবং সমাধানের পথ খুঁজেছি। আপনাদের সমর্থনে আমরা আরও শক্তিশালী।"
                                : "In the past year, we've met thousands of families, heard their problems, and sought solutions. With your support, we are stronger."}
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center transform transition-all duration-500 hover:scale-105 hover:bg-white/20"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transitionDelay: `${index * 150}ms`
                            }}
                        >
                            <p className="text-yellow-200 text-sm font-medium mb-2 uppercase tracking-wide">
                                {locale === "bn"
                                    ? index === 0 ? "সক্রিয় সমর্থক"
                                        : index === 1 ? "ইউনিয়ন কভার"
                                            : "সংগৃহীত অনুদান"
                                    : index === 0 ? "Active Supporters"
                                        : index === 1 ? "Unions Covered"
                                            : "Donations Collected"
                                }
                            </p>
                            <p className="text-5xl md:text-6xl font-extrabold text-white mb-3">
                                <CountUp
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                    isCurrency={index === 2}
                                    locale={locale}
                                />
                            </p>
                            <p className="text-white/60 text-xs">
                                {locale === "bn"
                                    ? index === 0 ? "এলাকা জুড়ে সক্রিয় স্বেচ্ছাসেবক"
                                        : index === 1 ? "সরাসরি যোগাযোগ স্থাপিত"
                                            : "জনগণের স্বতঃস্ফূর্ত অবদান"
                                    : index === 0 ? "Active volunteers across the area"
                                        : index === 1 ? "Direct connection established"
                                            : "Spontaneous contribution from people"
                                }
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// CountUp animation component
function CountUp({
    end,
    suffix,
    isVisible,
    isCurrency,
    locale
}: {
    end: number
    suffix: string
    isVisible: boolean
    isCurrency: boolean
    locale: string
}) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
        const steps = 60
        const increment = end / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isVisible, end])

    const formattedCount = count.toLocaleString(locale === "bn" ? "bn-BD" : "en-US")

    if (isCurrency) {
        return <>{formattedCount} {locale === "bn" ? "টাকা" : "BDT"}</>
    }

    return <>{formattedCount}{suffix}</>
}

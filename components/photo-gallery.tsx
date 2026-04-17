"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useLocale } from "next-intl"
import { useGSAP } from "@/lib/gsap-provider"
import { Camera } from "lucide-react"

const galleryImages = [
    { src: "/activity/01.jpeg", alt: "Activity 1" },
    { src: "/activity/02.jpeg", alt: "Activity 2" },
    { src: "/activity/03.jpeg", alt: "Activity 3" },
    { src: "/activity/04.jpeg", alt: "Activity 4" },
    { src: "/activity/05.jpeg", alt: "Activity 5" },
    { src: "/activity/06.jpeg", alt: "Activity 6" },
    { src: "/activity/07.jpeg", alt: "Activity 7" },
    { src: "/activity/08.jpeg", alt: "Activity 8" },
]

export function PhotoGallery() {
    const locale = useLocale()
    const { gsap, isReady } = useGSAP()
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!isReady || !sectionRef.current) return

        gsap.fromTo(
            sectionRef.current.querySelectorAll('.gallery-item'),
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
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
        <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-[#8B0000] via-[#A52A2A] to-[#DC143C] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M30 20v20M20 30h20'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wider">
                                {locale === "bn" ? "ছবি গ্যালারি" : "Photo Gallery"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {locale === "bn" ? (
                                <>আমাদের <span className="text-yellow-300">কার্যক্রম</span></>
                            ) : (
                                <>Our <span className="text-yellow-300">Activities</span></>
                            )}
                        </h2>
                    </div>
                    <p className="text-white/70 max-w-md text-lg">
                        {locale === "bn"
                            ? "এলাকাবাসীর সাথে সরাসরি যোগাযোগ ও জনসেবামূলক কার্যক্রম"
                            : "Direct engagement with locals and community service"}
                    </p>
                </div>

                {/* Bento Grid Gallery */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[180px]">
                    {/* Large featured image */}
                    <div className="gallery-item col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
                        <Image
                            src={galleryImages[0].src}
                            alt={galleryImages[0].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-yellow-300 text-xs font-semibold uppercase tracking-wider">Featured</span>
                            <p className="text-white font-bold text-lg mt-1">
                                {locale === "bn" ? "জনসংযোগ" : "Public Connect"}
                            </p>
                        </div>
                    </div>

                    {/* Regular images */}
                    <div className="gallery-item col-span-2 relative rounded-2xl overflow-hidden group">
                        <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    </div>

                    <div className="gallery-item col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
                        <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                        <div className="absolute bottom-4 left-4">
                            <p className="text-white font-semibold">
                                {locale === "bn" ? "সভা সমাবেশ" : "Rally"}
                            </p>
                        </div>
                    </div>

                    <div className="gallery-item col-span-2 relative rounded-2xl overflow-hidden group">
                        <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    </div>

                    {/* Bottom row */}
                    <div className="gallery-item col-span-2 md:col-span-3 relative rounded-2xl overflow-hidden group">
                        <Image src={galleryImages[4].src} alt={galleryImages[4].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                            <p className="text-white font-medium text-sm">
                                {locale === "bn" ? "এলাকা সফর" : "Area Visit"}
                            </p>
                        </div>
                    </div>

                    <div className="gallery-item col-span-2 md:col-span-3 relative rounded-2xl overflow-hidden group">
                        <Image src={galleryImages[5].src} alt={galleryImages[5].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
                        <div className="absolute bottom-3 right-3 text-right">
                            <p className="text-white font-medium text-sm">
                                {locale === "bn" ? "যুব সমাবেশ" : "Youth Meet"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">৫০+</p>
                        <p className="text-white/60 text-sm mt-1">
                            {locale === "bn" ? "গ্রাম সফর" : "Village Visits"}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-yellow-300">১০০+</p>
                        <p className="text-white/60 text-sm mt-1">
                            {locale === "bn" ? "সভা সমাবেশ" : "Public Meetings"}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white">৫০০০+</p>
                        <p className="text-white/60 text-sm mt-1">
                            {locale === "bn" ? "পরিবার সংযোগ" : "Families Reached"}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}

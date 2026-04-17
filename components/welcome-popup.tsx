"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"

export function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false)
    const locale = useLocale()

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Disable body scroll when popup is open
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
                onClick={() => setIsOpen(false)}
            />

            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="relative w-full max-w-md bg-gradient-to-br from-[#006A4E] to-[#005540] rounded-3xl shadow-2xl border border-white/10 overflow-hidden pointer-events-auto animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-radial from-emerald-400/20 via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-10 text-center">
                        {/* Shapla Image */}
                        <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 md:w-28 md:h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg p-3">
                                <Image
                                    src="/shapla.png"
                                    alt="Shapla"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg leading-tight">
                                গণভোটে 'হ্যাঁ' বলি,
                            </h2>
                            <p className="text-xl md:text-2xl font-bold text-white/95 drop-shadow-md">
                                ভোট দিবো শাপলা কলি
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-8 px-8 py-3 bg-white text-[#006A4E] rounded-full font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                            {locale === "bn" ? "ধন্যবাদ" : "Thank You"}
                        </button>
                    </div>

                    {/* Bottom decoration */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/40 via-white/40 to-emerald-400/40" />
                </div>
            </div>
        </>
    )
}

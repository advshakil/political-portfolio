"use client"

import { useTranslations } from "next-intl"
import { GSAPProvider } from "@/lib/gsap-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { XCircle, ArrowRight, Home, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function CancelContent() {
    const t = useTranslations()

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Hero-style gradient background - Red/Orange theme for cancel */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-rose-700">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-400/15 via-transparent to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-300/15 to-transparent blur-3xl animate-pulse" />
                <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-red-300/10 to-transparent blur-3xl" />

                {/* Geometric shapes */}
                <div className="absolute top-[15%] left-[12%] w-20 h-20 border-2 border-white/10 rotate-45 rounded-lg backdrop-blur-sm" />
                <div className="absolute top-[30%] right-[15%] w-32 h-32 border border-white/5 rounded-full" />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/30 animate-pulse"
                        style={{
                            width: `${4 + Math.random() * 6}px`,
                            height: `${4 + Math.random() * 6}px`,
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60" />
            </div>

            <Header />

            <main className="relative z-10 pt-32 pb-16 px-4 flex-1">
                <div className="max-w-2xl mx-auto text-center">



                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                        {t("donate.cancel.title")}
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto">
                        {t("donate.cancel.message")}
                    </p>

                    {/* Info Box */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 mb-8 text-left">
                        <h2 className="font-bold text-gray-900 text-xl mb-4">
                            {t("donate.cancel.whatHappened")}
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-orange-500 text-xl mt-0.5">•</span>
                                <span className="text-gray-700 text-base">
                                    {t("donate.cancel.point1")}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-orange-500 text-xl mt-0.5">•</span>
                                <span className="text-gray-700 text-base">
                                    {t("donate.cancel.point2")}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-orange-500 text-xl mt-0.5">•</span>
                                <span className="text-gray-700 text-base">
                                    {t("donate.cancel.point3")}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md px-6 py-6 text-base rounded-full">
                                <Home className="w-5 h-5 mr-2" />
                                {t("donate.success.goHome")}
                            </Button>
                        </Link>
                        <Link href="/donate">
                            <Button className="w-full sm:w-auto bg-white text-orange-700 hover:bg-white/90 px-6 py-6 text-base rounded-full shadow-xl">
                                {t("donate.success.tryAgain")}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer with proper z-index */}
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    )
}

export default function CancelPage() {
    return (
        <GSAPProvider>
            <CancelContent />
        </GSAPProvider>
    )
}

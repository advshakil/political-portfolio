"use client"

import { GSAPProvider } from "@/lib/gsap-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslations } from "next-intl"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

function SuccessContent() {
    const t = useTranslations()

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-[#006A4E] to-[#003d2e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-400/15 via-transparent to-transparent" />
            </div>

            <Header />

            <main className="relative z-10 pt-32 pb-16 px-4 flex-1 flex items-center justify-center">
                <div className="max-w-2xl mx-auto w-full">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-100 rounded-full">
                                <CheckCircle className="w-16 h-16 text-green-600" />
                            </div>
                        </div>

                        {/* Success Badge */}
                        <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                            {t("donate.success.badge")}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("donate.success.title")}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-600 mb-8">
                            {t("donate.success.messageRegistered")}
                        </p>

                        {/* Additional Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
                            <h3 className="font-semibold text-blue-900 mb-2">
                                {t("donate.success.nextSteps")}
                            </h3>
                            <ul className="space-y-2 text-blue-800 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{t("donate.success.step1")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{t("donate.success.step2")}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{t("donate.success.step3")}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button className="bg-[#006A4E] hover:bg-[#005a42] text-white px-8">
                                    {t("donate.success.goHome")}
                                </Button>
                            </Link>
                            <Link href="/donate">
                                <Button variant="outline" className="border-[#006A4E] text-[#006A4E] hover:bg-[#006A4E]/10 px-8">
                                    {t("donate.success.donateAgain")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    )
}

export default function DonateSuccessPage() {
    return (
        <GSAPProvider>
            <SuccessContent />
        </GSAPProvider>
    )
}

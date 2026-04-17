"use client"

import { GSAPProvider } from "@/lib/gsap-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DonationForm } from "@/components/donation-form"
import { useTranslations } from "next-intl"
import { Copy, Building2, Smartphone, CheckCircle } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

function PaymentDetailsCard({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#006A4E]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#006A4E]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    )
}

function CopyableText({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
            </div>
            <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy"
            >
                {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                )}
            </button>
        </div>
    )
}

function DonateContent() {
    const t = useTranslations()

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Hero-style gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#006A4E] via-[#005a42] to-[#003d2e]">
                {/* Animated mesh gradient */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-600/15 via-transparent to-transparent" />
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-400/15 to-transparent blur-3xl animate-pulse" />
                <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-teal-400/10 to-transparent blur-3xl" />

                {/* Geometric shapes */}
                <div className="absolute top-[15%] left-[12%] w-20 h-20 border-2 border-white/10 rotate-45 rounded-lg backdrop-blur-sm" />
                <div className="absolute top-[30%] right-[15%] w-32 h-32 border border-white/5 rounded-full" />
                <div className="absolute bottom-[25%] left-[8%] w-24 h-24 border border-emerald-300/10 rotate-12 rounded-xl" />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute rounded-full bg-white/30 animate-pulse"
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

            {/* Content */}
            <main className="relative z-10 pt-32 pb-16 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    {/* Hero-style section */}
                    <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.2)]">
                            {t("donate.title")}
                        </h1>
                        <p className="text-lg md:text-xl text-white/85 max-w-lg mx-auto leading-relaxed font-light">
                            {t("donate.subtitle")}
                        </p>
                    </div>

                    {/* Payment Details Section */}
                    <div className="mb-8 space-y-6">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                {t("donate.paymentDetails.title")}
                            </h2>
                            <p className="text-white/80 text-center mb-6">
                                {t("donate.paymentDetails.instruction")}
                            </p>

                            {/* Bkash QR/Image */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 max-w-md">
                                    <Image
                                        src="/bkash.jpeg"
                                        alt="Bkash Payment Details"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto rounded-lg"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Bank Details */}
                                <PaymentDetailsCard title={t("donate.paymentDetails.bankTitle")} icon={Building2}>
                                    <div className="space-y-3">
                                        <CopyableText label={t("donate.paymentDetails.accountNumber")} value="20504810200189909" />
                                        <CopyableText label={t("donate.paymentDetails.accountName")} value="Shakil Ahmad" />
                                        <CopyableText label={t("donate.paymentDetails.branch")} value="Gangni Branch, Meherpur" />
                                        <CopyableText label={t("donate.paymentDetails.bank")} value="Islami Bank PLC" />
                                    </div>
                                </PaymentDetailsCard>

                                {/* Mobile Banking */}
                                <PaymentDetailsCard title={t("donate.paymentDetails.mobileTitle")} icon={Smartphone}>
                                    <div className="space-y-3">
                                        <CopyableText label={t("donate.paymentDetails.personalBkashNagad")} value="+8801916948710" />
                                        <CopyableText label={t("donate.paymentDetails.merchantBkash")} value="+8801914009900" />
                                    </div>
                                </PaymentDetailsCard>
                            </div>
                        </div>
                    </div>

                    {/* Donation Form Card with glass morphism */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                            {t("donate.form.registerTitle")}
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                            {t("donate.form.registerSubtitle")}
                        </p>
                        <DonationForm />
                    </div>

                    {/* Trust Badges with better visibility */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <span className="text-emerald-300 text-lg">✓</span>
                            <span className="text-white font-medium">
                                {t("donate.trust.secure")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <span className="text-emerald-300 text-lg">✓</span>
                            <span className="text-white font-medium">
                                {t("donate.trust.receipt")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <span className="text-emerald-300 text-lg">✓</span>
                            <span className="text-white font-medium">
                                {t("donate.trust.transparent")}
                            </span>
                        </div>
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

export default function DonatePage() {
    return (
        <GSAPProvider>
            <DonateContent />
        </GSAPProvider>
    )
}

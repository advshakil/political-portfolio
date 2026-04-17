"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Loader2, CheckCircle } from "lucide-react"
import { useState } from "react"

const PRESET_AMOUNTS = [100, 500, 1000, 5000]

interface DonationFormProps {
    onSuccess?: (referenceId: string) => void
    onError?: (error: string) => void
}

export function DonationForm({ onSuccess, onError }: DonationFormProps) {
    const t = useTranslations()
    const [donorName, setDonorName] = useState("")
    const [email, setEmail] = useState("")
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
    const [customAmount, setCustomAmount] = useState("")
    const [paymentReference, setPaymentReference] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [referenceId, setReferenceId] = useState("")

    const getFinalAmount = () => {
        if (selectedAmount) return selectedAmount
        if (customAmount) return parseFloat(customAmount)
        return 0
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!isAnonymous && !donorName.trim()) {
            newErrors.donorName = t("donate.error.nameRequired")
        }

        if (!isAnonymous && !email.trim()) {
            newErrors.email = t("donate.error.emailRequired")
        } else if (!isAnonymous && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t("donate.error.emailInvalid")
        }

        const amount = getFinalAmount()
        if (!amount || amount < 10) {
            newErrors.amount = t("donate.error.amountMin")
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setErrors({})

        try {
            const response = await fetch("/api/donation/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donorName: isAnonymous ? "Anonymous" : donorName.trim(),
                    email: isAnonymous ? "anonymous@donor.com" : email.trim(),
                    amount: getFinalAmount(),
                    paymentReference: paymentReference.trim() || null,
                }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to register donation")
            }

            // Show success message
            setIsSuccess(true)
            setReferenceId(data.referenceId)
            if (onSuccess) onSuccess(data.referenceId)

            // Reset form
            setDonorName("")
            setEmail("")
            setSelectedAmount(null)
            setCustomAmount("")
            setPaymentReference("")
            setIsAnonymous(false)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong"
            setErrors({ submit: message })
            if (onError) onError(message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount)
        setCustomAmount("")
        setErrors((prev) => ({ ...prev, amount: "" }))
    }

    const handleCustomAmountChange = (value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return
        setCustomAmount(value)
        setSelectedAmount(null)
        setErrors((prev) => ({ ...prev, amount: "" }))
    }

    const handleAnonymousChange = (checked: boolean) => {
        setIsAnonymous(checked)
        if (checked) {
            setDonorName("")
            setEmail("")
            setErrors((prev) => ({ ...prev, donorName: "", email: "" }))
        }
    }

    // Success state
    if (isSuccess) {
        return (
            <div className="space-y-6 text-center">
                <div className="flex justify-center">
                    <CheckCircle className="w-20 h-20 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                    {t("donate.success.title")}
                </h3>
                <p className="text-gray-600">
                    {t("donate.success.messageRegistered")}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">{t("donate.success.referenceId")}</p>
                    <p className="text-xl font-mono font-bold text-[#006A4E]">{referenceId}</p>
                </div>
                <Button
                    onClick={() => setIsSuccess(false)}
                    className="w-full h-12 bg-[#006A4E] hover:bg-[#005a42] text-white"
                >
                    {t("donate.success.donateAgain")}
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={handleAnonymousChange}
                    disabled={isLoading}
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-gray-700 cursor-pointer">
                    {t("donate.form.anonymous")}
                </label>
            </div>

            {/* Donor Name */}
            <div className="space-y-2">
                <Label htmlFor="donorName" className="text-gray-900 font-semibold text-base">
                    {t("donate.form.name")} {!isAnonymous && "*"}
                </Label>
                <Input
                    id="donorName"
                    type="text"
                    value={isAnonymous ? "Anonymous" : donorName}
                    onChange={(e) => {
                        if (!isAnonymous) {
                            setDonorName(e.target.value)
                            setErrors((prev) => ({ ...prev, donorName: "" }))
                        }
                    }}
                    placeholder={isAnonymous ? "Anonymous" : t("donate.form.namePlaceholder")}
                    className={`text-base bg-white text-gray-900 ${errors.donorName ? "border-red-500" : "border-gray-300"} ${isAnonymous ? "opacity-60" : ""}`}
                    disabled={isLoading || isAnonymous}
                    readOnly={isAnonymous}
                />
                {errors.donorName && (
                    <p className="text-sm text-red-500">{errors.donorName}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-semibold text-base">
                    {t("donate.form.email")} {!isAnonymous && "*"}
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={isAnonymous ? "anonymous@donor.com" : email}
                    onChange={(e) => {
                        if (!isAnonymous) {
                            setEmail(e.target.value)
                            setErrors((prev) => ({ ...prev, email: "" }))
                        }
                    }}
                    placeholder={isAnonymous ? "anonymous@donor.com" : t("donate.form.emailPlaceholder")}
                    className={`text-base bg-white text-gray-900 ${errors.email ? "border-red-500" : "border-gray-300"} ${isAnonymous ? "opacity-60" : ""}`}
                    disabled={isLoading || isAnonymous}
                    readOnly={isAnonymous}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Preset Amounts */}
            <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-base">
                    {t("donate.form.selectAmount")} *
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            disabled={isLoading}
                            className={`p-4 rounded-xl border-2 text-center transition-all font-bold text-lg ${selectedAmount === amount
                                ? "border-[#006A4E] bg-[#006A4E] text-white shadow-lg scale-105"
                                : "border-gray-300 hover:border-[#006A4E]/50 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            ৳{amount.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
                <Label htmlFor="customAmount" className="text-gray-900 font-semibold text-base">
                    {t("donate.form.customAmount")}
                </Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-bold text-lg">
                        ৳
                    </span>
                    <Input
                        id="customAmount"
                        type="text"
                        inputMode="numeric"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder={t("donate.form.customPlaceholder")}
                        className={`pl-8 text-base bg-white text-gray-900 ${errors.amount ? "border-red-500" : "border-gray-300"}`}
                        disabled={isLoading}
                    />
                </div>
                {errors.amount && (
                    <p className="text-sm text-red-500">{errors.amount}</p>
                )}
            </div>

            {/* Payment Reference */}
            <div className="space-y-2">
                <Label htmlFor="paymentReference" className="text-gray-900 font-semibold text-base">
                    {t("donate.form.paymentReference")}
                </Label>
                <Input
                    id="paymentReference"
                    type="text"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                    placeholder={t("donate.form.paymentReferencePlaceholder")}
                    className="text-base bg-white text-gray-900 border-gray-300"
                    disabled={isLoading}
                />
                <p className="text-xs text-gray-500">{t("donate.form.paymentReferenceHint")}</p>
            </div>

            {/* Selected Amount Display */}
            {getFinalAmount() > 0 && (
                <div className="p-6 bg-gradient-to-r from-[#006A4E]/10 to-emerald-50 rounded-xl border-2 border-[#006A4E]/30 shadow-md">
                    <p className="text-sm text-gray-700 font-medium mb-1">
                        {t("donate.form.yourDonation")}
                    </p>
                    <p className="text-3xl font-bold text-[#006A4E]">
                        ৳{getFinalAmount().toLocaleString()}
                    </p>
                </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading || getFinalAmount() < 10}
                className="w-full h-14 text-lg bg-[#006A4E] hover:bg-[#005a42] text-white rounded-xl"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {t("donate.form.processing")}
                    </>
                ) : (
                    <>
                        <Heart className="w-5 h-5 mr-2" />
                        {t("donate.form.submit")}
                    </>
                )}
            </Button>

            {/* Note */}
            <p className="text-center text-sm text-gray-500">
                {t("donate.form.note")}
            </p>
        </form>
    )
}

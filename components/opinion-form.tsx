"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useGSAP } from "@/lib/gsap-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Shield, Users, Clock, RefreshCw, X, User, MessageSquare, Loader2 } from "lucide-react"
import Image from "next/image"

export function OpinionForm() {
  const t = useTranslations()
  const locale = useLocale()
  const { gsap, isReady } = useGSAP()
  const [submitted, setSubmitted] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captchaError, setCaptchaError] = useState(false)
  const [captchaNumbers, setCaptchaNumbers] = useState({ a: 0, b: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  // Parallax layer refs
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  })

  // Generate new captcha numbers
  const generateCaptcha = useCallback(() => {
    setCaptchaNumbers({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
    })
    setCaptchaAnswer("")
    setCaptchaError(false)
  }, [])

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    // Content entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    })

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
    }

    if (formRef.current) {
      tl.fromTo(
        formRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
    }

    // Trust indicators staggered animation
    if (trustRef.current) {
      gsap.fromTo(
        trustRef.current.children,
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      )
    }

    // Parallax layers with different scroll speeds
    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, {
        y: 100,
        willChange: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      })
    }

    if (layer2Ref.current) {
      gsap.to(layer2Ref.current, {
        y: 70,
        willChange: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      })
    }

    if (layer3Ref.current) {
      gsap.to(layer3Ref.current, {
        y: 40,
        willChange: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      })
    }

    if (particlesRef.current) {
      gsap.to(particlesRef.current, {
        y: 60,
        willChange: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      })

      // Floating animation for particles
      const particles = particlesRef.current.querySelectorAll('.particle')
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-15, 15)",
          x: "random(-8, 8)",
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        })
      })
    }

  }, [isReady, gsap])

  // Handle form submit - show captcha
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    generateCaptcha()
    setShowCaptcha(true)
  }

  // Verify captcha and submit
  const verifyCaptcha = async () => {
    const correctAnswer = captchaNumbers.a + captchaNumbers.b
    if (parseInt(captchaAnswer) === correctAnswer) {
      setIsSubmitting(true)
      try {
        // Submit to API
        const response = await fetch('/api/opinions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            message: formData.message,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          console.log("Opinion submitted successfully:", data)
          setShowCaptcha(false)
          setSubmitted(true)
          // Removed automatic reset to keep success message visible until reload
        } else {
          console.error("Failed to submit opinion:", data.error)
          alert(locale === "bn" ? "মতামত জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" : "Failed to submit opinion. Please try again.")
          setShowCaptcha(false)
        }
      } catch (error) {
        console.error("Error submitting opinion:", error)
        alert(locale === "bn" ? "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।" : "An error occurred. Please try again.")
        setShowCaptcha(false)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setCaptchaError(true)
      generateCaptcha()
    }
  }

  // Close captcha modal
  const closeCaptcha = () => {
    setShowCaptcha(false)
    setCaptchaAnswer("")
    setCaptchaError(false)
  }

  return (
    <>
      <section id="opinion" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-accent">
        {/* Shapla Background Image - Left Side */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 md:-translate-x-1/6 pointer-events-none opacity-35 md:opacity-45">
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

        {/* Parallax Layer 1 - Large gradient orbs (Deepest) */}
        <div ref={layer1Ref} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-radial from-white/10 via-transparent to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-radial from-rose-300/15 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-radial from-orange-300/8 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Parallax Layer 2 - Geometric shapes */}
        <div ref={layer2Ref} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-[10%] w-20 h-20 border border-white/10 rotate-45" />
          <div className="absolute top-1/4 right-[15%] w-28 h-28 border border-white/5 rounded-full" />
          <div className="absolute bottom-1/3 left-[5%] w-16 h-16 border-2 border-white/8 rotate-12" />
          <div className="absolute top-[55%] right-[8%] w-14 h-14 border border-white/10 rotate-[60deg]" />
          <div className="absolute bottom-20 right-[25%] w-10 h-10 border border-white/15 rotate-[15deg]" />
        </div>

        {/* Parallax Layer 3 - Light streaks */}
        <div ref={layer3Ref} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-[350px] bg-gradient-to-b from-transparent via-white/15 to-transparent rotate-[12deg]" />
          <div className="absolute top-1/3 right-1/3 w-px h-[280px] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-[-18deg]" />
          <div className="absolute bottom-0 left-2/3 w-px h-[320px] bg-gradient-to-b from-transparent via-white/12 to-transparent rotate-[8deg]" />
        </div>

        {/* Floating particles layer */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
          <div className="particle absolute top-[15%] left-[25%] w-2 h-2 bg-white/25 rounded-full" />
          <div className="particle absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-white/30 rounded-full" />
          <div className="particle absolute top-[45%] left-[12%] w-2.5 h-2.5 bg-white/15 rounded-full blur-sm" />
          <div className="particle absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-white/35 rounded-full" />
          <div className="particle absolute top-[35%] right-[5%] w-1 h-1 bg-white/25 rounded-full" />
          <div className="particle absolute bottom-[20%] left-[35%] w-2 h-2 bg-white/20 rounded-full" />
          <div className="particle absolute top-[60%] left-[8%] w-1 h-1 bg-white/30 rounded-full" />
          <div className="particle absolute bottom-[45%] right-[30%] w-1.5 h-1.5 bg-white/25 rounded-full" />
          <div className="particle absolute top-[75%] right-[12%] w-2 h-2 bg-white/15 rounded-full" />
          <div className="particle absolute bottom-[15%] left-[20%] w-1 h-1 bg-white/35 rounded-full" />
        </div>

        {/* Grid/Graph pattern background */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent via-transparent to-accent/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div ref={headerRef} className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                <span className="drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)]">
                  {t("opinion.title")}
                </span>
              </h2>
              <p className="text-white/90 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-light">
                {t("opinion.subtitle")}
              </p>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-white/30 rounded-full" />
              </div>
            </div>

            {/* Form */}
            <div ref={formRef}>
              {submitted ? (
                <div className="bg-gradient-to-br from-[#006A4E] to-[#005540] rounded-3xl p-10 md:p-14 text-center shadow-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
                  {/* Success background effects */}
                  <div className="absolute inset-0 bg-gradient-radial from-emerald-400/30 via-transparent to-transparent" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 w-28 h-28 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                      <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-white/10">
                        <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                      দেশ ও জনগণের সেবায় পাশে থাকুন
                    </div>
                    <div className="text-white text-2xl md:text-3xl font-bold">
                      আপনার মূল্যবান মতামতের জন্য ধন্যবাদ
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#006A4E]/90 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/15 relative overflow-hidden group"
                >
                  {/* Form background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/3 rounded-full blur-2xl" />

                  <div className="space-y-6 relative z-10">
                    {/* Name field */}
                    <div className="space-y-2 group/input">
                      <Label htmlFor="name" className="text-white text-base md:text-lg font-medium flex items-center gap-2">
                        <User className="w-5 h-5 text-white/70" />
                        {t("opinion.name")}
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={locale === "bn" ? "আপনার নাম লিখুন" : "Enter your name"}
                          className="h-14 text-base md:text-lg bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30 rounded-xl transition-all duration-300 hover:bg-white/15 focus:bg-white/15 focus:shadow-lg focus:shadow-white/10 pl-4"
                        />
                        {formData.name && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </div>

                    {/* Message field */}
                    <div className="space-y-2 group/textarea">
                      <Label htmlFor="message" className="text-white text-base md:text-lg font-medium flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-white/70" />
                        {t("opinion.message")}
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          required
                          rows={6}
                          placeholder={
                            locale === "bn" ? "আপনার এলাকার সমস্যা বা পরামর্শ লিখুন..." : "Share your concerns or suggestions..."
                          }
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="min-h-[160px] text-base md:text-lg bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30 rounded-xl resize-none transition-all duration-300 hover:bg-white/15 focus:bg-white/15 focus:shadow-lg focus:shadow-white/10 p-4"
                        />
                      </div>
                      {/* Character counter */}
                      <div className="flex justify-between items-center text-xs md:text-sm text-white/50">
                        <span>
                          {locale === "bn" ? "আপনার মতামত গুরুত্বপূর্ণ" : "Your opinion matters"}
                        </span>
                        <span className={formData.message.length > 500 ? "text-orange-300" : ""}>
                          {formData.message.length} {locale === "bn" ? "অক্ষর" : "characters"}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!formData.name || !formData.message || isSubmitting}
                      className="w-full bg-white text-[#006A4E] hover:bg-white/95 text-lg md:text-xl py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group/btn font-bold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#006A4E]/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          <span className="relative z-10">{locale === "bn" ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 md:w-6 md:h-6 mr-3 group-hover/btn:translate-x-1 group-hover/btn:rotate-[-20deg] transition-transform duration-300" />
                          <span className="relative z-10">{t("opinion.submit")}</span>
                        </>
                      )}
                    </Button>

                    {/* Privacy notice */}
                    <p className="text-center text-white/50 text-xs md:text-sm">
                      <Shield className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                      {locale === "bn" ? "আপনার তথ্য সম্পূর্ণ নিরাপদ ও গোপনীয়" : "Your information is completely safe and confidential"}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Trust indicators */}
            <div ref={trustRef} className="grid grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center text-white group cursor-default">
                <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-white/10">
                  <Shield className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-sm md:text-base font-medium drop-shadow-md">{t("opinion.trust1")}</span>
              </div>
              <div className="flex flex-col items-center text-center text-white group cursor-default">
                <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-white/10">
                  <Users className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-sm md:text-base font-medium drop-shadow-md">{t("opinion.trust2")}</span>
              </div>
              <div className="flex flex-col items-center text-center text-white group cursor-default">
                <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/25 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-white/10">
                  <Clock className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-sm md:text-base font-medium drop-shadow-md">{t("opinion.trust3")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Captcha Modal */}
      {
        showCaptcha && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-gradient-to-br from-[#006A4E] to-[#005540] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
              {/* Close button */}
              <button
                onClick={closeCaptcha}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Captcha content */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("captcha.title")}
                </h3>
                <p className="text-white/70 mb-6">
                  {t("captcha.prompt")}
                </p>

                {/* Math question */}
                <div className="bg-white/10 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl font-bold text-white">{captchaNumbers.a}</span>
                    <span className="text-4xl font-bold text-white">+</span>
                    <span className="text-4xl font-bold text-white">{captchaNumbers.b}</span>
                    <span className="text-4xl font-bold text-white">=</span>
                    <span className="text-4xl font-bold text-accent">?</span>
                  </div>
                </div>

                {/* Error message */}
                {captchaError && (
                  <p className="text-red-300 mb-4 text-sm">
                    {t("captcha.error")}
                  </p>
                )}

                {/* Answer input */}
                <div className="flex gap-3 mb-4">
                  <Input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder={t("captcha.placeholder")}
                    className="h-14 text-xl text-center bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white rounded-xl"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && verifyCaptcha()}
                  />
                  <button
                    onClick={generateCaptcha}
                    className="h-14 w-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                    title={t("captcha.newQuestion")}
                  >
                    <RefreshCw className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Submit button */}
                <Button
                  onClick={verifyCaptcha}
                  disabled={isSubmitting}
                  className="w-full bg-white text-[#006A4E] hover:bg-white/90 text-lg py-6 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {locale === "bn" ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}
                    </>
                  ) : (
                    t("captcha.submit")
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

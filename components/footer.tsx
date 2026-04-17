"use client"

import { useLocale, useTranslations } from "next-intl"
import { Facebook, Youtube, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const locale = useLocale()
  const t = useTranslations()

  const contactItems = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "01521-256715",
      href: "https://wa.me/8801521256715",
      isExternal: true,
    },
    {
      icon: Mail,
      label: locale === "bn" ? "ইমেইল" : "Email",
      value: "shakilreal@gmail.com",
      href: "mailto:shakilreal@gmail.com",
      isExternal: false,
    },
    {
      icon: MapPin,
      label: locale === "bn" ? "অফিস" : "Office",
      value: locale === "bn" ? "গাংনী বাজার, গাংনী, মেহেরপুর" : "Gangni Bazar, Gangni, Meherpur",
      href: null,
      isExternal: false,
    },
  ]

  return (
    <footer id="contact" className="bg-[#0a1a15]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        {/* Top Section with Divider */}
        <div className="pt-16 pb-12 border-b border-white/10">
          <div className="flex flex-col items-center text-center">
            <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {locale === "bn" ? "যোগাযোগ" : "Contact"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {locale === "bn" ? "সংযুক্ত থাকুন" : "Stay Connected"}
            </h2>
            <p className="text-white/50 max-w-md">
              {locale === "bn"
                ? "আপনার মতামত ও পরামর্শ আমাদের কাছে গুরুত্বপূর্ণ"
                : "Your opinions and suggestions are important to us"}
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-white/10">
            {contactItems.map((item, index) => (
              <div key={index} className="py-6 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-white/10 last:border-b-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-5 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500">
                      <item.icon className="w-6 h-6 text-white/70 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <span className="text-white/40 text-xs uppercase tracking-widest mb-2">{item.label}</span>
                    <span className="text-white text-lg font-medium group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                      {item.value}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-5">
                      <item.icon className="w-6 h-6 text-white/70" />
                    </div>
                    <span className="text-white/40 text-xs uppercase tracking-widest mb-2">{item.label}</span>
                    <span className="text-white text-lg font-medium">{item.value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logo and Name Section */}
        <div className="py-16 border-t border-white/10">
          {/* NCP Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/NCP Final logo-01.png"
                alt="NCP Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          {/* Large Name */}
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white/25 to-white/5 leading-none tracking-tight select-none">
            {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "ADVOCATE SHAKIL AHMAD"}
          </h3>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-1">
              <Link
                href="https://www.facebook.com/AdvShakilAhmad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "Advocate Shakil Ahmad"} — {locale === "bn" ? "সর্বস্বত্ব সংরক্ষিত" : "All Rights Reserved"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

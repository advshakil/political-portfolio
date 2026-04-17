import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Hind_Siliguri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sakilahmad.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shakil Ahmad | সাকিল আহমাদ - Parliamentary Candidate",
    template: "%s | Shakil Ahmad",
  },
  description:
    "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি - জনগণের সেবায় নিবেদিত। Your voice, our commitment - dedicated to serving the people. Share your opinion for the 13th National Parliamentary Election.",
  keywords: [
    "Shakil Ahmad", "সাকিল আহমাদ",
    "MP Election", "সংসদ নির্বাচন",
    "Bangladesh", "বাংলাদেশ",
    "Meherpur", "মেহেরপুর",
    "Gangni", "গাংনী",
    "Parliamentary Candidate", "প্রার্থী",
    "13th National Election", "ত্রয়োদশ জাতীয় নির্বাচন",
  ],
  authors: [{ name: "Shakil Ahmad" }],
  creator: "Shakil Ahmad",
  publisher: "Shakil Ahmad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    siteName: "Shakil Ahmad",
    title: "Shakil Ahmad | সাকিল আহমাদ - Parliamentary Candidate",
    description: "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি - জনগণের সেবায় নিবেদিত।",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Shakil Ahmad - Parliamentary Candidate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakil Ahmad | সাকিল আহমাদ",
    description: "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি - জনগণের সেবায় নিবেদিত।",
    images: ["/banner.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "politics",
}

export const viewport: Viewport = {
  themeColor: "#006A4E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${montserrat.variable} ${hindSiliguri.variable}`}>
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

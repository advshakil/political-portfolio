import type React from "react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const isEnglish = locale === 'en';

    return {
        title: isEnglish
            ? "Shakil Ahmad | Political Leader & Visionary"
            : "সাকিল আহমাদ | রাজনৈতিক নেতৃত্ব ও স্বপ্নদ্রষ্টা",
        description: isEnglish
            ? "Your voice, our commitment - dedicated to serving the people. Share your opinion and be part of the change."
            : "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি - জনগণের সেবায় নিবেদিত। আপনার মতামত জানান, পরিবর্তনের অংশীদার হোন।",
        keywords: isEnglish
            ? ["Shakil Ahmad", "Political Leader", "Bangladesh", "Patriot", "Meherpur", "Gangni"]
            : ["সাকিল আহমাদ", "রাজনৈতিক নেতৃত্ব", "বাংলাদেশ", "দেশপ্রেমিক", "মেহেরপুর", "গাংনী"],
        openGraph: {
            title: isEnglish ? "Shakil Ahmad" : "সাকিল আহমাদ",
            description: isEnglish
                ? "Your voice, our commitment - dedicated to serving the people."
                : "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি - জনগণের সেবায় নিবেদিত।",
            type: "website",
            locale: isEnglish ? "en_US" : "bn_BD",
            siteName: "Shakil Ahmad",
            images: [
                {
                    url: "/banner.jpeg",
                    width: 1200,
                    height: 630,
                    alt: isEnglish ? "Shakil Ahmad Campaign" : "সাকিল আহমাদ প্রচারণা",
                },
            ],
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'bn': '/bn',
            },
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}

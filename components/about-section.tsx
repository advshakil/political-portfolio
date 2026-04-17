"use client"

import { useLocale } from "next-intl"
import { GraduationCap, Scale, Users, Award } from "lucide-react"
import { useState } from "react"

export function AboutSection() {
    const locale = useLocale()
    const [activeTab, setActiveTab] = useState(0)

    const sections = [
        {
            id: 0,
            icon: GraduationCap,
            titleBn: "পড়াশোনা",
            titleEn: "Education",
            contentBn: "গাংনীতে ক্লাস ফাইভ পর্যন্ত লেখাপড়া করে মেহেরপুর জেলার বাইরে হাইস্কুলে ভর্তি হই। তারপর তা'মীরুল মিল্লাত কামিল মাদরাসা টঙ্গী হতে গোল্ডেন এ প্লাস পেয়ে দাখিল আলিম উত্তীর্ণ হয়ে নর্দার্ন বিশ্ববিদ্যালয় থেকে আইন বিভাগে অনার্স মাস্টার্স করি।",
            contentEn: "Studied up to class five in Gangni, then enrolled in high school outside Meherpur district. Passed Dakhil and Alim with Golden A Plus from Ta'mirul Millat Kamil Madrasa, Tongi, then completed Honors and Masters in Law from Northern University.",
        },
        {
            id: 1,
            icon: Scale,
            titleBn: "পেশা",
            titleEn: "Profession",
            contentBn: "বর্তমানে বাংলাদেশ সুপ্রীম কোর্টের আইনজীবী হিসেবে আইন পেশা পরিচালনা করছি এবং সহকারী অ্যাটর্নি জেনারেল পদমর্যাদার স্পেশাল পাবলিক প্রসিকিউটর হিসেবে পিলখানা হত্যাকাণ্ড মামলায় রাষ্ট্রপক্ষে আইনজীবী হিসেবে কাজ করছি। ল' সেবা নামে ল' চেম্বারের হেড অব চেম্বার।",
            contentEn: "Currently practicing law as a lawyer at the Bangladesh Supreme Court and working as a Special Public Prosecutor with the rank of Assistant Attorney General in the Pilkhana massacre case. Head of Chamber at 'Law Seba' Law Chamber.",
        },
        {
            id: 2,
            icon: Users,
            titleBn: "আন্দোলন",
            titleEn: "Movement",
            contentBn: "জুলাই আন্দোলনের প্রায় শুরু হতে যুক্ত ছিলাম। আন্দোলনরত ছাত্র-জনতাকে পুলিশ গ্রেপ্তার শুরু করলে ফ্রি আইনি সহায়তা দেওয়াসহ সারাদেশের অগণিত মানুষকে আইনি সেবা প্রদান করি। ২০২৪ সালের ২ আগস্ট পর্যন্ত রামপুরা এলাকায় ও ৩ আগস্ট হতে ৫ আগস্ট পর্যন্ত সক্রিয়ভাবে শাহবাগে আন্দোলনে অংশগ্রহণ করি।",
            contentEn: "Been involved since the beginning of the July movement. Provided free legal assistance when police started arresting protesting students and people, serving countless people across the country. Actively participated in the movement at Rampura until August 2, 2024, and at Shahbag from August 3 to August 5.",
        },
        {
            id: 3,
            icon: Award,
            titleBn: "ইত্যাদি",
            titleEn: "Other Activities",
            contentBn: "জুলাই গণ অভ্যুত্থানের পর শহীদ আসহাবুল ইয়ামিন, শহীদ সাবিতসহ দশের অধিক শহীদের মামলার ফাইলিং আইনজীবী হিসেবে কাজ করেছি।",
            contentEn: "After the July mass uprising, worked as the filing lawyer for the cases of more than ten martyrs including Shaheed Ashabul Yamin and Shaheed Sabit.",
        },
    ]

    return (
        <section id="about" className="py-20 md:py-28 bg-[#003d2e] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

            {/* Decorative Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-px bg-accent" />
                        <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
                            {locale === "bn" ? "পরিচয়" : "About"}
                        </span>
                        <div className="w-12 h-px bg-accent" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {locale === "bn" ? (
                            <>কে এই অ্যাডভোকেট<br /><span className="text-accent">সাকিল আহমাদ</span>?</>
                        ) : (
                            <>Who is Advocate<br /><span className="text-accent">Shakil Ahmad</span>?</>
                        )}
                    </h2>
                </div>

                {/* Main Content - Tab Based */}
                <div className="max-w-5xl mx-auto">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                        {sections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(index)}
                                className={`group relative px-5 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-base transition-all duration-500 ${activeTab === index
                                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <span className="flex items-center gap-2 md:gap-3">
                                    <section.icon className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === index ? "text-white" : "text-accent"}`} />
                                    {locale === "bn" ? section.titleBn : section.titleEn}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Content Display */}
                    <div className="relative">
                        {/* Large Number Background */}
                        <div className="absolute -top-8 -left-4 md:-left-8 text-[150px] md:text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                            0{activeTab + 1}
                        </div>

                        {/* Content Card */}
                        <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                            {/* Top decorative line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />

                            {/* Icon */}
                            <div className="flex justify-center mb-8">
                                <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                                    {(() => {
                                        const IconComponent = sections[activeTab].icon
                                        return <IconComponent className="w-10 h-10 text-accent" />
                                    })()}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
                                {locale === "bn" ? sections[activeTab].titleBn : sections[activeTab].titleEn}
                            </h3>

                            {/* Content */}
                            <p className="text-white/70 text-center text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                                {locale === "bn" ? sections[activeTab].contentBn : sections[activeTab].contentEn}
                            </p>

                            {/* Bottom Progress Indicator */}
                            <div className="flex justify-center gap-2 mt-10">
                                {sections.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${activeTab === index ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        {[
                            { numBn: "১৫+", numEn: "15+", labelBn: "বছরের অভিজ্ঞতা", labelEn: "Years Experience" },
                            { numBn: "১০০+", numEn: "100+", labelBn: "মামলা পরিচালনা", labelEn: "Cases Handled" },
                            { numBn: "১০+", numEn: "10+", labelBn: "শহীদ মামলা", labelEn: "Martyr Cases" },
                            { numBn: "১", numEn: "1", labelBn: "সুপ্রীম কোর্ট", labelEn: "Supreme Court" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                                    {locale === "bn" ? stat.numBn : stat.numEn}
                                </div>
                                <div className="text-white/50 text-sm">
                                    {locale === "bn" ? stat.labelBn : stat.labelEn}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

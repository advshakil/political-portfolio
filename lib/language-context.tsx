"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "bn" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Header
    "nav.home": "হোম",
    "nav.about": "পরিচিতি",
    "nav.opinion": "মতামত দিন",
    "nav.priorities": "অগ্রাধিকার",
    "nav.donate": "ডোনেট করুন",
    "nav.contact": "যোগাযোগ",

    // Hero
    "hero.badge": "ত্রয়োদশ জাতীয় সংসদ নির্বাচন",
    "hero.catchy": "জনতাই ক্ষমতা",
    "hero.tagline": "আপনার কণ্ঠস্বর, আমাদের প্রতিশ্রুতি",
    "hero.subtitle": "জনগণের সেবায় নিবেদিত - আপনার মতামত আমাদের পথ দেখাবে",
    "hero.cta": "আপনার মতামত দিন",
    "hero.secondary": "আমাদের সম্পর্কে জানুন",

    // About
    "about.title": "প্রার্থী পরিচিতি",
    "about.name": "মোঃ আবদুল করিম",
    "about.position": "সংসদ সদস্য প্রার্থী",
    "about.constituency": "ঢাকা-১০ আসন",
    "about.bio":
      "২০ বছরেরও বেশি সময় ধরে সমাজসেবায় নিবেদিত। শিক্ষা, স্বাস্থ্য ও কর্মসংস্থান নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। জনগণের কল্যাণে কাজ করাই আমার জীবনের লক্ষ্য।",
    "about.vision": "আমার লক্ষ্য",
    "about.vision.text": "একটি সুশিক্ষিত, স্বাস্থ্যবান এবং সমৃদ্ধ এলাকা গড়ে তোলা যেখানে প্রতিটি মানুষ সম্মানের সাথে বাঁচতে পারবে।",

    // Opinion Form
    "opinion.title": "আপনার মতামতে তৈরি হবে আমাদের নির্বাচনী ইশতেহার।",
    "opinion.subtitle": "আপনার এলাকার সমস্যা ও সমাধানের প্রস্তাব আমাদের জানান",
    "opinion.name": "আপনার নাম",
    "opinion.area": "এলাকার নাম",
    "opinion.phone": "মোবাইল নম্বর (ঐচ্ছিক)",
    "opinion.message": "আপনার মতামত লিখুন",
    "opinion.placeholder": "আপনার এলাকার সমস্যা, উন্নয়ন প্রস্তাব বা যেকোনো মতামত এখানে লিখুন...",
    "opinion.submit": "মতামত পাঠান",
    "opinion.success": "ধন্যবাদ!",
    "opinion.successDesc": "আপনার মতামত সফলভাবে জমা হয়েছে।",
    "opinion.trust1": "১০০% গোপনীয়",
    "opinion.trust2": "প্রতিটি কণ্ঠস্বর গুরুত্বপূর্ণ",
    "opinion.trust3": "সরাসরি প্রভাব",

    // Captcha
    "captcha.title": "যাচাইকরণ",
    "captcha.prompt": "অনুগ্রহ করে এই সহজ গণিত সমাধান করুন",
    "captcha.error": "ভুল উত্তর! আবার চেষ্টা করুন।",
    "captcha.placeholder": "উত্তর",
    "captcha.newQuestion": "নতুন প্রশ্ন",
    "captcha.submit": "জমা দিন",


    // Focus Areas
    "focus.title": "আমাদের অগ্রাধিকার",
    "focus.subtitle": "মেহেরপুরের উন্নয়নে আমাদের ১৩ দফা কর্মপরিকল্পনা",

    // 1. Education
    "focus.education": "মানসম্মত শিক্ষা ও দক্ষতা উন্নয়ন",
    "focus.education.desc": "শিক্ষার হার বৃদ্ধি, শিক্ষা প্রতিষ্ঠানে ডিজিটাল ক্লাসরুম ও আইসিটি ল্যাব স্থাপন, কারিগরি শিক্ষায় জোর এবং মেহেরপুর বিশ্ববিদ্যালয় চালুর ব্যবস্থা।",

    // 2. Health
    "focus.health": "আধুনিক স্বাস্থ্যসেবা নিশ্চিতকরণ",
    "focus.health.desc": "জেলা ও উপজেলা স্বাস্থ্যকেন্দ্রে আধুনিক চিকিৎসা সরঞ্জাম, পর্যাপ্ত চিকিৎসক ও ওষুধ সরবরাহ, মাতৃ ও শিশু স্বাস্থ্যসেবা এবং প্রবীণ-গরীবদের জন্য বিশেষ উদ্যোগ।",

    // 3. Agriculture
    "focus.agriculture": "কৃষিপণ্যের ন্যায্যমূল্য ও কৃষকের অধিকার",
    "focus.agriculture.desc": "কৃষকদের ফসলের সঠিক দাম নিশ্চিত করা। সার, বীজ ও সেচ নিশ্চিতকরণ, কৃষি ঋণ সহজলভ্য করা এবং আধুনিক কৃষি প্রযুক্তি ব্যবহারকে উৎসাহ দেওয়া।",

    // 4. Youth
    "focus.youth": "যুব সমাজের কর্মসংস্থান ও উদ্যোক্তা তৈরি",
    "focus.youth.desc": "স্থানীয় শিল্প ও ক্ষুদ্র-মাঝারি উদ্যোগ (SME) স্থাপন, স্টার্টআপ ফান্ড চালু এবং তরুণদের প্রশিক্ষণ দিয়ে উদ্যোক্তা তৈরি করতে সহজ শর্তে ব্যাংক ঋণের ব্যবস্থাকরণ।",

    // 5. Women
    "focus.women": "নারীর উন্নয়ন ও কর্মসংস্থান",
    "focus.women.desc": "নারীদের জন্য আলাদা প্রশিক্ষণ কর্মসূচি, ক্ষুদ্র ঋণ সহায়তা এবং নারী উদ্যোক্তাদের জন্য বিশেষ শিল্প প্রণোদনা।",

    // 6. Transport
    "focus.transport": "রেল যোগাযোগ ও পরিবহন ব্যবস্থার উন্নয়ন",
    "focus.transport.desc": "গাংনী হয়ে মেহেরপুরে রেল যোগাযোগ চালু করার উদ্যোগ, আঞ্চলিক সড়ক ও মহাসড়ক উন্নয়ন, ব্রিজ-কালভার্ট নির্মাণ এবং গ্রামীণ রাস্তায় আধুনিকীকরণ।",

    // 7. Industry
    "focus.industry": "শিল্প ও ইন্ডাস্ট্রি স্থাপন",
    "focus.industry.desc": "আম, পাট, ও কৃষিপণ্যভিত্তিক শিল্প গড়ে তোলা, বিশেষ অর্থনৈতিক অঞ্চল স্থাপন এবং স্থানীয় শিল্পোদ্যোক্তাদের জন্য প্রণোদনা।",

    // 8. Drugs & Security
    "focus.drugs": "মাদক নিয়ন্ত্রণ ও সামাজিক নিরাপত্তা",
    "focus.drugs.desc": "মাদক নির্মূলের জন্য কঠোর আইন প্রয়োগ, সচেতনতা বৃদ্ধি এবং যুবসমাজকে খেলাধুলা ও সংস্কৃতির সঙ্গে যুক্ত করা।",

    // 9. Culture
    "focus.culture": "পর্যটন ও সংস্কৃতি বিকাশ",
    "focus.culture.desc": "মেহেরপুরের পর্যটনকে আন্তর্জাতিক মানে উন্নীত করা, লোকসংগীত ও মেহেরপুরের ঐতিহ্য বিশ্বে তুলে ধরা।",

    // 10. Governance
    "focus.governance": "দুর্নীতি দমন ও সুশাসন",
    "focus.governance.desc": "প্রশাসনের স্বচ্ছতা, জনগণের অধিকার সংরক্ষণ এবং দুর্নীতির বিরুদ্ধে জিরো টলারেন্স নীতি।",

    // 11. Environment
    "focus.environment": "পরিবেশ সংরক্ষণ ও সবুজায়ন",
    "focus.environment.desc": "নদী-খাল খনন ও পুনরুদ্ধার, গাছ লাগানো এবং পরিবেশবান্ধব কৃষি প্রযুক্তির ব্যবহার।",

    // 12. Sports
    "focus.sports": "ক্রীড়া ও যুব উন্নয়ন",
    "focus.sports.desc": "প্রত্যেক ইউনিয়নে খেলার মাঠ সংরক্ষণ, ক্রীড়া কমপ্লেক্স নির্মাণ এবং তরুণদের মাদকমুক্ত রাখতে খেলাধুলা ও সাংস্কৃতিক কর্মকাণ্ডে সম্পৃক্ত করা।",

    // 13. Parliament
    "focus.parliament": "মেহেরপুর পার্লামেন্ট গঠন",
    "focus.parliament.desc": "মেহেরপুরের স্বার্থরক্ষা ও স্বচ্ছতা নিশ্চিত করতে সব দল-মতের প্রতিনিধিদের নিয়ে 'মেহেরপুর পার্লামেন্ট' গঠন করা হবে।",

    // Statistics
    "stats.title": "জনগণের অংশগ্রহণ",
    "stats.opinions": "মতামত পেয়েছি",
    "stats.areas": "এলাকা থেকে",
    "stats.supporters": "সমর্থক",
    "stats.years": "বছর সেবায়",

    // Community Voices
    "voices.title": "জনগণের কণ্ঠস্বর",
    "voices.subtitle": "আপনাদের মতামত আমাদের অনুপ্রেরণা",

    // Poll
    "poll.title": "আপনার মতামত দিন",
    "poll.question": "আপনার এলাকার সবচেয়ে গুরুত্বপূর্ণ সমস্যা কোনটি?",
    "poll.vote": "ভোট দিন",
    "poll.voted": "ধন্যবাদ! আপনার ভোট গৃহীত হয়েছে।",

    // Footer
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত",
    "footer.contact": "যোগাযোগ",
    "footer.address": "ঠিকানা",
    "footer.email": "ইমেইল",
    "footer.phone": "ফোন",
    "footer.social": "সামাজিক যোগাযোগ",
    "footer.privacy": "আপনার তথ্য সম্পূর্ণ গোপনীয় থাকবে",

    // Donation - Main Page
    "donate.title": "আপনার সহযোগিতা প্রয়োজন",
    "donate.subtitle": "জনগণের সেবায় আপনার অবদান রাখুন",
    "donate.trust.secure": "নিরাপদ পেমেন্ট",
    "donate.trust.receipt": "তাৎক্ষণিক রসিদ",
    "donate.trust.transparent": "স্বচ্ছ হিসাব",

    // Donation Form
    "donate.form.name": "আপনার নাম",
    "donate.form.namePlaceholder": "নাম লিখুন",
    "donate.form.email": "ইমেইল",
    "donate.form.emailPlaceholder": "example@email.com",
    "donate.form.selectAmount": "পরিমাণ নির্বাচন করুন",
    "donate.form.customAmount": "অথবা নিজের পরিমাণ লিখুন",
    "donate.form.customPlaceholder": "পরিমাণ লিখুন",
    "donate.form.yourDonation": "আপনার দান",
    "donate.form.processing": "প্রক্রিয়া চলছে...",
    "donate.form.submit": "দান করুন",
    "donate.form.secure": "🔒 নিরাপদ পেমেন্ট সিস্টেম",
    "donate.form.anonymous": "নাম গোপন রাখুন (Anonymous)",

    // Donation Form Errors
    "donate.error.nameRequired": "নাম প্রয়োজন",
    "donate.error.emailRequired": "ইমেইল প্রয়োজন",
    "donate.error.emailInvalid": "সঠিক ইমেইল লিখুন",
    "donate.error.amountMin": "ন্যূনতম ৳১০ দিতে হবে",

    // Donation Success Page
    "donate.success.verifying": "যাচাই করা হচ্ছে...",
    "donate.success.verificationFailed": "পেমেন্ট যাচাই ব্যর্থ হয়েছে",
    "donate.success.somethingWrong": "কিছু ভুল হয়েছে",
    "donate.success.verificationIssue": "পেমেন্ট যাচাই সমস্যা",
    "donate.success.tryAgain": "আবার চেষ্টা করুন",
    "donate.success.badge": "সফল",
    "donate.success.title": "আপনার দানের জন্য ধন্যবাদ!",
    "donate.success.messageCompleted": "আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনার সহযোগিতার জন্য আন্তরিক ধন্যবাদ!",
    "donate.success.messagePending": "আপনার পেমেন্ট প্রক্রিয়াধীন আছে। শীঘ্রই নিশ্চিত করা হবে।",
    "donate.success.details": "পেমেন্ট বিস্তারিত",
    "donate.success.transactionId": "ট্রানজেকশন আইডি",
    "donate.success.amount": "পরিমাণ",
    "donate.success.paymentMethod": "পেমেন্ট পদ্ধতি",
    "donate.success.status": "স্ট্যাটাস",
    "donate.success.statusCompleted": "সম্পন্ন",
    "donate.success.statusPending": "প্রক্রিয়াধীন",
    "donate.success.goHome": "হোমপেজে যান",
    "donate.success.donateAgain": "আবার ডোনেট করুন",

    // Donation Cancel Page
    "donate.cancel.badge": "বাতিল",
    "donate.cancel.title": "পেমেন্ট বাতিল হয়েছে",
    "donate.cancel.message": "আপনার পেমেন্ট সম্পন্ন হয়নি। চিন্তার কিছু নেই, কোনো টাকা কাটা হয়নি।",
    "donate.cancel.whatHappened": "কী ঘটেছে?",
    "donate.cancel.point1": "আপনি পেমেন্ট প্রক্রিয়া বাতিল করেছেন",
    "donate.cancel.point2": "পেমেন্ট সময়সীমা শেষ হয়ে গেছে",
    "donate.cancel.point3": "একটি প্রযুক্তিগত সমস্যা হয়েছে",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.opinion": "Share Opinion",
    "nav.priorities": "Priorities",
    "nav.donate": "Donate",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "13th National Parliamentary Election",
    "hero.catchy": "People are Power",
    "hero.tagline": "Your Voice, Our Commitment",
    "hero.subtitle": "Dedicated to serving the people - Your opinion guides our path",
    "hero.cta": "Share Your Opinion",
    "hero.secondary": "Learn About Us",

    // About
    "about.title": "About the Candidate",
    "about.name": "Md. Abdul Karim",
    "about.position": "Member of Parliament Candidate",
    "about.constituency": "Dhaka-10 Constituency",
    "about.bio":
      "Dedicated to community service for over 20 years. Committed to ensuring education, healthcare, and employment opportunities. Working for the welfare of the people is my life's mission.",
    "about.vision": "My Vision",
    "about.vision.text":
      "To build a well-educated, healthy, and prosperous community where every person can live with dignity.",

    // Opinion Form
    "opinion.title": "Your opinions will shape our election manifesto.",
    "opinion.subtitle": "Tell us about your area's problems and proposed solutions",
    "opinion.name": "Your Name",
    "opinion.area": "Area Name",
    "opinion.phone": "Mobile Number (Optional)",
    "opinion.message": "Write Your Opinion",
    "opinion.placeholder": "Write about your area's problems, development proposals, or any feedback here...",
    "opinion.submit": "Submit Opinion",
    "opinion.success": "Thank you!",
    "opinion.successDesc": "Your opinion has been successfully submitted.",
    "opinion.trust1": "100% Confidential",
    "opinion.trust2": "Every Voice Matters",
    "opinion.trust3": "Direct Impact",

    // Captcha
    "captcha.title": "Verification",
    "captcha.prompt": "Please solve this simple math",
    "captcha.error": "Wrong answer! Try again.",
    "captcha.placeholder": "Answer",
    "captcha.newQuestion": "New question",
    "captcha.submit": "Submit",

    // Focus Areas
    // Focus Areas
    "focus.title": "Our Priorities",
    "focus.subtitle": "Our 13-point action plan for the development of Meherpur",

    // 1. Education
    "focus.education": "Quality Education & Skill Development",
    "focus.education.desc": "Increasing literacy rate, setting up digital classrooms & ICT labs, emphasizing technical education, and establishing Meherpur University.",

    // 2. Health
    "focus.health": "Ensuring Modern Healthcare",
    "focus.health.desc": "Modern medical equipment in health centers, adequate doctors & medicine supply, maternal & child healthcare, and special initiatives for the elderly & poor.",

    // 3. Agriculture
    "focus.agriculture": "Fair Price & Farmers' Rights",
    "focus.agriculture.desc": "Ensuring fair prices for crops. Ensuring fertilizer, seeds & irrigation, making agricultural loans accessible, and encouraging modern agricultural technology.",

    // 4. Youth
    "focus.youth": "Youth Employment & Entrepreneurship",
    "focus.youth.desc": "Establishing local SME industries, launching startup funds, and providing easy bank loans to train youth and create entrepreneurs.",

    // 5. Women
    "focus.women": "Women's Development & Employment",
    "focus.women.desc": "Special training programs for women, micro-credit support, and special industrial incentives for women entrepreneurs.",

    // 6. Transport
    "focus.transport": "Rail & Transport Development",
    "focus.transport.desc": "Initiative to introduce rail communication via Gangni, development of regional roads & highways, construction of bridges/culverts, and modernization of rural roads.",

    // 7. Industry
    "focus.industry": "Industry Establishment",
    "focus.industry.desc": "Establishing mango, jute & agro-based industries, special economic zones, and incentives for local industrial entrepreneurs.",

    // 8. Drugs & Security
    "focus.drugs": "Drug Control & Social Security",
    "focus.drugs.desc": "Strict law enforcement to eliminate drugs, increasing awareness, and engaging youth in sports & culture.",

    // 9. Culture
    "focus.culture": "Tourism & Culture Development",
    "focus.culture.desc": "Upgrading Meherpur's tourism to international standards, promoting folk music and Meherpur's heritage globally.",

    // 10. Governance
    "focus.governance": "Anti-Corruption & Good Governance",
    "focus.governance.desc": "Transparency in administration, protection of people's rights, and zero tolerance policy against corruption.",

    // 11. Environment
    "focus.environment": "Environment Conservation & Greening",
    "focus.environment.desc": "Excavation & restoration of rivers/canals, tree planting, and use of eco-friendly agricultural technology.",

    // 12. Sports
    "focus.sports": "Sports & Youth Development",
    "focus.sports.desc": "Preserving playgrounds in every union, building sports complexes, and engaging youth in sports & cultural activities to keep them drug-free.",

    // 13. Parliament
    "focus.parliament": "Meherpur Parliament Formation",
    "focus.parliament.desc": "Forming 'Meherpur Parliament' with representatives of all parties to ensure transparency and protect Meherpur's interests.",

    // Statistics
    "stats.title": "Public Participation",
    "stats.opinions": "Opinions Received",
    "stats.areas": "Areas Covered",
    "stats.supporters": "Supporters",
    "stats.years": "Years of Service",

    // Community Voices
    "voices.title": "Community Voices",
    "voices.subtitle": "Your opinions inspire us",

    // Poll
    "poll.title": "Quick Poll",
    "poll.question": "What is the most important issue in your area?",
    "poll.vote": "Vote",
    "poll.voted": "Thank you! Your vote has been recorded.",

    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.contact": "Contact",
    "footer.address": "Address",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.social": "Social Media",
    "footer.privacy": "Your information will be kept completely confidential",

    // Donation - Main Page
    "donate.title": "Your Support is Needed",
    "donate.subtitle": "Contribute to serving the people",
    "donate.trust.secure": "Secure Payment",
    "donate.trust.receipt": "Instant Receipt",
    "donate.trust.transparent": "Transparent Accounting",

    // Donation Form
    "donate.form.name": "Your Name",
    "donate.form.namePlaceholder": "Enter your name",
    "donate.form.email": "Email",
    "donate.form.emailPlaceholder": "example@email.com",
    "donate.form.selectAmount": "Select Amount",
    "donate.form.customAmount": "Or enter custom amount",
    "donate.form.customPlaceholder": "Enter amount",
    "donate.form.yourDonation": "Your Donation",
    "donate.form.processing": "Processing...",
    "donate.form.submit": "Donate Now",
    "donate.form.secure": "🔒 Secure Payment System",
    "donate.form.anonymous": "Keep my name private (Anonymous)",

    // Donation Form Errors
    "donate.error.nameRequired": "Name is required",
    "donate.error.emailRequired": "Email is required",
    "donate.error.emailInvalid": "Please enter a valid email",
    "donate.error.amountMin": "Minimum donation is ৳10",

    // Donation Success Page
    "donate.success.verifying": "Verifying...",
    "donate.success.verificationFailed": "Payment verification failed",
    "donate.success.somethingWrong": "Something went wrong",
    "donate.success.verificationIssue": "Payment Verification Issue",
    "donate.success.tryAgain": "Try Again",
    "donate.success.badge": "Success",
    "donate.success.title": "Thank You for Your Donation!",
    "donate.success.messageCompleted": "Your payment has been successfully completed. Thank you for your generous support!",
    "donate.success.messagePending": "Your payment is being processed. It will be confirmed shortly.",
    "donate.success.details": "Payment Details",
    "donate.success.transactionId": "Transaction ID",
    "donate.success.amount": "Amount",
    "donate.success.paymentMethod": "Payment Method",
    "donate.success.status": "Status",
    "donate.success.statusCompleted": "Completed",
    "donate.success.statusPending": "Pending",
    "donate.success.goHome": "Go to Homepage",
    "donate.success.donateAgain": "Donate Again",

    // Donation Cancel Page
    "donate.cancel.badge": "Cancelled",
    "donate.cancel.title": "Payment Cancelled",
    "donate.cancel.message": "Your payment was not completed. Don't worry, no money has been charged.",
    "donate.cancel.whatHappened": "What Happened?",
    "donate.cancel.point1": "You cancelled the payment process",
    "donate.cancel.point2": "Payment session has expired",
    "donate.cancel.point3": "A technical issue occurred",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("bn")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check local storage for saved language preference
    const savedLanguage = localStorage.getItem("language_preference") as Language
    if (savedLanguage && (savedLanguage === "bn" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
    setIsLoaded(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language_preference", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

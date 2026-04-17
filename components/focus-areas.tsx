"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useGSAP } from "@/lib/gsap-provider"
import { GraduationCap, Heart, Briefcase, Building, Wheat, Users, Train, Factory, Shield, Music, Scale, Leaf, Trophy, Landmark, X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules"
import Image from "next/image"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

export function FocusAreas() {
  const t = useTranslations('focus')
  const { gsap, isReady } = useGSAP()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const [selectedArea, setSelectedArea] = useState<number | null>(null)

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    // Content entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })

    if (headerRef.current) {
      tl.fromTo(headerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
    }

    if (swiperRef.current) {
      tl.fromTo(
        swiperRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
    }

    // Parallax layer
    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, {
        y: 80,
        willChange: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      })
    }
  }, [isReady, gsap])

  const areas = [
    {
      icon: GraduationCap,
      title: "education",
      desc: "educationDesc",
      image: "/13dofa/মানসম্মত শিক্ষা ও দক্ষতা উন্নয়ন.png",
    },
    {
      icon: Heart,
      title: "health",
      desc: "healthDesc",
      image: "/13dofa/আধুনিক স্বাস্থ্যসেবা নিশ্চিতকরণ.webp",
    },
    {
      icon: Wheat,
      title: "agriculture",
      desc: "agricultureDesc",
      image: "/13dofa/কৃষিপণ্যের ন্যায্যমূল্য ও কৃষকের অধিকার.jpeg",
    },
    {
      icon: Briefcase,
      title: "youth",
      desc: "youthDesc",
      image: "/13dofa/যুব সমাজের কর্মসংস্থান ও উদ্যোক্তা তৈরি.jpg",
    },
    {
      icon: Users,
      title: "women",
      desc: "womenDesc",
      image: "/13dofa/নারীর উন্নয়ন ও কর্মসংস্থান.jpg",
    },
    {
      icon: Train,
      title: "transport",
      desc: "transportDesc",
      image: "/13dofa/রেল যোগাযোগ ও পরিবহন ব্যবস্থার উন্নয়ন.jpg",
    },
    {
      icon: Factory,
      title: "industry",
      desc: "industryDesc",
      image: "/activity/07.jpeg",
    },
    {
      icon: Shield,
      title: "drugs",
      desc: "drugsDesc",
      image: "/activity/08.jpeg",
    },
    {
      icon: Music,
      title: "culture",
      desc: "cultureDesc",
      image: "/13dofa/পর্যটন ও সংস্কৃতি বিকাশ.webp",
    },
    {
      icon: Scale,
      title: "governance",
      desc: "governanceDesc",
      image: "/activity/02.jpeg",
    },
    {
      icon: Leaf,
      title: "environment",
      desc: "environmentDesc",
      image: "/13dofa/পরিবেশ সংরক্ষণ ও সবুজায়ন.jpg",
    },
    {
      icon: Trophy,
      title: "sports",
      desc: "sportsDesc",
      image: "/13dofa/ক্রীড়া ও যুব উন্নয়ন.jpg",
    },
    {
      icon: Landmark,
      title: "parliament",
      desc: "parliamentDesc",
      image: "/activity/05.jpeg",
    },
  ]

  return (
    <section id="priorities" ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-[#006A4E] via-[#005a42] to-[#004d38] overflow-hidden relative">
      {/* Grid/Graph pattern background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Parallax Layer - Gradient orbs */}
      <div ref={layer1Ref} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-radial from-emerald-400/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-radial from-teal-300/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-white/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{t("title")}</h2>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">{t("subtitle")}</p>
        </div>

        <div ref={swiperRef}>
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            spaceBetween={24}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            speed={500}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-3 !h-3 !mx-1.5 !transition-all !duration-300",
              bulletActiveClass: "!bg-accent !w-4 !h-4",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            }}
            className="pb-16"
          >
            {areas.map((area, index) => (
              <SwiperSlide key={index}>
                <div
                  className="group cursor-pointer h-full"
                  onClick={() => setSelectedArea(index)}
                >
                  <div className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden bg-[#005a42] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-red-500/30">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={area.image}
                        alt={t(area.title)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Red shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-800/40 to-transparent" />
                      {/* Hover intensify red effect */}
                      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-red-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <area.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{t(area.title)}</h3>
                      </div>
                    </div>

                    {/* Click indicator */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-white text-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Click for details
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedArea !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArea(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-48">
              <Image
                src={areas[selectedArea].image}
                alt={t(areas[selectedArea].title)}
                fill
                className="object-cover"
                sizes="512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#006A4E] via-[#006A4E]/50 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                  {(() => {
                    const IconComponent = areas[selectedArea].icon
                    return <IconComponent className="w-6 h-6 text-white" />
                  })()}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {t(areas[selectedArea].title)}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {t(areas[selectedArea].desc)}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setSelectedArea(null)}
                className="w-full py-3 bg-[#006A4E] text-white rounded-xl font-semibold hover:bg-[#005a42] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

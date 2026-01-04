"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Calendar, Briefcase } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function DiscoverMore() {
  const { lang, isRTL } = useLanguageContext();

  const cards = [
    {
      id: "news",
      titleEn: "Latest News",
      titleAr: "أحدث الأخبار",
      descEn: "Stay informed with the latest updates, announcements, and industry insights from Sobek Egypt Pharma.",
      descAr: "ابق على اطلاع بأحدث التحديثات والإعلانات والرؤى الصناعية من سوبك مصر فارما.",
      icon: Newspaper,
      link: "/media/news",
      color: "text-blue-600",
      hoverColor: "group-hover:text-blue-600",
      gradient: "from-blue-500 to-blue-700",
      image: "/Scientific-Inquiry-1.jpg",
      delay: 0,
    },
    {
      id: "events",
      titleEn: "Upcoming Events",
      titleAr: "الأحداث القادمة",
      descEn: "Join us at conferences, seminars, and networking events to connect with industry leaders.",
      descAr: "انضم إلينا في المؤتمرات والندوات وأحداث التواصل للتواصل مع قادة الصناعة.",
      icon: Calendar,
      link: "/media/events",
      color: "text-red-600",
      hoverColor: "group-hover:text-red-600",
      gradient: "from-red-500 to-red-700",
      image: "/hero-bg-2.jpg",
      delay: 0.1,
    },
    {
      id: "careers",
      titleEn: "Join Our Team",
      titleAr: "انضم لفريقنا",
      descEn: "Explore exciting career opportunities and become part of a team dedicated to improving healthcare.",
      descAr: "استكشف فرص عمل مثيرة وكن جزءاً من فريق مكرس لتحسين الرعاية الصحية.",
      icon: Briefcase,
      link: "/careers",
      color: "text-purple-600",
      hoverColor: "group-hover:text-purple-600",
      gradient: "from-purple-500 to-purple-700",
      image: "/team-work.jpg",
      delay: 0.2,
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                {lang === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
              </span>
              <span className="w-8 h-[2px] bg-blue-600"></span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? (
                <>ابق متصلاً <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">& تطور معنا</span></>
              ) : (
                <>Stay Connected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">& Grow</span></>
              )}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'استكشف أحدث أخبارنا والأحداث القادمة وفرص العمل المثيرة التي تشكل مستقبل الرعاية الصحية'
                : 'Explore our latest news, upcoming events, and exciting career opportunities shaping the future of healthcare'
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={card.link} className="block h-full">
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Card Header / Image Area */}
                  <div className={`h-48 relative overflow-hidden`}>
                    <Image
                      src={card.image}
                      alt={lang === 'ar' ? card.titleAr : card.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Abstract Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                        </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 pt-14 relative">
                    {/* Floating Icon */}
                    <div className={`absolute -top-10 ${isRTL ? 'right-8' : 'left-8'}`}>
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border-4 border-white relative overflow-hidden">
                            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${card.gradient}`}></div>
                            <card.icon className={`w-10 h-10 ${card.color} relative z-10`} />
                        </div>
                    </div>

                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${card.hoverColor} transition-colors`}>
                      {lang === 'ar' ? card.titleAr : card.titleEn}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {lang === 'ar' ? card.descAr : card.descEn}
                    </p>
                    
                    <div className={`flex items-center font-semibold ${card.color} group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}</span>
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

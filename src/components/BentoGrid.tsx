"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Microscope, Factory, HeartPulse, Stethoscope } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";

export default function BentoGrid() {
  const { lang, isRTL } = useLanguageContext();

  const items = [
    {
      id: "human",
      titleEn: "Human Pharmaceuticals",
      titleAr: "الأدوية البشرية",
      descEn: "Advanced therapeutic solutions for better health.",
      descAr: "حلول علاجية متطورة لصحة أفضل.",
      icon: HeartPulse,
      image: "/3Scientistssmall-1.jpg",
      link: "/products/human-new",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-2",
    },
    {
      id: "vet",
      titleEn: "Veterinary Health",
      titleAr: "الصحة البيطرية",
      descEn: "Protecting animal health and livestock.",
      descAr: "حماية صحة الحيوان والثروة الحيوانية.",
      icon: Stethoscope,
      image: "/hero-bg-3.jpg",
      link: "/products/veterinary-new",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
    },
    {
      id: "rd",
      titleEn: "R&D Innovation",
      titleAr: "البحث والتطوير",
      descEn: "Pioneering the future of medicine.",
      descAr: "ريادة مستقبل الطب.",
      icon: Microscope,
      image: "/Scientific-Inquiry-1.jpg",
      link: "/rd",
      colSpan: "md:col-span-1",
      rowSpan: "md:row-span-1",
    },
    {
      id: "manufacturing",
      titleEn: "Manufacturing",
      titleAr: "التصنيع",
      descEn: "State-of-the-art GMP facilities.",
      descAr: "مرافق تصنيع عالمية المستوى.",
      icon: Factory,
      image: "/hero-bg-2.jpg",
      link: "/manufacturing",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-8 h-[2px] bg-red-600"></span>
            <span className="text-red-600 font-bold uppercase tracking-wider text-sm">
              {lang === 'ar' ? 'مجالات تميزنا' : 'Our Focus Areas'}
            </span>
            <span className="w-8 h-[2px] bg-red-600"></span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {lang === 'ar' ? (
              <>حلول متكاملة <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">للرعاية الصحية</span></>
            ) : (
              <>Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Healthcare Solutions</span></>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {lang === 'ar'
              ? 'نقدم حلولاً متكاملة في مختلف قطاعات الرعاية الصحية بمعايير جودة عالمية'
              : 'Delivering comprehensive solutions across various healthcare sectors with global quality standards'
            }
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl ${item.colSpan} ${item.rowSpan} bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-500`}
            >
              <Link href={item.link} className="block h-full w-full">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                  <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="mb-6 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 transition-colors duration-500 shadow-lg">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-red-50 transition-colors duration-300">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>

                    <div className="overflow-hidden">
                      <p className="text-gray-300 mb-6 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {lang === 'ar' ? item.descAr : item.descEn}
                      </p>
                    </div>

                    <div className={`flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-red-400 group-hover:text-white transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'اكتشف المزيد' : 'Explore'}</span>
                      <ArrowRight className={`w-5 h-5 transition-transform duration-500 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                    </div>
                  </div>
                </div>

                {/* Subtle border highlight on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

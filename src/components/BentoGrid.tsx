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
      color: "bg-blue-600",
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
      color: "bg-emerald-600",
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
      color: "bg-purple-600",
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
      color: "bg-slate-800",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {lang === 'ar' ? 'مجالات تميزنا' : 'Our Focus Areas'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {lang === 'ar' 
              ? 'نقدم حلولاً متكاملة في مختلف قطاعات الرعاية الصحية'
              : 'Delivering comprehensive solutions across various healthcare sectors'
            }
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl ${item.colSpan} ${item.rowSpan}`}
            >
              <Link href={item.link} className="block h-full w-full">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-70 ${item.color}`} />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="mb-4 p-3 bg-white/20 backdrop-blur-md rounded-xl w-fit">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    
                    <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>
                    
                    <div className={`flex items-center gap-2 font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                      <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
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

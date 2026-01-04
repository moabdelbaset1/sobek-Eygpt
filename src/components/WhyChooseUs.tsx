"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Microscope, Globe2, Users, Award, Leaf } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";

const features = [
  {
    icon: ShieldCheck,
    titleEn: "Global Quality Standards",
    titleAr: "معايير الجودة العالمية",
    descEn: "GMP & ISO 9001:2015 certified manufacturing facilities ensuring highest safety.",
    descAr: "مرافق تصنيع معتمدة من GMP و ISO 9001:2015 لضمان أعلى مستويات السلامة.",
  },
  {
    icon: Microscope,
    titleEn: "Advanced R&D",
    titleAr: "بحث وتطوير متطور",
    descEn: "Continuous innovation in pharmaceutical formulations and drug delivery systems.",
    descAr: "ابتكار مستمر في التركيبات الدوائية وأنظمة توصيل الدواء.",
  },
  {
    icon: Globe2,
    titleEn: "Global Reach",
    titleAr: "انتشار عالمي",
    descEn: "Exporting trusted pharmaceutical products to over 20 countries worldwide.",
    descAr: "تصدير منتجات دوائية موثوقة لأكثر من 20 دولة حول العالم.",
  },
  {
    icon: Users,
    titleEn: "Expert Team",
    titleAr: "فريق من الخبراء",
    descEn: "Over 500 dedicated professionals driving excellence in healthcare.",
    descAr: "أكثر من 500 متخصص يكرسون جهودهم للتميز في الرعاية الصحية.",
  },
  {
    icon: Award,
    titleEn: "Certified Excellence",
    titleAr: "تميز معتمد",
    descEn: "Recognized by international health authorities for compliance and quality.",
    descAr: "معترف بنا من قبل الهيئات الصحية الدولية للامتثال والجودة.",
  },
  {
    icon: Leaf,
    titleEn: "Sustainability",
    titleAr: "الاستدامة",
    descEn: "Committed to environmentally responsible manufacturing practices.",
    descAr: "ملتزمون بممارسات التصنيع المسؤولة بيئياً.",
  },
];

export default function WhyChooseUs() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20"
          >
            {lang === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {lang === 'ar' ? (
              <>التميز في <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">كل تفصيلة</span></>
            ) : (
              <>Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Every Detail</span></>
            )}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {lang === 'ar'
              ? 'نتميز بالجودة والابتكار والالتزام بأعلى المعايير الدولية في صناعة الأدوية لضمان صحة أفضل للجميع.'
              : 'Distinguished by quality, innovation, and commitment to the highest international standards in pharmaceutical manufacturing.'
            }
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-emerald-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {lang === 'ar' ? feature.titleAr : feature.titleEn}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {lang === 'ar' ? feature.descAr : feature.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

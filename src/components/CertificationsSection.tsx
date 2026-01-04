"use client";

import { motion } from "framer-motion";
import { Award, Shield, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";

export default function CertificationsSection() {
  const { lang } = useLanguageContext();

  const certifications = [
    {
      id: 1,
      titleEn: "GMP Certified",
      titleAr: "شهادة GMP",
      icon: Award,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      id: 2,
      titleEn: "ISO 9001:2015",
      titleAr: "أيزو 9001:2015",
      icon: Shield,
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      id: 3,
      titleEn: "WHO GMP",
      titleAr: "منظمة الصحة العالمية",
      icon: TrendingUp,
      color: "purple",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      id: 4,
      titleEn: "Egyptian MOH",
      titleAr: "وزارة الصحة المصرية",
      icon: Users,
      color: "red",
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {lang === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications & Accreditations'}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'معتمدون من أبرز الهيئات الدولية في مجال صناعة الأدوية'
                : 'Certified by leading international bodies in pharmaceutical manufacturing'
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className={`w-24 h-24 ${cert.bg} rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md`}>
                <cert.icon className={`w-10 h-10 ${cert.text}`} />
              </div>
              <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                {lang === 'ar' ? cert.titleAr : cert.titleEn}
              </span>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CheckCircle className={`w-5 h-5 ${cert.text}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

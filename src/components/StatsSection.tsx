"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FlaskConical, Globe2, Users, Award } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";

const stats = [
  {
    id: 1,
    icon: Award,
    value: 20,
    suffix: "+",
    labelEn: "Years of Experience",
    labelAr: "سنة من الخبرة",
  },
  {
    id: 2,
    icon: FlaskConical,
    value: 150,
    suffix: "+",
    labelEn: "Products Developed",
    labelAr: "منتج تم تطويره",
  },
  {
    id: 3,
    icon: Globe2,
    value: 15,
    suffix: "+",
    labelEn: "Countries Exported To",
    labelAr: "دولة نصدر لها",
  },
  {
    id: 4,
    icon: Users,
    value: 500,
    suffix: "+",
    labelEn: "Dedicated Employees",
    labelAr: "موظف متخصص",
  },
];

export default function StatsSection() {
  const { lang } = useLanguageContext();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-600 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-sans">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              
              <p className="text-gray-500 font-medium">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

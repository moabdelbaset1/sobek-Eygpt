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
    <section className="py-16 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-6 p-4 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors duration-500">
                <stat.icon className="w-8 h-8" />
              </div>

              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-sans tracking-tight">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>

              <p className="text-gray-500 font-medium text-sm md:text-base uppercase tracking-wider">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

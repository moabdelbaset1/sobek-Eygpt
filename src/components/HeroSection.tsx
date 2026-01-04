"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function HeroSection() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/sobek-group.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-[url('/hero-bg-2.jpg')] bg-cover bg-center" />
        </video>
        {/* Overlay Gradient - Royal Blue tint for professionalism */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/30" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-8 lg:px-16 flex items-center">
        <div className={`max-w-4xl ${isRTL ? 'mr-0 md:mr-10' : 'ml-0 md:ml-10'}`}>
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {lang === 'ar' ? 'رائدون في الصناعات الدوائية' : 'Leading Pharmaceutical Innovation'}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          >
            {lang === 'ar' ? (
              <>
                نمكن الحياة <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  بالعلم والابتكار
                </span>
              </>
            ) : (
              <>
                Empowering Life <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Through Science
                </span>
              </>
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed"
          >
            {lang === 'ar' 
              ? 'نجمع بين الخبرة العريقة والتكنولوجيا الحديثة لتقديم حلول دوائية ترتقي بجودة الحياة وتضمن مستقبلاً صحياً أفضل للجميع.'
              : 'Bridging heritage with modern technology to deliver pharmaceutical solutions that elevate quality of life and ensure a healthier future for all.'
            }
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/products/human-new"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">{lang === 'ar' ? 'اكتشف منتجاتنا' : 'Discover Products'}</span>
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            </Link>
            
            <button 
              className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{lang === 'ar' ? 'شاهد قصتنا' : 'Watch Our Story'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">{lang === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

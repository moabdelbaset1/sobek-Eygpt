"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, X, Pill } from "lucide-react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Image from "next/image";
import { useState } from "react";
import dynamic from 'next/dynamic';

const HeroMolecule = dynamic(() => import('@/components/3d/HeroMolecule'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-900" />
});

export default function HeroSection() {
  const { lang, isRTL } = useLanguageContext();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative h-[92vh] w-full overflow-hidden bg-slate-900">
        {/* 3D Background Canvas */}
        <div className="absolute inset-0 w-full h-full z-0">
          <HeroMolecule />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative h-full container mx-auto px-4 md:px-8 lg:px-16 flex items-center z-10">
          <div className={`max-w-4xl ${isRTL ? 'mr-0 md:mr-10' : 'ml-0 md:ml-10'}`}>

            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-100 mb-4"
            >
              <Pill className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase">
                {lang === 'ar' ? 'رائدون في الصناعات الدوائية' : 'Leading Pharmaceutical Innovation'}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4"
            >
              {lang === 'ar' ? (
                <>
                  نمكن الحياة <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                    بالعلم والابتكار
                  </span>
                </>
              ) : (
                <>
                  Empowering Life <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                    Through Science
                  </span>
                </>
              )}
            </motion.h1>

            {/* Subheading - Marketing Copy */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed font-light"
            >
              {lang === 'ar'
                ? 'في سوبك، نصيغ مستقبل العافية. ندمج دقة العلم مع شغف الرعاية لنقدم حلولاً دوائية تتجاوز العلاج إلى جودة الحياة. شريكك الموثوق للصحة المستدامة.'
                : 'At Sobek, we formulate the future of wellness. Merging scientific precision with compassionate care to deliver pharmaceutical solutions that go beyond treatment to quality of life. Your trusted partner for sustainable health.'
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
                className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-red-600/20"
              >
                <span className="relative z-10">{lang === 'ar' ? 'اكتشف منتجاتنا' : 'Discover Products'}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </Link>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="group px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PlayCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                <span>{lang === 'ar' ? 'شاهد قصتنا' : 'Watch Our Story'}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 md:p-8"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src="/sobek-group.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

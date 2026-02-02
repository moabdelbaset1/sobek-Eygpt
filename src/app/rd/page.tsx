"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguageContext } from "@/lib/LanguageContext";
import { 
  Microscope, 
  FlaskConical, 
  Dna, 
  Atom, 
  ShieldCheck, 
  Activity, 
  Thermometer, 
  Search,
  CheckCircle2,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function RDPage() {
  const { lang, isRTL } = useLanguageContext();
  const [currentSlide, setCurrentSlide] = useState(0);

  const equipmentSlides = [
    {
      titleEn: "High Performance Liquid Chromatography (HPLC)",
      titleAr: "أنظمة HPLC عالية الأداء",
      descEn: "State-of-the-art Waters and Agilent systems for precise pharmaceutical analysis and purity testing.",
      descAr: "أنظمة Waters و Agilent متطورة للتحليل الصيدلاني الدقيق واختبار النقاوة.",
      image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2052&auto=format&fit=crop"
    },
    {
      titleEn: "Laboratory Incubators",
      titleAr: "الحضانات المعملية الكبيرة",
      descEn: "Advanced incubation systems ensuring optimal conditions for microbiological cultures and stability studies.",
      descAr: "أنظمة تحضين متقدمة تضمن الظروف المثالية للمزارع الميكروبية ودراسات الثبات.",
      image: "https://images.unsplash.com/photo-1581093588401-fbb0736de812?q=80&w=2080&auto=format&fit=crop"
    },
    {
      titleEn: "Gas Chromatography (GC)",
      titleAr: "كروماتوغرافيا الغاز (GC)",
      descEn: "High-sensitivity GC units for volatile compound analysis and residual solvent testing.",
      descAr: "وحدات GC عالية الحساسية لتحليل المركبات المتطايرة واختبار المذيبات المتبقية.",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2080&auto=format&fit=crop"
    },
    {
      titleEn: "Dissolution Testers",
      titleAr: "أجهزة اختبار الذوبان",
      descEn: "Automated dissolution testing stations for consistent drug release profiling.",
      descAr: "محطات آلية لاختبار الذوبان للتحقق من ثبات معدل تحلل الدواء.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2080&auto=format&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % equipmentSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + equipmentSlides.length) % equipmentSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const content = {
    hero: {
      title: lang === 'ar' ? "البحث والتطوير" : "Research & Development",
      subtitle: lang === 'ar' 
        ? "الابتكار هو جوهر أعمالنا. نحن نطور حلولاً صيدلانية متقدمة لمستقبل أكثر صحة."
        : "Innovation is at our core. Developing advanced pharmaceutical solutions for a healthier tomorrow.",
    },
    intro: {
      title: lang === 'ar' ? "قلب الابتكار في سوبك" : "The Heart of Innovation at Sobek",
      desc1: lang === 'ar'
        ? "يقع قسم البحث والتطوير لدينا في قلب عملياتنا، حيث نسعى جاهدين لتحسين المنتجات الحالية وابتكار علاجات جديدة."
        : "Our R&D department lies at the heart of our operations, where we strive to improve existing products and innovate new therapies.",
      desc2: lang === 'ar'
        ? "نمتلك فريقاً من العلماء والباحثين المتخصصين الذين يعملون بأحدث التقنيات لضمان أعلى معايير الجودة والفعالية."
        : "We boast a team of specialized scientists and researchers working with state-of-the-art technology to ensure the highest standards of quality and efficacy.",
    },
    capabilities: {
      title: lang === 'ar' ? "إمكانيات المعمل المتقدمة" : "Advanced Laboratory Capabilities",
      items: [
        {
          titleEn: "Analytical Method Development",
          titleAr: "تطوير طرق التحليل",
          descEn: "Development and validation of precise analytical methods using HPLC and GC.",
          descAr: "تطوير والتحقق من طرق التحليل الدقيقة باستخدام HPLC و GC.",
          icon: Search
        },
        {
          titleEn: "Formulation Development",
          titleAr: "تطوير التركيبات",
          descEn: "Creating stable and effective formulations for various dosage forms.",
          descAr: "ابتكار تركيبات مستقرة وفعالة لمختلف الأشكال الصيدلانية.",
          icon: FlaskConical
        },
        {
          titleEn: "Stability Studies",
          titleAr: "دراسات الثبات",
          descEn: "Comprehensive stability testing according to ICH guidelines.",
          descAr: "اختبارات ثبات شاملة وفقاً لإرشادات ICH.",
          icon: Thermometer
        },
        {
          titleEn: "Dissolution Testing",
          titleAr: "اختبار معدل الذوبان",
          descEn: "Ensuring optimal drug release profiles for maximum efficacy.",
          descAr: "ضمان معدلات تحلل مثالية للدواء لتحقيق أقصى فعالية.",
          icon: Activity
        }
      ]
    },
    microbiology: {
      title: lang === 'ar' ? "قسم الميكروبيولوجي" : "Microbiology Department",
      subtitle: lang === 'ar' 
        ? "ضمان السلامة والتعقيم في كل خطوة"
        : "Ensuring Safety and Sterility at Every Step",
      desc: lang === 'ar'
        ? "تم تجهيز معمل الميكروبيولوجي لدينا بأحدث التقنيات للكشف عن التلوث الميكروبي وضمان سلامة المنتجات الصيدلانية."
        : "Our Microbiology lab is equipped with the latest technology to detect microbial contamination and ensure the safety of pharmaceutical products.",
      features: [
        { en: "Sterility Testing", ar: "اختبار العقامة" },
        { en: "Bacterial Endotoxin Testing", ar: "اختبار السموم البكتيرية" },
        { en: "Environmental Monitoring", ar: "الرقابة البيئية" },
        { en: "Microbial Limit Testing", ar: "اختبار الحدود الميكروبية" },
        { en: "Preservative Efficacy", ar: "فعالية المواد الحافظة" },
        { en: "Water System Validation", ar: "التحقق من أنظمة المياه" }
      ]
    },
    equipment: {
      title: lang === 'ar' ? "أحدث التجهيزات" : "State-of-the-Art Equipment",
      list: [
        { name: "HPLC Systems (Waters/Agilent)", icon: CheckCircle2 },
        { name: "Gas Chromatography (GC)", icon: CheckCircle2 },
        { name: "UV-Vis Spectrophotometers", icon: CheckCircle2 },
        { name: "FTIR Spectrometers", icon: CheckCircle2 },
        { name: "Climate Chambers", icon: CheckCircle2 },
        { name: "Dissolution Testers", icon: CheckCircle2 },
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
            alt="R&D Lab"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-black/60 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Dna className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-zinc-200 max-w-3xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - The Lab Context */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop" 
                  alt="Scientist working"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-red-600 rounded-full" />
                <span className="text-red-600 font-semibold tracking-wider uppercase">
                  {lang === 'ar' ? "رؤيتنا البحثية" : "Research Vision"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {content.intro.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {content.intro.desc1}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.intro.desc2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* R&D Capabilities Cards */}
      <section className="py-20 bg-zinc-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.capabilities.title}
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {content.capabilities.items.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-600 group"
              >
                <div className="mb-6 p-4 bg-red-50 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                  <item.icon className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-600">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Microbiology Section */}
      <section className="py-20 relative bg-gray-900 text-white overflow-hidden">
        {/* Abstract Micro background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="micro-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="15" cy="5" r="1" fill="currentColor" />
            </pattern>
            <rect width="100" height="100" fill="url(#micro-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Microscope className="w-8 h-8 text-cyan-400" />
                <span className="text-cyan-400 font-bold tracking-widest text-sm uppercase">
                  {lang === 'ar' ? "الدقة البيولوجية" : "Biological Precision"}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {content.microbiology.title}
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
                {content.microbiology.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.microbiology.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mx-2" />
                    <span>{lang === 'ar' ? feature.ar : feature.en}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                 <Image 
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop" 
                  alt="Microbiology Lab"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 text-cyan-400 mb-2">
                    <Atom className="w-6 h-6 animate-spin" />
                    <span className="font-semibold uppercase tracking-wider">
                      {lang === 'ar' ? "بيئة معقمة" : "Sterile Environment"}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                   {lang === 'ar' 
                     ? "معايير ISO 14644 - فئة الغرف النظيفة" 
                     : "ISO 14644 Standards - Clean Room Classifications"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Gallery Slider Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? "صور من داخل المعمل" : "Laboratory Gallery"}
             </h2>
             <p className="text-gray-600 max-w-2xl mx-auto">
               {lang === 'ar' 
                 ? "جولة بصرية في معاملنا المجهزة بأحدث تقنيات التحليل والبحث العلمي." 
                 : "A visual tour of our labs equipped with the latest analysis and scientific research technologies."}
             </p>
           </div>

           <div className="relative max-w-5xl mx-auto h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 group">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentSlide}
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.7 }}
                 className="absolute inset-0"
               >
                 <Image
                   src={equipmentSlides[currentSlide].image}
                   alt={equipmentSlides[currentSlide].titleEn}
                   fill
                   className="object-cover"
                   sizes="(max-width: 1024px) 100vw, 80vw"
                   unoptimized
                 />
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                 
                 {/* Text Content */}
                 <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                   <motion.h3 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="text-2xl md:text-4xl font-bold mb-3"
                   >
                     {lang === 'ar' ? equipmentSlides[currentSlide].titleAr : equipmentSlides[currentSlide].titleEn}
                   </motion.h3>
                   <motion.p 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="text-lg text-gray-200 max-w-3xl"
                   >
                     {lang === 'ar' ? equipmentSlides[currentSlide].descAr : equipmentSlides[currentSlide].descEn}
                   </motion.p>
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Navigation Buttons */}
             <div className="absolute bottom-8 right-8 flex gap-4 z-10 rtl:right-auto rtl:left-8">
               <button 
                 onClick={prevSlide}
                 className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all"
                 aria-label="Previous Slide"
               >
                 <ArrowLeft className="w-6 h-6 rtl:rotate-180" />
               </button>
               <button 
                 onClick={nextSlide}
                 className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all"
                 aria-label="Next Slide"
               >
                 <ArrowRight className="w-6 h-6 rtl:rotate-180" />
               </button>
             </div>

             {/* Indicators */}
             <div className="absolute top-8 right-8 flex gap-2 rtl:right-auto rtl:left-8 z-10">
               {equipmentSlides.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentSlide(idx)}
                   className={`h-1.5 rounded-full transition-all duration-300 ${
                     currentSlide === idx ? "w-8 bg-red-500" : "w-4 bg-white/50 hover:bg-white"
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
             </div>
           </div>
        </div>
      </section>

    </div>
  );
}



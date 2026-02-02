"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/useLanguage";
import {
  ShieldCheck,
  Microscope,
  FileCheck,
  Leaf,
  Activity,
  Award,
  FlaskConical,
  Search,
  CheckCircle2,
  ArrowRight,
  Target
} from "lucide-react";

// Data Structure for Quality Page
const qualitySteps = [
  {
    id: 1,
    title: "Raw Material Inspection",
    titleAr: "فحص المواد الخام",
    description: "Every batch of raw material undergoes rigorous chemical and physical analysis before entering our warehouse using FTIR and HPLC identification.",
    descriptionAr: "تخضع كل دفعة من المواد الخام لتحليل كيميائي وفيزيائي صارم قبل دخولها مستودعاتنا باستخدام تقنيات FTIR و HPLC للتعرف على الهوية.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "In-Process Control (IPC)",
    titleAr: "الرقابة أثناء التصنيع",
    description: "Automated real-time monitoring of critical parameters during manufacturing (pH, viscosity, hardness) to ensure uniformity.",
    descriptionAr: "مراقبة آلية في الوقت الفعلي للمعايير الحرجة أثناء التصنيع (الحموضة، اللزوجة، الصلابة) لضمان التجانس.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2079&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Lab Analysis (QC)",
    titleAr: "تحاليل المعمل",
    description: "Final product testing in our ISO 17025 accredited labs comprising Microbiology, Chromatography, and Stability centers.",
    descriptionAr: "اختبار المنتج النهائي في معاملنا المعتمدة وفق ISO 17025 والتي تشمل مراكز الميكروبيولوجيا والكروماتوغرافيا والثبات.",
    icon: Microscope,
    image: "https://images.unsplash.com/photo-1581093588401-fbb07366f531?q=80&w=2068&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Final Release (QA)",
    titleAr: "الإفراج النهائي",
    description: "Comprehensive review of batch records and compliance data by Quality Assurance before market release.",
    descriptionAr: "مراجعة شاملة لسجلات الدفعة وبيانات الامتثال من قبل ضمان الجودة قبل طرحها في السوق.",
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  }
];

const technologies = [
  {
    name: "HPLC Systems",
    nameAr: "أنظمة HPLC",
    desc: "High-Performance Liquid Chromatography for precise active ingredient assay.",
    descAr: "كروماتوغرافيا سائلة عالية الأداء لقياس المادة الفعالة بدقة.",
    icon: Activity
  },
  {
    name: "Atomic Absorption",
    nameAr: "الامتصاص الذري",
    desc: "Detecting trace elements and heavy metals with ppb sensitivity.",
    descAr: "الكشف عن العناصر النزرة والمعادن الثقيلة بحساسية تصل إلى أجزاء من المليار.",
    icon: Target
  },
  {
    name: "FTIR Spectroscopy",
    nameAr: "مطيافية FTIR",
    desc: "Fingerprint identification of raw materials ensuring 100% authenticity.",
    descAr: "التعرف على بصمة المواد الخام لضمان أصالتها بنسبة 100%.",
    icon: Search
  },
  {
    name: "Microbiology Unit",
    nameAr: "وحدة الميكروبيولوجيا",
    desc: "Sterility testing and microbial limit quantification in Class A isolators.",
    descAr: "اختبارات التعقيم وتحديد الحدود الميكروبية في عوازل الفئة A.",
    icon: FlaskConical
  }
];

const certifications = [
  { name: "ISO 9001:2015", nameAr: "ISO 9001:2015", desc: "Quality Management System", descAr: "نظام إدارة الجودة", date: "Valid until 2028", dateAr: "صالح حتى 2028" },
  { name: "ISO 14001", nameAr: "ISO 14001", desc: "Environmental Management", descAr: "الإدارة البيئية", date: "Valid until 2027", dateAr: "صالح حتى 2027" },
  { name: "GMP Certified", nameAr: "شهادة GMP", desc: "Good Manufacturing Practice", descAr: "ممارسات التصنيع الجيدة", date: "Ministry of Health", dateAr: "وزارة الصحة" },
  { name: "GLP Compliant", nameAr: "متوافق مع GLP", desc: "Good Laboratory Practice", descAr: "ممارسات المعمل الجيدة", date: "Accredited Lab", dateAr: "معمل معتمد" }
];

// Translations object
const translations = {
  en: {
    hero: {
      badge: "Uncompromising Safety",
      title1: "Quality is our",
      title2: "DNA Code",
      subtitle: "Behind every dose lies a relentless pursuit of perfection. We define the standard for pharmaceutical excellence in Egypt and beyond.",
      scroll: "Explore Our Standards"
    },
    lab: {
      title1: "Precision Engineering",
      title2: "In Every Analysis",
      desc: "Our labs are not just rooms with equipment; they are advanced analytical hubs equipped with the latest spectroscopy and chromatography technologies, ensuring that every molecule meets the strictest international specifications.",
      accuracy: "Analysis Accuracy"
    },
    journey: {
      badge: "Validating Excellence",
      title: "From Molecule to Medicine"
    },
    certs: {
      title: "Recognized Quality",
      desc: "Our commitment to quality is validated by national and international accreditation bodies.",
      btn: "Request Audit"
    },
    green: {
      title: "Green & Safe Manufacturing",
      desc: "Quality isn't just about the product; it's about the planet. We implement zero-liquid discharge systems and advanced air filtration to protect our environment and community.",
      items: ["Wastewater Treatment", "Solar Energy Integration", "Low Emission HVAC"]
    }
  },
  ar: {
    hero: {
      badge: "سلامة بلا تنازلات",
      title1: "الجودة هي",
      title2: "شفرتنا الوراثية",
      subtitle: "وراء كل جرعة يكمن سعي لا يتوقف نحو الكمال. نحن نحدد معايير التميز الدوائي في مصر وخارجها.",
      scroll: "اكتشف معاييرنا"
    },
    lab: {
      title1: "هندسة دقيقة",
      title2: "في كل تحليل",
      desc: "معاملنا ليست مجرد غرف بها معدات؛ إنها مراكز تحليلية متقدمة مجهزة بأحدث تقنيات المطيافية والكروماتوغرافيا، لضمان أن كل جزيء يلبي أدق المواصفات الدولية.",
      accuracy: "دقة التحليل"
    },
    journey: {
      badge: "التحقق من التميز",
      title: "من الجزيء إلى الدواء"
    },
    certs: {
      title: "جودة معترف بها",
      desc: "التزامنا بالجودة معتمد من هيئات اعتماد وطنية ودولية.",
      btn: "طلب تدقيق"
    },
    green: {
      title: "تصنيع أخضر وآمن",
      desc: "الجودة لا تتعلق فقط بالمنتج؛ بل تتعلق بالكوكب. نطبق أنظمة التصريف الصفري للسوائل والترشيح المتقدم للهواء لحماية بيئتنا ومجتمعنا.",
      items: ["معالجة مياه الصرف", "تكامل الطاقة الشمسية", "تكييف منخفض الانبعاثات"]
    }
  }
};

export default function QualityPage() {
  const { lang, isRTL } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div ref={containerRef} dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen bg-white overflow-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
            alt="Quality Lab"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-blue-400/30 rounded-full bg-blue-900/30 backdrop-blur-md text-blue-300 font-medium mb-8"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.hero.badge}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-tight"
          >
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t.hero.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
          <ArrowRight className="w-5 h-5 rotate-90" />
        </motion.div>
      </section>

      {/* 2. Intelligent Lab Section (Dark Tech Theme) */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-4xl md:text-5xl font-bold mb-8">
                 {t.lab.title1} <br />
                 <span className="text-blue-400">{t.lab.title2}</span>
               </h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-10">
                 {t.lab.desc}
               </p>

               <div className="grid sm:grid-cols-2 gap-6">
                 {technologies.map((tech, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-blue-600/10 hover:border-blue-500/50 transition-all group"
                   >
                     <tech.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                     <h3 className="font-bold text-lg mb-2">{lang === 'ar' ? tech.nameAr : tech.name}</h3>
                     <p className="text-sm text-slate-400">{lang === 'ar' ? tech.descAr : tech.desc}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
             
             <div className="relative h-[600px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl shadow-blue-900/20">
               <Image 
                 src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
                 alt="High Tech Lab"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
               <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'}`}>
                 <div className="text-5xl font-bold text-white mb-2">99.9%</div>
                 <div className="text-blue-400 uppercase tracking-widest text-sm font-bold">{t.lab.accuracy}</div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 3. The Quality Journey (Interactive Timeline) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">{t.journey.badge}</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">{t.journey.title}</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Steps List */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-4">
              {qualitySteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`text-${isRTL ? 'right' : 'left'} p-6 rounded-2xl transition-all duration-300 border-${isRTL ? 'r' : 'l'}-4 group ${
                    activeStep === index
                      ? "bg-white shadow-xl shadow-blue-900/5 border-blue-600 scale-105"
                      : "bg-transparent border-gray-200 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-black ${activeStep === index ? "text-blue-200" : "text-gray-200"}`}>0{step.id}</span>
                    <div>
                      <h3 className={`font-bold text-lg ${activeStep === index ? "text-blue-800" : "text-gray-600"}`}>
                        {lang === 'ar' ? step.titleAr : step.title}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Visual Display */}
            <div className="lg:col-span-8 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={qualitySteps[activeStep].image}
                    alt={qualitySteps[activeStep].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-${isRTL ? 'l' : 'r'} from-blue-900/90 to-transparent`}></div>
                  
                  <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} p-12 max-w-xl text-white`}>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                       {(() => {
                         const Icon = qualitySteps[activeStep].icon;
                         return <Icon className="w-8 h-8 text-white" />;
                       })()}
                    </div>
                    <h3 className="text-4xl font-bold mb-4">
                      {lang === 'ar' ? qualitySteps[activeStep].titleAr : qualitySteps[activeStep].title}
                    </h3>
                    <p className="text-lg text-blue-100 leading-relaxed">
                      {lang === 'ar' ? qualitySteps[activeStep].descriptionAr : qualitySteps[activeStep].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications Wall */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
               <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.certs.title}</h2>
               <p className="text-xl text-gray-500 max-w-2xl">
                 {t.certs.desc}
               </p>
             </div>
             <Link href="/contact-us" className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-all">
               {t.certs.btn}
             </Link>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {certifications.map((cert, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all group cursor-default"
               >
                 <Award className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === 'ar' ? cert.nameAr : cert.name}</h3>
                 <p className="text-gray-600 font-medium mb-4">{lang === 'ar' ? cert.descAr : cert.desc}</p>
                 <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
                   <CheckCircle2 className="w-4 h-4" /> {lang === 'ar' ? cert.dateAr : cert.date}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 5. EHS & Sustainability CTA */}
      <section className="py-24 bg-green-900 text-white overflow-hidden relative">
         <div className={`absolute ${isRTL ? '-left-20' : '-right-20'} -top-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl`}></div>
         <div className={`absolute ${isRTL ? '-right-20' : '-left-20'} -bottom-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl`}></div>
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
             <Leaf className="w-10 h-10 text-green-300" />
           </div>
           
           <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.green.title}</h2>
           <p className="text-xl text-green-100 mb-10 leading-relaxed">
             {t.green.desc}
           </p>
           
           <div className="flex flex-wrap justify-center gap-4">
              {t.green.items.map((item, idx) => (
                <div key={idx} className="px-6 py-3 bg-white/10 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" /> {item}
                </div>
              ))}
           </div>
         </div>
      </section>

    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { productionLines } from "@/lib/manufacturingData";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  Eye,
  Activity,
  ChevronRight,
  ChevronLeft,
  Factory
} from "lucide-react";

const qualityFeatures = [
  {
    icon: Shield,
    title: "GMP Compliant",
    titleAr: "متوافق مع GMP",
    description: "Our facilities adhere strictly to Good Manufacturing Practices, ensuring product safety and consistency.",
  },
  {
    icon: CheckCircle,
    title: "Rigorous QA/QC",
    titleAr: "مراقبة جودة صارمة",
    description: "From raw material testing to final product release, every step is monitored and validated.",
  },
  {
    icon: Eye,
    title: "Full Traceability",
    titleAr: "تتبع كامل",
    description: "Advanced batch tracking systems allow for complete transparency throughout the supply chain.",
  },
  {
    icon: Activity,
    title: "Clean Technology",
    titleAr: "تكنولوجيا نظيفة",
    description: "Utilization of HVAC and water systems designed to exceed international pharma standards.",
  },
];

export default function ManufacturingPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);
  
  const linesArray = Object.values(productionLines);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % linesArray.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + linesArray.length) % linesArray.length);

  // Main page view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center overflow-hidden bg-gray-900">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>
          {/* Pharmaceutical Manufacturing Machinery - Industrial Production Line */}
          <Image 
            src="https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop"
            alt="Pharmaceutical Manufacturing Machinery"
            fill
            sizes="100vw"
            unoptimized
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-6">
              <Factory className="w-4 h-4" />
              Industrial Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Precision in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                Pharmaceutical
              </span>{" "}
              Manufacturing
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              State-of-the-art facilities compliant with international GMP standards, driving innovation in human and veterinary healthcare.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('production-lines')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center gap-2"
              >
                Explore Operations <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact-us" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg border border-white/20 transition-all">
                Contract Manufacturing
              </Link>
            </div>
          </div>
        </div>

        {/* Stats overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 z-20 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between">
            <div>
               <span className="block text-3xl font-bold text-white">400+</span>
               <span className="text-gray-400 text-sm">Products Portfolio</span>
            </div>
            <div className="w-px bg-white/20 h-12"></div>
            <div>
               <span className="block text-3xl font-bold text-white">3</span>
               <span className="text-gray-400 text-sm">Main Production Lines</span>
            </div>
            <div className="w-px bg-white/20 h-12"></div>
            <div>
               <span className="block text-3xl font-bold text-white">ISO</span>
               <span className="text-gray-400 text-sm">9001:2015 Certified</span>
            </div>
            <div className="w-px bg-white/20 h-12"></div>
            <div>
               <span className="block text-3xl font-bold text-white">24/7</span>
               <span className="text-gray-400 text-sm">Operational Capacity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Compliance Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">World-Class Quality Standards</h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              Our manufacturing philosophy is built on zero compromise. We adhere to the stricter standards ensuring efficacy and safety in every dose we produce.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Interactive Selector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {qualityFeatures.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`relative group w-full flex items-center gap-5 p-6 rounded-2xl text-left transition-all duration-300 border ${
                    activeFeature === index
                      ? "bg-red-600 text-white shadow-xl shadow-red-600/20 border-red-600 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 border-gray-100 hover:border-red-100 scale-100"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    activeFeature === index ? "bg-white/20 text-white" : "bg-red-50 text-red-600 group-hover:bg-red-100"
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-lg font-bold block mb-1 ${activeFeature === index ? "text-white" : "text-gray-900"}`}>
                      {feature.title}
                    </span>
                    <span className={`text-sm ${activeFeature === index ? "text-red-100" : "text-gray-400"}`}>
                      Click to view details
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeFeature === index ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2"}`} />
                </button>
              ))}
            </div>

            {/* Right Side: Content Display */}
            <div className="lg:col-span-7 h-full min-h-[400px]">
              <div className="relative h-full bg-gray-50 rounded-3xl p-8 md:p-12 overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Shield className="w-64 h-64 text-red-600" />
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col justify-center h-full"
                  >
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-600/20">
                      {(() => {
                        const Icon = qualityFeatures[activeFeature].icon;
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {qualityFeatures[activeFeature].title}
                    </h3>
                    
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                       {qualityFeatures[activeFeature].description}
                    </p>

                    <Link href="/quality" className="flex items-center gap-4 text-red-600 font-medium cursor-pointer group w-fit">
                      <div className="w-10 h-10 rounded-full border-2 border-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <span>Learn more about our standards</span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines Interactive Slider */}
      <section id="production-lines" className="py-16 text-white overflow-hidden relative bg-gray-900">
        {/* Simple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-0"></div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="mb-8 text-center">
             <span className="text-red-500 font-bold tracking-wider uppercase mb-2 block">Our Capabilities</span>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Production Lines</h2>
          </div>

          <div className="relative pb-12 lg:pb-0">
             {/* Slider Controls */}
             <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all -translate-x-1/4 lg:-translate-x-full border border-white/10"
             >
               <ChevronLeft className="w-8 h-8" />
             </button>
             
             <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all translate-x-1/4 lg:translate-x-full border border-white/10"
             >
               <ChevronRight className="w-8 h-8" />
             </button>

             {/* Cards Deck - 3D Coverflow */}
             <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
                <div className="relative w-full max-w-5xl h-full flex items-center justify-center transform-style-3d">
                  {linesArray.map((line, index) => {
                    // Calculate position relative to active slide
                    const position = (index - activeSlide + linesArray.length) % linesArray.length;
                    const isActive = position === 0;
                    const isPrev = position === linesArray.length - 1;
                    const isNext = position === 1;

                    // Determine z-index and transforms based on position
                    let zIndex = 0;
                    let x = "0%";
                    let scale = 1;
                    let rotateY = 0;
                    let opacity = 1;

                    if (isActive) {
                      zIndex = 30;
                      x = "0%";
                      scale = 1;
                      rotateY = 0;
                      opacity = 1;
                    } else if (isPrev) {
                      zIndex = 20;
                      x = "-60%";
                      scale = 0.8;
                      rotateY = 45;
                      opacity = 0.6;
                    } else if (isNext) {
                      zIndex = 20;
                      x = "60%";
                      scale = 0.8;
                      rotateY = -45;
                      opacity = 0.6;
                    }

                    return (
                      <motion.div
                        key={line.id}
                        initial={false}
                        animate={{
                          zIndex,
                          x,
                          scale,
                          rotateY,
                          opacity
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute w-full max-w-4xl bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col md:flex-row group origin-center cursor-pointer"
                        onClick={() => {
                          // Navigate on click for the active, or slide if not active
                          if (isActive) {
                             router.push('/manufacturing/machine/' + line.id);
                          } else if (isPrev) {
                             prevSlide();
                          } else if (isNext) {
                             nextSlide();
                          }
                        }}
                      >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative h-64 md:h-auto md:min-h-[500px]">
                          <Image 
                            src={line.coverImage} 
                            alt={line.title} 
                            fill 
                            sizes="(max-width: 768px) 100vw, 50vw"
                            unoptimized
                            loading="lazy"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-gray-900 md:to-gray-900/90 ${isActive ? 'opacity-100' : 'opacity-80'}`}></div>
                          {!isActive && <div className="absolute inset-0 bg-black/40 z-10"></div>}
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-900 relative">
                          <div className="flex items-center gap-4 mb-6">
                              <div className="p-3 bg-red-600/20 rounded-xl text-red-500 border border-red-500/30">
                                {(() => {
                                  const Icon = line.icon;
                                  return <Icon className="w-8 h-8" />;
                                })()}
                              </div>
                              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest border border-gray-700 px-3 py-1 rounded-full">
                                {index + 1} / {linesArray.length}
                              </div>
                          </div>
                          
                          <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{line.title}</h3>
                          {lang === 'ar' && <h4 className="text-2xl font-bold text-red-500 mb-6 font-arabic">{line.titleAr}</h4>}
                          
                          <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3 md:line-clamp-4">
                            {line.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-8">
                             {line.stats.slice(0, 2).map((stat, i) => (
                               <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                 <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                 {stat}
                               </div>
                             ))}
                          </div>

                          <div className="flex items-center gap-2 text-red-500 font-bold group-hover:gap-4 transition-all">
                            View Details <ArrowRight className="w-5 h-5" />
                          </div>
                          
                          {/* 3D reflection effect for bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/useLanguage";
import { productionLines } from "@/lib/manufacturingData";
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Activity,
  Zap,
  Settings,
  Info,
  Eye,
  X,
  Images,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "line" | "machine";

export default function MachineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useLanguage();
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode | null>(null);
  const [lineData, setLineData] = useState<any>(null);
  const [machineData, setMachineData] = useState<any>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Unwrap params
  useEffect(() => {
    params.then((unwrappedParams) => {
        setSlug(unwrappedParams.slug);
    });
  }, [params]);

  // Find data - check if it's a line or a machine
  useEffect(() => {
    if (!slug) return;

    // First check if slug matches a production line ID
    const line = productionLines[slug as keyof typeof productionLines];
    if (line) {
      setLineData(line);
      setViewMode("line");
      return;
    }

    // Otherwise search for a machine
    let foundMachine: any = null;
    let foundLine: any = null;

    Object.values(productionLines).forEach((l) => {
      const match = l.machines.find((m) => m.id === slug);
      if (match) {
        foundMachine = match;
        foundLine = l;
      }
    });

    if (foundMachine && foundLine) {
      setMachineData({ ...foundMachine, lineTitle: foundLine.title, lineId: foundLine.id });
      setViewMode("machine");
    } else {
      // Not found - redirect to manufacturing
      router.push("/manufacturing");
    }
  }, [slug, router]);

  // Loading state
  if (!viewMode) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             Loading...
        </div>
      </div>
    );
  }

  // ========== LINE VIEW ==========
  if (viewMode === "line" && lineData) {
    const Icon = lineData.icon;
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Image Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-[70] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={selectedImage} alt="Equipment" fill className="object-contain" priority />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="relative bg-gray-900 text-white pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 to-blue-900/40 z-0"></div>
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            <Link
              href="/manufacturing"
              className="group flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors w-fit"
            >
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Production Lines</span>
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full mb-6">
                  <Icon className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-medium uppercase tracking-wider text-sm">Production Line</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {lineData.title}
                </h1>
                {lang === 'ar' && (
                  <p className="text-2xl text-red-400 font-arabic mt-2">
                    {lineData.titleAr}
                  </p>
                )}
                <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
                  {lineData.description}
                </p>
              </div>

              <div className="grid gap-4">
                {lineData.stats?.map((stat: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-lg font-medium">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lineData.machines.map((machine: any, index: number) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                onClick={() => router.push(`/manufacturing/machine/${machine.id}`)}
              >
                {/* Machine Image */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedImage(machine.image)}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                  <Image
                    src={machine.image}
                    alt={machine.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <div className="p-2 bg-white rounded-full shadow-lg">
                      <Eye className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
                
                {/* Machine Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">{machine.name}</h3>
                  {lang === 'ar' && <p className="text-red-600 text-sm font-arabic mb-3">{machine.nameAr}</p>}
                  <div className="h-px w-full bg-gray-100 mb-4"></div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">{machine.description}</p>
                  
                  {/* View Details Button */}
                  <button
                    onClick={() => router.push(`/manufacturing/machine/${machine.id}`)}
                    className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Details 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========== MACHINE VIEW ==========
  if (viewMode === "machine" && machineData) {
    const gallery = machineData.gallery || [machineData.image];
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Lightbox for full-screen gallery */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
              onClick={() => setShowLightbox(false)}
            >
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 z-[70] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              {/* Navigation */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex((prev) => (prev + 1) % gallery.length); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
              
              <motion.div
                key={galleryIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full h-[80vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={gallery[galleryIndex]} alt="Machine Image" fill className="object-contain" priority />
              </motion.div>
              
              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                {galleryIndex + 1} / {gallery.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Header */}
        <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
          <div className="absolute inset-0">
               <Image 
                  src={machineData.image} 
                  alt={machineData.name} 
                  fill 
                  sizes="100vw"
                  unoptimized
                  className="object-cover opacity-60"
                  priority 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 px-6 max-w-7xl mx-auto">
               <Link 
                  href={`/manufacturing/machine/${machineData.lineId}`}
                  className="w-fit mb-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
               >
                  <ChevronLeft className="w-4 h-4" />
                  Back to {machineData.lineTitle}
               </Link>

               <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/80 text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-4 backdrop-blur-sm border border-red-500/30">
                       <Settings className="w-4 h-4" />
                       {machineData.lineTitle}
                   </div>
                   <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{machineData.name}</h1>
                   {lang === 'ar' && <p className="text-2xl text-red-400 font-arabic mb-4">{machineData.nameAr}</p>}
               </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12 -mt-10 relative z-30">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Image Gallery */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Images className="w-6 h-6 text-red-600" />
                            Machine Gallery
                        </h2>
                        
                        {/* Main Image */}
                        <div 
                          className="relative aspect-video rounded-2xl overflow-hidden mb-4 cursor-pointer group"
                          onClick={() => setShowLightbox(true)}
                        >
                          <Image
                            src={gallery[galleryIndex]}
                            alt={machineData.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity p-4 bg-white/90 rounded-full">
                              <Eye className="w-8 h-8 text-gray-900" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {gallery.map((img: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setGalleryIndex(idx)}
                                className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                                  galleryIndex === idx 
                                    ? "border-red-600 ring-2 ring-red-600/30" 
                                    : "border-transparent hover:border-gray-300"
                                }`}
                              >
                                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                {galleryIndex === idx && (
                                  <div className="absolute inset-0 bg-red-600/20"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Info className="w-6 h-6 text-red-600" />
                            Machine Overview
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {machineData.description}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                         <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="w-6 h-6 text-red-600" />
                            Technical Specifications
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {machineData.specs?.map((spec: any, idx: number) => (
                               <div key={idx} className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100">
                                   <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{spec.label}</span>
                                   <span className="text-lg font-bold text-gray-900">{spec.value}</span>
                               </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Key Features
                        </h3>
                        <ul className="space-y-4">
                            {machineData.features?.map((feature: string, idx: number) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 text-white shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Need detailed documentation?</h3>
                        <p className="text-red-100 mb-6 text-sm">
                            Download technical datasheets and compliance certificates for this equipment.
                        </p>
                        <button className="w-full py-3 bg-white text-red-700 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                            Request Datasheet <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return null;
}

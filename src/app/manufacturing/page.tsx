"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Shield,
  CheckCircle,
  Eye,
  Activity,
  Mail,
  X,
  ChevronLeft,
  Droplets,
  Package,
  Zap,
} from "lucide-react";

// Production lines data with correct images
const productionLines = {
  liquid: {
    id: "liquid",
    title: "Liquid Line",
    titleAr: "خط السوائل",
    description: "High-precision liquid filling and packaging systems for pharmaceutical production",
    icon: Droplets,
    color: "blue",
    machines: [
      {
        name: "Liquid Filling Machine",
        nameAr: "ماكينة تعبئة السوائل",
        image: "/images/manfactoring/liqued linee/liquid filling machine.jpeg",
        description: "High-speed automated liquid filling system",
      },
      {
        name: "Air Rinsing Machine",
        nameAr: "ماكينة الشطف بالهواء",
        image: "/images/manfactoring/liqued linee/Air rinsing machine.jpeg",
        description: "Bottle cleaning and sterilization unit",
      },
      {
        name: "Air Blowing",
        nameAr: "النفخ بالهواء",
        image: "/images/manfactoring/liqued linee/air plowing.jpeg",
        description: "Air blowing system for bottle preparation",
      },
      {
        name: "Capping Machine",
        nameAr: "ماكينة الغطاء",
        image: "/images/manfactoring/liqued linee/capping machine.jpeg",
        description: "Automated bottle capping system",
      },
      {
        name: "CIP Tank",
        nameAr: "خزان التنظيف المكاني",
        image: "/images/manfactoring/liqued linee/cip tank.jpeg",
        description: "Clean-In-Place sterilization tank",
      },
      {
        name: "Inspection Unit",
        nameAr: "وحدة الفحص",
        image: "/images/manfactoring/liqued linee/incpection unit.jpeg",
        description: "Quality inspection and verification system",
      },
      {
        name: "Liquid Preparation Tanks",
        nameAr: "خزانات تحضير السوائل",
        image: "/images/manfactoring/liqued linee/liquid prefration tanks.jpeg",
        description: "Stainless steel mixing and preparation tanks",
      },
    ],
  },
  powder: {
    id: "powder",
    title: "Powder Line",
    titleAr: "خط المساحيق",
    description: "Advanced powder processing and filling equipment for pharmaceutical formulations",
    icon: Package,
    color: "green",
    machines: [
      {
        name: "Vet Powder Filling Machine",
        nameAr: "ماكينة تعبئة المساحيق البيطرية",
        image: "/images/manfactoring/POWDER LINE/vet powfer filling machine.jpeg",
        description: "Precision powder filling for veterinary products",
      },
      {
        name: "Human Powder Line",
        nameAr: "خط المساحيق البشرية",
        image: "/images/manfactoring/POWDER LINE/humen powder.jpeg",
        description: "GMP-compliant human pharmaceutical powder processing",
      },
      {
        name: "Bin Lifter",
        nameAr: "رافعة الحاويات",
        image: "/images/manfactoring/POWDER LINE/bin lifter.jpeg",
        description: "Automated bin lifting and transfer system",
      },
      {
        name: "Sifter",
        nameAr: "الغربال",
        image: "/images/manfactoring/POWDER LINE/sifter.jpeg",
        description: "Industrial powder sifting equipment",
      },
    ],
  },
  utility: {
    id: "utility",
    title: "Utility Systems",
    titleAr: "أنظمة المرافق",
    description: "Essential support systems ensuring optimal manufacturing conditions",
    icon: Zap,
    color: "amber",
    machines: [
      {
        name: "Water Station",
        nameAr: "محطة المياه",
        image: "/images/manfactoring/utility/water station.jpeg",
        description: "Purified water generation and distribution system",
      },
      {
        name: "HVAC System",
        nameAr: "نظام التكييف",
        image: "/images/manfactoring/utility/WhatsApp Image 2026-01-18 at 9.43.30 AM.jpeg",
        description: "Climate control and air handling unit",
      },
      {
        name: "Power Distribution",
        nameAr: "توزيع الطاقة",
        image: "/images/manfactoring/utility/WhatsApp Image 2026-01-18 at 9.43.32 AM.jpeg",
        description: "Electrical power management system",
      },
    ],
  },
};

const features = [
  "Veterinary pharmaceutical production (Primary focus)",
  "Liquid, powder, and semi-solid dosage forms",
  "High-capacity automated machinery",
  "GMP-compliant production environment",
];

const qualityFeatures = [
  {
    icon: Shield,
    title: "GMP Standards",
    titleAr: "معايير GMP",
    description:
      "Full compliance with Good Manufacturing Practice regulations for pharmaceutical production",
  },
  {
    icon: CheckCircle,
    title: "Quality Control Procedures",
    titleAr: "إجراءات مراقبة الجودة",
    description:
      "Rigorous testing protocols and quality assurance at every production stage",
  },
  {
    icon: Eye,
    title: "Safety & Hygiene",
    titleAr: "السلامة والنظافة",
    description:
      "Advanced cleanroom facilities and strict contamination control measures",
  },
  {
    icon: Activity,
    title: "Production Monitoring",
    titleAr: "مراقبة الإنتاج",
    description:
      "Real-time tracking and documentation of all manufacturing processes",
  },
];

type LineKey = keyof typeof productionLines;

export default function ManufacturingPage() {
  const [selectedLine, setSelectedLine] = useState<LineKey | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollToProduction = () => {
    document
      .getElementById("production-lines")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // If a line is selected, show the detailed view
  if (selectedLine) {
    const line = productionLines[selectedLine];
    const Icon = line.icon;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-6">
            <button
              onClick={() => setSelectedLine(null)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Manufacturing
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{line.title}</h1>
                <p className="text-xl text-red-100">{line.titleAr}</p>
              </div>
            </div>
            <p className="mt-4 text-lg text-red-100 max-w-2xl">
              {line.description}
            </p>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {line.machines.map((machine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => setSelectedImage(machine.image)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={machine.image}
                    alt={machine.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{machine.name}</h3>
                  <p className="text-red-600 text-sm mb-2">{machine.nameAr}</p>
                  <p className="text-gray-600">{machine.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-5xl w-full aspect-[4/3]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Manufacturing Equipment"
                  fill
                  className="object-contain rounded-lg"
                  sizes="100vw"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main page view
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Advanced Pharmaceutical Manufacturing Lines
            </h1>

            <h2 className="text-xl md:text-2xl mb-4 text-red-600 font-semibold">
              خطوط تصنيع الأدوية المتقدمة
            </h2>

            <p className="text-2xl md:text-3xl mb-8 text-red-600">
              Specialized in Veterinary Medicine Production with High Quality
              Standards
            </p>

            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our facility is equipped with modern machinery and fully
              integrated production lines designed to ensure safety, efficiency,
              and compliance.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProduction}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              View Our Production Lines
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Manufacturing Focus Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our Manufacturing Expertise
              </h2>
              <p className="text-xl text-red-600 mb-8">خبرتنا في التصنيع</p>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl relative aspect-[4/3]"
            >
              <Image
                src="/images/manfactoring/liqued linee/liquid filling machine.jpeg"
                alt="Pharmaceutical machinery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section id="production-lines" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Production Lines
            </h2>
            <p className="text-xl text-red-600 mb-2">خطوط الإنتاج</p>
            <p className="text-xl text-gray-600">
              Click on a production line to explore its machinery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(productionLines).map((line, index) => {
              const Icon = line.icon;
              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedLine(line.id as LineKey)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={line.machines[0].image}
                      alt={line.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{line.title}</h3>
                        <p className="text-red-600 text-sm">{line.titleAr}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{line.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {line.machines.length} machines
                      </span>
                      <span className="text-red-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality & Compliance */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Quality & Compliance
            </h2>
            <p className="text-xl text-red-600 mb-2">الجودة والامتثال</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Committed to the highest standards of pharmaceutical manufacturing
              excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-red-600 text-sm mb-3">{feature.titleAr}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Reliable Manufacturing You Can Trust
          </h2>
          <p className="text-xl text-red-100 mb-2">
            تصنيع موثوق يمكنك الاعتماد عليه
          </p>

          <p className="text-xl text-red-100 mb-10 leading-relaxed">
            Our production lines are designed to meet international
            pharmaceutical standards with a strong focus on veterinary medicine.
          </p>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 px-10 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all font-semibold"
          >
            <Mail className="h-5 w-5" />
            Contact Our Manufacturing Team
          </Link>
        </motion.div>
      </section>
    </div>
  );
}



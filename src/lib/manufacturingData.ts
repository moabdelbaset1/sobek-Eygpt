import {
  Droplets,
  Package,
  Zap
} from "lucide-react";

export const productionLines = {
  liquid: {
    id: "liquid",
    title: "Liquid Line",
    titleAr: "خط السوائل",
    coverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
    description: "High-precision liquid filling and packaging systems enabling versatile production of syrups, suspensions, and solutions with strict volume control and contamination prevention.",
    icon: Droplets,
    color: "blue",
    stats: ["15,000 Bottles/Hour", "Automated CIP/SIP", "< 1% Waste"],
    machines: [
      {
        id: "liquid-filling-machine",
        name: "Liquid Filling Machine",
        nameAr: "ماكينة تعبئة السوائل",
        image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "High-speed automated liquid filling system with volumetric precision controls.",
        specs: [
          { label: "Filling Range", value: "50ml - 1000ml" },
          { label: "Accuracy", value: "±0.5%" },
          { label: "Speed", value: "12,000 BPH" },
          { label: "Nozzles", value: "12 Heads" }
        ],
        features: ["Anti-drip system", "Automatic height adjustment", "Touch screen control"]
      },
      {
        id: "air-rinsing-machine",
        name: "Air Rinsing Machine",
        nameAr: "ماكينة الشطف بالهواء",
        image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Advanced bottle cleaning utilizing ionized air for complete particulate removal.",
        specs: [
            { label: "Air Pressure", value: "6 Bar" },
            { label: "Filter Type", value: "0.2µm HEPA" }
        ],
        features: ["Ionized air cleaning", "Vacuum aspiration", "Rotary system"]
      },
      {
        id: "air-blowing",
        name: "Air Blowing",
        nameAr: "النفخ بالهواء",
        image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Bottle preparation system ensuring container integrity before filling.",
        specs: [
            { label: "Capacity", value: "15,000 BPH" }
        ],
        features: ["High-pressure blowing", "Noise reduction", "Compact design"]
      },
      {
        id: "capping-machine",
        name: "Capping Machine",
        nameAr: "ماكينة الغطاء",
        image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop",
        ],
        description: "Automated torque-controlled capping system for consistent seal integrity.",
        specs: [
            { label: "Torque Control", value: "Magnetic/Servo" },
            { label: "Cap Types", value: "Screw, ROPP, Press-on" }
        ],
        features: ["Torque monitoring", "Cap feeder elevator", "Rejection system"]
      },
      {
        id: "cip-tank",
        name: "CIP Tank",
        nameAr: "خزان التنظيف المكاني",
        image: "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop",
        gallery: [
          "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1628522307525-4c0422c19c4d?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Fully automated Clean-In-Place sterilization system for rapid line changeovers.",
        specs: [
            { label: "Capacity", value: "1000L - 5000L" },
            { label: "Material", value: "SS 316L" }
        ],
        features: ["Automated cycles", "Conductivity monitoring", "Temperature control"]
      },
      {
        id: "inspection-unit",
        name: "Inspection Unit",
        nameAr: "وحدة الفحص",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Visual inspection and verification system to ensure zero-defect output.",
        specs: [
            { label: "Cameras", value: "High Resolution 4K" },
            { label: "Detection", value: "Particles, Levels, Caps" }
        ],
        features: ["AI-powered detection", "Real-time rejection", "Data logging"]
      },
      {
        id: "liquid-prep-tanks",
        name: "Liquid Preparation Tanks",
        nameAr: "خزانات تحضير السوائل",
        image: "https://images.unsplash.com/photo-1628522307525-4c0422c19c4d?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1628522307525-4c0422c19c4d?q=80&w=2070&auto=format&fit=crop",
          "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop",
        ],
        description: "316L Stainless steel mixing tanks with temperature and agitation controls.",
        specs: [
            { label: "Volume", value: "Up to 10,000L" },
            { label: "Finish", value: "Electropolished Ra < 0.4" }
        ],
        features: ["Magnetic stirrer", "Load cells", "Heating/Cooling jacket"]
      },
    ],
  },
  powder: {
    id: "powder",
    title: "Powder Line",
    titleAr: "خط المساحيق",
    coverImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop",
    description: "Advanced powder processing and filling environment designed for humidity control and precise dosage accuracy for both human and veterinary formulations.",
    icon: Package,
    color: "green",
    stats: ["Humidity Controlled", "HEPA Filtration", "Precision Dosing"],
    machines: [
      {
        id: "vet-powder-filling",
        name: "Vet Powder Filling Machine",
        nameAr: "ماكينة تعبئة المساحيق البيطرية",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "High-output filling station tailored for veterinary bulk and unit dose packs.",
        specs: [
            { label: "Fill Weight", value: "10g - 5kg" },
            { label: "Output", value: "60 PPM" }
        ],
        features: ["Dust extraction", "Checkweigher integration", "Auger filler"]
      },
      {
        id: "human-powder-line",
        name: "Human Powder Line",
        nameAr: "خط المساحيق البشرية",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "GMP-compliant human pharmaceutical powder processing with enclosed transfer systems.",
        specs: [
            { label: "Class", value: "ISO 7 / Grade C" }
        ],
        features: ["Split butterfly valves", "Nitrogen purging", "Closed system"]
      },
      {
        id: "bin-lifter",
        name: "Bin Lifter",
        nameAr: "رافعة الحاويات",
        image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2670&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2670&auto=format&fit=crop",
        ],
        description: "Ergonomic automated bin lifting system for safe material handling.",
        specs: [
            { label: "Max Load", value: "1000 kg" },
            { label: "Lift Height", value: "Up to 6m" }
        ],
        features: ["Safety interlocks", "Smooth hydraulics", "Stainless steel"]
      },
      {
        id: "sifter",
        name: "Sifter",
        nameAr: "الغربال",
        image: "https://images.unsplash.com/photo-1581093806997-124237c91c21?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1581093806997-124237c91c21?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Industrial vibratory sifter ensuring uniform particle size and quality.",
        specs: [
            { label: "Mesh Size", value: "Variable" }
        ],
        features: ["Quiet operation", "Easy dismantling", "Dust-tight"]
      },
    ],
  },
  utility: {
    id: "utility",
    title: "Utility Systems",
    titleAr: "أنظمة المرافق",
    coverImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    description: "The backbone of our operation: state-of-the-art HVAC, water purification, and power management systems ensuring an optimal environment for pharmaceutical manufacturing.",
    icon: Zap,
    color: "amber",
    stats: ["ISO Class 8 Cleanrooms", "USP Grade Water", "24/7 Monitoring"],
    machines: [
      {
        id: "water-station",
        name: "Water Station",
        nameAr: "محطة المياه",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
        ],
        description: "Multi-stage purified water generation including RO and EDI technologies.",
        specs: [
            { label: "Capacity", value: "5000 L/Hr" },
            { label: "Conductivity", value: "< 1.3 µS/cm" }
        ],
        features: ["Double RO", "EDI Module", "Hot water sanitization"]
      },
      {
        id: "hvac-system",
        name: "HVAC System",
        nameAr: "نظام التكييف",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop",
        ],
        description: "Advanced climate control and air handling units maintaining strict temp/humidity levels.",
        specs: [
            { label: "Air Changes", value: "20-60 ACPH" },
            { label: "Filtration", value: "G4 + F9 + H14" }
        ],
        features: ["BMS Integration", "Humidity control", "Pressure cascading"]
      },
      {
        id: "power-distribution",
        name: "Power Distribution",
        nameAr: "توزيع الطاقة",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop",
        ],
        description: "Redundant electrical power management system guaranteeing uninterrupted production.",
        specs: [
             { label: "Capacity", value: "2 MW" }
        ],
        features: ["UPS Backup", "Diesel Generators", "Smart metering"]
      },
    ],
  },
};

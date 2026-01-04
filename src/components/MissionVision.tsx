"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Globe, Heart, Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function MissionVision() {
  const { lang, isRTL } = useLanguageContext();
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    {
      id: 'mission',
      label: lang === 'ar' ? 'مهمتنا' : 'Our Mission',
      title: lang === 'ar' ? 'نبتكر لحياة أفضل' : 'Innovating for Better Lives',
      description: lang === 'ar' 
        ? 'مهمتنا هي توفير حلول دوائية عالية الجودة ومبتكرة وبأسعار معقولة تلبي احتياجات المرضى وتحسن نتائج الرعاية الصحية في مجتمعاتنا.'
        : 'Our mission is to provide high-quality, innovative, and affordable pharmaceutical solutions that meet patient needs and improve healthcare outcomes in our communities.',
      points: lang === 'ar' 
        ? ['التركيز على المريض', 'الابتكار المستمر', 'جودة لا تضاهى']
        : ['Patient Centricity', 'Continuous Innovation', 'Uncompromised Quality'],
      icon: Target,
      image: '/Scientific-Inquiry-1.jpg'
    },
    {
      id: 'vision',
      label: lang === 'ar' ? 'رؤيتنا' : 'Our Vision',
      title: lang === 'ar' ? 'الريادة في الرعاية الصحية' : 'Leading Healthcare Evolution',
      description: lang === 'ar'
        ? 'أن نكون الشريك الدوائي الأكثر ثقة في المنطقة، معروفين بتميزنا في التصنيع والبحث والتزامنا الأخلاقي تجاه المجتمع.'
        : 'To be the most trusted pharmaceutical partner in the region, recognized for our excellence in manufacturing, research, and ethical commitment to society.',
      points: lang === 'ar'
        ? ['توسع إقليمي', 'شراكات استراتيجية', 'تنمية مستدامة']
        : ['Regional Expansion', 'Strategic Partnerships', 'Sustainable Growth'],
      icon: Globe,
      image: '/hero-bg-2.jpg'
    },
    {
      id: 'values',
      label: lang === 'ar' ? 'قيمنا' : 'Our Values',
      title: lang === 'ar' ? 'المبادئ التي تحكمنا' : 'Principles That Guide Us',
      description: lang === 'ar'
        ? 'نحن نؤمن بأن النجاح الحقيقي ينبع من الالتزام بقيمنا الجوهرية التي تشكل ثقافتنا وتوجه قراراتنا اليومية.'
        : 'We believe that true success stems from adhering to our core values that shape our culture and guide our daily decisions.',
      points: lang === 'ar'
        ? ['النزاهة والشفافية', 'العمل الجماعي', 'المسؤولية']
        : ['Integrity & Transparency', 'Teamwork', 'Accountability'],
      icon: Heart,
      image: '/team-work.jpg'
    }
  ];

  const activeContent = tabs.find(t => t.id === activeTab)!;

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-blue-500 blur-[120px] rounded-full mix-blend-overlay"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-purple-500 blur-[120px] rounded-full mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'ar' ? 'جوهر سوبك' : 'The Sobek Core'}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Navigation (Left/Right based on RTL) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 text-start group ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 shadow-lg shadow-blue-900/20' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className={`p-3 rounded-xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'} transition-colors`}>
                  <tab.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tab.label}</h3>
                  {activeTab === tab.id && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-blue-100 mt-1"
                    >
                      {lang === 'ar' ? 'انقر للعرض' : 'Click to view'}
                    </motion.p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">{activeContent.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                      {activeContent.description}
                    </p>
                    <ul className="space-y-4">
                      {activeContent.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={activeContent.image}
                      alt={activeContent.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

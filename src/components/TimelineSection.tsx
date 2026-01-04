"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';

const timelineData = [
  {
    year: '2019',
    title: 'Foundation',
    titleAr: 'التأسيس',
    description: 'Sobek Egypt Pharma was established in Egypt with a vision to provide quality pharmaceutical products to the region.',
    descriptionAr: 'تأسست سوبك مصر فارما برؤية لتوفير منتجات دوائية عالية الجودة للمنطقة.',
    image: 'https://images.unsplash.com/photo-1583737097428-af53774819a2?auto=format&fit=crop&q=80',
  },
  {
    year: '2021',
    title: 'Expansion & Modernization',
    titleAr: 'التوسع والتحديث',
    description: 'Major facility expansion with state-of-the-art manufacturing equipment and automated production lines.',
    descriptionAr: 'توسعة كبيرة للمنشأة بأحدث معدات التصنيع وخطوط الإنتاج الآلية.',
    image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&q=80',
  },
  {
    year: '2023',
    title: 'Innovation & R&D',
    titleAr: 'الابتكار والبحث والتطوير',
    description: 'Launched dedicated research and development center focusing on innovative pharmaceutical solutions.',
    descriptionAr: 'إطلاق مركز مخصص للبحث والتطوير يركز على الحلول الدوائية المبتكرة.',
    image: 'https://images.unsplash.com/photo-1580982331877-489fb58aeade?auto=format&fit=crop&q=80',
  },
  {
    year: '2024',
    title: 'Regional Growth',
    titleAr: 'النمو الإقليمي',
    description: 'Expanded operations across the Middle East and North Africa, establishing strong partnerships with healthcare providers.',
    descriptionAr: 'توسيع العمليات في جميع أنحاء الشرق الأوسط وشمال أفريقيا، وإقامة شراكات قوية.',
    image: 'https://images.unsplash.com/photo-1713098965471-d324f294a71d?auto=format&fit=crop&q=80',
  }
];

export default function TimelineSection() {
  const { lang, isRTL } = useLanguageContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-blue-600 font-bold uppercase tracking-wider mb-3 text-sm">
              {lang === 'ar' ? 'تاريخنا' : 'Our History'}
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'رحلة النجاح والنمو' : 'A Journey of Success & Growth'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'منذ تأسيسنا، ونحن نخطو خطوات ثابتة نحو تحقيق رؤيتنا في ريادة الصناعة الدوائية.'
                : 'Since our foundation, we have been taking steady steps towards achieving our vision of leading the pharmaceutical industry.'}
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-100 hidden md:block rounded-full">
            <motion.div 
              style={{ height }} 
              className="w-full bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 rounded-full origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                lang={lang} 
                isRTL={isRTL} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, lang, isRTL }: { item: any, index: number, lang: string, isRTL: boolean }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Timeline Dot (Desktop) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-100 shadow-lg flex items-center justify-center relative">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          <div className="absolute inset-0 rounded-full border border-blue-200 animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2">
        <div className={`relative group ${isEven ? (isRTL ? 'md:text-right' : 'md:text-left') : (isRTL ? 'md:text-left' : 'md:text-right')}`}>
          <div className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2`}>
            {/* Year Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-4 ${
              isEven ? '' : 'flex-row-reverse' // Adjust based on alignment if needed, but usually consistent
            }`}>
              <Calendar className="w-4 h-4" />
              <span>{item.year}</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {lang === 'ar' ? item.titleAr : item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {lang === 'ar' ? item.descriptionAr : item.description}
            </p>

            {/* Decorative Corner */}
            <div className={`absolute top-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent opacity-50 transition-all duration-500 group-hover:scale-150 ${
              isRTL ? 'left-0 rounded-br-full' : 'right-0 rounded-bl-full'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <div className={`relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition-transform duration-500 hover:scale-105 ${
          isEven ? 'md:origin-left' : 'md:origin-right'
        }`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </motion.div>
  );
}

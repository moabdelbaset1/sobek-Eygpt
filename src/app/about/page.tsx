"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguageContext } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import { CheckCircle, Award, Globe, Users, TrendingUp, Target, Heart } from 'lucide-react';
import MissionVision from '@/components/MissionVision';
import LeadershipSection from '@/components/LeadershipSection';
import TimelineSection from '@/components/TimelineSection';

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return { count, ref };
}

// Awards Data
const awards = [
  {
    title: 'ISO 9001:2015',
    description: 'Quality Management System Certification',
    icon: Award,
  },
  {
    title: 'GMP Certified',
    description: 'Good Manufacturing Practice Standards',
    icon: CheckCircle,
  },
  {
    title: 'Excellence Award',
    description: 'Pharmaceutical Industry Leadership',
    icon: TrendingUp,
  }
];

export default function AboutPage() {
  const { lang, isRTL } = useLanguageContext();

  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Scientific-Inquiry-1.jpg"
            alt="Sobek Lab"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-4 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-100 font-medium mb-6">
              {lang === 'ar' ? 'منذ 2019' : 'Since 2019'}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {lang === 'ar' ? 'نبتكر من أجل' : 'Innovating for a'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {lang === 'ar' ? 'مستقبل صحي' : 'Healthier Future'}
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mb-10">
              {lang === 'ar'
                ? 'في سوبك، نجمع بين العلم والتكنولوجيا والرحمة لتقديم حلول دوائية تغير حياة الناس.'
                : 'At Sobek, we combine science, technology, and compassion to deliver pharmaceutical solutions that transform lives.'
            }
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/products/human-new" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-1">
                {lang === 'ar' ? 'استكشف منتجاتنا' : 'Explore Products'}
              </Link>
              <Link href="/contact-us" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold transition-all">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md border-t border-white/10 py-6 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-8 divide-x divide-white/20 rtl:divide-x-reverse">
              <StatItem end={5} suffix="+" label={lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'} />
              <StatItem end={50} suffix="+" label={lang === 'ar' ? 'منتج دوائي' : 'Pharmaceutical Products'} />
              <StatItem end={12} suffix="" label={lang === 'ar' ? 'دولة' : 'Countries Served'} />
              <StatItem end={200} suffix="+" label={lang === 'ar' ? 'موظف' : 'Employees'} />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
                <Image 
                  src="/hero-bg-2.jpg" 
                  alt="About Sobek" 
                  width={600} 
                  height={500} 
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                />
                <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                  <p className="text-gray-800 font-medium italic">
                    "{lang === 'ar' ? 'الجودة هي حجر الزاوية في كل ما نقوم به.' : 'Quality is the cornerstone of everything we do.'}"
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h4 className="text-blue-600 font-bold uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'من نحن' : 'Who We Are'}
              </h4>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {lang === 'ar' ? 'رائدون في الصناعة الدوائية' : 'Pioneering the Future of Pharmaceuticals'}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {lang === 'ar' 
                  ? 'تأسست سوبك مصر فارما برؤية واضحة: توفير أدوية عالية الجودة وبأسعار معقولة للجميع. نحن نلتزم بأعلى معايير التصنيع العالمية ونستثمر باستمرار في البحث والتطوير.'
                  : 'Sobek Egypt Pharma was founded with a clear vision: to provide high-quality, affordable medicines to everyone. We adhere to the highest global manufacturing standards and continuously invest in research and development.'}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {lang === 'ar'
                  ? 'من خلال فريقنا المتفاني وشراكاتنا الاستراتيجية، نسعى جاهدين لتحسين نتائج الرعاية الصحية وتوسيع نطاق وصولنا لخدمة المزيد من المرضى في جميع أنحاء المنطقة.'
                  : 'Through our dedicated team and strategic partnerships, we strive to improve healthcare outcomes and expand our reach to serve more patients across the region.'}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{lang === 'ar' ? 'جودة معتمدة' : 'Certified Quality'}</h5>
                    <p className="text-sm text-gray-500">{lang === 'ar' ? 'معايير ISO و GMP' : 'ISO & GMP Standards'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mt-1">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{lang === 'ar' ? 'توسع عالمي' : 'Global Reach'}</h5>
                    <p className="text-sm text-gray-500">{lang === 'ar' ? 'تصدير لأكثر من 12 دولة' : 'Exporting to 12+ countries'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <MissionVision />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            {lang === 'ar' ? 'مستعد للعمل معنا؟' : 'Ready to Work With Us?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {lang === 'ar' 
              ? 'اكتشف كيف يمكن لمنتجاتنا وحلولنا أن تحدث فرقاً في مؤسستك.'
              : 'Discover how our products and solutions can make a difference in your organization.'}
          </p>
          <Link 
            href="/contact-us" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            {lang === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref} className="text-center text-white">
      <div className="text-4xl font-bold mb-1">{count}{suffix}</div>
      <div className="text-sm text-blue-200">{label}</div>
    </div>
  );
}

function Card({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    red: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group transition-all duration-300"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}
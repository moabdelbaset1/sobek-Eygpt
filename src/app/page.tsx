"use client";
import {motion} from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowRight, Newspaper, Calendar, Briefcase } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

const heroImages = [
  '/3Scientistssmall-1.jpg',
  '/Scientific-Inquiry-1.jpg',
  '/hero-bg-2.jpg',
  '/hero-bg-3.jpg',
];

export default function HomePage() {
  const { lang } = useLanguageContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 60000); // Change every 60 seconds (1 minute)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden z-0">
        {/* Background Images with Transition */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{backgroundImage: `url(${image})`}}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-2xl mx-auto md:mx-0 md:ml-12 lg:ml-20">
              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-relaxed">
                  <span className="text-red-500 text-4xl md:text-5xl lg:text-6xl">{lang === 'ar' ? 'ت' : 'B'}</span>
                  {lang === 'ar' ? 'عزيز الصحة متاح كل يوم' : 'etter Health within reach everyday.'}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed">
                  {lang === 'ar' 
                    ? 'من خلال إنشاء منتجات عالية الجودة وجعلها في متناول من يحتاجونها، نساعد في تشكيل عالم أكثر صحة يثري مجتمعاتنا جميعاً.'
                    : 'By creating high-quality products and making them accessible to those who need them, we are helping to shape a healthier world that enriches all our communities.'
                  }
                </p>
              </motion.div>

              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.3}}
                className="flex flex-col sm:flex-row items-start gap-3 mt-6"
              >
                <Link
                  href="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('exploreProducts', lang)}
                </Link>
                <Link
                  href="/about"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium text-base transition-all duration-200 border-2 border-white/30 hover:border-white/50"
                >
                  {lang === 'ar' ? 'اعرف عنا' : 'Learn About Us'}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Team Work Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-2 md:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video 
                  src="/sobek-group.mp4" 
                  controls 
                  loop 
                  playsInline
                  className="w-full h-auto rounded-2xl"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  controlsList="nodownload"
                >
                  <source src="/sobek-group.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-blue-600/10 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-1 md:order-2"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  Sobek EGYPT
                </h2>
              </motion.div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4">
                {lang === 'ar' 
                  ? 'نحن نوفر الأفضل نحو مجتمع أكثر صحة، من خلال بيئة عمل آمنة وملهمة وشاملة.'
                  : 'We provide the best towards a healthier community, through safe, inspiring and inclusive work environment.'
                }
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-8">
                {lang === 'ar'
                  ? 'نتوسع باستمرار عملنا عبر الحدود من خلال توفير منتجات دوائية عالية الجودة وفعالة من حيث التكلفة مع خدماتنا التنافسية والاعتقاد بدورنا في مجتمع الرعاية الصحية.'
                  : 'Consistently expanding our business across the border through delivering high quality cost effective pharmaceutical product provided with our competitive services and belief in the role we play in healthcare community.'
                }
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('readMore', lang)}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-1 md:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  {t('ourMission', lang)}
                </h2>
              </motion.div>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4">
                {lang === 'ar'
                  ? 'في سوبك فارما، مهمتنا هي تعزيز الصحة العالمية من خلال توفير حلول دوائية مبتكرة وعالية الجودة يمكن الوصول إليها وبأسعار معقولة للمجتمعات في جميع أنحاء العالم.'
                  : 'At Sobek Pharma, our mission is to advance global health by delivering innovative, high-quality pharmaceutical solutions that are accessible and affordable to communities worldwide.'
                }
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-8">
                {lang === 'ar'
                  ? 'نحن ملتزمون بالتميز في البحث والتصنيع والتوزيع، وتعزيز الشراكات التي تدفع التقدم الصحي وتحسن الحياة من خلال الممارسات المستدامة والأخلاقية.'
                  : 'We are committed to excellence in research, manufacturing, and distribution, fostering partnerships that drive healthcare progress and improve lives through sustainable and ethical practices.'
                }
              </p>
            </motion.div>

            {/* Background Video Side */}
            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-2 md:order-2"
            >
              <div className="relative overflow-hidden h-96">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                >
                  <source src="/lamp-reverse-fade.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media & Careers Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{opacity: 0, y: -30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
            >
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                  {lang === 'ar' ? 'اكتشف المزيد' : 'Discover More'}
                </span>
                <div className="w-12 h-1 bg-gradient-to-l from-blue-600 to-transparent"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {lang === 'ar' ? 'ابق متصلاً' : 'Stay Connected'} <span className="bg-gradient-to-r from-blue-600 via-red-600 to-purple-600 bg-clip-text text-transparent">&amp; {lang === 'ar' ? 'انمو' : 'Grow'}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === 'ar'
                  ? 'استكشف أحدث أخبارنا والأحداث القادمة وفرص العمل المثيرة التي تشكل مستقبل الرعاية الصحية'
                  : 'Explore our latest news, upcoming events, and exciting career opportunities that shape the future of healthcare'
                }
              </p>
            </motion.div>
          </div>

          {/* 3 Column Grid with Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* News Card */}
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
              whileHover={{y: -15}}
              className="group cursor-pointer"
            >
              <Link href="/media/news" className="block h-full">
                <div className="relative h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Image Background */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                        <defs>
                          <pattern id="news-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="white" />
                            <circle cx="30" cy="10" r="1" fill="white" />
                            <circle cx="10" cy="30" r="1" fill="white" />
                          </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#news-pattern)" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Newspaper className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Animated Shapes */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('latestNews', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'ابق على اطلاع بأحدث التحديثات والإعلانات والرؤى الصناعية من سوبك فارما'
                        : 'Stay informed with the latest updates, announcements, and industry insights from Sobek Pharma'
                      }
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 mt-4 transition-colors">
                      <span>{lang === 'ar' ? 'اقرأ الأخبار' : 'Read News'}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Link>
            </motion.div>

            {/* Events Card */}
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.1}}
              whileHover={{y: -15}}
              className="group cursor-pointer"
            >
              <Link href="/media/events" className="block h-full">
                <div className="relative h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Image Background */}
                  <div className="relative h-64 bg-gradient-to-br from-red-400 via-red-500 to-red-700 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                        <defs>
                          <pattern id="events-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <rect x="10" y="10" width="40" height="40" fill="none" stroke="white" strokeWidth="1" />
                            <circle cx="30" cy="30" r="8" fill="white" opacity="0.5" />
                          </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#events-pattern)" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Calendar className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Animated Shapes */}
                    <div className="absolute top-6 left-6 w-20 h-20 border-2 border-white/30 rounded-full group-hover:rotate-180 transition-transform duration-700"></div>
                    <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/10 group-hover:scale-150 transition-transform duration-700"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {t('upcomingEvents', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'انضم إلينا في المؤتمرات والندوات وأحداث التواصل للتواصل مع قادة الصناعة والمبتكرين'
                        : 'Join us at conferences, seminars, and networking events to connect with industry leaders and innovators'
                      }
                    </p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 mt-4 transition-colors">
                      <span>{lang === 'ar' ? 'عرض الأحداث' : 'View Events'}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Link>
            </motion.div>

            {/* Careers Card */}
            <motion.div
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2}}
              whileHover={{y: -15}}
              className="group cursor-pointer"
            >
              <Link href="/careers" className="block h-full">
                <div className="relative h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Image Background */}
                  <div className="relative h-64 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                        <defs>
                          <pattern id="careers-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                            <polygon points="25,0 50,25 25,50 0,25" fill="none" stroke="white" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#careers-pattern)" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Briefcase className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    {/* Animated Shapes */}
                    <div className="absolute top-4 right-4 w-14 h-14 border-2 border-white/30 group-hover:rotate-90 transition-transform duration-700"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-lg group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {t('joinOurTeam', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'استكشف فرص عمل مثيرة وكن جزءاً من فريق مكرس لتحسين الرعاية الصحية العالمية'
                        : 'Explore exciting career opportunities and become part of a team dedicated to improving global healthcare'
                      }
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 mt-4 transition-colors">
                      <span>{lang === 'ar' ? 'شاهد الفرص' : 'See Opportunities'}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {lang === 'ar' ? 'لماذا تختار' : 'Why Choose'} <span className="text-blue-600">Sobek Pharma</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'قيادة صناعة الأدوية بالابتكار والجودة والالتزام بتميز الرعاية الصحية'
                : 'Leading the pharmaceutical industry with innovation, quality, and commitment to healthcare excellence'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5}}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                ISO-certified manufacturing facilities with rigorous quality control processes ensuring the highest standards
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.1}}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation & R&D</h3>
              <p className="text-gray-600 leading-relaxed">
                Cutting-edge research and development programs driving pharmaceutical innovation and breakthrough treatments
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.2}}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Trusted by healthcare professionals worldwide with distribution networks spanning across continents
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}

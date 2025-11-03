"use client";
import {motion} from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Newspaper, Calendar, Briefcase, Award, Globe2, Users, FlaskConical, Shield, TrendingUp } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';

const heroImages = [
  '/3Scientistssmall-1.jpg',
  '/Scientific-Inquiry-1.jpg',
  '/hero-bg-2.jpg',
  '/hero-bg-3.jpg',
];

export default function HomePage() {
  const { lang, isRTL } = useLanguageContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 60000);

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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className={`max-w-3xl mx-auto md:mx-0 ${isRTL ? 'md:mr-12 lg:mr-20' : 'md:ml-12 lg:ml-20'}`}>
              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
              >
                {lang === 'ar' ? (
                  <>
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-relaxed">
                      <span className="text-red-500">الريادة في صناعة الأدوية</span>
                      <br />
                      لمستقبل صحي أفضل
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed mb-4">
                      شركة سوبك للأدوية - رائدة في تصنيع وتوزيع المستحضرات الدوائية عالية الجودة للصحة البشرية والبيطرية
                    </p>
                    <div className="flex flex-wrap gap-4 text-base md:text-lg text-white/90">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-400" />
                        <span>معتمدة من GMP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span>ISO 9001:2015</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-blue-400" />
                        <span>التصدير لأكثر من 20 دولة</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      <span className="text-red-500">Leading Pharmaceutical Excellence</span>
                      <br />
                      For a Healthier Tomorrow
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed mb-4">
                      Sobek Egypt Pharma - Pioneering the manufacturing and distribution of high-quality pharmaceutical products for human and veterinary health
                    </p>
                    <div className="flex flex-wrap gap-4 text-base md:text-lg text-white/90">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-400" />
                        <span>GMP Certified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span>ISO 9001:2015</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-blue-400" />
                        <span>Exporting to 20+ Countries</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.3}}
                className="flex flex-col sm:flex-row items-start gap-3 mt-8"
              >
                <Link
                  href="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('exploreProducts', lang)}
                </Link>
                <Link
                  href="/about"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 border-2 border-white/30 hover:border-white/50"
                >
                  {lang === 'ar' ? 'تعرف على الشركة' : 'Learn About Us'}
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

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">25+</div>
              <div className="text-white/90 text-sm md:text-base">
                {lang === 'ar' ? 'عاماً من الخبرة' : 'Years of Excellence'}
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.1}}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-white/90 text-sm md:text-base">
                {lang === 'ar' ? 'منتج دوائي' : 'Pharmaceutical Products'}
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.2}}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
              <div className="text-white/90 text-sm md:text-base">
                {lang === 'ar' ? 'دولة نصدر إليها' : 'Export Markets'}
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.3}}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/90 text-sm md:text-base">
                {lang === 'ar' ? 'موظف متخصص' : 'Dedicated Employees'}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{opacity: 0, x: isRTL ? 50 : -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className={`${isRTL ? 'md:order-2' : 'md:order-1'}`}
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
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-blue-600/10 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: isRTL ? -50 : 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className={`${isRTL ? 'md:order-1' : 'md:order-2'}`}
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
              {lang === 'ar' ? (
                <>
                  <p className="text-lg md:text-xl text-gray-900 leading-relaxed mb-4 font-semibold">
                    شركة رائدة في صناعة الأدوية البشرية والبيطرية
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    تأسست سوبك مصر فارما بهدف تقديم حلول دوائية مبتكرة وعالية الجودة تلبي احتياجات السوق المحلي والإقليمي. نحن نلتزم بأعلى معايير الجودة العالمية في التصنيع والبحث والتطوير.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    من خلال مرافق إنتاج حديثة معتمدة من GMP وفريق من الخبراء المتخصصين، نوفر منتجات دوائية آمنة وفعالة تساهم في تحسين جودة الحياة للمرضى في مصر والمنطقة.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg md:text-xl text-gray-900 leading-relaxed mb-4 font-semibold">
                    A Leading Force in Human and Veterinary Pharmaceuticals
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    Sobek Egypt Pharma was established with the vision of delivering innovative, high-quality pharmaceutical solutions that meet the needs of local and regional markets. We are committed to maintaining the highest global quality standards in manufacturing, research, and development.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    Through state-of-the-art GMP-certified production facilities and a team of specialized experts, we provide safe and effective pharmaceutical products that contribute to improving the quality of life for patients across Egypt and the region.
                  </p>
                </>
              )}
              <Link
                href="/about"
                className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t('readMore', lang)}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{opacity: 0, x: isRTL ? 50 : -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className={`${isRTL ? 'md:order-2' : 'md:order-1'}`}
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
              {lang === 'ar' ? (
                <>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4 font-semibold">
                    الالتزام بالتميز في صناعة الأدوية
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    مهمتنا هي تطوير وتصنيع وتوزيع منتجات دوائية مبتكرة وعالية الجودة تساهم في تحسين الصحة العامة وجودة الحياة للمرضى. نسعى لتحقيق التميز من خلال الالتزام بأعلى معايير الجودة والسلامة والفعالية.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    نؤمن بأهمية البحث والتطوير المستمر، والاستثمار في التكنولوجيا الحديثة، وبناء شراكات استراتيجية لتوسيع نطاق خدماتنا وتلبية الاحتياجات المتزايدة للقطاع الصحي.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base md:text-lg text-gray-900 leading-relaxed mb-4 font-semibold">
                    Commitment to Excellence in Pharmaceutical Manufacturing
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                    Our mission is to develop, manufacture, and distribute innovative, high-quality pharmaceutical products that contribute to improving public health and quality of life for patients. We strive for excellence through commitment to the highest standards of quality, safety, and efficacy.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    We believe in the importance of continuous research and development, investing in modern technology, and building strategic partnerships to expand our services and meet the growing needs of the healthcare sector.
                  </p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: isRTL ? -50 : 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className={`${isRTL ? 'md:order-1' : 'md:order-2'}`}
            >
              <div className="relative overflow-hidden h-96 rounded-2xl shadow-xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                >
                  <source src="/lamp-reverse-fade.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{opacity: 0, y: -30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? (
                  <>لماذا تختار <span className="text-blue-600">سوبك مصر فارما</span></>
                ) : (
                  <>Why Choose <span className="text-blue-600">Sobek Egypt Pharma</span></>
                )}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {lang === 'ar'
                  ? 'نتميز بالجودة والابتكار والالتزام بأعلى المعايير الدولية في صناعة الأدوية'
                  : 'Distinguished by quality, innovation, and commitment to the highest international standards in pharmaceutical manufacturing'
                }
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5}}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'ضمان الجودة' : 'Quality Assurance'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lang === 'ar'
                  ? 'مرافق تصنيع معتمدة من GMP مع عمليات مراقبة جودة صارمة تضمن أعلى المعايير في كل منتج'
                  : 'GMP-certified manufacturing facilities with rigorous quality control processes ensuring the highest standards in every product'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.1}}
              className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100"
            >
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                <FlaskConical className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'البحث والتطوير' : 'Research & Development'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lang === 'ar'
                  ? 'برامج بحث وتطوير متقدمة تقود الابتكار الدوائي وتطوير علاجات رائدة'
                  : 'Advanced research and development programs driving pharmaceutical innovation and breakthrough treatments'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.2}}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100"
            >
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'الانتشار العالمي' : 'Global Reach'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {lang === 'ar'
                  ? 'موثوق بها من قبل المتخصصين في الرعاية الصحية في جميع أنحاء العالم مع شبكات توزيع تمتد عبر القارات'
                  : 'Trusted by healthcare professionals worldwide with distribution networks spanning across continents'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media & Careers Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
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
                {lang === 'ar' ? (
                  <>ابق متصلاً <span className="bg-gradient-to-r from-blue-600 via-red-600 to-purple-600 bg-clip-text text-transparent">&amp; تطور معنا</span></>
                ) : (
                  <>Stay Connected <span className="bg-gradient-to-r from-blue-600 via-red-600 to-purple-600 bg-clip-text text-transparent">&amp; Grow</span></>
                )}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {lang === 'ar'
                  ? 'استكشف أحدث أخبارنا والأحداث القادمة وفرص العمل المثيرة التي تشكل مستقبل الرعاية الصحية'
                  : 'Explore our latest news, upcoming events, and exciting career opportunities shaping the future of healthcare'
                }
              </p>
            </motion.div>
          </div>

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

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Newspaper className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  </div>

                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {t('latestNews', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'ابق على اطلاع بأحدث التحديثات والإعلانات والرؤى الصناعية من سوبك مصر فارما'
                        : 'Stay informed with the latest updates, announcements, and industry insights from Sobek Egypt Pharma'
                      }
                    </p>
                    <div className={`flex items-center text-blue-600 font-semibold group-hover:text-blue-700 mt-4 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'اقرأ الأخبار' : 'Read News'}</span>
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-2 transition-transform`} />
                    </div>
                  </div>

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

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Calendar className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-6 left-6 w-20 h-20 border-2 border-white/30 rounded-full group-hover:rotate-180 transition-transform duration-700"></div>
                    <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/10 group-hover:scale-150 transition-transform duration-700"></div>
                  </div>

                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {t('upcomingEvents', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'انضم إلينا في المؤتمرات والندوات وأحداث التواصل للتواصل مع قادة الصناعة'
                        : 'Join us at conferences, seminars, and networking events to connect with industry leaders'
                      }
                    </p>
                    <div className={`flex items-center text-red-600 font-semibold group-hover:text-red-700 mt-4 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'عرض الأحداث' : 'View Events'}</span>
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-2 transition-transform`} />
                    </div>
                  </div>

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

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Briefcase className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-14 h-14 border-2 border-white/30 group-hover:rotate-90 transition-transform duration-700"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-lg group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  <div className="p-8 flex flex-col h-48">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {t('joinOurTeam', lang)}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed flex-1">
                      {lang === 'ar'
                        ? 'استكشف فرص عمل مثيرة وكن جزءاً من فريق مكرس لتحسين الرعاية الصحية'
                        : 'Explore exciting career opportunities and become part of a team dedicated to improving healthcare'
                      }
                    </p>
                    <div className={`flex items-center text-purple-600 font-semibold group-hover:text-purple-700 mt-4 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{lang === 'ar' ? 'شاهد الفرص' : 'See Opportunities'}</span>
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-2 transition-transform`} />
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {lang === 'ar' ? 'الشهادات والاعتمادات' : 'Certifications & Accreditations'}
            </h3>
            <p className="text-gray-600">
              {lang === 'ar' 
                ? 'معتمدون من أبرز الهيئات الدولية في مجال صناعة الأدوية'
                : 'Certified by leading international bodies in pharmaceutical manufacturing'
              }
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">GMP Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">ISO 9001:2015</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-12 h-12 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">WHO GMP</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <Users className="w-12 h-12 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {lang === 'ar' ? 'وزارة الصحة المصرية' : 'Egyptian MOH'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
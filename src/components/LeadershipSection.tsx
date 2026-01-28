"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageContext } from '@/lib/LanguageContext';
import { leadershipAPI, LeadershipMember } from '@/lib/api';
import { Linkedin, Mail, ArrowRight, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeadershipSection() {
  const { lang, isRTL } = useLanguageContext();
  const [leadershipTeam, setLeadershipTeam] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadLeadership = async () => {
      try {
        const data = await leadershipAPI.getAll();
        setLeadershipTeam(data.filter(m => m.is_leadership && m.is_active));
      } catch (error) {
        console.error('Error loading leadership team:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeadership();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (leadershipTeam.length <= 3) return;

    const totalPages = Math.ceil(leadershipTeam.length / 3);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [leadershipTeam.length]);

  if (loading) return null;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(leadershipTeam.length / itemsPerPage);
  const displayedMembers = leadershipTeam.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gray-100/50 -skew-x-12 -translate-x-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-blue-600 font-bold uppercase tracking-wider mb-3 text-sm">
              {lang === 'ar' ? 'العقول المدبرة' : 'The Minds Behind Sobek'}
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {lang === 'ar' ? 'فريق القيادة' : 'Leadership Team'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'نخبة من الخبراء يجمعون بين الرؤية الاستراتيجية والخبرة العملية لقيادة مستقبل الرعاية الصحية.'
                : 'A team of experts combining strategic vision with practical expertise to lead the future of healthcare.'}
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-[450px] perspective-1000"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl border border-gray-100">
                    {/* Image Container */}
                    <div className="absolute inset-0 h-full w-full">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <Users className="w-20 h-20" />
                        </div>
                      )}
                    </div>

                    {/* Content - Below Image */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-white/95 backdrop-blur-sm transform transition-transform duration-500">
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-1 text-gray-900">
                          {lang === 'ar' ? (member.name_ar || member.name) : member.name}
                        </h3>
                        <p className="text-red-600 font-medium text-sm">
                          {lang === 'ar' ? (member.title_ar || member.title) : member.title}
                        </p>

                        <div className={`overflow-hidden transition-all duration-500 ${hoveredMember === member.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                            {lang === 'ar' ? (member.bio_ar || member.bio) : member.bio}
                          </p>

                          <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors text-gray-600">
                              <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors text-gray-600">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-500 w-0 group-hover:w-full"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Only show if more than 3 members */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-0 -mr-4' : 'left-0 -ml-4'} md:-ml-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300`}
                aria-label="Previous"
              >
                {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>
              <button
                onClick={nextSlide}
                className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-0 -ml-4' : 'right-0 -mr-4'} md:-mr-16 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300`}
                aria-label="Next"
              >
                {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/team"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 border border-gray-200 font-semibold rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            {lang === 'ar' ? 'عرض الفريق الكامل' : 'View Full Team'}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} transition-transform group-hover:translate-x-1`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

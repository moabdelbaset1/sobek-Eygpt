"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/useLanguage';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, Newspaper, Building2, FlaskConical, CalendarDays, X, Play } from 'lucide-react';

interface MediaPost {
  id: string;
  title: string;
  title_ar?: string | null;
  content: string;
  content_ar?: string | null;
  type: 'news' | 'event';
  media_url?: string | null;
  media_type?: string | null;
  is_active: boolean;
  publish_date: string;
  created_at: string;
}

export default function NewsPage() {
  const { lang, isRTL } = useLanguage();
  const [news, setNews] = useState<MediaPost[]>([]);
  const [events, setEvents] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedMediaId, setExpandedMediaId] = useState<string | null>(null);

  const t = {
    hero: {
      badge: lang === 'ar' ? 'أحدث المستجدات' : 'Latest Updates',
      title: lang === 'ar' ? 'أخبار ورؤى سوبيك' : 'Sobek News & Insights',
      desc: lang === 'ar' ? 'تابع أحدث أخبارنا، وإطلاق المنتجات، وأنشطة الشركة في سعينا نحو مستقبل صحي أفضل.' : 'Stay updated with our latest announcements, product launches, and company activities as we pioneer a healthier future.',
    },
    categories: {
      all: lang === 'ar' ? 'الكل' : 'All',
      company: lang === 'ar' ? 'أخبار الشركة' : 'Company News',
      product: lang === 'ar' ? 'المنتجات' : 'Products',
      events: lang === 'ar' ? 'الفعاليات' : 'Events',
      csr: lang === 'ar' ? 'المسؤولية الاجتماعية' : 'CSR',
    },
    readMore: lang === 'ar' ? 'اقرأ المزيد' : 'Read Article',
    featured: lang === 'ar' ? 'خبر مميز' : 'Featured Story',
    noNews: lang === 'ar' ? 'لا توجد أخبار في هذا التصنيف' : 'No news found in this category.',
    loading: lang === 'ar' ? 'جاري التحميل...' : 'Loading...',
    eventsTitle: lang === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events',
    eventsBadge: lang === 'ar' ? 'فعاليات' : 'Events',
    viewDetails: lang === 'ar' ? 'تفاصيل الفعالية' : 'View Details'
  };

  const categories = [
    { id: 'all', name: t.categories.all, icon: Newspaper },
    { id: 'company', name: t.categories.company, icon: Building2 },
    { id: 'product', name: t.categories.product, icon: FlaskConical },
    { id: 'events', name: t.categories.events, icon: Calendar },
    { id: 'csr', name: t.categories.csr, icon: Tag },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [newsRes, eventsRes] = await Promise.all([
        fetch('/api/media?type=news'),
        fetch('/api/media?type=event')
      ]);
      
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        setNews(newsData);
      }
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setEvents(eventsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short' }),
      year: date.getFullYear(),
      full: date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  const getReadTime = () => lang === 'ar' ? '٣ دقائق قراءة' : '3 min read';

  // Filter news (for now all news, can add category filtering logic later)
  const filteredNews = news;

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-28">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-900 blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold tracking-wider mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              {t.hero.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">{t.loading}</p>
        </div>
      ) : (
        <>
          {/* 2. Featured News (Latest Item) */}
          {filteredNews.length > 0 && (
            <section className="container mx-auto px-6 -mt-16 relative z-20 mb-20">
              <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.6 }}
                 className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-[300px] lg:h-auto overflow-hidden cursor-pointer" onClick={() => setExpandedMediaId(filteredNews[0].id)}>
                     {filteredNews[0].media_url ? (
                       filteredNews[0].media_type === 'video' ? (
                         <>
                           <video src={filteredNews[0].media_url} className="w-full h-full object-cover" muted loop playsInline />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                               <Play className="w-8 h-8 text-white fill-current" />
                             </div>
                           </div>
                         </>
                       ) : (
                         <Image 
                           src={filteredNews[0].media_url} 
                           alt={filteredNews[0].title}
                           fill
                           sizes="(max-width: 768px) 100vw, 50vw"
                           unoptimized
                           className="object-cover hover:scale-105 transition-transform duration-700"
                         />
                       )
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-blue-50 min-h-[300px]">
                         <Newspaper className="w-20 h-20 text-blue-200" />
                       </div>
                     )}
                     <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
                       {t.featured}
                     </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                     <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                       <span className="flex items-center gap-1">
                         <Calendar className="w-4 h-4" />
                         {formatDate(filteredNews[0].publish_date).full}
                       </span>
                       <span className="flex items-center gap-1">
                         <Clock className="w-4 h-4" />
                         {getReadTime()}
                       </span>
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setExpandedMediaId(filteredNews[0].id)}>
                       {lang === 'ar' ? (filteredNews[0].title_ar || filteredNews[0].title) : filteredNews[0].title}
                     </h2>
                     <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                       {lang === 'ar' ? (filteredNews[0].content_ar || filteredNews[0].content) : filteredNews[0].content}
                     </p>
                     <button onClick={() => setExpandedMediaId(filteredNews[0].id)} className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all group">
                       {t.readMore} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                     </button>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* 3. News Grid & Filter */}
          <section className="container mx-auto px-6 pb-24">
            
            {/* Categories Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-blue-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            {filteredNews.length > 1 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='popLayout'>
                  {filteredNews.slice(1).map((item) => {
                    const date = formatDate(item.publish_date);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 h-full flex flex-col"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => setExpandedMediaId(item.id)}>
                          {item.media_url ? (
                            item.media_type === 'video' ? (
                              <>
                                <video src={item.media_url} className="w-full h-full object-cover" muted loop playsInline />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                                    <Play className="w-5 h-5 text-white fill-current" />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <Image
                                src={item.media_url}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized
                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                              />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50">
                              <Newspaper className="w-12 h-12 text-blue-200" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center shadow-lg min-w-[60px]">
                              <span className="block text-xs font-bold text-blue-600 uppercase">{date.month}</span>
                              <span className="block text-xl font-bold text-gray-900">{date.day}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {date.year}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{getReadTime()}</span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {lang === 'ar' ? (item.title_ar || item.title) : item.title}
                          </h3>
                          
                          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                            {lang === 'ar' ? (item.content_ar || item.content) : item.content}
                          </p>

                          <div className="mt-auto">
                            <button onClick={() => setExpandedMediaId(item.id)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {t.readMore} 
                              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === item.id ? (isRTL ? '-translate-x-2' : 'translate-x-2') : ''} ${isRTL ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : filteredNews.length === 0 && (
              <div className="text-center py-20">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Newspaper className="w-8 h-8 text-slate-400" />
                 </div>
                 <p className="text-slate-500 text-lg">{t.noNews}</p>
              </div>
            )}
          </section>

          {/* 4. Events Section */}
          {events.length > 0 && (
            <section className="bg-slate-900 py-20">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-semibold tracking-wider mb-4">
                    {t.eventsBadge}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {t.eventsTitle}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event, idx) => {
                    const date = formatDate(event.publish_date);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          {event.media_url ? (
                            <Image
                              src={event.media_url}
                              alt={event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              unoptimized
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-700">
                              <CalendarDays className="w-12 h-12 text-slate-500" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                          <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-3`}>
                            <div className="bg-amber-500 text-slate-900 rounded-xl p-3 text-center shadow-lg">
                              <span className="block text-xs font-bold uppercase">{date.month}</span>
                              <span className="block text-2xl font-bold">{date.day}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                            {lang === 'ar' ? (event.title_ar || event.title) : event.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {lang === 'ar' ? (event.content_ar || event.content) : event.content}
                          </p>
                          <button 
                            onClick={() => setExpandedMediaId(event.id)}
                            className="flex items-center gap-2 text-amber-400 font-semibold text-sm hover:gap-3 transition-all"
                          >
                            {t.viewDetails}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Media Modal */}
      <AnimatePresence>
        {expandedMediaId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setExpandedMediaId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedMediaId(null)}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-md border border-white/10`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Content */}
              {[...news, ...events].map(item => 
                item.id === expandedMediaId ? (
                  <div key={item.id} className="flex flex-col md:flex-row max-h-[90vh]">
                    {/* Media Side */}
                    <div className="w-full md:w-2/3 bg-slate-900 flex items-center justify-center relative min-h-[300px]">
                      {item.media_url ? (
                        item.media_type === 'video' ? (
                          <video
                            src={item.media_url}
                            controls
                            autoPlay
                            className="w-full h-full object-contain max-h-[70vh]"
                          />
                        ) : (
                          <div className="relative w-full h-full min-h-[400px]">
                            <Image
                              src={item.media_url}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 66vw"
                              unoptimized
                              className="object-contain"
                            />
                          </div>
                        )
                      ) : (
                        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-800">
                          <Newspaper className="w-20 h-20 text-slate-600" />
                        </div>
                      )}
                    </div>

                    {/* Info Side */}
                    <div className="w-full md:w-1/3 bg-white p-8 overflow-y-auto max-h-[70vh]">
                      <div className={`flex items-center gap-2 text-sm font-bold ${item.type === 'event' ? 'text-amber-600' : 'text-blue-600'} mb-4 uppercase tracking-wider`}>
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.publish_date).full}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {lang === 'ar' ? (item.title_ar || item.title) : item.title}
                      </h2>
                      
                      <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-wrap">
                          {lang === 'ar' ? (item.content_ar || item.content) : item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

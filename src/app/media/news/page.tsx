"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Newspaper, Clock, ArrowRight, Search, Calendar, X, Play, Sparkles, Globe } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';

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
  const { lang, isRTL } = useLanguageContext();
  const [news, setNews] = useState<MediaPost[]>([]);
  const [filteredNews, setFilteredNews] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMediaId, setExpandedMediaId] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNews(news);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = news.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.title_ar && item.title_ar.includes(query)) ||
        item.content.toLowerCase().includes(query) ||
        (item.content_ar && item.content_ar.includes(query))
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, news]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media?type=news');
      if (res.ok) {
        const data = await res.json();
        setNews(data);
        setFilteredNews(data);
      }
    } catch (error) {
      console.error('Error loading news:', error);
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
      full: date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80"
            alt="Latest News"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-gray-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/50 backdrop-blur-sm rounded-full text-blue-200 mb-6 border border-blue-700/50">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'أخبار الشركة' : 'Corporate News'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {lang === 'ar' ? 'آخر الأخبار' : 'Latest Updates'}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar' 
                ? 'ابق على اطلاع بآخر المستجدات والإعلانات من سوبيك فارما.'
                : 'Stay informed with the latest updates, press releases, and announcements from Sobek Pharma.'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-xl mt-10 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-full shadow-xl flex items-center p-2">
                <div className="pl-4 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'ابحث في الأخبار...' : 'Search news...'}
                  className={`w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md">
                  {lang === 'ar' ? 'بحث' : 'Search'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-20 -mt-20 relative z-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {lang === 'ar' ? 'لا توجد أخبار' : 'No News Found'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {lang === 'ar' 
                ? 'لم نتمكن من العثور على أي أخبار تطابق بحثك.'
                : 'We couldn\'t find any news matching your search.'}
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              {lang === 'ar' ? 'عرض الكل' : 'View All'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, index) => {
                const date = formatDate(item.publish_date);
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group h-full"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col hover:-translate-y-2">
                      {/* Media Thumbnail */}
                      <div 
                        className="relative h-56 bg-gray-200 overflow-hidden cursor-pointer"
                        onClick={() => setExpandedMediaId(item.id)}
                      >
                        {item.media_url ? (
                          item.media_type === 'video' ? (
                            <>
                              <video
                                src={item.media_url}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                              />
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
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50">
                            <Newspaper className="w-12 h-12 text-blue-200" />
                          </div>
                        )}
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center shadow-lg min-w-[60px]">
                          <span className="block text-xs font-bold text-blue-600 uppercase">{date.month}</span>
                          <span className="block text-xl font-bold text-gray-900">{date.day}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs font-medium text-blue-600 mb-3">
                          <Sparkles className="w-3 h-3" />
                          <span className="uppercase tracking-wider">
                            {lang === 'ar' ? 'خبر جديد' : 'Latest News'}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {lang === 'ar' ? (item.title_ar || item.title) : item.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                          {lang === 'ar' ? (item.content_ar || item.content) : item.content}
                        </p>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {date.year}
                          </span>
                          <button 
                            onClick={() => setExpandedMediaId(item.id)}
                            className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

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
              className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedMediaId(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-md border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Content */}
              {news.map(item => 
                item.id === expandedMediaId ? (
                  <div key={item.id} className="flex flex-col md:flex-row h-[80vh]">
                    {/* Media Side */}
                    <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative">
                      {item.media_type === 'video' ? (
                        <video
                          src={item.media_url || ''}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.media_url!}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Info Side */}
                    <div className="w-full md:w-1/3 bg-white p-8 overflow-y-auto">
                      <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-4 uppercase tracking-wider">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.publish_date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
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

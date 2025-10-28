"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Clock, ArrowRight, Search, Calendar, X, Play } from 'lucide-react';

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
  const [news, setNews] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMediaId, setExpandedMediaId] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media?type=news');
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest updates and announcements from Sobek Pharma
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* News Grid - Facebook/Instagram Style */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-500">Check back soon for the latest updates</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* News Content - Facebook/Instagram Style */}
                <div className="p-4">
                  {/* Badge */}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 inline-block mb-3">
                    📰 News
                  </span>

                  {/* News Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>

                  {/* Arabic Title */}
                  {item.title_ar && (
                    <h3 className="text-base font-semibold text-gray-700 mb-2" dir="rtl">
                      {item.title_ar}
                    </h3>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span className="font-medium">
                      {new Date(item.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* News Description - Truncated with Read More */}
                  <div className="mb-3">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2" id={`content-${item.id}`}>
                      {item.content}
                    </p>
                    {item.content.length > 200 && (
                      <button 
                        onClick={() => {
                          const el = document.getElementById(`content-${item.id}`);
                          if (el) {
                            el.classList.toggle('line-clamp-2');
                            el.classList.toggle('line-clamp-none');
                          }
                        }}
                        className="text-blue-600 hover:text-blue-700 font-semibold mt-1 text-xs transition-colors">
                        Read More →
                      </button>
                    )}
                  </div>

                  {/* Arabic Content - Truncated with Read More */}
                  {item.content_ar && (
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2" id={`content-ar-${item.id}`} dir="rtl">
                        {item.content_ar}
                      </p>
                      {item.content_ar.length > 200 && (
                        <button 
                          onClick={() => {
                            const el = document.getElementById(`content-ar-${item.id}`);
                            if (el) {
                              el.classList.toggle('line-clamp-2');
                              el.classList.toggle('line-clamp-none');
                            }
                          }}
                          className="text-blue-600 hover:text-blue-700 font-semibold mt-1 text-xs transition-colors">
                          اقرأ المزيد ←
                        </button>
                      )}
                    </div>
                  )}

                  {/* News Media - Compact Size */}
                  {item.media_url && (
                    <div className="mt-3 mb-3">
                      {item.media_type === 'video' ? (
                        <div className="relative w-full bg-black rounded-md shadow-md overflow-hidden group cursor-pointer"
                             onClick={() => setExpandedMediaId(item.id)}>
                          <video
                            src={item.media_url}
                            className="w-full h-auto object-contain"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        </div>
                      ) : (
                        <div className="relative w-full h-40 rounded-md overflow-hidden shadow-md cursor-pointer group"
                             onClick={() => setExpandedMediaId(item.id)}>
                          <Image
                            src={item.media_url}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Media Modal */}
      {expandedMediaId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
             onClick={() => setExpandedMediaId(null)}>
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setExpandedMediaId(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Media Content */}
            {news.map(item => 
              item.id === expandedMediaId ? (
                <div key={item.id}>
                  {item.media_type === 'video' ? (
                    <video
                      src={item.media_url || ''}
                      controls
                      autoPlay
                      className="w-full h-auto max-h-[80vh] object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-[80vh]">
                      <Image
                        src={item.media_url!}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

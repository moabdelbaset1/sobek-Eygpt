"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Clock, ArrowRight, Search, Calendar } from 'lucide-react';

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

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
          <div className="space-y-8">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* News Content - Medium Facebook Style */}
                <div className="p-8">
                  {/* Badge */}
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 inline-block mb-4">
                    📰 News
                  </span>

                  {/* News Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>

                  {/* Arabic Title */}
                  {item.title_ar && (
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4" dir="rtl">
                      {item.title_ar}
                    </h3>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">
                      {new Date(item.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* News Description - Full content visible */}
                  <div className="mb-5">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  </div>

                  {/* Arabic Content - Full content visible */}
                  {item.content_ar && (
                    <div className="mb-5">
                      <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap" dir="rtl">
                        {item.content_ar}
                      </p>
                    </div>
                  )}

                  {/* News Media - Medium Size */}
                  {item.media_url && (
                    <div className="mt-6 mb-5">
                      {item.media_type === 'video' ? (
                        <video
                          src={item.media_url}
                          controls
                          className="w-full h-[400px] object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={item.media_url}
                            alt={item.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Read More Link - Optional */}
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <Link 
                      href={`/media/news/${item.id}`}
                      className="inline-flex items-center text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                      Read Full Details
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

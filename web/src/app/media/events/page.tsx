"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, ArrowRight, Search } from 'lucide-react';

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

export default function EventsPage() {
  const [events, setEvents] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media?type=event');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Stay updated with our latest events, conferences, and activities
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
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">Check back soon for upcoming events</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Event Content - Medium Facebook Style */}
                <div className="p-8">
                  {/* Badge */}
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 inline-block mb-4">
                    📅 Event
                  </span>

                  {/* Event Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight hover:text-red-600 transition-colors">
                    {event.title}
                  </h2>

                  {/* Arabic Title */}
                  {event.title_ar && (
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4" dir="rtl">
                      {event.title_ar}
                    </h3>
                  )}

                  {/* Event Date */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <span className="font-medium">
                      {new Date(event.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Event Description - Full content visible */}
                  <div className="mb-5">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {event.content}
                    </p>
                  </div>

                  {/* Arabic Content - Full content visible */}
                  {event.content_ar && (
                    <div className="mb-5">
                      <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap" dir="rtl">
                        {event.content_ar}
                      </p>
                    </div>
                  )}

                  {/* Event Media - Medium Size */}
                  {event.media_url && (
                    <div className="mt-6 mb-5">
                      {event.media_type === 'video' ? (
                        <video
                          src={event.media_url}
                          controls
                          className="w-full h-[400px] object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={event.media_url}
                            alt={event.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Learn More Link - Optional */}
                  <div className="mt-6 pt-5 border-t border-gray-200">
                    <Link 
                      href={`/media/events/${event.id}`}
                      className="inline-flex items-center text-base font-semibold text-red-600 hover:text-red-700 transition-colors group"
                    >
                      View Event Details
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

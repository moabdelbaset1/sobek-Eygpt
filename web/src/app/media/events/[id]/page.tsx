"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Clock, Share2 } from 'lucide-react';

interface MediaPost {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'event';
  image_url?: string;
  video_url?: string;
  event_date?: string;
  event_location?: string;
  is_published: boolean;
  created_at: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<MediaPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      } else {
        router.push('/media/events');
      }
    } catch (error) {
      console.error('Error loading event:', error);
      router.push('/media/events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/media/events"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          {event.image_url && (
            <div className="relative h-96">
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Event Details */}
          <div className="p-8">
            {/* Event Meta */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
              {event.event_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <span className="font-medium">
                    {new Date(event.event_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              {event.event_location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="font-medium">{event.event_location}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {event.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.content}
              </p>
            </div>

            {/* Video if available */}
            {event.video_url && (
              <div className="mt-8">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={event.video_url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Share Button */}
            <div className="mt-8 pt-8 border-t">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.title,
                      text: event.content.substring(0, 100) + '...',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Event
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

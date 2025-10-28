"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

interface MediaPost {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'event';
  image_url?: string;
  video_url?: string;
  is_published: boolean;
  created_at: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<MediaPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [params.id]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      } else {
        router.push('/media/news');
      }
    } catch (error) {
      console.error('Error loading news:', error);
      router.push('/media/news');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/media/news"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
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
          {news.image_url && (
            <div className="relative h-96">
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* News Details */}
          <div className="p-8">
            {/* Date */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {new Date(news.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {news.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {news.content}
              </p>
            </div>

            {/* Video if available */}
            {news.video_url && (
              <div className="mt-8">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={news.video_url}
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
                      title: news.title,
                      text: news.content.substring(0, 100) + '...',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Article
              </button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

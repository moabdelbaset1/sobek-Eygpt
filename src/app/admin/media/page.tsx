"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Upload,
  Calendar,
  Filter
} from 'lucide-react';
import { mediaPostsAPI } from '@/lib/api';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface MediaPost {
  id: string;
  title: string;
  title_ar?: string | null;
  content: string;
  content_ar?: string | null;
  type: 'news' | 'event';
  media_type?: string | null;
  media_url?: string | null;
  is_active: boolean;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

// Post Form Modal
function PostFormModal({
  isOpen,
  onClose,
  post,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  post?: MediaPost | null;
  onSave: (data: Partial<MediaPost>) => void;
}) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: post || {
      title: '',
      title_ar: '',
      content: '',
      content_ar: '',
      type: 'news',
      media_type: null,
      media_url: null,
      is_active: true,
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<string>(post?.media_url || '');
  const mediaType = watch('media_type');

  useEffect(() => {
    if (post) {
      reset(post);
      setPreviewMedia(post.media_url || '');
    } else {
      reset({
        title: '',
        title_ar: '',
        content: '',
        content_ar: '',
        type: 'news',
        media_type: null,
        media_url: null,
        is_active: true,
      });
      setPreviewMedia('');
    }
  }, [post, reset]);

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Use uploadMedia function
      const { uploadMedia } = await import('@/lib/uploadHelpers');
      const mediaUrl = await uploadMedia(file);
      setValue('media_url', mediaUrl);
      setPreviewMedia(mediaUrl);

      // Detect media type
      if (file.type.startsWith('image/')) {
        setValue('media_type', 'image');
      } else if (file.type.startsWith('video/')) {
        setValue('media_type', 'video');
      }

      toast.success('Media uploaded successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload media');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      id: post?.id,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition-colors bg-white p-2 rounded-lg border border-gray-200 hover:border-red-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Type Selection */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Post Type
            </label>
            <div className="flex gap-4">
              <label className="flex-1 relative cursor-pointer group">
                <input
                  type="radio"
                  value="news"
                  {...register('type')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg peer-checked:border-red-500 peer-checked:text-red-700 peer-checked:bg-red-50 transition-all group-hover:border-red-200">
                  <Newspaper className="w-4 h-4" />
                  <span className="font-medium">News</span>
                </div>
              </label>
              <label className="flex-1 relative cursor-pointer group">
                <input
                  type="radio"
                  value="event"
                  {...register('type')}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-lg peer-checked:border-red-500 peer-checked:text-red-700 peer-checked:bg-red-50 transition-all group-hover:border-red-200">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Event</span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title (English) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                required
                {...register('title')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none"
                placeholder="Enter post title"
              />
            </div>

            {/* Title (Arabic) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                Title (Arabic)
              </label>
              <input
                type="text"
                {...register('title_ar')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none text-right"
                placeholder="???? ????? ???????"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Content (English) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content (English) *
              </label>
              <textarea
                required
                {...register('content')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none resize-none"
                placeholder="Enter post content..."
              />
            </div>

            {/* Content (Arabic) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                Content (Arabic)
              </label>
              <textarea
                {...register('content_ar')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow outline-none resize-none text-right"
                placeholder="???? ????? ???????..."
                dir="rtl"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="border-t border-gray-100 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Media Attachment (Image or Video)
            </label>

            {previewMedia ? (
              <div className="mb-4 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                {mediaType === 'video' ? (
                  <video src={previewMedia} controls className="w-full h-64 object-cover" />
                ) : (
                  <div className="relative w-full h-64">
                    <Image
                      src={previewMedia}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewMedia('');
                    setValue('media_url', null);
                    setValue('media_type', null);
                  }}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 shadow-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer group">
                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl group-hover:border-red-500 group-hover:bg-red-50/50 transition-all">
                  <div className="text-center p-6">
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    ) : (
                      <>
                        <div className="bg-gray-100 p-3 rounded-full inline-block mb-3 group-hover:bg-red-100 transition-colors">
                          <Upload className="w-6 h-6 text-gray-500 group-hover:text-red-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 group-hover:text-red-700">Click to upload media</p>
                        <p className="text-xs text-gray-400 mt-1">Images or Videos (Max 10MB)</p>
                      </>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <input
              type="checkbox"
              {...register('is_active')}
              id="is_active"
              className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
              Publish immediately (visible to public)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-xl font-medium hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/20 transition-all"
            >
              {post ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function MediaManagementPage() {
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<MediaPost | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'news' | 'event'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Basic auth check
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      loadPosts();
    }
  }, [router]);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(post => post.type === filterType);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, filterType]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await mediaPostsAPI.getAll();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: MediaPost) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`)) {
      try {
        await mediaPostsAPI.delete(id);
        toast.success('Post deleted successfully!');
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post');
      }
    }
  };

  const handleSave = async (postData: Partial<MediaPost>) => {
    try {
      if (editingPost) {
        await mediaPostsAPI.update(editingPost.id, postData);
        toast.success('Post updated successfully!');
      } else {
        await mediaPostsAPI.create(postData);
        toast.success('Post published successfully!');
      }
      await loadPosts();
      setShowModal(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-4 rounded-xl shadow-lg">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Media & News</h1>
                <p className="text-gray-500 mt-1">Manage news articles and community events</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingPost(null);
                setShowModal(true);
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-gray-900/10 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search titles or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full md:w-48 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="news">News Only</option>
                  <option value="event">Events Only</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
              <span>Showing results for <span className="font-semibold text-gray-900">{filterType === 'all' ? 'All Types' : filterType}</span></span>
              <span>Total: <span className="font-bold text-gray-900">{filteredPosts.length}</span> posts</span>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-500 text-lg">Loading content...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Newspaper className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">It looks like the media library is empty. Create your first news article or event using the button below.</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl inline-flex items-center gap-2 font-medium transition-all shadow-lg shadow-red-600/20"
              >
                <Plus className="w-5 h-5" />
                Create First Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                    {/* Media Preview (Left side) */}
                    {post.media_url && (
                      <div className="w-full md:w-64 h-48 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden relative">
                        {post.media_type === 'video' ? (
                          <video
                            src={post.media_url}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={post.media_url}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-2 left-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-medium">
                          {post.media_type === 'video' ? 'Video' : 'Image'}
                        </div>
                      </div>
                    )}

                    {/* Content (Right side) */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${post.type === 'news' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>
                            {post.type.toUpperCase()}
                          </span>
                          {!post.is_active && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gray-100 text-gray-600 border border-gray-200">
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">{post.title}</h3>

                      {post.title_ar && (
                        <p className="text-lg text-gray-500 mb-3 text-right font-serif" dir="rtl">{post.title_ar}</p>
                      )}

                      <p className="text-gray-600 line-clamp-2 mb-auto leading-relaxed">{post.content}</p>

                      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Published: {new Date(post.publish_date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <PostFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingPost(null);
          }}
          post={editingPost}
          onSave={handleSave}
        />
      </div>
    </div >
  );
}

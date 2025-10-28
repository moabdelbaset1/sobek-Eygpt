"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Calendar,
  Eye
} from 'lucide-react';
import { mediaPostsAPI } from '@/lib/api';
import { uploadProductImage } from '@/lib/uploadHelpers';

// Sidebar Component
function AdminSidebar({ currentPage }: { currentPage: string }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'human-products', label: 'Human Products', icon: Package, href: '/admin/products/human' },
    { id: 'vet-products', label: 'Veterinary Products', icon: Package, href: '/admin/products/veterinary' },
    { id: 'categories', label: 'Categories', icon: Users, href: '/admin/categories' },
    { id: 'media', label: 'Media & News', icon: Newspaper, href: '/admin/media' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Sobek Pharma</h2>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-right ${
                currentPage === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 ml-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-56">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 ml-3" />
          Logout
        </button>
      </div>
    </div>
  );
}

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
    }
  }, [post, reset]);

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Use uploadMedia function instead of uploadProductImage
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="news"
                  {...register('type')}
                  className="mr-2"
                />
                <Newspaper className="w-4 h-4 mr-1" />
                News
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="event"
                  {...register('type')}
                  className="mr-2"
                />
                <Calendar className="w-4 h-4 mr-1" />
                Event
              </label>
            </div>
          </div>

          {/* Title (English) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) *
            </label>
            <input
              type="text"
              required
              {...register('title')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          {/* Title (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Arabic)
            </label>
            <input
              type="text"
              {...register('title_ar')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-right"
              placeholder="أدخل عنوان المنشور"
              dir="rtl"
            />
          </div>

          {/* Content (English) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (English) *
            </label>
            <textarea
              required
              {...register('content')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter post content..."
            />
          </div>

          {/* Content (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Arabic)
            </label>
            <textarea
              {...register('content_ar')}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-right"
              placeholder="أدخل محتوى المنشور..."
              dir="rtl"
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media (Image or Video)
            </label>
            
            {previewMedia && (
              <div className="mb-4 relative">
                {mediaType === 'video' ? (
                  <video src={previewMedia} controls className="w-full h-64 object-cover rounded-lg" />
                ) : (
                  <Image
                    src={previewMedia}
                    alt="Preview"
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPreviewMedia('');
                    setValue('media_url', null);
                    setValue('media_type', null);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <label className="cursor-pointer">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors">
                <div className="text-center">
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">Upload Image or Video</span>
                      <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
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
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('is_active')}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Publish immediately (visible to public)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {post ? 'Update Post' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<MediaPost | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'news' | 'event'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">Verifying authentication...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar currentPage="media" />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Media & News Management</h1>
              <p className="text-gray-600 mt-2">Manage news articles and events</p>
            </div>
            <button
              onClick={() => {
                setEditingPost(null);
                setShowModal(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="news">News Only</option>
                <option value="event">Events Only</option>
              </select>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Total: <span className="font-bold text-gray-900">{filteredPosts.length}</span> posts
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-4">Create your first post to get started</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Post
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            post.type === 'news' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {post.type === 'news' ? '📰 News' : '📅 Event'}
                          </span>
                          {!post.is_active && (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                              Draft
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
                        {post.title_ar && (
                          <p className="text-lg text-gray-600 mb-2" dir="rtl">{post.title_ar}</p>
                        )}
                        <p className="text-gray-600 line-clamp-3 mb-3">{post.content}</p>
                        <p className="text-sm text-gray-500">
                          Published: {new Date(post.publish_date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {post.media_url && (
                      <div className="mt-4">
                        {post.media_type === 'video' ? (
                          <video
                            src={post.media_url}
                            controls
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ) : (
                          <Image
                            src={post.media_url}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}
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
      </main>
    </div>
  );
}

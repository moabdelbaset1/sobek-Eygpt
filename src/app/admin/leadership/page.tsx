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
  Crown
} from 'lucide-react';
import { leadershipAPI } from '@/lib/api';
import { uploadLeadershipImage } from '@/lib/uploadHelpers';

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
    { id: 'jobs', label: 'Jobs Management', icon: Users, href: '/admin/jobs' },
    { id: 'applications', label: 'Job Applications', icon: Users, href: '/admin/applications' },
    { id: 'leadership', label: 'Leadership Team', icon: Crown, href: '/admin/leadership' },
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
          <h2 className="font-bold text-lg">Sobek Egypt Pharma</h2>
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

interface LeadershipMember {
  id: string;
  name: string;
  name_ar?: string | null;
  title: string;
  title_ar?: string | null;
  department: string;
  department_ar?: string | null;
  bio: string;
  bio_ar?: string | null;
  image_url: string | null;
  is_leadership: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Member Form Modal
function MemberFormModal({
  isOpen,
  onClose,
  member,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  member?: LeadershipMember | null;
  onSave: (data: Partial<LeadershipMember>) => void;
}) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: member || {
      name: '',
      name_ar: '',
      title: '',
      title_ar: '',
      department: '',
      department_ar: '',
      bio: '',
      bio_ar: '',
      image_url: null,
      is_leadership: false,
      is_active: true,
    }
  });

  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(member?.image_url || '');

  useEffect(() => {
    if (member) {
      reset(member);
      setPreviewImage(member.image_url || '');
    }
  }, [member, reset]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadLeadershipImage(file);
      setValue('image_url', imageUrl);
      setPreviewImage(imageUrl);

      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      id: member?.id,
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
            {member ? 'Edit Company Owner' : 'Add Company Owner'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          {/* Name (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name (Arabic)
            </label>
            <input
              type="text"
              {...register('name_ar')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter full name in Arabic"
            />
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
              placeholder="Enter job title in English"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter job title in Arabic"
            />
          </div>

          {/* Department - Hidden */}
          <input
            type="hidden"
            {...register('department')}
            value="Company Owner"
          />

          {/* Department (Arabic) - Hidden */}
          <input
            type="hidden"
            {...register('department_ar')}
            value="صاحب الشركة"
          />

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              required
              {...register('bio')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter biography..."
            />
          </div>

          {/* Bio (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio (Arabic)
            </label>
            <textarea
              {...register('bio_ar')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter biography in Arabic..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Owner Image
            </label>

            {previewImage && (
              <div className="mb-4 relative">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage('');
                    setValue('image_url', null);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X className="w-3 h-3" />
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
                      <span className="text-sm text-gray-500">Upload Company Owner Image</span>
                      <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                    </>
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>

          {/* Leadership Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('is_leadership')}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Company Owner (shown on About page)
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
              Active (visible on website)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {member ? 'Update Owner' : 'Add Owner'}
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

export default function LeadershipManagementPage() {
  const [members, setMembers] = useState<LeadershipMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<LeadershipMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [leadershipOnly, setLeadershipOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadMembers();
    }
  }, [router]);

  useEffect(() => {
    let filtered = members;

    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (leadershipOnly) {
      filtered = filtered.filter(member => member.is_leadership);
    }

    if (activeOnly) {
      filtered = filtered.filter(member => member.is_active);
    }

    setFilteredMembers(filtered);
  }, [members, searchQuery, leadershipOnly, activeOnly]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await leadershipAPI.getAll();
      setMembers(data);
    } catch (error) {
      console.error('Error loading members:', error);
      toast.error('Failed to load company owner');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: LeadershipMember) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete company owner "${name}"?\n\nThis action cannot be undone.`)) {
      try {
        await leadershipAPI.delete(id);
        toast.success('Owner deleted successfully!');
        await loadMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
        toast.error('Failed to delete owner');
      }
    }
  };

  const handleSave = async (memberData: Partial<LeadershipMember>) => {
    try {
      if (editingMember) {
        await leadershipAPI.update(editingMember.id, memberData);
        toast.success('Owner updated successfully!');
      } else {
        await leadershipAPI.create(memberData);
        toast.success('Owner added successfully!');
      }
      await loadMembers();
      setShowModal(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
      toast.error('Failed to save owner');
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
      <AdminSidebar currentPage="leadership" />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Owner Management</h1>
              <p className="text-gray-600 mt-2">Manage company owner information and message</p>
            </div>
            <button
              onClick={() => {
                setEditingMember(null);
                setShowModal(true);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Owner
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="leadership-only"
                    checked={leadershipOnly}
                    onChange={(e) => setLeadershipOnly(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="leadership-only" className="text-sm text-gray-700">
                    Leadership Only
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active-only"
                    checked={activeOnly}
                    onChange={(e) => setActiveOnly(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="active-only" className="text-sm text-gray-700">
                    Active Only
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Total: <span className="font-bold text-gray-900">{filteredMembers.length}</span> owner{filteredMembers.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Members List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Loading owner...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No owner found</h3>
              <p className="text-gray-500 mb-4">Add company owner information to get started</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Owner
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        {member.image_url && (
                          <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
                            <Image
                              src={member.image_url}
                              alt={member.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {member.title}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {member.department}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{member.bio}</p>
                        {member.is_leadership && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-2">
                            Company Owner
                          </span>
                        )}
                        {!member.is_active && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <MemberFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingMember(null);
          }}
          member={editingMember}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Edit2, Trash2, Users, Calendar, X, Save, MapPin, Clock, FileText } from 'lucide-react';
import { jobsAPI, type Job } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    department: '',
    location: '',
    job_type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    working_hours: '',
    description: '',
    description_ar: '',
    requirements: '',
    requirements_ar: '',
    is_active: true,
    publish_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Authentication check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsAPI.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('فشل تحميل الوظائف');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      title_ar: job.title_ar || '',
      department: job.department,
      location: job.location,
      job_type: job.job_type as 'full-time' | 'part-time' | 'contract' | 'internship',
      working_hours: job.working_hours,
      description: job.description,
      description_ar: job.description_ar || '',
      requirements: job.requirements,
      requirements_ar: job.requirements_ar || '',
      is_active: job.is_active,
      publish_date: job.publish_date?.split('T')[0] || new Date().toISOString().split('T')[0],
      expiry_date: job.expiry_date?.split('T')[0] || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (job: Job) => {
    if (!confirm(`هل تريد حذف الوظيفة: ${job.title}؟`)) return;

    try {
      await jobsAPI.delete(job.id);
      toast.success('تم حذف الوظيفة بنجاح');
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('فشل حذف الوظيفة');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      
      const jobData = {
        ...formData,
        expiry_date: formData.expiry_date || null,
      };

      if (editingJob) {
        await jobsAPI.update(editingJob.id, jobData);
        toast.success('تم تحديث الوظيفة بنجاح');
      } else {
        await jobsAPI.create(jobData);
        toast.success('تم إضافة الوظيفة بنجاح');
      }

      setShowModal(false);
      resetForm();
      loadJobs();
    } catch (error: any) {
      console.error('Error saving job:', error);
      toast.error(error.message || 'فشل حفظ الوظيفة');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      title_ar: '',
      department: '',
      location: '',
      job_type: 'full-time',
      working_hours: '',
      description: '',
      description_ar: '',
      requirements: '',
      requirements_ar: '',
      is_active: true,
      publish_date: new Date().toISOString().split('T')[0],
      expiry_date: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
      <AdminSidebar />
      <div className="flex-1 ml-72 p-8">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-4 rounded-2xl shadow-xl">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Jobs Management</h1>
              <p className="text-gray-300 mt-1">Add, edit, and manage job postings</p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2 font-bold shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Jobs</p>
                <p className="text-4xl font-bold text-white mt-2">{jobs.length}</p>
              </div>
              <Briefcase className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Jobs</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {jobs.filter(j => j.is_active).length}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Applicants</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {jobs.reduce((sum, job) => sum + (job.applications_count || 0), 0)}
                </p>
              </div>
              <Users className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
            <p className="text-white mt-4 text-xl">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center">
            <Briefcase className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Jobs Posted</h3>
            <p className="text-gray-300 mb-6">Start by adding your first job posting</p>
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                      {job.is_active ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold border border-green-500/30">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm font-semibold border border-gray-500/30">
                          Inactive
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">{job.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-sm">{job.working_hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-bold">{job.applications_count || 0} Applicants</span>
                      </div>
                    </div>

                    {job.expiry_date && (
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Expires: {new Date(job.expiry_date).toLocaleDateString('en-US')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
              >
                <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {editingJob ? 'تعديل الوظيفة' : 'إضافة وظيفة جديدة'}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Title */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Job Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Senior Software Engineer"
                      />
                    </div>

                    {/* Arabic Title */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        المسمى الوظيفي (عربي) <span className="text-gray-500 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title_ar}
                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="مهندس برمجيات أول"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="IT, Sales, Production..."
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Cairo, Egypt"
                      />
                    </div>

                    {/* Job Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Job Type *
                      </label>
                      <select
                        required
                        value={formData.job_type}
                        onChange={(e) => setFormData({ ...formData, job_type: e.target.value as any })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    {/* Working Hours */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Working Hours *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.working_hours}
                        onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="9:00 AM - 5:00 PM"
                      />
                    </div>

                    {/* Publish Date */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Publish Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.publish_date}
                        onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    {/* Expiry Date */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.expiry_date}
                        onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Description English */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Job Description (English) *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Detailed job description..."
                    />
                  </div>

                  {/* Description Arabic */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      الوصف الوظيفي (عربي) <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="وصف تفصيلي للوظيفة..."
                    />
                  </div>

                  {/* Requirements English */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Requirements (English) *
                    </label>
                    <textarea
                      required
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Required skills, experience, education..."
                    />
                  </div>

                  {/* Requirements Arabic */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      المتطلبات (عربي) <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.requirements_ar}
                      onChange={(e) => setFormData({ ...formData, requirements_ar: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="المهارات والخبرة والتعليم المطلوب..."
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="is_active" className="text-sm font-bold text-gray-900">
                      نشط (سيظهر في صفحة الوظائف)
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold shadow-lg"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent mr-2"></div>
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {editingJob ? 'تحديث الوظيفة' : 'إضافة الوظيفة'}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Plus, Edit2, Trash2, Users, Calendar, X, Save, MapPin, Clock, FileText,
  Download, Mail, Phone, User, Filter, CheckCircle, XCircle, Eye
} from 'lucide-react';
import { jobsAPI, type Job, type JobApplication } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminCareersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  
  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
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

  // Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Authentication check
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  const loadJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await jobsAPI.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('فشل تحميل الوظائف');
    } finally {
      setLoadingJobs(false);
    }
  };

  const loadApplications = async () => {
    try {
      setLoadingApplications(true);
      const res = await fetch('/api/applications');
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      title_ar: job.title_ar || '',
      department: job.department,
      location: job.location,
      job_type: job.job_type as any,
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

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/applications?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      toast.success('Status updated successfully');
      loadApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: Clock },
      reviewed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: Eye },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: XCircle },
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                <h1 className="text-4xl font-bold text-gray-900">Careers Management</h1>
                <p className="text-gray-600 mt-1">Manage jobs and review applications</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                activeTab === 'jobs'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Jobs Management
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === 'jobs' ? 'bg-white text-red-600' : 'bg-red-100 text-red-600'
              }`}>{jobs.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                activeTab === 'applications'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <FileText className="w-5 h-5" />
              Applications
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === 'applications' ? 'bg-white text-red-600' : 'bg-red-100 text-red-600'
              }`}>{applications.length}</span>
            </button>
          </div>

          {/* Jobs Tab Content */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2 font-bold shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Add New Job
                </button>
              </div>

              {/* Jobs Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">{jobs.length}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {jobs.filter(j => j.is_active).length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Applicants</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {jobs.reduce((sum, job) => sum + (job.applications_count || 0), 0)}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs List */}
              {loadingJobs ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                  <p className="text-gray-600 mt-4 text-xl">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                  <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Posted</h3>
                  <p className="text-gray-600 mb-6">Start by adding your first job posting</p>
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
                      className="bg-white rounded-2xl p-6 hover:shadow-md transition-all shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                            {job.is_active ? (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                                Active
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold border border-gray-200">
                                Inactive
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-red-600" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{job.working_hours}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-bold">{job.applications_count || 0} Applicants</span>
                            </div>
                          </div>
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
            </div>
          )}

          {/* Applications Tab Content */}
          {activeTab === 'applications' && (
            <div>
              {/* Filter */}
              <div className="flex justify-end mb-6">
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-transparent text-gray-900 border-none outline-none font-medium"
                  >
                    <option value="all">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Applications Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">{applications.length}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Pending</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {applications.filter(a => a.status === 'pending').length}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-xl">
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Shortlisted</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {applications.filter(a => a.status === 'shortlisted').length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Rejected</p>
                      <p className="text-4xl font-bold text-gray-900 mt-2">
                        {applications.filter(a => a.status === 'rejected').length}
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-xl">
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              {loadingApplications ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                  <p className="text-gray-600 mt-4 text-xl">Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
                  <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Applications Found</h3>
                  <p className="text-gray-600">
                    {filterStatus === 'all' ? 'No applications received yet' : `No ${filterStatus} applications`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-6 hover:shadow-md transition-all shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="bg-gray-100 p-3 rounded-full">
                              <User className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{app.full_name}</h3>
                              {app.job_title && (
                                <p className="text-gray-600 text-sm">Applied for: {app.job_title}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">{app.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{app.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="text-sm">
                                {new Date(app.created_at).toLocaleDateString('en-US')}
                              </span>
                            </div>
                          </div>

                          {app.cover_letter && (
                            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg mb-4">
                              {app.cover_letter}
                            </p>
                          )}
                        </div>
                        
                        <div className="ml-4">
                          {getStatusBadge(app.status)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <a
                          href={app.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download CV
                        </a>

                        <div className="flex gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                            className="bg-gray-50 text-gray-900 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Job Add/Edit Modal */}
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
                        {editingJob ? 'Edit Job' : 'Add New Job'}
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
                          placeholder="Senior Software Engineer"
                        />
                      </div>

                      {/* Arabic Title */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          المسمى الوظيفي (عربي)
                        </label>
                        <input
                          type="text"
                          value={formData.title_ar}
                          onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
                          placeholder="9:00 AM - 5:00 PM"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Job Description *
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
                        placeholder="Detailed job description..."
                      />
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Requirements *
                      </label>
                      <textarea
                        required
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-900 bg-white"
                        placeholder="• Requirement 1&#10;• Requirement 2&#10;• Requirement 3"
                      />
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <label htmlFor="is_active" className="text-sm font-bold text-gray-900">
                        Active (visible to applicants)
                      </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-bold shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            {editingJob ? 'Update Job' : 'Create Job'}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
                      >
                        Cancel
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

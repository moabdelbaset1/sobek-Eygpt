"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Phone, Calendar, Briefcase, User, Filter, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { type JobApplication } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/applications');
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
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
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: Clock },
      reviewed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', icon: Eye },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: XCircle },
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Job Applications</h1>
              <p className="text-gray-300 mt-1">Review and manage candidate applications</p>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-300" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Applications</p>
                <p className="text-4xl font-bold text-white mt-2">{applications.length}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Shortlisted</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {applications.filter(a => a.status === 'shortlisted').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Rejected</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {applications.filter(a => a.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
            <p className="text-white mt-4 text-xl">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 text-center">
            <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Applications Found</h3>
            <p className="text-gray-300">
              {filterStatus === 'all' ? 'No applications received yet' : `No ${filterStatus} applications`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{app.full_name}</h3>
                          <p className="text-gray-500 text-sm">
                            Applied {new Date(app.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {app.job_title && (
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                        <Briefcase className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-xs text-gray-500">Position Applied For</p>
                          <p className="font-semibold text-gray-900">{app.job_title}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">{app.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">{app.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Submitted</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(app.created_at).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {app.cover_letter && (
                    <div className="mb-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                      <p className="text-sm font-bold text-blue-900 mb-2">Cover Letter:</p>
                      <p className="text-gray-700 leading-relaxed">{app.cover_letter}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    {/* CV Download Button */}
                    <a
                      href={app.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 font-bold shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Download CV
                    </a>

                    {/* Status Update Buttons */}
                    {app.status !== 'shortlisted' && (
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                        className="px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all flex items-center gap-2 font-semibold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Shortlist
                      </button>
                    )}
                    {app.status !== 'rejected' && (
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all flex items-center gap-2 font-semibold"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    )}
                    {app.status === 'pending' && (
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'reviewed')}
                        className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all flex items-center gap-2 font-semibold"
                      >
                        <Eye className="w-5 h-5" />
                        Mark Reviewed
                      </button>
                    )}
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

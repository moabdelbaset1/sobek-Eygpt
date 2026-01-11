"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Phone, Calendar, Briefcase, User, Filter, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { type JobApplication } from '@/lib/api';
import toast from 'react-hot-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

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
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-4 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
                <p className="text-gray-500 mt-1">Review and manage candidate applications</p>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{applications.length}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {applications.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Shortlisted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {applications.filter(a => a.status === 'shortlisted').length}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {applications.filter(a => a.status === 'rejected').length}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              <p className="text-gray-500 mt-4 text-lg">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-500">
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
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{app.full_name}</h3>
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
                        <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Position</p>
                            <p className="font-medium text-gray-900">{app.job_title}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                          <p className="font-medium text-gray-900">{app.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                          <p className="font-medium text-gray-900">{app.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Submitted</p>
                          <p className="font-medium text-gray-900">
                            {new Date(app.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {app.cover_letter && (
                      <div className="mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" /> Cover Letter
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{app.cover_letter}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                      {/* CV Download Button */}
                      <a
                        href={app.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download CV
                      </a>

                      {/* Status Update Buttons */}
                      {app.status !== 'shortlisted' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                          className="px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2 font-medium text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Shortlist
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 font-medium text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      )}
                      {app.status === 'pending' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'reviewed')}
                          className="px-4 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
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
    </div>
  );
}

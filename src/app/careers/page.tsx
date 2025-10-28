"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Calendar, Users, Send, Upload, FileText, CheckCircle } from 'lucide-react';
import { jobsAPI, type Job } from '@/lib/api';
import { uploadCV } from '@/lib/uploadHelpers';
import toast from 'react-hot-toast';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsAPI.getActive();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error('فشل تحميل الوظائف');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      toast.error('من فضلك ارفع السيرة الذاتية');
      return;
    }

    try {
      setSubmitting(true);
      const cvUrl = await uploadCV(cvFile);
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJob?.id || null,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          cv_url: cvUrl,
          cover_letter: formData.cover_letter || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
      setFormData({ full_name: '', email: '', phone: '', cover_letter: '' });
      setCvFile(null);
      setSelectedJob(null);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'فشل إرسال الطلب');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-red-600 p-4 rounded-2xl shadow-2xl">
                <Briefcase className="w-16 h-16" />
              </div>
            </motion.div>
            <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200">
              Join Sobek Pharma
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Build your career with Egypt's leading pharmaceutical company
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white font-semibold">{jobs.length} Open Positions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Form Left, Jobs Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Application Form - Left Side (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-8">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-black/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedJob ? 'Apply Now' : 'Submit Application'}
                    </h2>
                  </div>
                  {selectedJob && (
                    <p className="text-red-100 text-sm">
                      Applying for: <span className="font-semibold">{selectedJob.title}</span>
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmitApplication} className="p-6 space-y-4 bg-white">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      placeholder="+20 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Upload CV * (Max 10MB)</label>
                    <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all">
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 text-center">
                        {cvFile ? cvFile.name : 'Click to upload'}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {cvFile && (
                      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>{(cvFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Cover Letter (Optional)</label>
                    <textarea
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                      placeholder="Why are you a great fit?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>

                  {selectedJob && (
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                    >
                      Clear Selection
                    </button>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Jobs List - Right Side */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                  <div className="bg-red-600 p-3 rounded-xl mr-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  Open Positions
                </h2>
                {jobs.length > 0 && (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                    {jobs.length} {jobs.length === 1 ? 'Position' : 'Positions'}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                  <p className="mt-6 text-xl text-gray-600 font-medium">Loading opportunities...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-12 text-center border border-gray-200">
                  <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">No Open Positions Right Now</h3>
                  <p className="text-gray-600 text-lg">
                    Fill out the form on the left to submit a general application
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                {job.title}
                              </h3>
                              <span className="px-4 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-sm font-bold">
                                OPEN
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-gray-600">
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <Briefcase className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{job.department}</span>
                              </span>
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{job.location}</span>
                              </span>
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <Clock className="w-4 h-4 text-red-600" />
                                <span className="font-medium">{job.working_hours}</span>
                              </span>
                              <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <span className="font-medium capitalize">{job.job_type.replace('-', ' ')}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 mb-8">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                              <div className="w-1 h-6 bg-red-600 rounded-full mr-3"></div>
                              Job Description
                            </h4>
                            <p className="text-gray-700 leading-relaxed pl-6 whitespace-pre-line">{job.description}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                              <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                              Requirements
                            </h4>
                            <p className="text-gray-700 leading-relaxed pl-6 whitespace-pre-line">{job.requirements}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleApply(job)}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center font-bold text-lg shadow-lg transform hover:-translate-y-1"
                        >
                          <Send className="w-6 h-6 mr-3" />
                          Apply for this Position
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Why Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Join Sobek Pharma?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-red-600">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Great Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Work with 500+ talented professionals dedicated to excellence
              </p>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-blue-600">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous learning and clear career advancement paths
              </p>
            </div>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-green-600">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">25+ Years Legacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Proven track record in quality healthcare solutions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



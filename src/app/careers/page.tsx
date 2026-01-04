"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Briefcase, MapPin, Clock, Calendar, Users, Send, Upload, FileText, CheckCircle, Search, Sparkles, ArrowRight, GraduationCap, HeartHandshake } from 'lucide-react';
import { jobsAPI, type Job } from '@/lib/api';
import { uploadCV } from '@/lib/uploadHelpers';
import toast from 'react-hot-toast';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function CareersPage() {
  const { lang, isRTL } = useLanguageContext();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(query) || 
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsAPI.getActive();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast.error(lang === 'ar' ? 'فشل تحميل الوظائف' : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      toast.error(lang === 'ar' ? 'من فضلك ارفع السيرة الذاتية' : 'Please upload your CV');
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
      toast.success(lang === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Application submitted successfully!');
      setFormData({ full_name: '', email: '', phone: '', cover_letter: '' });
      setCvFile(null);
      setSelectedJob(null);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || (lang === 'ar' ? 'فشل إرسال الطلب' : 'Failed to submit application'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
            alt="Careers at Sobek"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-gray-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full text-slate-200 mb-6 border border-slate-700/50">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {lang === 'ar' ? 'انضم لفريقنا' : 'Join Our Team'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {lang === 'ar' ? 'ابنِ مستقبلك المهني' : 'Build Your Career'}
            </h1>
            <p className="text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar' 
                ? 'انضم إلى شركة الأدوية الرائدة في مصر وكن جزءاً من قصة نجاحنا.'
                : 'Join Egypt\'s leading pharmaceutical company and be part of our success story.'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-xl mt-10 relative"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-full shadow-xl flex items-center p-2">
                <div className="pl-4 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'ابحث عن وظيفة...' : 'Search for jobs...'}
                  className={`w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md">
                  {lang === 'ar' ? 'بحث' : 'Search'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Application Form - Left Side (Sticky) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="lg:sticky lg:top-8" id="application-form">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {lang === 'ar' ? 'قدم الآن' : 'Apply Now'}
                    </h2>
                  </div>
                  <p className="text-red-100 text-sm opacity-90">
                    {selectedJob 
                      ? (lang === 'ar' ? `التقديم لوظيفة: ${selectedJob.title}` : `Applying for: ${selectedJob.title}`)
                      : (lang === 'ar' ? 'تقديم طلب عام' : 'General Application')}
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="p-6 space-y-5" suppressHydrationWarning>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder={lang === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'ar' ? 'رقم الهاتف *' : 'Phone *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="+20 123 456 7890"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'ar' ? 'السيرة الذاتية * (PDF/Word)' : 'Upload CV * (PDF/Word)'}
                    </label>
                    <label className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-100 transition-colors">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
                      </div>
                      <p className="text-sm text-gray-600 text-center font-medium">
                        {cvFile ? cvFile.name : (lang === 'ar' ? 'اضغط للرفع' : 'Click to upload')}
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
                      <div className="mt-2 flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 p-2 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span>{(cvFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {lang === 'ar' ? 'رسالة تعريفية (اختياري)' : 'Cover Letter (Optional)'}
                    </label>
                    <textarea
                      value={formData.cover_letter}
                      onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder={lang === 'ar' ? 'لماذا أنت مناسب لهذه الوظيفة؟' : 'Why are you a great fit?'}
                      suppressHydrationWarning
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent mr-2"></div>
                        {lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {lang === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
                      </>
                    )}
                  </button>

                  {selectedJob && (
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="w-full text-gray-500 hover:text-gray-800 py-2 text-sm font-medium transition-colors"
                    >
                      {lang === 'ar' ? 'إلغاء التحديد' : 'Clear Selection'}
                    </button>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Jobs List - Right Side */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-red-600" />
                  {lang === 'ar' ? 'الوظائف المتاحة' : 'Open Positions'}
                </h2>
                {filteredJobs.length > 0 && (
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm">
                    {filteredJobs.length} {lang === 'ar' ? 'وظيفة' : 'Positions'}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-medium">{lang === 'ar' ? 'جاري تحميل الوظائف...' : 'Loading opportunities...'}</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                  <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'لا توجد وظائف متاحة حالياً' : 'No Open Positions Right Now'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {lang === 'ar' 
                      ? 'املأ النموذج لتقديم طلب عام وسنتواصل معك عند توفر فرص مناسبة.'
                      : 'Fill out the form to submit a general application and we will contact you when suitable opportunities arise.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${selectedJob?.id === job.id ? 'border-red-500 ring-4 ring-red-50' : 'border-transparent hover:border-red-100'}`}
                      >
                        <div className="p-8">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                  {job.title}
                                </h3>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                  {lang === 'ar' ? 'متاح' : 'Open'}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                  <Briefcase className="w-4 h-4 text-red-500" />
                                  {job.department}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                  <MapPin className="w-4 h-4 text-red-500" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                  <Clock className="w-4 h-4 text-red-500" />
                                  {job.working_hours}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleApply(job)}
                              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 whitespace-nowrap ${
                                selectedJob?.id === job.id 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white'
                              }`}
                            >
                              {selectedJob?.id === job.id ? (
                                <>
                                  <CheckCircle className="w-5 h-5" />
                                  {lang === 'ar' ? 'تم الاختيار' : 'Selected'}
                                </>
                              ) : (
                                <>
                                  {lang === 'ar' ? 'قدم الآن' : 'Apply Now'}
                                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                                </>
                              )}
                            </button>
                          </div>

                          <div className="space-y-6 border-t border-gray-100 pt-6">
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-red-500" />
                                {lang === 'ar' ? 'الوصف الوظيفي' : 'Job Description'}
                              </h4>
                              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                                {job.description}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                                {lang === 'ar' ? 'المتطلبات' : 'Requirements'}
                              </h4>
                              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                                {job.requirements}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* Why Join Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                {lang === 'ar' ? 'لماذا تنضم إلينا؟' : 'Why Join Sobek Pharma?'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 text-red-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'فريق متميز' : 'Great Team'}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {lang === 'ar' 
                      ? 'اعمل مع أكثر من 500 محترف موهوب مكرسين للتميز.'
                      : 'Work with 500+ talented professionals dedicated to excellence.'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'فرص للنمو' : 'Growth Opportunities'}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {lang === 'ar' 
                      ? 'تعلم مستمر ومسارات واضحة للتقدم الوظيفي.'
                      : 'Continuous learning and clear career advancement paths.'}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'بيئة داعمة' : 'Supportive Environment'}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {lang === 'ar' 
                      ? 'بيئة عمل تشجع على الابتكار والتعاون.'
                      : 'A work environment that encourages innovation and collaboration.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}



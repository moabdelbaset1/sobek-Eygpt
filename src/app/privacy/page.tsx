"use client";
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function PrivacyPage() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية'
                : 'We are committed to protecting your privacy and personal data'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-500 mb-8">
              {lang === 'ar' ? 'آخر تحديث: يناير 2026' : 'Last updated: January 2026'}
            </p>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'المعلومات التي نجمعها' : 'Information We Collect'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'نجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وبريدك الإلكتروني ورقم هاتفك عند التقدم لوظيفة أو الاتصال بنا. نستخدم هذه المعلومات فقط للرد على استفساراتك ومعالجة طلباتك.'
                  : 'We collect information you provide directly to us, such as your name, email address, and phone number when applying for a job or contacting us. We use this information only to respond to your inquiries and process your requests.'}
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'كيف نحمي بياناتك' : 'How We Protect Your Data'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'نستخدم تقنيات أمان متقدمة لحماية بياناتك الشخصية. جميع البيانات المنقولة مشفرة باستخدام بروتوكول SSL. نحن لا نشارك بياناتك مع أطراف ثالثة دون موافقتك.'
                  : 'We use advanced security technologies to protect your personal data. All transmitted data is encrypted using SSL protocol. We do not share your data with third parties without your consent.'}
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'حقوقك' : 'Your Rights'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك أيضاً الاعتراض على معالجة بياناتك أو طلب تقييد المعالجة.'
                  : 'You have the right to request access to, correction of, or deletion of your personal data at any time. You can also object to the processing of your data or request restriction of processing.'}
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-6 mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === 'ar' 
                  ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا:'
                  : 'If you have any questions about our Privacy Policy, please contact us:'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:info@sobek.com.eg" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <Mail className="w-5 h-5" />
                  info@sobek.com.eg
                </a>
                <a href="tel:+20554411823" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                  <Phone className="w-5 h-5" />
                  +20 554 411 823
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

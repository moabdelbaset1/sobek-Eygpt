"use client";
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, Scale, Mail, Phone } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function TermsPage() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا'
                : 'Please read these terms carefully before using our website'}
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
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'قبول الشروط' : 'Acceptance of Terms'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا.'
                  : 'By using this website, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use our website.'}
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'استخدام الموقع' : 'Use of Website'}
                </h2>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>{lang === 'ar' ? 'المحتوى المعروض للأغراض المعلوماتية فقط' : 'Content is displayed for informational purposes only'}</li>
                <li>{lang === 'ar' ? 'لا يجوز نسخ أو إعادة توزيع المحتوى دون إذن' : 'Content may not be copied or redistributed without permission'}</li>
                <li>{lang === 'ar' ? 'يجب عدم استخدام الموقع لأي غرض غير قانوني' : 'The website must not be used for any unlawful purpose'}</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimer'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'المعلومات الواردة في هذا الموقع هي لأغراض إعلامية عامة فقط. لا ينبغي اعتبار أي معلومات على هذا الموقع بديلاً عن المشورة الطبية المهنية.'
                  : 'The information contained in this website is for general information purposes only. Information on this website should not be considered a substitute for professional medical advice.'}
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-6 mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === 'ar' 
                  ? 'إذا كان لديك أي أسئلة حول شروط الخدمة:'
                  : 'If you have any questions about our Terms of Service:'}
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

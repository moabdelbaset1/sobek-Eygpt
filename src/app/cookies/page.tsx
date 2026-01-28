"use client";
import { motion } from 'framer-motion';
import { Cookie, Settings, ToggleLeft, Info, Mail, Phone } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function CookiesPage() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {lang === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
            </h1>
            <p className="text-amber-100 text-lg max-w-2xl mx-auto">
              {lang === 'ar' 
                ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا'
                : 'We use cookies to improve your experience on our website'}
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
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'ما هي ملفات تعريف الارتباط؟' : 'What Are Cookies?'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا. تساعدنا هذه الملفات في تذكر تفضيلاتك وتحسين تجربة التصفح.'
                  : 'Cookies are small text files that are stored on your device when you visit our website. These files help us remember your preferences and improve your browsing experience.'}
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'أنواع ملفات تعريف الارتباط' : 'Types of Cookies We Use'}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'ملفات ضرورية' : 'Essential Cookies'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {lang === 'ar' 
                      ? 'ضرورية لعمل الموقع بشكل صحيح ولا يمكن إيقافها'
                      : 'Necessary for the website to function properly and cannot be disabled'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'ملفات تفضيلات' : 'Preference Cookies'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {lang === 'ar' 
                      ? 'تتذكر تفضيلاتك مثل اللغة والمنطقة'
                      : 'Remember your preferences such as language and region'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {lang === 'ar' ? 'ملفات تحليلية' : 'Analytics Cookies'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {lang === 'ar' 
                      ? 'تساعدنا في فهم كيفية استخدام الزوار للموقع'
                      : 'Help us understand how visitors use the website'}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ToggleLeft className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {lang === 'ar' ? 'إدارة ملفات تعريف الارتباط' : 'Managing Cookies'}
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'ar' 
                  ? 'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. يمكنك حظر أو حذف ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على بعض وظائف الموقع.'
                  : 'You can control cookies through your browser settings. You can block or delete cookies, but this may affect some website functionality.'}
              </p>
            </section>

            <section className="bg-gray-50 rounded-xl p-6 mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === 'ar' 
                  ? 'إذا كان لديك أي أسئلة حول سياسة ملفات تعريف الارتباط:'
                  : 'If you have any questions about our Cookie Policy:'}
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

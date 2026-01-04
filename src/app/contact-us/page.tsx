"use client";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useLanguageContext } from '@/lib/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  User, 
  AtSign, 
  FileText,
  Globe
} from 'lucide-react';

export default function ContactUsPage() {
  const { lang, isRTL } = useLanguageContext();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      title: "Get In Touch",
      subtitle: "We'd love to hear from you. Let's start a conversation.",
      formTitle: "Send us a Message",
      formSubtitle: "Fill out the form below and we'll get back to you shortly.",
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      contactInfo: "Contact Information",
      address: "Address",
      phone: "Phone",
      emailLabel: "Email",
      hours: "Working Hours",
      addressText: "Sobek Pharma, Industrial Zone, Egypt",
      hoursText: "Sun - Thu: 9:00 AM - 5:00 PM",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again."
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك. دعنا نبدأ محادثة.",
      formTitle: "أرسل لنا رسالة",
      formSubtitle: "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "رسالتك",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      contactInfo: "معلومات الاتصال",
      address: "العنوان",
      phone: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      hours: "ساعات العمل",
      addressText: "سوبيك فارما، المنطقة الصناعية، مصر",
      hoursText: "الأحد - الخميس: 9:00 ص - 5:00 م",
      success: "تم إرسال الرسالة بنجاح!",
      error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."
    }
  };

  const t = translations[lang === 'ar' ? 'ar' : 'en'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would fetch('/api/contact', ...) here
    toast.success(t.success);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactDetails = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t.address,
      content: t.addressText,
      color: "bg-blue-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t.phone,
      content: "+20 123 456 7890",
      color: "bg-green-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t.emailLabel,
      content: "info@sobekpharma.com",
      color: "bg-purple-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t.hours,
      content: t.hoursText,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-red-600/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-600/20 to-transparent blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              {t.title}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${isRTL ? 'ml-4' : 'mr-4'} p-3 rounded-lg ${item.color} text-white shadow-lg`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  <p className="text-slate-600 mt-1">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">{t.formTitle}</h2>
                <p className="text-slate-500 mt-2">{t.formSubtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> {t.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                      placeholder={t.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <AtSign className="w-4 h-4" /> {t.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> {t.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    placeholder={t.subject}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    suppressHydrationWarning
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder={t.message}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.send}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden p-4"
        >
          <div className="w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden relative group">
             <img
              src="/LOCATION.png"
              alt="Sobek Pharma Location Map"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

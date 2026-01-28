"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguageContext } from '@/lib/LanguageContext';
import { leadershipAPI, LeadershipMember } from '@/lib/api';
import { Users, ArrowLeft } from 'lucide-react';

export default function TeamPage() {
  const { lang } = useLanguageContext();
  const [teamMembers, setTeamMembers] = useState<LeadershipMember[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await leadershipAPI.getAll();
        setTeamMembers(data);

        // Extract unique departments
        const uniqueDepartments = Array.from(new Set(data.map(member => member.department)));
        setDepartments(uniqueDepartments);
      } catch (error) {
        console.error('Error loading team:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  const filteredMembers = selectedDepartment === 'all'
    ? teamMembers
    : teamMembers.filter(member => member.department === selectedDepartment);

  const leadershipMembers = filteredMembers.filter(member => member.is_leadership);
  const departmentMembers = filteredMembers.filter(member => !member.is_leadership);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 ml-2" />
                {lang === 'ar' ? 'العودة لصفحة حول الشركة' : 'Back to About'}
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {lang === 'ar' ? 'فريقنا' : 'Our Team'}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                {lang === 'ar'
                  ? 'تعرف على الفريق المتميز الذي يقود شركة صوبك مصر فارما نحو التميز والابتكار'
                  : 'Meet the exceptional team driving Sobek Egypt Pharma towards excellence and innovation'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedDepartment('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedDepartment === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {lang === 'ar' ? 'جميع الأقسام' : 'All Departments'}
            </button>
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedDepartment === department
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {lang === 'ar'
                  ? (teamMembers.find(m => m.department === department)?.department_ar || department)
                  : department
                }
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {leadershipMembers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'القيادة التنفيذية' : 'Executive Leadership'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {lang === 'ar'
                  ? 'الفريق القيادي المسؤول عن رسم استراتيجية الشركة وتحقيق أهدافها'
                  : 'The leadership team responsible for shaping company strategy and achieving goals'
                }
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {leadershipMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          width={400}
                          height={400}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                          <Users className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {lang === 'ar' ? (member.name_ar || member.name) : member.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {lang === 'ar' ? (member.title_ar || member.title) : member.title}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {lang === 'ar' ? (member.department_ar || member.department) : member.department}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {lang === 'ar' ? (member.bio_ar || member.bio) : member.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Department Teams */}
      {departments.map((department) => {
        const deptMembers = departmentMembers.filter(member => member.department === department);
        if (deptMembers.length === 0) return null;

        return (
          <section key={department} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {lang === 'ar'
                    ? (deptMembers[0]?.department_ar || department)
                    : department
                  }
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {lang === 'ar'
                    ? `فريق ${deptMembers[0]?.department_ar || department} المتميز`
                    : `Our exceptional ${department} team`
                  }
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {deptMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        {member.image_url ? (
                          <Image
                            src={member.image_url}
                            alt={member.name}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                            <Users className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {lang === 'ar' ? (member.name_ar || member.name) : member.name}
                        </h3>
                        <p className="text-blue-600 font-medium mb-3">
                          {lang === 'ar' ? (member.title_ar || member.title) : member.title}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {lang === 'ar' ? (member.bio_ar || member.bio) : member.bio}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
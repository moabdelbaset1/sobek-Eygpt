"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasAnimated]);

  return { count, ref };
}

// Timeline Data
const timelineData = [
  {
    year: '2019',
    title: 'Foundation',
    description: 'Sobek Pharma was established in Egypt with a vision to provide quality pharmaceutical products to the region.',
    image: 'https://images.unsplash.com/photo-1583737097428-af53774819a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxmYWN0b3J5JTIwYnVpbGRpbmclMjBpbmR1c3RyaWFsJTIwcGhhcm1hY2V1dGljYWwlMjB2aW50YWdlfGVufDB8MHx8fDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Birmingham Museums Trust on Unsplash'
  },
  {
    year: '2021',
    title: 'Expansion & Modernization',
    description: 'Major facility expansion with state-of-the-art manufacturing equipment and automated production lines.',
    image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aW9uJTIwbWFudWZhY3R1cmluZyUyMHBoYXJtYWNldXRpY2FsJTIwYXV0b21hdGlvbiUyMHRlY2hub2xvZ3l8ZW58MHwwfHxibHVlfDE3NjA1MTU4NTV8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'ZHENYU LUO on Unsplash'
  },
  {
    year: '2023',
    title: 'Innovation & R&D',
    description: 'Launched dedicated research and development center focusing on innovative pharmaceutical solutions.',
    image: 'https://images.unsplash.com/photo-1580982331877-489fb58aeade?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3RzJTIwbGFib3JhdG9yeSUyMHJlc2VhcmNoJTIwaW5ub3ZhdGlvbiUyMHRlc3Rpbmd8ZW58MHwwfHxibHVlfDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'ThisisEngineering on Unsplash'
  },
  {
    year: '2024',
    title: 'Regional Growth',
    description: 'Expanded operations across the Middle East and North Africa, establishing strong partnerships with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1713098965471-d324f294a71d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHx3b3JsZCUyMGdsb2JhbCUyMG5ldHdvcmslMjBpbnRlcm5hdGlvbmFsJTIwY29ubmVjdGlvbnN8ZW58MHwwfHxibHVlfDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Hartono Creative Studio on Unsplash'
  }
];

// Leadership Team Data
const leadershipTeam = [
  {
    name: 'Dr. Ahmed Hassan',
    title: 'Chief Executive Officer',
    bio: 'Leading Sobek Pharma with 25+ years of pharmaceutical industry experience.',
    image: 'https://i.pravatar.cc/400?img=12'
  },
  {
    name: 'Dr. Fatima El-Sayed',
    title: 'Chief Scientific Officer',
    bio: 'Driving innovation and research excellence with expertise in pharmaceutical development.',
    image: 'https://i.pravatar.cc/400?img=45'
  },
  {
    name: 'Mohamed Kamal',
    title: 'Chief Operations Officer',
    bio: 'Ensuring operational excellence and quality standards across all facilities.',
    image: 'https://i.pravatar.cc/400?img=33'
  },
  {
    name: 'Sarah Ibrahim',
    title: 'Chief Financial Officer',
    bio: 'Managing financial strategy and sustainable growth initiatives.',
    image: 'https://i.pravatar.cc/400?img=47'
  }
];

// Awards Data
const awards = [
  {
    title: 'ISO 9001:2015 Certified',
    description: 'Quality Management System Certification',
    image: 'https://images.unsplash.com/photo-1598284669161-767a63e0ccf0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxJU08lMjBjZXJ0aWZpY2F0aW9uJTIwYmFkZ2UlMjBxdWFsaXR5JTIwc3RhbmRhcmR8ZW58MHwyfHxibHVlfDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Brent Pace on Unsplash'
  },
  {
    title: 'GMP Certified',
    description: 'Good Manufacturing Practice Standards',
    image: 'https://images.unsplash.com/photo-1601888221673-626d26f726cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxJU08lMjBjZXJ0aWZpY2F0aW9uJTIwYmFkZ2UlMjBxdWFsaXR5JTIwc3RhbmRhcmR8ZW58MHwyfHxibHVlfDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Dylan Calluy on Unsplash'
  },
  {
    title: 'Excellence Award 2023',
    description: 'Pharmaceutical Industry Leadership',
    image: 'https://images.unsplash.com/photo-1598284669161-767a63e0ccf0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxJU08lMjBjZXJ0aWZpY2F0aW9uJTIwYmFkZ2UlMjBxdWFsaXR5JTIwc3RhbmRhcmR8ZW58MHwyfHxibHVlfDE3NjA1MTU4NTR8MA&ixlib=rb-4.1.0&q=85',
    attribution: 'Brent Pace on Unsplash'
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1575278617117-86484b220657?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwc2NpZW50aXN0cyUyMHBoYXJtYWNldXRpY2FsJTIwcmVzZWFyY2glMjBtZWRpY2FsfGVufDB8MHx8Ymx1ZXwxNzYwNTE1ODU0fDA&ixlib=rb-4.1.0&q=85)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-600/70"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  About <span className="text-red-400">Sobek Pharma</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
                  Innovation and Excellence in Pharmaceutical Solutions
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                  Committed to advancing global health through innovative pharmaceutical solutions, 
                  quality manufacturing, and sustainable practices that improve lives worldwide.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Foundation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading global pharmaceutical company recognized for innovation, 
                  quality, and commitment to improving health outcomes worldwide.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To advance global health by delivering innovative, high-quality pharmaceutical 
                  solutions that are accessible and affordable to communities worldwide.
                </p>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <ul className="text-gray-600 leading-relaxed space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Excellence in quality and innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Integrity and ethical practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Patient-centered approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Sustainability and responsibility</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Years of growth, innovation, and commitment to healthcare excellence
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 mb-16 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className="md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={item.image}
                      alt={item.attribution}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ width: '100%', height: '320px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400 hidden md:block"></div>
                    
                    <div className="md:pl-12">
                      <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold mb-4">
                        {item.year}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ width: '100%', height: '320px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certifications */}
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
              Awards & <span className="text-blue-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognized for excellence in quality, innovation, and industry leadership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl text-center h-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 mb-6 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={award.image}
                      alt={award.attribution}
                      className="w-20 h-20 object-contain"
                      style={{ width: '80px', height: '80px' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

// Stat Card Component
function StatCard({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: string }) {
  const { count, ref } = useCounter(end);

  const icons = {
    calendar: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    package: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    ),
    globe: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    users: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    )
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icons[icon as keyof typeof icons]}
        </svg>
      </div>
      <div className="text-5xl md:text-6xl font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-blue-100 font-medium">{label}</div>
    </motion.div>
  );
}
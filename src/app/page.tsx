"use client";
import {motion} from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { t } from '@/lib/translations';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import BentoGrid from '@/components/BentoGrid';
import WhyChooseUs from '@/components/WhyChooseUs';
import DiscoverMore from '@/components/DiscoverMore';
import CertificationsSection from '@/components/CertificationsSection';

export default function HomePage() {
  const { lang, isRTL } = useLanguageContext();

  return (
    <>
      <HeroSection />

      <StatsSection />

      <BentoGrid />

      <WhyChooseUs />

      <DiscoverMore />

      <CertificationsSection />
    </>
  );
}
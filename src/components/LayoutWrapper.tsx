"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminPage && <Header />}
            <main id="content" className={`min-h-dvh ${!isAdminPage ? 'pb-16 md:pb-0' : ''}`}>
                {children}
            </main>
            {!isAdminPage && <BottomNav />}
            {!isAdminPage && <Footer />}
        </>
    );
}

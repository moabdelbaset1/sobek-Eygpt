import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { LanguageProvider } from '@/lib/LanguageContext';

const poppins = Poppins({
  variable: "--font-sans",
  weight: ['300','400','500','600','700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sobek Egypt Pharma",
  description: "Advancing Health with Trusted Pharmaceuticals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          {/* Google Tag Manager */}
          {process.env.NEXT_PUBLIC_GTM_ID ? (
            <>
              <Script id="gtm" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
              </Script>
              <noscript>
                <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} height="0" width="0" style={{display:'none',visibility:'hidden'}} />
              </noscript>
            </>
          ) : null}
          <Header />
          <main id="content" className="min-h-dvh">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        </LanguageProvider>
      </body>
    </html>
  );
}

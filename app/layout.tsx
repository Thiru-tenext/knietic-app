'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="en" className="scroll-smooth bg-mirage-black">
      <body
        className={`${plusJakarta.variable} font-sans antialiased selection:bg-mirage-lime selection:text-black overflow-x-hidden`}
      >
        <div className="bg-grid-subtle fixed inset-0 pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}

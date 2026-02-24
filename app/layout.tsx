'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

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

    // Handle dynamically added content (important for Studio view switching)
    const mutationObserver = new MutationObserver((mutations) => {
       mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
             if (node instanceof HTMLElement) {
                if (node.classList.contains('reveal') || node.classList.contains('reveal-stagger')) {
                   observer.observe(node);
                }
                const reveals = node.querySelectorAll('.reveal, .reveal-stagger');
                reveals.forEach(el => observer.observe(el));
             }
          });
       });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

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

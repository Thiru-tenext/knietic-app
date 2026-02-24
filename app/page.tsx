import React from 'react';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { VideoShowcase } from './components/landing/VideoShowcase';
import { SocialProof } from './components/landing/SocialProof';
import { HowItWorks } from './components/landing/HowItWorks';
import { Features } from './components/landing/Features';
import { Pricing } from './components/landing/Pricing';
import { Footer } from './components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-mirage-black text-white font-sans selection:bg-mirage-lime selection:text-black">
      <Navbar />
      
      <main className="relative">
        <Hero />
        <VideoShowcase />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>RJRYT | MERN Stack Web Developer Portfolio</title>
        <meta
          name="description"
          content="Discover the portfolio of RJRYT, a MERN stack web developer building scalable and modern applications. Explore projects, blogs, and services."
        />
        <meta
          name="keywords"
          content="RJRYT, MERN stack, web developer, portfolio, React, Node.js"
        />
        <link rel="canonical" href="https://rjryt.github.io/" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="RJRYT | MERN Stack Web Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Discover the portfolio of RJRYT, a MERN stack web developer building scalable and modern applications. Explore projects, blogs, and services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content="/images/profile/profile-1.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RJRYT | MERN Stack Web Developer Portfolio"
        />
        <meta
          name="twitter:description"
          content="Discover the portfolio of RJRYT, a MERN stack web developer building scalable and modern applications. Explore projects, blogs, and services."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/" />
        <meta name="twitter:image" content="/images/profile/profile-1.jpg" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
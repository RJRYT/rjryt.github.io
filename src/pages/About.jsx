import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About RJRYT | MERN Stack Web Developer</title>
        <meta name="description" content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps." />
        <meta name="keywords" content="About RJRYT, MERN stack developer, full stack developer" />
        <link rel="canonical" href="https://rjryt.github.io/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About RJRYT | MERN Stack Web Developer" />
        <meta property="og:description" content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://rjryt.github.io/about" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About RJRYT | MERN Stack Web Developer" />
        <meta name="twitter:description" content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Navigation />
        
        <main className="pt-20">
          <AboutSection />
        </main>
        
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default About;
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
        <link rel="canonical" href="https://rjryt.com/" />
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
        <meta property="og:url" content="https://rjryt.com/" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta
          property="og:image"
          content="https://rjryt.com/images/profile/profile-1.jpg"
        />

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
        <meta name="twitter:url" content="https://rjryt.com/" />
        <meta
          name="twitter:image"
          content="https://rjryt.com/images/profile/profile-1.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rjryt.com/#website",
              url: "https://rjryt.com/",
              name: "RJRYT Portfolio",
              description:
                "Discover the portfolio of RJRYT, a MERN stack web developer building scalable and modern applications. Explore projects, blogs, and services.",
              publisher: {
                "@type": "Person",
                "@id": "https://rjryt.com/#person",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://rjryt.com/#person",
              name: "RJRYT",
              jobTitle: "MERN Stack Web Developer",
              url: "https://rjryt.com/",
              image: "https://rjryt.com/images/profile/profile-1.jpg",
              sameAs: [
                "https://github.com/rjryt",
                "https://www.linkedin.com/in/robin-jr",
                "https://www.instagram.com/rjryt_/",
                "https://replit.com/@somaliyo",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "business inquiries",
                  url: "https://rjryt.com/contact",
                  availableLanguage: ["English"],
                },
              ],
            },
          ])}
        </script>
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
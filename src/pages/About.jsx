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
        <meta
          name="description"
          content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps."
        />
        <meta
          name="keywords"
          content="About RJRYT, MERN stack developer, full stack developer"
        />
        <link rel="canonical" href="https://rjryt.com/about" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About RJRYT | MERN Stack Web Developer"
        />
        <meta
          property="og:description"
          content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://rjryt.com/about" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta
          property="og:image"
          content="https://rjryt.com/images/seo/seo-about.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="About RJRYT | MERN Stack Web Developer"
        />
        <meta
          name="twitter:description"
          content="Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps."
        />
        <meta name="twitter:url" content="https://rjryt.com/about" />
        <meta
          name="twitter:image"
          content="https://rjryt.com/images/seo/seo-about.png"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://rjryt.com/about#webpage",
            url: "https://rjryt.com/about",
            name: "About RJRYT | MERN Stack Web Developer",
            description:
              "Learn about RJRYT, a passionate MERN stack developer with expertise in building scalable, modern, and user-friendly web apps.",
            image: "https://rjryt.com/images/seo/seo-about.png",
            author: {
              "@type": "Person",
              "@id": "https://rjryt.com/#person",
            },
            publisher: {
              "@type": "Person",
              "@id": "https://rjryt.com/#person",
            },
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://rjryt.com/#website",
            },
          })}
        </script>
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
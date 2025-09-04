import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import SkillsSection from '@/components/sections/SkillsSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const Skills = () => {
  return (
    <>
      <Helmet>
        <title>Skills | MERN Stack & Full Stack Expertise</title>
        <meta
          name="description"
          content="Technical skills of RJRYT: React, Node.js, Express, MongoDB, JavaScript, Tailwind, and modern web development practices."
        />
        <meta
          name="keywords"
          content="MERN skills, full stack skills, React, Node.js, MongoDB, Tailwind"
        />
        <link rel="canonical" href="https://rjryt.github.io/skills" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Skills | MERN Stack & Full Stack Expertise"
        />
        <meta
          property="og:description"
          content="Technical skills of RJRYT: React, Node.js, Express, MongoDB, JavaScript, Tailwind, and modern web development practices."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/skills" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta
          property="og:image"
          content="https://rjryt.github.io/images/seo/seo-skills.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Skills | MERN Stack & Full Stack Expertise"
        />
        <meta
          name="twitter:description"
          content="Technical skills of RJRYT: React, Node.js, Express, MongoDB, JavaScript, Tailwind, and modern web development practices."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/skills" />
        <meta
          name="twitter:image"
          content="https://rjryt.github.io/images/seo/seo-skills.png"
        />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://rjryt.github.io/skills#webpage",
              url: "https://rjryt.github.io/skills",
              name: "Skills | MERN Stack & Full Stack Expertise",
              description:
                "Technical skills of RJRYT: React, Node.js, Express, MongoDB, JavaScript, Tailwind, and modern web development practices.",
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://rjryt.github.io/#website",
              },
              about: {
                "@type": "Person",
                "@id": "https://rjryt.github.io/#person",
                name: "RJRYT",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://rjryt.github.io/#person",
              name: "RJRYT",
              url: "https://rjryt.github.io/",
              knowsAbout: [
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "JavaScript",
                "Tailwind CSS",
                "MERN Stack",
                "Full Stack Web Development",
              ],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://rjryt.github.io/skills#webpage",
              },
            },
          ])}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Navigation />

        <main className="pt-20">
          <SkillsSection />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Skills;
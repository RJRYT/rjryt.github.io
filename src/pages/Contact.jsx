import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact RJRYT | Get in Touch</title>
        <meta
          name="description"
          content="Contact RJRYT for collaborations, freelance projects, or inquiries. Secure form with validation and spam protection."
        />
        <meta
          name="keywords"
          content="contact RJRYT, hire web developer, MERN developer contact"
        />
        <link rel="canonical" href="https://rjryt.github.io/contact" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact RJRYT | Get in Touch" />
        <meta
          property="og:description"
          content="Contact RJRYT for collaborations, freelance projects, or inquiries. Secure form with validation and spam protection."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/contact" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content="/images/seo/seo-contact.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact RJRYT | Get in Touch" />
        <meta
          name="twitter:description"
          content="Contact RJRYT for collaborations, freelance projects, or inquiries. Secure form with validation and spam protection."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/contact" />
        <meta name="twitter:image" content="/images/seo/seo-contact.png" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Navigation />

        <main className="pt-20">
          <ContactSection />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Contact;
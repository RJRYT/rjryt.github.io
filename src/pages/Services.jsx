import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Shield, Zap, ExternalLink, CheckCircle } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Full-Stack Web Development',
      description: 'Complete web applications using MERN stack with modern UI/UX design.',
      features: ['React.js Frontend', 'Node.js Backend', 'MongoDB Database', 'Express.js API', 'Responsive Design'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Robust and scalable backend solutions with APIs and database management.',
      features: ['REST APIs', 'Authentication', 'Database Design', 'Real-time Features', 'Security Implementation'],
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Smartphone,
      title: 'PWA Development',
      description: 'Progressive Web Apps with offline support and native-like experience.',
      features: ['Offline Support', 'Push Notifications', 'Service Workers', 'App-like Experience', 'Cross-platform'],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Web Security',
      description: 'Comprehensive security implementation for web applications.',
      features: ['End-to-End Encryption', 'Authentication Systems', 'Rate Limiting', 'CORS Hardening', 'XSS Protection'],
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed up your applications and improve user experience.',
      features: ['SEO Optimization', 'Code Splitting', 'Caching Strategies', 'Image Optimization', 'Core Web Vitals'],
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Code,
      title: 'DevOps & Deployment',
      description: 'Complete deployment solutions with CI/CD and cloud infrastructure.',
      features: ['AWS Deployment', 'CI/CD Pipelines', 'Docker Containers', 'Server Management', 'Monitoring'],
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'Understanding your requirements and creating a detailed project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Creating wireframes, UI designs, and technical architecture planning.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building your application with clean, maintainable, and scalable code.'
    },
    {
      step: '04',
      title: 'Testing & Deployment',
      description: 'Thorough testing, optimization, and deployment to production.'
    },
    {
      step: '05',
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and feature enhancements as needed.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services | Web Development by RJRYT</title>
        <meta
          name="description"
          content="Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions."
        />
        <meta
          name="keywords"
          content="web development services, MERN stack services, React, Node.js, MongoDB"
        />
        <link rel="canonical" href="https://rjryt.github.io/services" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Services | Web Development by RJRYT"
        />
        <meta
          property="og:description"
          content="Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/services" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content="/images/seo/seo-services.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Services | Web Development by RJRYT"
        />
        <meta
          name="twitter:description"
          content="Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/services" />
        <meta name="twitter:image" content="/images/seo/seo-services.png" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Navigation />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-fluid-4xl font-bold gradient-text mb-6">
                  Professional Web Development Services
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
                <p className="text-fluid-lg text-foreground/70 max-w-3xl mx-auto">
                  Transform your ideas into powerful web applications with
                  cutting-edge technology and best practices.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="glass-card p-8 rounded-2xl group"
                    >
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-fluid-xl font-bold text-foreground mb-4">
                        {service.title}
                      </h3>

                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-sm text-foreground/80"
                          >
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-fluid-3xl font-bold gradient-text mb-6">
                  Development Process
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
                <p className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto">
                  A structured approach to deliver high-quality results on time
                  and within budget.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {process.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center gap-8 mb-12 ${
                      index % 2 === 1 ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl flex-1">
                      <h3 className="text-fluid-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card p-12 rounded-2xl text-center max-w-4xl mx-auto"
              >
                <h2 className="text-fluid-3xl font-bold gradient-text mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-fluid-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Let's discuss your project requirements and create something
                  amazing together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                  >
                    <a href="/contact">
                      Get Started
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glass border-primary/50 text-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <a href="/projects">View Projects</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Services;
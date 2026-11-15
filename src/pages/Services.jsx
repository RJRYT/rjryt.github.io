import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Shield,
  Zap,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Full-Stack Web Development",
      description: "Complete web applications using MERN stack with modern UI/UX design.",
      features: [
        "React.js Frontend",
        "Node.js Backend",
        "MongoDB Database",
        "Express.js API",
        "Responsive Design",
      ],
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Robust and scalable backend solutions with APIs and database management.",
      features: [
        "REST APIs",
        "Authentication",
        "Database Design",
        "Real-time Features",
        "Security Implementation",
      ],
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Smartphone,
      title: "PWA Development",
      description: "Progressive Web Apps with offline support and native-like experience.",
      features: [
        "Offline Support",
        "Push Notifications",
        "Service Workers",
        "App-like Experience",
        "Cross-platform",
      ],
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Web Security",
      description: "Comprehensive security implementation for web applications.",
      features: [
        "End-to-End Encryption",
        "Authentication Systems",
        "Rate Limiting",
        "CORS Hardening",
        "XSS Protection",
      ],
      gradient: "from-red-500 to-red-600",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your applications and improve user experience.",
      features: [
        "SEO Optimization",
        "Code Splitting",
        "Caching Strategies",
        "Image Optimization",
        "Core Web Vitals",
      ],
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Code,
      title: "DevOps & Deployment",
      description: "Complete deployment solutions with CI/CD and cloud infrastructure.",
      features: [
        "AWS Deployment",
        "CI/CD Pipelines",
        "Docker Containers",
        "Server Management",
        "Monitoring",
      ],
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your requirements and creating a detailed project roadmap.",
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Creating wireframes, UI designs, and technical architecture planning.",
    },
    {
      step: "03",
      title: "Development",
      description: "Building your application with clean, maintainable, and scalable code.",
    },
    {
      step: "04",
      title: "Testing & Deployment",
      description: "Thorough testing, optimization, and deployment to production.",
    },
    {
      step: "05",
      title: "Support & Maintenance",
      description: "Ongoing support, updates, and feature enhancements as needed.",
    },
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
        <link rel="canonical" href="https://rjryt.com/services/" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta property="og:title" content="Services | Web Development by RJRYT" />
        <meta
          property="og:description"
          content="Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.com/services/" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content="https://rjryt.com/images/seo/rjryt-social-card.png" />
        <meta property="og:image:alt" content="RJRYT Services page preview" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Services | Web Development by RJRYT" />
        <meta
          name="twitter:description"
          content="Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions."
        />
        <meta name="twitter:url" content="https://rjryt.com/services/" />
        <meta name="twitter:image" content="https://rjryt.com/images/seo/rjryt-social-card.png" />
        <meta name="twitter:image:alt" content="RJRYT Services page preview" />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://rjryt.com/services/#webpage",
              url: "https://rjryt.com/services/",
              name: "Services | Web Development by RJRYT",
              description:
                "Explore web development services by RJRYT including full-stack development, React apps, Node.js APIs, and scalable solutions.",
              isPartOf: {
                "@type": "WebSite",
                "@id": "https://rjryt.com/#website",
              },
              about: {
                "@type": "Person",
                "@id": "https://rjryt.com/#person",
                name: "RJRYT",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://rjryt.com/services/#service",
              serviceType: "Web Development",
              provider: {
                "@type": "Person",
                "@id": "https://rjryt.com/#person",
                name: "RJRYT",
                url: "https://rjryt.com/",
              },
              description:
                "Professional web development services by RJRYT including full-stack MERN development, React apps, Node.js APIs, and scalable solutions.",
              areaServed: {
                "@type": "Place",
                name: "Worldwide",
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://rjryt.com/contact/",
                availableLanguage: ["English"],
              },
            },
          ])}
        </script>
      </Helmet>

      <div className="min-h-screen overflow-hidden bg-background">
        <Navigation />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 md:py-28">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_5%,_hsl(var(--primary)/.16),_transparent_38%)]"
              aria-hidden="true"
            />
            <div className="container relative z-10 mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="mx-auto max-w-4xl text-center"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[.28em] text-primary">
                  Services · From concept to launch
                </p>
                <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
                  Professional Web Development Services
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Transform your ideas into powerful web applications with cutting-edge technology
                  and best practices.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent font-semibold shadow-lg shadow-primary/15"
                  >
                    <Link to="/contact">
                      Tell me about your project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-border bg-card/40">
                    <Link to="/projects">Explore my work</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="relative py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[.24em] text-accent">
                    Capabilities
                  </p>
                  <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                    Ways I can help
                  </h2>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Focused services that work together to create production-ready digital products.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.5, delay: index * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-border bg-card/55 p-7 backdrop-blur-xl transition-colors hover:border-primary/35"
                    >
                      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-colors group-hover:bg-primary/20" />
                      <div className="relative">
                        <div
                          className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${service.gradient} shadow-lg transition-transform duration-300 group-hover:scale-105`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>

                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>

                        <ul className="space-y-2.5 border-t border-border/70 pt-5">
                          {service.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-sm text-foreground/80"
                            >
                              <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="relative py-20 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-14 text-center"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[.24em] text-primary">
                  A clear path
                </p>
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Development Process
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  A structured approach to deliver high-quality results on time and within budget.
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
                    className="mb-5 flex items-center gap-5"
                  >
                    <div className="flex-shrink-0">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/20 bg-primary/10">
                        <span className="font-mono text-lg font-bold text-primary">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-xl sm:p-6">
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
                className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/[.12] via-card/75 to-accent/[.08] p-8 text-center shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-12"
              >
                <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                  Ready to Start Your Project?
                </h2>
                <p className="mx-auto mb-8 mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  Let's discuss your project requirements and create something amazing together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                  >
                    <Link to="/contact">
                      Get Started
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glass border-primary/50 text-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <Link to="/projects">View Projects</Link>
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

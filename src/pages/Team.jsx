import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Github, Linkedin, Globe, Star, Heart, Target } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Button } from '@/components/ui/button';

const Team = () => {
  const collaborations = [
    {
      id: 1,
      name: 'Open Source Community',
      role: 'Active Contributor',
      description: 'Contributing to various open-source projects and helping fellow developers.',
      avatar: '/placeholder.svg',
      skills: ['React', 'Node.js', 'Documentation'],
      github: 'https://github.com/rjryt',
      projects: 15
    },
    {
      id: 2,
      name: 'Developer Meetups',
      role: 'Speaker & Organizer',
      description: 'Organizing and speaking at local developer meetups to share knowledge.',
      avatar: '/placeholder.svg',
      skills: ['Public Speaking', 'Community Building', 'Mentoring'],
      linkedin: 'https://linkedin.com/in/robin_jr',
      events: 8
    },
    {
      id: 3,
      name: 'Remote Teams',
      role: 'Collaborative Developer',
      description: 'Working with distributed teams to build impactful applications.',
      avatar: '/placeholder.svg',
      skills: ['Remote Collaboration', 'Agile', 'Cross-functional Teams'],
      website: 'https://rjryt.github.io',
      projects: 25
    }
  ];

  const values = [
    {
      icon: Star,
      title: 'Excellence',
      description: 'Striving for the highest quality in every project and collaboration.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Bringing enthusiasm and dedication to every development challenge.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Embracing new technologies and creative solutions to complex problems.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Team | Collaborations by RJRYT</title>
        <meta
          name="description"
          content="Meet the team and collaborations of RJRYT, working together to build impactful applications and digital products."
        />
        <meta
          name="keywords"
          content="team, collaboration, RJRYT, developer group"
        />
        <link rel="canonical" href="https://rjryt.github.io/team" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta property="og:title" content="Team | Collaborations by RJRYT" />
        <meta
          property="og:description"
          content="Meet the team and collaborations of RJRYT, working together to build impactful applications and digital products."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/team" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta
          property="og:image"
          content="https://rjryt.github.io/images/seo/seo-team.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Team | Collaborations by RJRYT" />
        <meta
          name="twitter:description"
          content="Meet the team and collaborations of RJRYT, working together to build impactful applications and digital products."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/team" />
        <meta
          name="twitter:image"
          content="https://rjryt.github.io/images/seo/seo-team.png"
        />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://rjryt.github.io/team#webpage",
              url: "https://rjryt.github.io/team",
              name: "Team | Collaborations by RJRYT",
              description:
                "Meet the team and collaborations of RJRYT, working together to build impactful applications and digital products.",
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
              "@type": "Organization",
              "@id": "https://rjryt.github.io/#organization",
              name: "RJRYT Collaborations",
              url: "https://rjryt.github.io/team",
              description:
                "Collaborative team working with RJRYT to build impactful applications and digital products.",
              image: "https://rjryt.github.io/images/seo/seo-team.png",
              member: [
                {
                  "@type": "Person",
                  "@id": "https://rjryt.github.io/#person",
                  name: "RJRYT",
                  roleName: "Lead MERN Stack Developer",
                },
                {
                  "@type": "Person",
                  "@id": "https://rjryt.github.io/#person",
                  name: "BOSS",
                  roleName: "Web Developer",
                },
              ],
            },
          ])}
        </script>
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
                  Collaborations & Team
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
                <p className="text-fluid-lg text-foreground/70 max-w-3xl mx-auto">
                  Building amazing projects through collaboration, community
                  involvement, and teamwork with fellow developers and
                  organizations.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
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
                  Our Values
                </h2>
                <p className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto">
                  The principles that guide our collaborative efforts and
                  development practices.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-card p-8 rounded-2xl text-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-fluid-xl font-bold text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Collaborations Section */}
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
                  Collaborations & Partnerships
                </h2>
                <p className="text-fluid-lg text-foreground/70 max-w-2xl mx-auto">
                  Working with diverse teams and communities to create impactful
                  solutions.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collaborations.map((collab, index) => (
                  <motion.div
                    key={collab.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="glass-card p-8 rounded-2xl group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-fluid-xl font-bold text-foreground">
                          {collab.name}
                        </h3>
                        <p className="text-primary font-medium">
                          {collab.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {collab.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Skills & Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {collab.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        {collab.github && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="glass border-primary/50"
                          >
                            <a
                              href={collab.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {collab.linkedin && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="glass border-accent/50"
                          >
                            <a
                              href={collab.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {collab.website && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="glass border-secondary/50"
                          >
                            <a
                              href={collab.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-foreground/60">
                          {collab.projects && `${collab.projects} Projects`}
                          {collab.events && `${collab.events} Events`}
                        </div>
                      </div>
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
                  Let's Collaborate
                </h2>
                <p className="text-fluid-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Interested in working together? Let's build something amazing
                  and make a positive impact in the developer community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                  >
                    <a href="/contact">Get In Touch</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glass border-primary/50"
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

export default Team;
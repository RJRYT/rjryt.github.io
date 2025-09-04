import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, ExternalLink, Github, Calendar, 
  Tag, Globe, Code, Clock, CheckCircle, 
  Eye, Share2, ArrowRight 
} from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Button } from '@/components/ui/button';
import { getProjectBySlug, getRelatedProjects, formatDate } from '@/utils/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const relatedProjects = project ? getRelatedProjects(project) : [];

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{project.title} - RJRYT Projects</title>
        <meta name="description" content={project.description} />
        <meta
          name="keywords"
          content={`RJRYT, ${project.title}, ${project.technologies?.join(
            ", "
          )}, ${project.category}`}
        />
        <link
          rel="canonical"
          href={`https://rjryt.github.io/projects/${slug}`}
        />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${project.title} - RJRYT Projects`}
        />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://rjryt.github.io/projects/${slug}`}
        />
        {project.image && <meta property="og:image" content={project.image} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${project.title} - RJRYT Projects`}
        />
        <meta name="twitter:description" content={project.description} />
        {project.image && <meta name="twitter:image" content={project.image} />}
        <meta
          name="twitter:url"
          content={`https://rjryt.github.io/projects/${slug}`}
        />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              "@id": `https://rjryt.github.io/projects/${slug}#code`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rjryt.github.io/projects/${slug}#webpage`,
              },
              name: project.title,
              description: project.description,
              keywords: [
                "RJRYT",
                ...(project.technologies || []),
                project.category || "",
              ],
              codeRepository: project.repoUrl || undefined,
              programmingLanguage: project.technologies?.join(", "),
              author: {
                "@type": "Person",
                "@id": "https://rjryt.github.io/#person",
                name: "RJRYT",
                url: "https://rjryt.github.io/",
              },
              publisher: {
                "@type": "Organization",
                "@id": "https://rjryt.github.io/#organization",
                name: "RJRYT Portfolio",
                logo: {
                  "@type": "ImageObject",
                  url: "https://rjryt.github.io/images/profile/profile-1.jpg",
                },
              },
              image: project.image ? [project.image] : undefined,
              datePublished: project.date,
              dateModified: project.updatedAt || project.date,
              url: `https://rjryt.github.io/projects/${slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `https://rjryt.github.io/projects/${slug}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://rjryt.github.io/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: "https://rjryt.github.io/projects",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: project.title,
                  item: `https://rjryt.github.io/projects/${slug}`,
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
          <section className="py-12">
            <div className="container mx-auto px-4">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Button
                  asChild
                  variant="ghost"
                  className="text-foreground/70 hover:text-foreground hover:bg-card/50"
                >
                  <Link to="/projects">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Link>
                </Button>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Project Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                    {project.featured && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground">
                        Featured
                      </span>
                    )}
                  </div>

                  <h1 className="text-fluid-4xl font-bold text-foreground mb-4">
                    {project.title}
                  </h1>

                  <p className="text-fluid-lg text-foreground/80 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-foreground/60">
                          Category
                        </div>
                        <div className="font-medium text-foreground">
                          {project.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-foreground/60">Date</div>
                        <div className="font-medium text-foreground">
                          {formatDate(project.date)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {project.live && (
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                      >
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="w-5 h-5 mr-2" />
                          Live Demo
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}

                    {project.github && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="glass border-primary/50 text-foreground hover:text-foreground/90 hover:bg-primary/10"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}

                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="lg"
                      className="glass border-accent/50 text-accent hover:text-foreground/90 hover:bg-accent/50"
                      aria-label="Share"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </motion.div>

                {/* Project Image */}
                {project.image && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="glass-card p-4 rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto rounded-xl shadow-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Project Content */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="glass-card p-8 lg:p-12 rounded-2xl">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-fluid-3xl font-bold gradient-text mb-6">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-fluid-2xl font-bold text-foreground mb-4 mt-8">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-fluid-xl font-semibold text-foreground mb-3 mt-6">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-foreground/80 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-foreground/80 mb-4 space-y-2">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-foreground/80">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/70 my-6">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children, inline }) =>
                          inline ? (
                            <code className="px-2 py-1 bg-muted rounded text-sm font-mono text-accent">
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                              <code className="text-sm font-mono text-foreground">
                                {children}
                              </code>
                            </pre>
                          ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent underline underline-offset-2 transition-colors"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {project.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="py-20 border-t border-border/50">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-fluid-3xl font-bold gradient-text mb-4">
                    Related Projects
                  </h2>
                  <p className="text-foreground/70 max-w-2xl mx-auto">
                    Discover more projects with similar technologies or
                    categories.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div
                      key={relatedProject.slug}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass-card p-6 rounded-xl group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-primary font-medium">
                          {relatedProject.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                            relatedProject.status
                          )}`}
                        >
                          {relatedProject.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h3>

                      <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2">
                        {relatedProject.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {relatedProject.technologies
                          ?.slice(0, 2)
                          .map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        {relatedProject.technologies?.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{relatedProject.technologies.length - 2}
                          </span>
                        )}
                      </div>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="glass border-primary/50 text-primary hover:text-foreground/90 hover:bg-primary/10 group w-full"
                      >
                        <Link to={`/projects/${relatedProject.slug}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Project
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default ProjectDetail;
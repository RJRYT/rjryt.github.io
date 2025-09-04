import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from "react-router-dom";
import { 
  Search, Filter, ExternalLink, Github, 
  Calendar, Tag, Eye, ArrowRight
} from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  getAllProjects, 
  getAllCategories, 
  getAllTechnologies,
  getAllStatuses,
  searchProjects,
  filterProjects,
  formatDate
} from '@/utils/projects';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [searchParams] = useSearchParams();

  // Get all data
  const allProjects = getAllProjects();
  const categories = getAllCategories();
  const technologies = getAllTechnologies();
  const statuses = getAllStatuses();

  useEffect(() => {
      const query = searchParams.get("search") || "";
      setSearchTerm(query);
    }, [searchParams]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let projects = searchTerm ? searchProjects(searchTerm) : allProjects;
    
    const filters = {};
    if (selectedCategory) filters.category = selectedCategory;
    if (selectedStatus) filters.status = selectedStatus;
    if (selectedTech) filters.technology = selectedTech;
    
    if (Object.keys(filters).length > 0) {
      projects = filterProjects(filters);
    }
    
    return projects;
  }, [searchTerm, selectedCategory, selectedStatus, selectedTech, allProjects]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedTech('');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Projects by RJRYT | MERN Stack Creations</title>
        <meta
          name="description"
          content="Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies."
        />
        <meta
          name="keywords"
          content="RJRYT projects, MERN stack portfolio, web apps, React projects"
        />
        <link rel="canonical" href="https://rjryt.github.io/projects" />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Projects by RJRYT | MERN Stack Creations"
        />
        <meta
          property="og:description"
          content="Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/projects" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta
          property="og:image"
          content="https://rjryt.github.io/images/seo/seo-projects.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects by RJRYT | MERN Stack Creations"
        />
        <meta
          name="twitter:description"
          content="Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies."
        />
        <meta name="twitter:url" content="https://rjryt.github.io/projects" />
        <meta
          name="twitter:image"
          content="https://rjryt.github.io/images/seo/seo-projects.png"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://rjryt.github.io/projects#webpage",
            url: "https://rjryt.github.io/projects",
            name: "Projects by RJRYT | MERN Stack Creations",
            description:
              "Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies.",
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://rjryt.github.io/#website",
            },
            about: {
              "@type": "Person",
              "@id": "https://rjryt.github.io/#person",
              name: "RJRYT",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
        <Navigation />

        <main className="pt-20">
          {/* Header Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1 className="text-fluid-4xl font-bold gradient-text mb-6">
                  My Projects
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
                <p className="text-fluid-lg text-foreground/70 max-w-3xl mx-auto">
                  A showcase of my development work, from full-stack web
                  applications to real-time systems and modern PWAs.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-primary/30 focus-visible:border-none focus-visible:ring-accent"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg glass border border-primary/30 bg-card text-foreground"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg glass border border-primary/30 bg-card text-foreground"
                  >
                    <option value="">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="px-4 py-2 rounded-lg glass border border-primary/30 bg-card text-foreground"
                  >
                    <option value="">All Technologies</option>
                    {technologies.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>

                  {(searchTerm ||
                    selectedCategory ||
                    selectedStatus ||
                    selectedTech) && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="glass border-primary/50"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 text-sm text-foreground/60">
                Showing {filteredProjects.length} of {allProjects.length}{" "}
                projects
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="glass-card rounded-2xl overflow-hidden group"
                    >
                      {/* Project Image */}
                      {project.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {project.status}
                            </span>
                          </div>

                          {/* Featured Badge */}
                          {project.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-6">
                        {/* Category & Date */}
                        <div className="flex items-center justify-between text-sm text-foreground/60 mb-3">
                          <span className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            {project.category}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(project.date)}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies?.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex gap-2">
                            {project.github && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="glass border-primary/50 text-primary hover:text-foreground hover:bg-primary/10"
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              </Button>
                            )}

                            {project.live && (
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="glass border-accent/50 text-accent hover:text-foreground hover:bg-accent/50"
                              >
                                <a
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>

                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 group"
                          >
                            <Link to={`/projects/${project.slug}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                    <Filter className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No Projects Found
                    </h3>
                    <p className="text-foreground/70 mb-6">
                      Try adjusting your search terms or filters.
                    </p>
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="glass"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default ProjectsPage;
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAllProjects,
  getAllCategories,
  getAllTechnologies,
  getAllStatuses,
  formatDate,
} from "@/utils/projects";

const ProjectsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const allProjects = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const technologies = useMemo(() => getAllTechnologies(), []);
  const statuses = useMemo(() => getAllStatuses(), []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const hasFilters = Boolean(searchTerm || selectedCategory || selectedStatus || selectedTech);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = allProjects.filter((project) => {
      const matchesSearch =
        !query ||
        [
          project.title,
          project.description,
          project.category,
          ...(project.technologies || []),
        ].some((value) => value?.toLowerCase().includes(query));
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      const matchesStatus = !selectedStatus || project.status === selectedStatus;
      const matchesTech =
        !selectedTech || (project.technologies || []).some((tech) => tech === selectedTech);

      return matchesSearch && matchesCategory && matchesStatus && matchesTech;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.date) - new Date(a.date);
    });
  }, [allProjects, searchTerm, selectedCategory, selectedStatus, selectedTech, sortBy]);

  const featuredProject = !hasFilters ? filteredProjects.find((project) => project.featured) : null;
  const visibleProjects = featuredProject
    ? filteredProjects.filter((project) => project.slug !== featuredProject.slug)
    : filteredProjects;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedStatus("");
    setSelectedTech("");
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
        <link rel="canonical" href="https://rjryt.com/projects/" />
        <meta name="author" content="RJRYT" />
        <meta property="og:title" content="Projects by RJRYT | MERN Stack Creations" />
        <meta
          property="og:description"
          content="Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.com/projects/" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content="https://rjryt.com/images/seo/rjryt-social-card.png" />
        <meta property="og:image:alt" content="RJRYT projects portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects by RJRYT | MERN Stack Creations" />
        <meta
          name="twitter:description"
          content="Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies."
        />
        <meta name="twitter:url" content="https://rjryt.com/projects/" />
        <meta name="twitter:image" content="https://rjryt.com/images/seo/rjryt-social-card.png" />
        <meta name="twitter:image:alt" content="RJRYT projects portfolio" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://rjryt.com/projects/#webpage",
            url: "https://rjryt.com/projects/",
            name: "Projects by RJRYT | MERN Stack Creations",
            description:
              "Explore real-world projects built by RJRYT with React, Node.js, and MongoDB. View details, live demos, and case studies.",
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://rjryt.com/#website",
            },
            about: {
              "@type": "Person",
              "@id": "https://rjryt.com/#person",
              name: "RJRYT",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-20">
          <section className="relative overflow-hidden border-b border-border/70">
            <div className="portfolio-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="ambient-orb -left-40 -top-20 h-96 w-96" aria-hidden="true" />
            <div className="ambient-orb -right-36 bottom-0 h-80 w-80" aria-hidden="true" />

            <div className="container relative mx-auto px-4 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:pb-24">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="mx-auto max-w-6xl"
              >
                <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-8 bg-primary" />
                  The project archive
                </div>

                <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                  <div>
                    <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                      Ideas made
                      <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        into things.
                      </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                      A collection of products, experiments, and tools—built to solve real problems
                      and make the web a little more useful.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:min-w-[280px]">
                    <StatCard value={allProjects.length} label="Projects" />
                    <StatCard value={categories.length} label="Fields explored" />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/70 pt-5 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Code2 size={15} className="text-primary" />
                    Full-stack &amp; frontend
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Layers3 size={15} className="text-primary" />
                    Open source &amp; client work
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={15} className="text-accent" />
                    Always building
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              {featuredProject && <FeaturedProject project={featuredProject} />}

              <div className="mb-7 flex flex-col gap-5">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Browse the archive
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {hasFilters ? "Matching projects" : "More things I’ve built"}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground" aria-live="polite">
                    <span className="font-semibold text-foreground">{filteredProjects.length}</span>{" "}
                    {filteredProjects.length === 1 ? "project" : "projects"}
                    {hasFilters && ` found`}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card/60 p-3 shadow-sm backdrop-blur-xl sm:p-4">
                  <div className="flex flex-col gap-3 lg:flex-row">
                    <label className="relative min-w-0 flex-1">
                      <Search
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <Input
                        type="search"
                        placeholder="Search projects, tools, or tech…"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        aria-label="Search projects"
                        className="h-12 border-border/70 bg-background/70 pl-11 pr-4 focus-visible:ring-primary/40"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto">
                      <FilterSelect
                        label="Status"
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={statuses}
                      />
                      <FilterSelect
                        label="Technology"
                        value={selectedTech}
                        onChange={setSelectedTech}
                        options={technologies}
                      />
                      <label className="relative col-span-2 sm:col-span-1">
                        <ArrowDownWideNarrow
                          size={15}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <select
                          value={sortBy}
                          onChange={(event) => setSortBy(event.target.value)}
                          aria-label="Sort projects"
                          className="h-12 w-full appearance-none rounded-lg border border-border/70 bg-background/70 py-2 pl-9 pr-8 text-sm text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                        >
                          <option value="newest">Newest first</option>
                          <option value="oldest">Oldest first</option>
                          <option value="title">Title A–Z</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                    <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <SlidersHorizontal size={14} />
                      Category
                    </span>
                    <CategoryChip
                      active={!selectedCategory}
                      onClick={() => setSelectedCategory("")}
                    >
                      All work
                    </CategoryChip>
                    {categories.map((category) => (
                      <CategoryChip
                        key={category}
                        active={selectedCategory === category}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === category ? "" : category)
                        }
                      >
                        {category}
                      </CategoryChip>
                    ))}
                    {hasFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X size={13} />
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {visibleProjects.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center"
                >
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <Search size={20} />
                  </div>
                  <h3 className="text-lg font-bold">No projects found</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Try another keyword or remove a filter to see more of the archive.
                  </p>
                  <Button type="button" variant="outline" onClick={clearFilters} className="mt-5">
                    Clear filters
                  </Button>
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

const StatCard = ({ value, label }) => (
  <div className="min-w-[118px] rounded-2xl border border-border/80 bg-card/65 px-5 py-4 backdrop-blur">
    <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
    <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
  </div>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative">
    <span className="sr-only">Filter by {label.toLowerCase()}</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-12 w-full min-w-0 appearance-none rounded-lg border border-border/70 bg-background/70 px-3 pr-8 text-sm text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
    >
      <option value="">All {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const CategoryChip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
      active
        ? "border-primary/30 bg-primary text-primary-foreground shadow-sm shadow-primary/20"
        : "border-border/70 bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const FeaturedProject = ({ project }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55 }}
    className="group relative mb-16 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm"
  >
    <div className="grid lg:min-h-[350px] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-[230px] overflow-hidden bg-secondary/60 lg:order-2 lg:min-h-full">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/seo/rjryt-social-card.png";
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectImageFallback title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:bg-gradient-to-r" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          <Sparkles size={13} className="text-amber-300" />
          Featured project
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
            {project.category || "Project"}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(project.technologies || []).slice(0, 4).map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-border/70 bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild className="group/button">
            <Link to={`/projects/${project.slug}/`}>
              Explore project
              <ArrowRight
                size={16}
                className="ml-1 transition-transform group-hover/button:translate-x-1"
              />
            </Link>
          </Button>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays size={14} />
            {formatDate(project.date)}
          </span>
        </div>
      </div>
    </div>
  </motion.article>
);

const ProjectCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.45, delay: Math.min(index % 3, 2) * 0.07 }}
    whileHover={{ y: -5 }}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
  >
    <Link
      to={`/projects/${project.slug}/`}
      className="relative block aspect-[16/9] overflow-hidden bg-secondary/60"
      aria-label={`View ${project.title} project details`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/seo/rjryt-social-card.png";
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <ProjectImageFallback title={project.title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
      <div className="absolute left-4 top-4">
        <StatusBadge status={project.status} />
      </div>
      {project.featured && (
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
          Featured
        </span>
      )}
      <span className="absolute bottom-4 right-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-slate-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight size={17} />
      </span>
    </Link>

    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
          {project.category || "Development"}
        </span>
        {project.date && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {new Date(project.date).getFullYear()}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
        <Link to={`/projects/${project.slug}/`} className="focus-visible:outline-none">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {(project.technologies || []).slice(0, 3).map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-secondary/80 px-2 py-1 text-[11px] font-medium text-secondary-foreground"
          >
            {technology}
          </span>
        ))}
        {(project.technologies || []).length > 3 && (
          <span className="rounded-md bg-secondary/80 px-2 py-1 text-[11px] text-muted-foreground">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <Link
          to={`/projects/${project.slug}/`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
        >
          View project <ArrowRight size={15} />
        </Link>
        <div className="flex items-center gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <Github size={15} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.article>
);

const StatusBadge = ({ status }) => {
  const statusClass =
    status?.toLowerCase() === "active" || status?.toLowerCase() === "in progress"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : status?.toLowerCase() === "archived"
        ? "bg-muted text-muted-foreground"
        : "bg-sky-500/15 text-sky-700 dark:text-sky-300";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusClass}`}
    >
      {status || "Project"}
    </span>
  );
};

const ProjectImageFallback = ({ title }) => (
  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/20 via-secondary to-accent/15">
    <div className="text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl border border-border/70 bg-background/70 text-primary shadow-lg">
        <Code2 size={24} />
      </div>
      <span className="text-xs font-semibold text-muted-foreground">{title}</span>
    </div>
  </div>
);

export default ProjectsPage;

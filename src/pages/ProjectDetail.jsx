import React, { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Share2,
  Sparkles,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getRelatedProjects, formatDate } from "@/utils/projects";
import { SITE_URL, SITE_NAME, PERSON_ID, DEFAULT_IMAGE } from "@/components/SEO";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const relatedProjects = project ? getRelatedProjects(project) : [];
  const [shareState, setShareState] = useState("idle");

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const shareProject = async () => {
    const shareData = {
      title: project.title,
      text: project.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareState("shared");
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 2500);
    } catch {
      setShareState("error");
    }
  };

  const statusClass =
    project.status?.toLowerCase() === "active" || project.status?.toLowerCase() === "in progress"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : project.status?.toLowerCase() === "archived"
        ? "bg-muted text-muted-foreground"
        : "bg-sky-500/15 text-sky-700 dark:text-sky-300";

  return (
    <>
      <Helmet>
        <title>{project.title} - RJRYT Projects</title>
        <meta name="description" content={project.description} />
        <meta
          name="keywords"
          content={`RJRYT, ${project.title}, ${project.technologies?.join(
            ", ",
          )}, ${project.category}`}
        />
        <link rel="canonical" href={`${SITE_URL}/projects/${slug}/`} />
        <meta name="author" content="RJRYT" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`${project.title} - RJRYT Projects`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/projects/${slug}/`} />
        {project.image && (
          <>
            <meta property="og:image" content={DEFAULT_IMAGE} />
            <meta property="og:image:alt" content={`${project.title} — RJRYT project`} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} - RJRYT Projects`} />
        <meta name="twitter:description" content={project.description} />
        {project.image && (
          <>
            <meta name="twitter:image" content={DEFAULT_IMAGE} />
            <meta name="twitter:image:alt" content={`${project.title} — RJRYT project`} />
          </>
        )}
        <meta name="twitter:url" content={`${SITE_URL}/projects/${slug}/`} />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              "@id": `${SITE_URL}/projects/${slug}/#code`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/projects/${slug}/#webpage`,
              },
              name: project.title,
              description: project.description,
              keywords: ["RJRYT", ...(project.technologies || []), project.category || ""],
              codeRepository: project.github || undefined,
              programmingLanguage: project.technologies?.join(", "),
              author: {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: "RJRYT",
                url: `${SITE_URL}/`,
              },
              publisher: { "@id": PERSON_ID },
              image: [DEFAULT_IMAGE],
              datePublished: project.date,
              dateModified: project.updatedAt || project.date,
              url: `${SITE_URL}/projects/${slug}/`,
              isPartOf: {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `${SITE_URL}/projects/${slug}/#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${SITE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: `${SITE_URL}/projects/`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: project.title,
                  item: `${SITE_URL}/projects/${slug}/`,
                },
              ],
            },
          ])}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-20">
          <section className="relative overflow-hidden border-b border-border/70">
            <div className="portfolio-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="ambient-orb -left-40 top-0 h-96 w-96" aria-hidden="true" />
            <div className="ambient-orb -right-36 bottom-0 h-80 w-80" aria-hidden="true" />

            <div className="container relative mx-auto px-4 pb-14 pt-10 sm:pb-20 sm:pt-14">
              <div className="mx-auto max-w-6xl">
                <Link
                  to="/projects"
                  className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  All projects
                </Link>

                <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                        {project.category || "Project"}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${statusClass}`}
                      >
                        {project.status || "Project"}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent">
                          <Sparkles size={13} />
                          Featured
                        </span>
                      )}
                    </div>

                    <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                      {project.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      {project.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                      {project.date && (
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={16} className="text-primary" />
                          {formatDate(project.date)}
                        </span>
                      )}
                      {project.category && (
                        <span className="inline-flex items-center gap-2">
                          <Layers3 size={16} className="text-primary" />
                          {project.category}
                        </span>
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.live && (
                        <Button asChild size="lg" className="group">
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <Globe2 size={17} />
                            Visit live project
                            <ArrowUpRight
                              size={16}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button asChild variant="outline" size="lg">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={17} />
                            Source code
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={shareProject}
                        variant="outline"
                        size="lg"
                        aria-live="polite"
                      >
                        {shareState === "copied" || shareState === "shared" ? (
                          <Check size={17} />
                        ) : (
                          <Share2 size={17} />
                        )}
                        {shareState === "copied"
                          ? "Link copied"
                          : shareState === "shared"
                            ? "Shared"
                            : shareState === "error"
                              ? "Could not share"
                              : "Share"}
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, x: 18 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    className="relative"
                  >
                    <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl shadow-foreground/10 sm:rounded-3xl sm:p-3">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = "/images/seo/rjryt-social-card.png";
                          }}
                          className="aspect-[16/10] w-full rounded-xl object-cover sm:rounded-2xl"
                        />
                      ) : (
                        <ProjectArtwork title={project.title} />
                      )}
                    </div>
                  </motion.div>
                </div>

                {project.technologies?.length > 0 && (
                  <div className="mt-10 border-t border-border/70 pt-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground/80"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-14 sm:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55 }}
                className="min-w-0 rounded-2xl border border-border/80 bg-card/55 p-6 shadow-sm backdrop-blur sm:p-9 lg:p-12"
              >
                <div className="mb-8 flex items-center gap-3 border-b border-border/70 pb-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Code2 size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary">
                      Project notes
                    </p>
                    <h2 className="mt-0.5 text-lg font-bold">Behind the build</h2>
                  </div>
                </div>

                <div className="project-prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {project.content}
                  </ReactMarkdown>
                </div>
              </motion.article>

              <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-border/80 bg-card/55 p-5 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    At a glance
                  </p>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-xs text-muted-foreground">Category</dt>
                      <dd className="mt-1 font-semibold">{project.category || "Development"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Status</dt>
                      <dd className="mt-1 font-semibold">{project.status || "Project"}</dd>
                    </div>
                    {project.date && (
                      <div>
                        <dt className="text-xs text-muted-foreground">Created</dt>
                        <dd className="mt-1 font-semibold">{formatDate(project.date)}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5">
                  <p className="text-sm font-bold">Have a similar idea?</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Let’s talk about turning it into something useful.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
                  >
                    Get in touch <ArrowRight size={15} />
                  </Link>
                </div>
              </aside>
            </div>
          </section>

          {relatedProjects.length > 0 && (
            <section className="border-t border-border/70 bg-card/25">
              <div className="container mx-auto px-4 py-14 sm:py-20">
                <div className="mx-auto max-w-6xl">
                  <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        <Sparkles size={14} />
                        Keep exploring
                      </p>
                      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Related projects
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        More work connected by shared tools, technologies, and ideas.
                      </p>
                    </div>
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Browse all projects <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {relatedProjects.map((relatedProject, index) => (
                      <RelatedProjectCard
                        key={relatedProject.slug}
                        project={relatedProject}
                        index={index}
                      />
                    ))}
                  </div>
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

const markdownComponents = {
  h1: ({ children }) => (
    <h2 className="mb-5 mt-10 text-3xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-9 text-2xl font-bold tracking-tight text-foreground">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mb-3 mt-7 text-xl font-bold text-foreground">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-3 mt-6 text-lg font-bold text-foreground">{children}</h4>,
  p: ({ children }) => <p className="mb-5 leading-7 text-muted-foreground">{children}</p>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-7 marker:text-primary">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-l-2 border-primary pl-5 text-foreground/80">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => (
    <code
      className={`rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground ${className || ""}`}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm leading-6">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[560px] border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-secondary/70">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="border-r border-border px-4 py-3 text-left font-semibold last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-r border-border px-4 py-3 align-top text-muted-foreground last:border-r-0">
      {children}
    </td>
  ),
  img: ({ src, alt, title }) => (
    <img
      src={src}
      alt={alt || ""}
      title={title}
      loading="lazy"
      className="my-7 h-auto max-w-full rounded-xl border border-border/70"
    />
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="text-foreground/90">{children}</em>,
};

const ProjectArtwork = ({ title }) => (
  <div className="grid aspect-[16/10] place-items-center rounded-xl bg-gradient-to-br from-primary/20 via-secondary to-accent/15">
    <div className="text-center">
      <span className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl border border-border/70 bg-background/70 text-primary shadow-xl">
        <Code2 size={28} />
      </span>
      <span className="font-semibold text-muted-foreground">{title}</span>
    </div>
  </div>
);

const RelatedProjectCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    whileHover={{ y: -5 }}
    className="group overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
  >
    <Link
      to={`/projects/${project.slug}/`}
      className="relative block aspect-[16/9] overflow-hidden bg-secondary/60"
      aria-label={`View ${project.title}`}
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
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <ProjectArtwork title={project.title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {project.category || "Project"}
      </span>
    </Link>

    <div className="p-5">
      <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
        <Link to={`/projects/${project.slug}/`}>{project.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(project.technologies || []).slice(0, 3).map((technology) => (
          <span
            key={technology}
            className="rounded-md bg-secondary/80 px-2 py-1 text-[11px] text-secondary-foreground"
          >
            {technology}
          </span>
        ))}
      </div>
      <Link
        to={`/projects/${project.slug}/`}
        className="mt-5 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        Explore project <ArrowRight size={15} />
      </Link>
    </div>
  </motion.article>
);

export default ProjectDetail;

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "@/utils/projects";

const FeaturedProjectsSection = () => {
  const projects = getFeaturedProjects();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://rjryt.com/#featured-projects",
    name: "Featured projects by RJRYT",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        url: `https://rjryt.com/projects/${project.slug}/`,
        author: { "@id": "https://rjryt.com/#person" },
        applicationCategory: project.category || "WebApplication",
        keywords: project.technologies || [],
      },
    })),
  };

  if (!projects.length) return null;
  return <section className="py-24 relative" aria-labelledby="featured-projects-title">
    <Helmet><script type="application/ld+json">{JSON.stringify(itemList)}</script></Helmet>
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-sm uppercase tracking-[.25em] text-primary font-semibold mb-3">Selected work</p>
          <h2 id="featured-projects-title" className="text-4xl md:text-5xl font-bold gradient-text">Featured projects</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">A selection of real applications, tools, and experiments built across the full stack.</p>
        </div>
        <Link to="/projects" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">View all projects <ArrowUpRight size={18} /></Link>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => <motion.article key={project.slug}
          initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: index * .08 }}
          whileHover={{ y: -7, rotateX: 1 }}
          className="group relative rounded-2xl border border-border bg-card/55 backdrop-blur-xl p-6 overflow-hidden interactive-glow">
          <div className="absolute -top-20 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center shadow-lg shadow-primary/15"><Code2 size={22} /></div>
              <span className="text-xs rounded-full border border-border px-3 py-1 text-muted-foreground">{project.status || "Project"}</span>
            </div>
            <p className="text-xs uppercase tracking-[.18em] text-primary font-semibold mb-2">{project.category || "Development"}</p>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 min-h-[4.5rem]">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {(project.technologies || []).slice(0, 4).map((tech) => <span key={tech} className="text-xs rounded-md bg-secondary/80 text-secondary-foreground px-2.5 py-1">{tech}</span>)}
            </div>
            <Link to={`/projects/${project.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Explore project <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.article>)}
      </div>
      <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"><Sparkles size={15} className="text-accent" /> More experiments and open-source work in the full catalogue</div>
    </div>
  </section>;
};
export default FeaturedProjectsSection;

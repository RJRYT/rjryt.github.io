import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Gauge, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const offerings = [
  {
    icon: Code2,
    number: "01",
    title: "Full-stack products",
    description: "From expressive React interfaces to reliable APIs and data layers.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    icon: Database,
    number: "02",
    title: "Backend & integrations",
    description: "Well-structured services, thoughtful data models, and practical integrations.",
    tags: ["APIs", "Data", "Realtime"],
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Security-minded builds",
    description: "Auth, input handling, and secure defaults considered throughout the stack.",
    tags: ["Auth", "Protection", "Review"],
  },
  {
    icon: Gauge,
    number: "04",
    title: "Performance & delivery",
    description: "Faster experiences, deployment workflows, and production readiness.",
    tags: ["SEO", "PWA", "Cloud"],
  },
];

const ServicesPreviewSection = () => (
  <section className="relative overflow-hidden py-24" aria-labelledby="home-services-title">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-accent/[0.04]" aria-hidden="true" />
    <div className="container relative z-10 mx-auto px-4">
      <div className="mb-12 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-primary">What I do</p>
          <h2 id="home-services-title" className="max-w-2xl text-4xl font-black tracking-tight text-foreground md:text-5xl">
            Thoughtful engineering, end to end.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            A practical mix of product-minded frontend work and dependable systems behind it.
          </p>
        </motion.div>
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
          Explore services <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {offerings.map(({ icon: Icon, number, title, description, tags }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl border border-border bg-card/55 p-6 backdrop-blur-xl transition-colors hover:border-primary/35"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                <Icon size={21} />
              </span>
              <span className="font-mono text-xs text-muted-foreground/60">{number}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="mt-3 min-h-16 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-[0.68rem] text-muted-foreground">{tag}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesPreviewSection;

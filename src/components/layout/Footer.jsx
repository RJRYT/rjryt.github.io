import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Github,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Sparkles,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const linkGroups = [
  {
    title: "Explore",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Writing", href: "/blog" },
    ],
  },
  {
    title: "What I do",
    links: [
      { name: "Services", href: "/services" },
      { name: "Skills", href: "/skills" },
      { name: "Team", href: "/team" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", icon: Github, url: "/r/github" },
  { name: "YouTube", icon: Youtube, url: "/r/youtube" },
  { name: "LinkedIn", icon: Linkedin, url: "/r/linkedin" },
  { name: "Instagram", icon: Instagram, url: "/r/instagram" },
  { name: "Discord", icon: MessageCircle, url: "/r/discord" },
  { name: "Replit", icon: ExternalLink, url: "/r/replit" },
];

const Footer = () => {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_100%,_hsl(var(--primary)/.12),_transparent_35%),radial-gradient(ellipse_at_100%_0%,_hsl(var(--accent)/.08),_transparent_32%)]" />
      <div className="container relative z-10 mx-auto px-4 pb-7 pt-14 md:pt-20">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="relative mb-16 overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/[.12] via-card/80 to-accent/[.08] p-7 shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-10"
          aria-labelledby="footer-cta-title"
        >
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles size={14} className="text-accent" /> Have an idea to build?
              </span>
              <h2 id="footer-cta-title" className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
                Let’s turn the next good idea into something real.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Tell me what you’re working on. I’m always open to thoughtful collaborations and interesting projects.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5"
            >
              Start a conversation <ArrowRight size={17} />
            </Link>
          </div>
        </motion.section>

        <div className="grid gap-12 border-b border-border/80 pb-12 md:grid-cols-[1.4fr_.8fr_.8fr] md:gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="RJRYT home">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/15">
                <Code2 size={21} />
              </span>
              <span>
                <span className="block text-lg font-black tracking-[.16em] text-foreground">RJRYT</span>
                <span className="block text-[0.62rem] uppercase tracking-[.2em] text-muted-foreground">Full-stack developer</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building scalable, secure, and thoughtful web applications—from polished interfaces to reliable backend systems.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50 ${reduceMotion ? "" : "animate-ping"}`} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to meaningful projects
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <motion.div key={name} whileHover={reduceMotion ? undefined : { y: -3 }}>
                  <Link
                    to={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon size={17} />
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              to="/r/sponsor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-rose-500"
            >
              <Heart size={14} /> Support my work <ArrowUpRight size={13} />
            </Link>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-foreground">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map(({ name, href }) => (
                  <li key={name}>
                    <Link to={href} className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                      {name}
                      <ArrowUpRight size={13} className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            © {currentYear} RJRYT · Made with <Heart size={13} className="text-rose-500" /> in Kerala, India
          </p>
          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <span>React · Vite · Tailwind</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 font-medium transition-colors hover:border-primary/35 hover:text-primary"
              aria-label="Back to top"
            >
              Back to top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

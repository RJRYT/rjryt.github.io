import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cloud,
  Code,
  GitBranch,
  Shield,
  Smartphone,
  Server,
  Database,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const skills = [
  {
    category: "Frontend",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    items: ["React.js", "Vite", "Next.js (basics)", "Tailwind CSS", "ShadCN", "Material UI"],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Authentication", "Rate Limiting"],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-purple-500 to-violet-500",
    items: ["MongoDB", "MySQL", "Redis", "Mongoose", "Aggregations", "Indexing"],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    items: ["AWS (EC2, S3, CloudFront)", "NGINX", "CI/CD", "Docker", "Linux Server"],
  },
];

const specialties = [
  { icon: Smartphone, label: "PWA Development", desc: "Offline support and app-like experiences across devices." },
  { icon: Shield, label: "Security", desc: "E2EE, XSS/CSRF protection, and carefully designed authentication." },
  { icon: Zap, label: "Performance", desc: "SEO-aware, lightweight experiences with fast loading times." },
  { icon: GitBranch, label: "Best Practices", desc: "Clean code and scalable architecture built to evolve." },
];

const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const AboutSection = () => (
  <section id="about" className="relative overflow-hidden py-24 md:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,_hsl(var(--primary)/.12),_transparent_35%)]" />
    <div className="container relative z-10 mx-auto px-4">
      <Reveal className="mb-14 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-primary">A little about me</p>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
          I build useful things for the web—and care about how they work.
        </h2>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <Reveal className="space-y-5">
          <div className="rounded-[1.75rem] border border-border bg-card/60 p-7 shadow-xl shadow-black/5 backdrop-blur-xl md:p-9">
            <p className="text-lg leading-relaxed text-foreground/90">
              Hi 👋 I’m <span className="font-semibold text-primary">RJRYT</span>, a passionate Full-Stack Web Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). I love building scalable, secure, and user-friendly applications that solve real-world problems.
            </p>
            <div className="my-7 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />
            <h3 className="mb-4 text-xl font-bold text-foreground">What I do</h3>
            <ul className="space-y-3">
              {[
                "Develop responsive web apps with React and Tailwind for clean UI/UX.",
                "Build robust Node.js and Express backends, integrating APIs and databases.",
                "Optimize applications for SEO, performance, and PWA support.",
                "Implement advanced features like real-time chat, push notifications, and encryption.",
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-[0.65rem] font-semibold text-primary">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl">
            <h3 className="mb-3 text-base font-bold text-foreground">My focus</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Production-ready applications, cloud deployment with AWS and CI/CD, and secure systems using authentication, rate limiting, and end-to-end encryption. Beyond coding, I enjoy experimenting with new technologies, contributing to open source, and learning better ways to build scalable web solutions.
            </p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            See how I can help <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {specialties.map(({ icon: Icon, label, desc }, index) => (
            <Reveal key={label} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -5 }}
                className="h-full min-h-48 rounded-2xl border border-border bg-card/45 p-5 backdrop-blur-xl transition-colors hover:border-primary/35 sm:p-6"
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  <Icon size={20} />
                </span>
                <h3 className="mb-2 text-base font-bold text-foreground">{label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[.25em] text-accent">My toolkit</p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">The systems I work across</h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">A broad toolkit for taking web products from interface to infrastructure.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map(({ category, icon: Icon, color, items }, index) => (
            <Reveal key={category} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -5 }}
                className="h-full rounded-2xl border border-border bg-card/55 p-6 backdrop-blur-xl transition-colors hover:border-primary/30"
              >
                <span className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${color} text-white`}>
                  <Icon size={20} />
                </span>
                <h4 className="mb-4 font-bold text-foreground">{category}</h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary/70" />{item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;

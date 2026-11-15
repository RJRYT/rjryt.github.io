import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Shield,
  Terminal,
  Zap,
  Figma,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Responsive Design", level: 90 },
      { name: "PWA Development", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets", level: 85 },
      { name: "Authentication", level: 90 },
      { name: "API Security", level: 85 },
    ],
  },
  {
    title: "Database Management",
    icon: Database,
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Mongoose ODM", level: 90 },
      { name: "Database Design", level: 85 },
      { name: "Query Optimization", level: 80 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS (EC2, S3)", level: 80 },
      { name: "NGINX", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "Docker", level: 60 },
      { name: "Linux Server", level: 85 },
      { name: "GitHub Actions", level: 80 },
    ],
  },
];

const tools = [
  { name: "Git & GitHub", icon: Terminal },
  { name: "VS Code", icon: Code2 },
  { name: "Postman", icon: Zap },
  { name: "Figma", icon: Figma },
];

const securityFeatures = [
  "End-to-End Encryption (RSA)",
  "JWT Authentication",
  "OAuth Integration",
  "XSS/CSRF Protection",
  "Rate Limiting",
  "CORS Hardening",
];

const SkillsSection = () => (
  <section id="skills" className="relative overflow-hidden py-24 md:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_85%,_hsl(var(--accent)/.08),_transparent_35%)]" />
    <div className="container relative z-10 mx-auto px-4">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-12 max-w-3xl"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-primary">Technical skills</p>
        <h2 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">The tools behind the work</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          A practical set of skills across the frontend, backend, data, and deployment layers.
        </p>
      </motion.header>

      <div className="grid gap-5 lg:grid-cols-2">
        {skillCategories.map(({ title, icon: Icon, color, skills }, categoryIndex) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.06 }}
            className="rounded-[1.6rem] border border-border bg-card/55 p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                <Icon size={21} />
              </span>
              <div>
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[.18em] text-muted-foreground">Skill set 0{categoryIndex + 1}</p>
                <h3 className="text-lg font-bold text-foreground sm:text-xl">{title}</h3>
              </div>
            </div>
            <div className="space-y-4">
              {skills.map(({ name, level }, skillIndex) => (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-foreground/90">{name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{level}%</span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label={`${name} proficiency`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={level}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: 0.12 + skillIndex * 0.045 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[1.6rem] border border-border bg-card/55 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 text-white"><Shield size={21} /></span>
            <div>
              <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[.18em] text-muted-foreground">Principles</p>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">Security expertise</h3>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {securityFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/45 px-3 py-3 text-sm text-foreground/85">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{feature}
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-[1.6rem] border border-border bg-card/55 p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white"><Figma size={21} /></span>
            <div>
              <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[.18em] text-muted-foreground">Workflow</p>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">Tools I reach for</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tools.map(({ name, icon: Icon }) => (
              <div key={name} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/45 p-3 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/35">
                <Icon size={17} className="text-primary" />{name}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-primary/15 bg-primary/[0.06] p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[.18em] text-primary">Development philosophy</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Clean code, scalable architecture, a security-first approach, and continuous learning.</p>
          </div>
          <Link to="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            Put these skills to work <ArrowUpRight size={16} />
          </Link>
        </motion.article>
      </div>
    </div>
  </section>
);

export default SkillsSection;

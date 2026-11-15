import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Database, Layers3, Server, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PixelReveal from "@/components/animations/PixelReveal";
import MagneticButton from "@/components/interactions/MagneticButton";

const HeroSection = () => {
  const stageRef = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.25], [0, 70]);
  const moveStage = (event) => {
    if (reduce || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    rx.set(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };
  const resetStage = () => {
    rx.set(0);
    ry.set(0);
  };

  const technologies = ["React", "Node.js", "MongoDB", "Express", "TypeScript", "AWS"];
  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden px-4 pt-24 pb-16">
      <div className="absolute inset-0 portfolio-grid opacity-60" aria-hidden="true" />
      <motion.div
        style={{ y: parallaxY }}
        className="ambient-orb w-80 h-80 -top-20 -left-20"
        aria-hidden="true"
      />
      <div className="ambient-orb w-96 h-96 bottom-0 right-0" aria-hidden="true" />
      <div className="container mx-auto relative z-10 grid lg:grid-cols-[1.08fr_.92fr] gap-10 lg:gap-4 items-center">
        <div className="max-w-3xl text-center lg:text-left">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 backdrop-blur px-4 py-2 text-sm text-muted-foreground mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_currentColor]" />
            Available for meaningful projects
          </motion.div>
          <motion.p
            className="text-sm font-semibold tracking-[.28em] uppercase text-primary mb-4"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            Independent developer · India
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight text-foreground"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Building digital
            <span className="block gradient-text">experiences</span>
            that work.
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mt-7 leading-relaxed"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
          >
            I'm <strong className="text-foreground">RJRYT (Robin Jr)</strong>, a MERN stack and
            full-stack web developer crafting scalable, secure, and thoughtful web applications —
            from polished interfaces to reliable backend systems.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-8"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            <MagneticButton>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-7 shadow-lg shadow-primary/15 hover:-translate-y-1 transition-transform"
                asChild
              >
                <a href="/projects">
                  Explore my work <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card/50 backdrop-blur hover:border-primary/50"
                asChild
              >
                <a href="/contact">Let's work together</a>
              </Button>
            </MagneticButton>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2.5 justify-center lg:justify-start mt-9"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
          >
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs sm:text-sm rounded-lg border border-border bg-card/55 px-3 py-2 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <PixelReveal className="mx-auto w-full max-w-[520px] hidden sm:block">
          <motion.div
            ref={stageRef}
            onPointerMove={moveStage}
            onPointerLeave={resetStage}
            className="hero-stage relative aspect-square"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18 }}
          >
            <div className="absolute inset-[8%] rounded-full bg-primary/10 blur-3xl" />
            <motion.div
              className="hero-core absolute inset-[7%]"
              style={{ rotateX: rx, rotateY: ry }}
            >
              <div className="hero-ring" />
              <div className="hero-ring ring-two" />
              <div className="absolute inset-[25%] rounded-[2rem] hero-glass rotate-[-8deg] grid place-items-center">
                <div className="text-center rotate-[8deg]">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center shadow-2xl shadow-primary/25">
                    <Code2 size={38} />
                  </div>
                  <p className="mt-5 text-2xl font-black tracking-widest text-foreground">RJRYT</p>
                  <p className="text-xs uppercase tracking-[.25em] text-muted-foreground mt-1">
                    Full-stack engineer
                  </p>
                </div>
              </div>
              <div className="absolute top-[8%] right-[4%] hero-glass rounded-2xl p-4 -rotate-6">
                <Terminal className="text-primary" size={25} />
                <span className="block text-[10px] text-muted-foreground mt-2">BUILD / SHIP</span>
              </div>
              <div className="absolute bottom-[12%] left-[2%] hero-glass rounded-2xl p-4 rotate-6">
                <Database className="text-accent" size={25} />
                <span className="block text-[10px] text-muted-foreground mt-2">DATA / API</span>
              </div>
              <div className="absolute top-[42%] right-[-2%] hero-glass rounded-xl p-3">
                <Server className="text-primary" size={22} />
              </div>
              <div className="absolute bottom-[8%] right-[20%] hero-glass rounded-xl p-3">
                <Layers3 className="text-accent" size={22} />
              </div>
            </motion.div>
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-[.25em] uppercase whitespace-nowrap">
              Design · Engineer · Deliver
            </div>
          </motion.div>
        </PixelReveal>
      </div>
      <a
        href="#about"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to introduction"
      >
        Scroll to explore <ArrowDown size={14} />
      </a>
    </section>
  );
};
export default HeroSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const techIcons = [
    { Icon: Code, label: 'Frontend', delay: 0.2 },
    { Icon: Server, label: 'Backend', delay: 0.4 },
    { Icon: Database, label: 'Database', delay: 0.6 },
    { Icon: Globe, label: 'Full-Stack', delay: 0.8 }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map(({ Icon, label, delay }, index) => (
          <motion.div
            key={label}
            className={`absolute text-primary/20 ${
              index === 0
                ? "top-20 left-20"
                : index === 1
                ? "top-40 right-32"
                : index === 2
                ? "bottom-40 left-32"
                : "bottom-20 right-20"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.5, 1, 0.5],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={48} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Hi 👋 I'm</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RJRYT
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full-Stack Web Developer specializing in the{" "}
              <span className="text-accent font-semibold">MERN Stack</span>
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Building scalable, secure, and user-friendly applications that
              solve real-world problems
            </motion.p>
          </div>

          {/* Tech stack highlight */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Express.js",
              "Tailwind",
              "AWS",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="bg-card/50 backdrop-blur-sm border border-border px-4 py-2 text-primary font-medium rounded-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/projects">
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-card/50 backdrop-blur-sm border-border hover:bg-auto text-foreground hover:text-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/contact">
                <Globe className="w-5 h-5 mr-2" />
                Let's Connect
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
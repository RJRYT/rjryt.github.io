import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const IntroLoader = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("rjryt-intro-seen"));
    } catch {}
    if (!seen) {
      setMounted(true);
      setVisible(true);
    }
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem("rjryt-intro-seen", "1");
    } catch {}
    setVisible(false);
  };

  if (!mounted) return null;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        >
          <div className="text-center">
            <motion.div
              className="intro-mark text-5xl sm:text-6xl font-black tracking-tight"
              initial={reduce ? false : { opacity: 0, y: 18, letterSpacing: ".35em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: ".08em" }}
              transition={{ duration: reduce ? 0 : 0.55, ease: "easeOut" }}
              onAnimationComplete={finish}
            >
              RJRYT
            </motion.div>
            <motion.div
              className="mt-5 h-px bg-gradient-to-r from-primary to-accent mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 112 }}
              transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.08 }}
            />
            <p className="mt-4 text-xs uppercase tracking-[.32em] text-muted-foreground">
              Full-stack developer
            </p>
            <button
              type="button"
              onClick={finish}
              className="mt-8 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              tabIndex={0}
            >
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default IntroLoader;

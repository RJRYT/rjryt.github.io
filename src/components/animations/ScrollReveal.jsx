import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const ScrollReveal = ({ children, className = "", delay = 0, once = true, ...props }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: reduce ? 0 : 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export default ScrollReveal;

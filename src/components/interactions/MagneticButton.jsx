import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MagneticButton = ({ children, strength = 7, className = "" }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  const handleMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - .5) * strength);
    y.set(((event.clientY - bounds.top) / bounds.height - .5) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return <motion.div className={`inline-flex ${className}`} style={{ x, y }}
    onPointerMove={handleMove} onPointerLeave={reset}>{children}</motion.div>;
};
export default MagneticButton;

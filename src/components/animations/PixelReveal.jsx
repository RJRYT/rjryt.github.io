import React, { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PIXELS = Array.from({ length: 64 }, (_, index) => index);

const PixelReveal = ({ children, className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: .15 });
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);

  return <div ref={ref} className={`relative overflow-hidden ${className}`}>
    {children}
    {mounted && inView && !reduce && <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none" aria-hidden="true">
      {PIXELS.map((pixel) => <motion.span key={pixel} className="bg-background"
        initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: .72 }}
        transition={{ duration: .38, delay: ((pixel * 17) % 23) * .012, ease: "easeOut" }} />)}
    </div>}
  </div>;
};
export default PixelReveal;

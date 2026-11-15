import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Routes, useLocation } from "react-router-dom";

const RouteTransitions = ({ children }) => {
  const location = useLocation();
  const reduce = useReducedMotion();
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => setClientReady(true), []);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        initial={clientReady && !reduce ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -5 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
      >
        <Routes location={location}>{children}</Routes>
      </motion.div>
    </AnimatePresence>
  );
};
export default RouteTransitions;

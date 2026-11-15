import React, { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ThemeToggle = ({ theme, onClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const Icon = theme === "dark" ? Sun : Moon;
  const nextTheme = theme === "dark" ? "light" : "dark";

  const handleClick = (event) => {
    if (shouldReduceMotion) {
      onClick();
      return;
    }

    const root = document.documentElement;
    const startViewTransition = document.startViewTransition;

    if (typeof startViewTransition === "function") {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      root.style.setProperty("--theme-transition-x", `${x}px`);
      root.style.setProperty("--theme-transition-y", `${y}px`);
      root.style.setProperty("--theme-transition-radius", `${radius}px`);

      const transition = startViewTransition.call(document, () => flushSync(onClick));
      transition.finished.then(
        () => {
          root.style.removeProperty("--theme-transition-x");
          root.style.removeProperty("--theme-transition-y");
          root.style.removeProperty("--theme-transition-radius");
        },
        () => {
          root.style.removeProperty("--theme-transition-x");
          root.style.removeProperty("--theme-transition-y");
          root.style.removeProperty("--theme-transition-radius");
        },
      );
      return;
    }

    root.classList.add("theme-transition-fallback");
    onClick();
    window.setTimeout(() => root.classList.remove("theme-transition-fallback"), 500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="text-foreground/80"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.span
            key={`theme-burst-${theme}`}
            initial={{ opacity: 0.65, scale: 0.4 }}
            animate={{ opacity: 0, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-primary/35"
            aria-hidden="true"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -160, scale: 0.2 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, rotate: 0, scale: 1 }
                : { opacity: [0, 1, 1], rotate: [-160, 24, 0], scale: [0.2, 1.35, 1] }
            }
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 160, scale: 0.2 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.52, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute drop-shadow-[0_0_8px_hsl(var(--primary)/0.65)]"
            aria-hidden="true"
          >
            <Icon size={20} />
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "theme") {
        setTheme(event.newValue || "dark");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/80 backdrop-blur-sm border-b border-border p-2" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r cursor-pointer from-primary to-accent bg-clip-text text-transparent"
          >
            <Link to="/">RJRYT OFFICIAL</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-accent transition-colors relative"
                >
                  {item.name}
                </Link>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </motion.div>
            ))}

            <ThemeToggle theme={theme} onClick={toggleTheme} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle theme={theme} onClick={toggleTheme} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80"
              role="button"
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-card/90 backdrop-blur-md mt-2 rounded-xl overflow-hidden border border-border"
            >
              <div className="px-4 py-2 space-y-2">
                {navigation.map((item) => (
                  <motion.div key={item.name} whileHover={{ x: 10 }}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;

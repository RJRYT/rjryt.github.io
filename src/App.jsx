import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import RedirectPage from "./pages/RedirectPage";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import ErrorPage from "./pages/ErrorPage";
import AutoScrollToTop from "./components/layout/AutoScrollToTop";

const queryClient = new QueryClient();

const App = ({ isServer = false, location = "/", helmetContext={} }) => {
  useEffect(() => {
    // Browser-only logic is safe in useEffect
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.className = savedTheme;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }
  }, []);

  const ConditionRouter = ({ children }) => {
    return isServer ? (
      <StaticRouter location={location}>{children}</StaticRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ConditionRouter>
            <AutoScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/r/:key" element={<RedirectPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ConditionRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

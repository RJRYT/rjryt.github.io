import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://rjryt.com";
export const SITE_NAME = "RJRYT Official";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_IMAGE = `${SITE_URL}/images/seo/rjryt-social-card.png`;

const INDEXABLE_STATIC_ROUTES = new Set([
  "/",
  "/about/",
  "/services/",
  "/skills/",
  "/team/",
  "/contact/",
  "/projects/",
  "/blog/",
]);

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";

  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return trimmed === "/" ? "/" : `${trimmed}/`;
};

export const getCanonicalUrl = (pathname) => {
  const normalized = normalizePath(pathname);

  if (normalized === "/index.html/" || normalized === "/404.html/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${normalized}`;
};

export const isIndexablePath = (pathname) => {
  const normalized = normalizePath(pathname);

  if (normalized === "/index.html/" || normalized === "/404.html/") {
    return false;
  }

  if (INDEXABLE_STATIC_ROUTES.has(normalized)) return true;
  if (/^\/projects\/[^/]+\/$/.test(normalized)) return true;
  if (/^\/blog\/[^/]+\/$/.test(normalized)) return true;

  return false;
};

const siteGraph = [
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: ["RJRYT", "RJRYT Portfolio"],
    description:
      "Portfolio, projects, and technical writing by Robin Jr (RJRYT), a MERN stack and full-stack web developer.",
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
  },
  {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Robin Jr",
    alternateName: ["RJRYT", "Robin J R"],
    url: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
    mainEntityOfPage: `${SITE_URL}/`,
    jobTitle: "MERN Stack & Full-Stack Web Developer",
    description:
      "Robin Jr, known online as RJRYT, is a full-stack web developer focused on React, Node.js, Express, MongoDB, secure APIs, real-time applications, and progressive web apps.",
    sameAs: [
      "https://github.com/RJRYT",
      "https://www.linkedin.com/in/robin-jr",
      "https://www.instagram.com/rjryt_/",
      "https://replit.com/@somaliyo",
    ],
    knowsAbout: [
      "MERN Stack Development",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "REST API Development",
      "WebSockets",
      "Real-time Web Applications",
      "Progressive Web Apps",
      "Web Application Security",
      "AWS",
      "Performance Optimization",
      "Technical SEO",
    ],
    knowsLanguage: ["English", "Malayalam"],
  },
];

const GlobalSEO = () => {
  const { pathname } = useLocation();
  const canonical = getCanonicalUrl(pathname);
  const indexable = isIndexablePath(pathname);
  const pageName =
    pathname === "/"
      ? "RJRYT | MERN Stack & Full-Stack Web Developer"
      : `RJRYT ${pathname.split("/").filter(Boolean).join(" ")}`;
  const pageGraph = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: pageName,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    inLanguage: "en",
  };

  return (
    <Helmet>
      <meta name="robots" content={indexable ? "index, follow" : "noindex, follow"} />
      <meta name="googlebot" content={indexable ? "index, follow" : "noindex, follow"} />
      <meta name="bingbot" content={indexable ? "index, follow" : "noindex, follow"} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:alt" content="RJRYT — MERN Stack and Full-Stack Developer" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:url" content={canonical} />
      <meta name="author" content="Robin Jr (RJRYT)" />
      <meta name="application-name" content="RJRYT Official" />
      <meta name="format-detection" content="telephone=no" />
      <script type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@graph": [...siteGraph, pageGraph] })}
      </script>
    </Helmet>
  );
};

export default GlobalSEO;

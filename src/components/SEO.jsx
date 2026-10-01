import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://rjryt.com";
export const SITE_NAME = "RJRYT Official";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_IMAGE = `${SITE_URL}/images/profile/profile-1.jpg`;

const INDEXABLE_STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/skills",
  "/team",
  "/contact",
  "/projects",
  "/blog",
]);

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
};

export const getCanonicalUrl = (pathname) => {
  const normalized = normalizePath(pathname);
  if (normalized === "/index.html" || normalized === "/404.html") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${normalized}`;
};

export const isIndexablePath = (pathname) => {
  const normalized = normalizePath(pathname);

  if (INDEXABLE_STATIC_ROUTES.has(normalized)) return true;
  if (/^\/projects\/[^/]+$/.test(normalized)) return true;
  if (/^\/blog\/[^/]+$/.test(normalized)) return true;
  return false;
};

const siteGraph = [
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description:
      "Official portfolio of RJRYT, a full-stack web developer specializing in MERN, React, Node.js, MongoDB, Express.js, Tailwind CSS, and modern web applications.",
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
  },
  {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Robin Jr",
    alternateName: "RJRYT",
    url: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
    jobTitle: "Full-Stack Web Developer",
    description:
      "Full-stack web developer specializing in the MERN stack and building scalable, secure, and user-friendly web applications.",
    sameAs: [
      "https://github.com/RJRYT",
      "https://www.linkedin.com/in/robin-jr",
      "https://www.instagram.com/rjryt_/",
      "https://replit.com/@somaliyo",
    ],
    knowsAbout: [
      "MERN Stack",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "WebSockets",
      "AWS",
      "PWA",
      "Web Security",
    ],
  },
];

const GlobalSEO = () => {
  const { pathname } = useLocation();
  const canonical = getCanonicalUrl(pathname);
  const indexable = isIndexablePath(pathname);

  return (
    <Helmet>
      <meta name="robots" content={indexable ? "index, follow" : "noindex, follow"} />
      <meta name="googlebot" content={indexable ? "index, follow" : "noindex, follow"} />
      <meta name="bingbot" content={indexable ? "index, follow" : "noindex, follow"} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": siteGraph,
        })}
      </script>
    </Helmet>
  );
};

export default GlobalSEO;

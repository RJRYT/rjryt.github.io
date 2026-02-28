/*
 * Sitemap & Robots Generator (runs on postbuild)
 * ------------------------------------------------
 * - Scans your app for routes + markdown content
 * - Generates dist/sitemap.xml and dist/robots.txt
 * - Safe to run even if some folders don't exist
 */

import fs from "node:fs";
import path from "node:path";

// ======= Config =======
const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") || "https://rjryt.github.io";
const DIST_DIR = path.resolve(process.cwd(), "dist");

// Core routes shown on Home and also available as pages
const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/skills",
  "/projects",
  "/team",
  "/contact",
  "/blog",
];

// Content sources (adjust if your folders differ)
const BLOG_DIR = path.resolve(process.cwd(), "src", "content", "blog");
const PROJECTS_DIR = path.resolve(process.cwd(), "src", "content", "projects");
import { redirectsData } from "../src/utils/redirects.js";

// Defaults for <changefreq> and <priority>
const FREQ = {
  static: "weekly",
  blog: "weekly",
  project: "weekly",
  redirect: "monthly",
};
const PRIORITY = {
  "/": 1.0,
  "/about": 0.9,
  "/services": 0.8,
  "/skills": 0.8,
  "/projects": 0.9,
  "/team": 0.6,
  "/contact": 0.7,
  "/blog": 0.9,
  default: 0.6,
};

// ======= Helpers =======
function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function getFileMtimeIso(filePath) {
  try {
    const st = fs.statSync(filePath);
    return new Date(st.mtime).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function slugFromFilename(name) {
  return name.replace(/\.(md|markdown)$/i, "");
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function urlXml({ loc, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(
    1
  )}</priority>\n  </url>`;
}

// ======= Collect URLs =======
function collectStaticRoutes() {
  return STATIC_ROUTES.map((route) => ({
    loc: `${SITE_URL}${route}`,
    lastmod: new Date().toISOString(),
    changefreq: FREQ.static,
    priority: PRIORITY[route] ?? PRIORITY.default,
  }));
}

function collectMarkdownRoutes(dir, basePath, type) {
  const entries = safeReadDir(dir).filter(
    (d) => d.isFile() && /\.(md|markdown)$/i.test(d.name)
  );
  return entries.map((d) => {
    const slug = slugFromFilename(d.name);
    const loc = `${SITE_URL}${basePath}/${slug}`.replace(/\/+$/, "");
    const lastmod = getFileMtimeIso(path.join(dir, d.name));
    const changefreq = type === "blog" ? FREQ.blog : FREQ.project;
    const priority = basePath === "/blog" ? 0.8 : 0.8;
    return { loc, lastmod, changefreq, priority };
  });
}

function collectRedirects() {
  try {
    return redirectsData.map((item) => ({
      loc: `${SITE_URL}${item.shortUrl}`,
      lastmod: item.updatedAt || item.createdAt || new Date().toISOString(),
      changefreq: FREQ.redirect,
      priority: 0.5,
      target: item.targetUrl,
      title: item.title,
      description: item.description,
      active: item.active,
      clicks: item.clicks,
    }));
  } catch {
    return [];
  }
}

// ======= Generate XML =======
function generateSitemapXml(urls) {
  const body = urls.map(urlXml).join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
}

function generateRobotsTxt() {
  return `Sitemap: ${SITE_URL}/sitemap.xml\nUser-agent: *\nAllow: /`;
}

// ======= Main =======
(function main() {
  // Gather URLs
  const urls = [
    ...collectStaticRoutes(),
    ...collectMarkdownRoutes(BLOG_DIR, "/blog", "blog"),
    ...collectMarkdownRoutes(PROJECTS_DIR, "/projects", "project"),
    ...collectRedirects(),
  ];

  // Ensure dist exists
  ensureDir(DIST_DIR);

  // Write sitemap.xml
  const sitemapXml = generateSitemapXml(urls);
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf8");
  console.log(`[sitemap] Wrote ${urls.length} URLs → dist/sitemap.xml`);

  // Write robots.txt (optional override)
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), robotsTxt, "utf8");
  console.log("[sitemap] Wrote robots.txt → dist/robots.txt");

  // Optional: copy sitemap.xml to sitemap-new.xml
  try {
      fs.copyFileSync(
        path.join(DIST_DIR, "sitemap.xml"),
        path.join(DIST_DIR, "sitemap-new.xml")
      );
      console.log("[sitemap] Copied sitemap.xml to sitemap-new.xml");
    } catch (error) {
      console.error("Error copying sitemap.xml:", error.message);
    }
})();

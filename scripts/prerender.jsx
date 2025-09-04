import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import App from "../src/App"; 
import { redirectsData } from "../src/utils/redirects.js";

// Static routes shown on Home and also available as pages
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

// Content sources
const BLOG_DIR = path.resolve(process.cwd(), "src", "content", "blog");
const PROJECTS_DIR = path.resolve(process.cwd(), "src", "content", "projects");

// safeReadDir: returns [] if dir doesn't exist
function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

// slugFromFilename: removes .md or .markdown extension
function slugFromFilename(name) {
  return name.replace(/\.(md|markdown)$/i, "");
}

// collectMarkdownRoutes: returns array of URLs from markdown files in dir
function collectMarkdownRoutes(dir, basePath) {
  const entries = safeReadDir(dir).filter(
    (d) => d.isFile() && /\.(md|markdown)$/i.test(d.name)
  );
  return entries.map((d) => {
    const slug = slugFromFilename(d.name);
    const loc = `${basePath}/${slug}`.replace(/\/+$/, "");
    return loc;
  });
}

// Redirects from redirectsData
function collectRedirects() {
  try {
    return redirectsData.map((item) => item.shortUrl);
  } catch {
    return [];
  }
}

// ======= Main =======
(function main() {
  // List all routes
  const routes = [
    ...STATIC_ROUTES,
    ...collectMarkdownRoutes(BLOG_DIR, "/blog"),
    ...collectMarkdownRoutes(PROJECTS_DIR, "/projects"),
    ...collectRedirects(),
  ];

  // Output directory (matches Vite’s build output)
  const outputDir = path.join(process.cwd(), "dist");

  // HTML template (minimal, reused from Vite’s dist/index.html)
  let template;
  try {
    template = fs.readFileSync(path.join(outputDir, "index.html"), "utf-8");
  } catch (error) {
    console.error("Error reading index.html:", error.message);
    process.exit(1);
  }

  // Prerender each route
  routes.forEach((route) => {
    try {
      const helmetContext = {};
      const appHtml = renderToString(
        <App isServer={true} location={route} helmetContext={helmetContext} />
      );
      
      // Extract Helmet data (meta tags, title, etc.)
      const { helmet } = helmetContext;
      const headContent = `
      ${helmet.title ? helmet.title.toString() : "<title>RJRYT Official</title>"}
      ${helmet.meta ? helmet.meta.toString() : ""}
      ${helmet.link ? helmet.link.toString() : ""}
      ${helmet.script ? helmet.script.toString() : ""}
      ${helmet.style ? helmet.style.toString() : ""}
    `;

      // Inject rendered content into template
      const finalHtml = template
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace("<!--ssr-head-->", headContent);

      // Create route directory (e.g., dist/about)
      const routeDir = path.join(outputDir, route === "/" ? "" : route);
      fs.mkdirSync(routeDir, { recursive: true });

      // Write HTML file
      fs.writeFileSync(path.join(routeDir, "index.html"), finalHtml);
      console.log(`Prerendered: ${route}`);
    } catch (error) {
      console.error(`Error prerendering ${route}:`, error.message);
    }
  });

  // Create 404.html for GitHub Pages SPA fallback
  try {
    fs.copyFileSync(
      path.join(outputDir, "index.html"),
      path.join(outputDir, "404.html")
    );
    console.log("Created 404.html for SPA fallback");
  } catch (error) {
    console.error("Error creating 404.html:", error.message);
  }
})();
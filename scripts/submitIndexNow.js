import fs from "fs";
import path from "path";
import { redirectsData } from "../src/utils/redirects.js";

// IndexNow configuration
const HOST = "rjryt.github.io";
const KEY = "7a235d82900548b59cb9b4bf36f5bffd";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

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
].map((route) => `https://${HOST}${route}`);

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
    const loc = `https://${HOST}${basePath}/${slug}`.replace(/\/+$/, "");
    return loc;
  });
}

async function submitToIndexNow() {
    const urls = [
      ...STATIC_ROUTES,
      ...collectMarkdownRoutes(BLOG_DIR, "/blog"),
      ...collectMarkdownRoutes(PROJECTS_DIR, "/projects")
    ];

  if (urls.length === 0) {
    console.log("⚠️ No URLs found to submit");
    return;
  }
  console.log(`📌 Found ${urls.length} URLs to submit`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("✅ IndexNow response:", res.status, res.statusText);
  } catch (err) {
    console.error("❌ IndexNow error:", err);
  }
}

submitToIndexNow();

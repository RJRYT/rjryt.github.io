import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const SITE_URL = "https://rjryt.com";

const indexableRoutes = [
  "/",
  "/about",
  "/services",
  "/skills",
  "/team",
  "/contact",
  "/blog",
  "/projects",
];

const ignoredRoutes = ["/404.html", "/error"];

function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.replace(/\/+$/, "");
}

function routeToFile(route) {
  if (route === "/") {
    return path.join(DIST, "index.html");
  }

  return path.join(DIST, route.replace(/^\/+/, ""), "index.html");
}

function fail(message) {
  console.error(`❌ ${message}`);
  errors++;
}

function pass(message) {
  console.log(`✅ ${message}`);
}

let errors = 0;
let warnings = 0;

if (!fs.existsSync(DIST)) {
  console.error(`❌ dist directory does not exist: ${DIST}`);
  process.exit(1);
}

/**
 * Extract HTML attributes.
 *
 * Important:
 * data-rh="true" is intentionally ignored.
 *
 * react-helmet-async adds this attribute to Helmet-managed
 * elements during prerendering. It has no SEO meaning.
 */
function getAttributes(tag) {
  const attrs = {};

  const attributeRegex =
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  let match;

  while ((match = attributeRegex.exec(tag))) {
    const name = match[1].toLowerCase();

    // Ignore the HTML/React Helmet implementation attribute.
    if (name === "data-rh") {
      continue;
    }

    const value = match[2] ?? match[3] ?? match[4] ?? "";

    attrs[name] = value;
  }

  return attrs;
}

function getTags(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return html.match(regex) || [];
}

function getMetaKey(attrs) {
  if (attrs.name) {
    return `name:${attrs.name.toLowerCase()}`;
  }

  if (attrs.property) {
    return `property:${attrs.property.toLowerCase()}`;
  }

  if (attrs["http-equiv"]) {
    return `http-equiv:${attrs["http-equiv"].toLowerCase()}`;
  }

  return null;
}

function getLinkKey(attrs) {
  if (attrs.rel) {
    return `rel:${attrs.rel.toLowerCase()}`;
  }

  return null;
}

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : "";
}

function getCanonical(html) {
  const links = getTags(html, "link");

  for (const tag of links) {
    const attrs = getAttributes(tag);

    if (
      attrs.rel &&
      attrs.rel.toLowerCase().split(/\s+/).includes("canonical")
    ) {
      return attrs.href || "";
    }
  }

  return "";
}

function getMeta(html, key) {
  const tags = getTags(html, "meta");

  for (const tag of tags) {
    const attrs = getAttributes(tag);
    const metaKey = getMetaKey(attrs);

    if (metaKey === key) {
      return attrs.content || "";
    }
  }

  return "";
}

function getAllMetaKeys(html) {
  const tags = getTags(html, "meta");

  return tags.map(getAttributes).map(getMetaKey).filter(Boolean);
}

function getDuplicateKeys(keys) {
  const counts = new Map();

  for (const key of keys) {
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }));
}

function getJsonLd(html) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];

  return scripts.map((match) => match[1].trim());
}

function checkJsonLd(html, route) {
  const blocks = getJsonLd(html);

  if (blocks.length === 0) {
    fail(`${route}: missing JSON-LD`);
    return;
  }

  for (let i = 0; i < blocks.length; i++) {
    try {
      JSON.parse(blocks[i]);
    } catch (error) {
      fail(`${route}: invalid JSON-LD block #${i + 1}`);
    }
  }
}

function checkRoute(route) {
  const normalizedRoute = normalizeRoute(route);
  const file = routeToFile(normalizedRoute);

  if (!fs.existsSync(file)) {
    fail(`${normalizedRoute}: generated HTML not found`);
    return;
  }

  const html = fs.readFileSync(file, "utf8");

  console.log(`\nChecking ${normalizedRoute}`);

  // ------------------------------------------------------------
  // Title
  // ------------------------------------------------------------

  const title = getTitle(html);

  if (!title) {
    fail(`${normalizedRoute}: missing <title>`);
  } else {
    pass(`${normalizedRoute}: title`);
  }

  // ------------------------------------------------------------
  // Description
  // ------------------------------------------------------------

  const description = getMeta(html, "name:description");

  if (!description) {
    fail(`${normalizedRoute}: missing meta description`);
  } else {
    pass(`${normalizedRoute}: description`);
  }

  // ------------------------------------------------------------
  // Canonical
  // ------------------------------------------------------------

  const canonical = getCanonical(html);
  const expectedCanonical =
    normalizedRoute === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedRoute}`;

  if (!canonical) {
    fail(`${normalizedRoute}: missing canonical`);
  } else if (canonical !== expectedCanonical) {
    fail(
      `${normalizedRoute}: canonical mismatch\n` +
        `   expected: ${expectedCanonical}\n` +
        `   found:    ${canonical}`
    );
  } else {
    pass(`${normalizedRoute}: canonical`);
  }

  // ------------------------------------------------------------
  // Open Graph
  // ------------------------------------------------------------

  const ogTitle = getMeta(html, "property:og:title");
  const ogDescription = getMeta(html, "property:og:description");
  const ogUrl = getMeta(html, "property:og:url");
  const ogType = getMeta(html, "property:og:type");

  if (!ogTitle) {
    fail(`${normalizedRoute}: missing og:title`);
  } else {
    pass(`${normalizedRoute}: og:title`);
  }

  if (!ogDescription) {
    fail(`${normalizedRoute}: missing og:description`);
  } else {
    pass(`${normalizedRoute}: og:description`);
  }

  if (!ogUrl) {
    fail(`${normalizedRoute}: missing og:url`);
  } else {
    pass(`${normalizedRoute}: og:url`);
  }

  if (!ogType) {
    fail(`${normalizedRoute}: missing og:type`);
  } else {
    pass(`${normalizedRoute}: og:type`);
  }

  // ------------------------------------------------------------
  // Twitter
  // ------------------------------------------------------------

  const twitterCard = getMeta(html, "name:twitter:card");
  const twitterTitle = getMeta(html, "name:twitter:title");
  const twitterDescription = getMeta(html, "name:twitter:description");

  if (!twitterCard) {
    fail(`${normalizedRoute}: missing twitter:card`);
  } else {
    pass(`${normalizedRoute}: twitter:card`);
  }

  if (!twitterTitle) {
    fail(`${normalizedRoute}: missing twitter:title`);
  } else {
    pass(`${normalizedRoute}: twitter:title`);
  }

  if (!twitterDescription) {
    fail(`${normalizedRoute}: missing twitter:description`);
  } else {
    pass(`${normalizedRoute}: twitter:description`);
  }

  // ------------------------------------------------------------
  // Duplicate meta detection
  //
  // data-rh is ignored here.
  //
  // Example:
  //
  // <meta data-rh="true" property="og:title" ...>
  // <meta property="og:title" ...>
  //
  // is correctly detected as a duplicate.
  // ------------------------------------------------------------

  const metaKeys = getAllMetaKeys(html);
  const duplicateMetaKeys = getDuplicateKeys(metaKeys);

  if (duplicateMetaKeys.length > 0) {
    for (const duplicate of duplicateMetaKeys) {
      fail(
        `${normalizedRoute}: duplicate meta tag ` +
          `${duplicate.key} (${duplicate.count} occurrences)`
      );
    }
  } else {
    pass(`${normalizedRoute}: no duplicate meta tags`);
  }

  // ------------------------------------------------------------
  // Duplicate canonical
  // ------------------------------------------------------------

  const canonicalCount = getTags(html, "link")
    .map(getAttributes)
    .filter((attrs) =>
      attrs.rel?.toLowerCase().split(/\s+/).includes("canonical")
    ).length;

  if (canonicalCount > 1) {
    fail(`${normalizedRoute}: duplicate canonical tags (${canonicalCount})`);
  } else {
    pass(`${normalizedRoute}: canonical uniqueness`);
  }

  // ------------------------------------------------------------
  // Robots
  // ------------------------------------------------------------

  const robots = getMeta(html, "name:robots");

  if (robots && /noindex/i.test(robots)) {
    fail(`${normalizedRoute}: indexable route contains noindex`);
  } else {
    pass(`${normalizedRoute}: indexable`);
  }

  // ------------------------------------------------------------
  // JSON-LD
  // ------------------------------------------------------------

  checkJsonLd(html, normalizedRoute);
}

// ============================================================
// Check indexable routes
// ============================================================

console.log("========================================");
console.log(" RJRYT Portfolio SEO Checker");
console.log("========================================");

for (const route of indexableRoutes) {
  checkRoute(route);
}

// ============================================================
// Discover generated dynamic pages
// ============================================================

function scanDynamicRoutes(directory, prefix) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(directory, entry.name, "index.html"))
    )
    .map((entry) => `${prefix}/${entry.name}`);
}

const projectRoutes = scanDynamicRoutes(
  path.join(DIST, "projects"),
  "/projects"
);

const blogRoutes = scanDynamicRoutes(path.join(DIST, "blog"), "/blog");

console.log("\nDynamic project routes:");

for (const route of projectRoutes) {
  checkRoute(route);
}

console.log("\nDynamic blog routes:");

for (const route of blogRoutes) {
  checkRoute(route);
}

// ============================================================
// Sitemap
// ============================================================

const sitemapPath = path.join(DIST, "sitemap.xml");

if (!fs.existsSync(sitemapPath)) {
  fail("sitemap.xml does not exist");
} else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");

  if (!sitemap.includes("<urlset")) {
    fail("sitemap.xml: invalid urlset");
  }

  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gi)].map(
    (match) => match[1].trim()
  );

  const expectedRoutes = [...indexableRoutes, ...projectRoutes, ...blogRoutes];

  const expectedUrls = expectedRoutes.map(
    (route) => `${SITE_URL}${route === "/" ? "/" : route}`
  );

  // Check expected routes exist.
  for (const url of expectedUrls) {
    if (!sitemapUrls.includes(url)) {
      fail(`sitemap.xml: missing ${url}`);
    }
  }

  // Make sure excluded routes don't appear.
  const forbiddenUrls = [`${SITE_URL}/404.html`, `${SITE_URL}/error`];

  for (const url of forbiddenUrls) {
    if (sitemapUrls.includes(url)) {
      fail(`sitemap.xml: excluded route found: ${url}`);
    }
  }

  pass("sitemap.xml");
}

// ============================================================
// robots.txt
// ============================================================

const robotsPath = path.join(DIST, "robots.txt");

if (!fs.existsSync(robotsPath)) {
  fail("robots.txt does not exist");
} else {
  const robots = fs.readFileSync(robotsPath, "utf8");

  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    fail("robots.txt: sitemap declaration missing");
  } else {
    pass("robots.txt");
  }
}

// ============================================================
// 404.html
//
// IMPORTANT:
// This file is intentionally NOT checked as an indexable page.
// It is the special static fallback page.
// ============================================================

const notFoundPath = path.join(DIST, "404.html");

if (fs.existsSync(notFoundPath)) {
  pass("404.html exists");
} else {
  warnings++;
  console.warn("⚠️ 404.html does not exist");
}

// ============================================================
// Summary
// ============================================================

console.log("\n========================================");
console.log(" SEO CHECK SUMMARY");
console.log("========================================");

if (errors === 0) {
  console.log("✅ SEO check passed.");
} else {
  console.error(`❌ SEO check failed with ${errors} error(s).`);
}

if (warnings > 0) {
  console.warn(`⚠️ ${warnings} warning(s).`);
}

process.exit(errors > 0 ? 1 : 0);

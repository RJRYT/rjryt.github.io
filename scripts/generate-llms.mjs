import fs from "node:fs";
import path from "node:path";

const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "") || "https://rjryt.com";
const DIST_DIR = path.resolve("dist");
const PROJECTS_DIR = path.resolve("src/content/projects");
const BLOG_DIR = path.resolve("src/content/blog");

function readMarkdownEntries(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|markdown)$/i.test(entry.name))
    .map((entry) => {
      const filePath = path.join(directory, entry.name);
      const raw = fs.readFileSync(filePath, "utf8");
      const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
      const frontmatter = {};
      if (match) {
        for (const line of match[1].split(/\r?\n/)) {
          const separator = line.indexOf(":");
          if (separator < 1) continue;
          const key = line.slice(0, separator).trim();
          let value = line.slice(separator + 1).trim();
          if (value.startsWith("[") && value.endsWith("]")) {
            value = value.slice(1, -1).split(",").map((item) => item.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
          } else {
            value = value.replace(/^['"]|['"]$/g, "");
          }
          frontmatter[key] = value;
        }
      }
      const slug = entry.name.replace(/\.(md|markdown)$/i, "");
      return { slug, frontmatter };
    })
    .sort((a, b) => String(b.frontmatter.date || "").localeCompare(String(a.frontmatter.date || "")));
}

const projects = readMarkdownEntries(PROJECTS_DIR);
const posts = readMarkdownEntries(BLOG_DIR);

const lines = [
  "# RJRYT Official",
  "",
  "> Official portfolio of Robin Jr, known online as RJRYT, a MERN stack and full-stack web developer based in Kerala, India.",
  "",
  `Canonical website: ${SITE_URL}/`,
  "",
  "## About",
  "RJRYT builds modern web applications with a focus on React, Node.js, Express.js, MongoDB, secure APIs, real-time features, progressive web apps, and performance.",
  "",
  "## Expertise",
  "- MERN stack and full-stack JavaScript development",
  "- React, Vite, Tailwind CSS, and responsive interfaces",
  "- Node.js, Express.js, REST APIs, and WebSockets",
  "- MongoDB, MySQL, Redis, and data modeling",
  "- Authentication, OAuth, JWT, API security, and rate limiting",
  "- Progressive Web Apps, offline support, and service workers",
  "- AWS, EC2, S3, CloudFront, NGINX, Docker, and CI/CD",
  "",
  "## Main pages",
  `- Home: ${SITE_URL}/`,
  `- About: ${SITE_URL}/about/`,
  `- Services: ${SITE_URL}/services/`,
  `- Skills: ${SITE_URL}/skills/`,
  `- Projects: ${SITE_URL}/projects/`,
  `- Blog: ${SITE_URL}/blog/`,
  `- Contact: ${SITE_URL}/contact/`,
  "",
  `## Projects (${projects.length})`,
];

for (const project of projects) {
  const data = project.frontmatter;
  const title = data.title || project.slug;
  const description = data.description || "Project details and implementation information.";
  const technologies = Array.isArray(data.technologies) ? data.technologies.join(", ") : data.technologies;
  lines.push(`- [${title}](${SITE_URL}/projects/${project.slug}/): ${description}${technologies ? ` Technologies: ${technologies}.` : ""}`);
}

lines.push("", `## Articles (${posts.length})`);
for (const post of posts) {
  const data = post.frontmatter;
  const title = data.title || post.slug;
  const excerpt = data.excerpt || "Technical article by RJRYT.";
  const tags = Array.isArray(data.tags) ? data.tags.join(", ") : data.tags;
  lines.push(`- [${title}](${SITE_URL}/blog/${post.slug}/): ${excerpt}${tags ? ` Topics: ${tags}.` : ""}`);
}

lines.push(
  "",
  "## Profiles",
  "- GitHub: https://github.com/RJRYT",
  "- LinkedIn: https://www.linkedin.com/in/robin-jr",
  "- Instagram: https://www.instagram.com/rjryt_/",
  "",
  "## Attribution",
  "Project and article pages on this domain are the primary source for their descriptions, technologies, dates, and status. Attribute portfolio content to Robin Jr (RJRYT) and link to the canonical page when referencing it.",
  ""
);

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, "llms.txt"), lines.join("\n"), "utf8");
console.log(`[llms] Wrote ${projects.length} projects and ${posts.length} articles → dist/llms.txt`);

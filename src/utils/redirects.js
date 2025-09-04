// Redirect management utilities
export const redirectsData = [
  {
    id: "ncrp",
    shortUrl: "/r/ncrp",
    targetUrl: "https://newcityrp.co.in/",
    title: "NCRP Website",
    description: "National Cyber Resource Portal",
    active: true,
    createdAt: "2024-01-01",
    updatedAt: "2025-09-04",
  },
  {
    id: "github",
    shortUrl: "/r/github",
    targetUrl: "https://github.com/RJRYT",
    title: "GitHub Profile",
    description: "My GitHub repositories and projects",
    active: true,
    createdAt: "2024-01-10",
    updatedAt: "2025-09-04",
  },
  {
    id: "sponsor",
    shortUrl: "/r/sponsor",
    targetUrl: "https://github.com/sponsors/RJRYT?o=esb",
    title: "GitHub Sponsor Profile",
    description: "My GitHub sponsor page",
    active: true,
    createdAt: "2024-01-10",
    updatedAt: "2025-09-04",
  },
  {
    id: "linkedin",
    shortUrl: "/r/linkedin",
    targetUrl: "https://www.linkedin.com/in/robin-jr",
    title: "LinkedIn Profile",
    description: "Professional network and connections",
    active: true,
    createdAt: "2024-01-12",
    updatedAt: "2025-09-04",
  },
  {
    id: "youtube",
    shortUrl: "/r/youtube",
    targetUrl: "https://www.youtube.com/channel/UCHbfnbCUy3eKoIDmln6jnnw",
    title: "YouTube Channel",
    description: "Watch my videos and content",
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-09-04",
  },
  {
    id: "replit",
    shortUrl: "/r/replit",
    targetUrl: "https://replit.com/@somaliyo",
    title: "Replit Workspace",
    description: "Check out my Replit projects",
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-09-04",
  },
  {
    id: "discord",
    shortUrl: "/r/discord",
    targetUrl: "https://discord.com/channels/@me/770988400047947796",
    title: "Discord",
    description: "Connect with me on Discord",
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-09-04",
  },
  {
    id: "instagram",
    shortUrl: "/r/instagram",
    targetUrl: "https://www.instagram.com/rjryt_/",
    title: "Instagram Profile",
    description: "Follow me on Instagram",
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-09-04",
  },
  {
    id: "codroid",
    shortUrl: "/r/codroid",
    targetUrl: "https://discord.gg/XcsZXk6uFF",
    title: "Codroid Developers",
    description: "Codroid Developers Official Discord Server",
    active: true,
    createdAt: "2025-09-04",
    updatedAt: "2025-09-04",
  },
  {
    id: "stacks",
    shortUrl: "/r/stacks",
    targetUrl: "https://discord.gg/pZxwDyz46x",
    title: "Stacks Developers",
    description: "Stacks Developers Official Discord Server",
    active: true,
    createdAt: "2025-09-04",
    updatedAt: "2025-09-04",
  },
];

// Load redirects
const loadRedirects = () => {
  return redirectsData;
};

// Get redirect by short URL
export const getRedirectByShortUrl = (shortUrl) => {
  const redirects = loadRedirects();
  // Handle both /r/key and key formats
  const normalizedUrl = shortUrl.startsWith('/r/') ? shortUrl : `/r/${shortUrl}`;
  return redirects.find(redirect => redirect.shortUrl === normalizedUrl);
};

// Perform redirect (increment counter and return target URL)
export const performRedirect = (shortUrl) => {
  const redirect = getRedirectByShortUrl(shortUrl);
  
  if (!redirect) {
    throw new Error('Redirect not found');
  }
  
  if (!redirect.active) {
    throw new Error('Redirect is disabled');
  }
  
  return redirect.targetUrl;
};

// Get Lisk info by ID (for API)
export const getLinkInfoById = (shortUrl) => {
  const redirect = getRedirectByShortUrl(shortUrl);
  if (!redirect) {
    throw new Error("Redirect not found");
  }
  return redirect;
};

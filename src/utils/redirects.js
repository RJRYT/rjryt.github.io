// Redirect management utilities

// In a real application, this would be stored in a database
// For now, we'll use a JSON file or local storage for demo purposes
export let redirectsData = [
  {
    id: "ncrp",
    shortUrl: "/r/ncrp",
    targetUrl: "https://newcityrp.co.in/",
    title: "NCRP Website",
    description: "National Cyber Resource Portal",
    clicks: 156,
    active: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "github",
    shortUrl: "/r/github",
    targetUrl: "https://github.com/RJRYT",
    title: "GitHub Profile",
    description: "My GitHub repositories and projects",
    clicks: 89,
    active: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "sponsor",
    shortUrl: "/r/sponsor",
    targetUrl: "https://github.com/sponsors/RJRYT?o=esb",
    title: "GitHub Sponsor Profile",
    description: "My GitHub sponsor page",
    clicks: 89,
    active: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "linkedin",
    shortUrl: "/r/linkedin",
    targetUrl: "https://www.linkedin.com/in/robin-jr",
    title: "LinkedIn Profile",
    description: "Professional network and connections",
    clicks: 45,
    active: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "youtube",
    shortUrl: "/r/youtube",
    targetUrl: "https://www.youtube.com/channel/UCHbfnbCUy3eKoIDmln6jnnw",
    title: "YouTube Channel",
    description: "Watch my videos and content",
    clicks: 0,
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-08-22",
  },
  {
    id: "replit",
    shortUrl: "/r/replit",
    targetUrl: "https://replit.com/@somaliyo",
    title: "Replit Workspace",
    description: "Check out my Replit projects",
    clicks: 0,
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-08-22",
  },
  {
    id: "discord",
    shortUrl: "/r/discord",
    targetUrl: "https://discord.com/channels/@me/770988400047947796",
    title: "Discord",
    description: "Connect with me on Discord",
    clicks: 0,
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-08-22",
  },
  {
    id: "instagram",
    shortUrl: "/r/instagram",
    targetUrl: "https://www.instagram.com/rjryt_/",
    title: "Instagram Profile",
    description: "Follow me on Instagram",
    clicks: 0,
    active: true,
    createdAt: "2025-08-22",
    updatedAt: "2025-08-22",
  },
];

// Load redirects from localStorage or use default data
const loadRedirects = () => {
  try {
    const stored = localStorage.getItem('portfolio_redirects');
    if (stored) {
      redirectsData = JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load redirects from localStorage:', error.message);
  }
  return redirectsData;
};

// Save redirects to localStorage
const saveRedirects = () => {
  try {
    localStorage.setItem('portfolio_redirects', JSON.stringify(redirectsData));
  } catch (error) {
    console.warn('Failed to save redirects to localStorage:', error);
  }
};

// Get all redirects
export const getAllRedirects = () => {
  return loadRedirects();
};

// Get redirect by ID
export const getRedirectById = (id) => {
  const redirects = loadRedirects();
  return redirects.find(redirect => redirect.id === id);
};

// Get redirect by short URL
export const getRedirectByShortUrl = (shortUrl) => {
  const redirects = loadRedirects();
  // Handle both /r/key and key formats
  const normalizedUrl = shortUrl.startsWith('/r/') ? shortUrl : `/r/${shortUrl}`;
  return redirects.find(redirect => redirect.shortUrl === normalizedUrl);
};

// Create new redirect
export const createRedirect = (redirectData) => {
  const redirects = loadRedirects();
  
  // Generate ID if not provided
  const id = redirectData.id || generateId();
  
  // Check if ID or shortUrl already exists
  const existingById = redirects.find(r => r.id === id);
  const existingByUrl = redirects.find(r => r.shortUrl === redirectData.shortUrl);
  
  if (existingById) {
    throw new Error('Redirect with this ID already exists');
  }
  
  if (existingByUrl) {
    throw new Error('Short URL already exists');
  }
  
  const newRedirect = {
    id,
    shortUrl: redirectData.shortUrl.startsWith('/r/') 
      ? redirectData.shortUrl 
      : `/r/${redirectData.shortUrl}`,
    targetUrl: redirectData.targetUrl,
    title: redirectData.title || '',
    description: redirectData.description || '',
    clicks: 0,
    active: redirectData.active !== undefined ? redirectData.active : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  redirectsData.push(newRedirect);
  saveRedirects();
  
  return newRedirect;
};

// Update existing redirect
export const updateRedirect = (id, updateData) => {
  const redirects = loadRedirects();
  const index = redirects.findIndex(redirect => redirect.id === id);
  
  if (index === -1) {
    throw new Error('Redirect not found');
  }
  
  // Check if shortUrl conflicts with other redirects
  if (updateData.shortUrl) {
    const normalizedUrl = updateData.shortUrl.startsWith('/r/') 
      ? updateData.shortUrl 
      : `/r/${updateData.shortUrl}`;
    
    const existingByUrl = redirects.find(r => 
      r.shortUrl === normalizedUrl && r.id !== id
    );
    
    if (existingByUrl) {
      throw new Error('Short URL already exists');
    }
  }
  
  // Update the redirect
  redirectsData[index] = {
    ...redirectsData[index],
    ...updateData,
    shortUrl: updateData.shortUrl 
      ? (updateData.shortUrl.startsWith('/r/') 
          ? updateData.shortUrl 
          : `/r/${updateData.shortUrl}`)
      : redirectsData[index].shortUrl,
    updatedAt: new Date().toISOString()
  };
  
  saveRedirects();
  return redirectsData[index];
};

// Delete redirect
export const deleteRedirect = (id) => {
  const redirects = loadRedirects();
  const index = redirects.findIndex(redirect => redirect.id === id);
  
  if (index === -1) {
    throw new Error('Redirect not found');
  }
  
  const deletedRedirect = redirectsData.splice(index, 1)[0];
  saveRedirects();
  
  return deletedRedirect;
};

// Increment click count
export const incrementClicks = (id) => {
  const redirects = loadRedirects();
  const redirect = redirects.find(r => r.id === id);
  
  if (redirect && redirect.active) {
    redirect.clicks = (redirect.clicks || 0) + 1;
    redirect.updatedAt = new Date().toISOString();
    saveRedirects();
    return redirect;
  }
  
  return null;
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
  
  // Increment click counter
  incrementClicks(redirect.id);
  
  return redirect.targetUrl;
};

// Get redirect statistics
export const getRedirectStats = () => {
  const redirects = loadRedirects();
  
  return {
    total: redirects.length,
    active: redirects.filter(r => r.active).length,
    inactive: redirects.filter(r => !r.active).length,
    totalClicks: redirects.reduce((sum, r) => sum + (r.clicks || 0), 0),
    topRedirects: redirects
      .filter(r => r.active)
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 5)
  };
};

// Search redirects
export const searchRedirects = (query) => {
  if (!query.trim()) {
    return getAllRedirects();
  }
  
  const redirects = loadRedirects();
  const searchTerm = query.toLowerCase();
  
  return redirects.filter(redirect => {
    const titleMatch = redirect.title?.toLowerCase().includes(searchTerm);
    const descriptionMatch = redirect.description?.toLowerCase().includes(searchTerm);
    const urlMatch = redirect.shortUrl?.toLowerCase().includes(searchTerm);
    const targetMatch = redirect.targetUrl?.toLowerCase().includes(searchTerm);
    
    return titleMatch || descriptionMatch || urlMatch || targetMatch;
  });
};

// Validate URL format
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate short URL format
export const validateShortUrl = (shortUrl) => {
  // Allow alphanumeric characters, hyphens, and underscores
  const pattern = /^[a-zA-Z0-9-_]+$/;
  return pattern.test(shortUrl);
};

// Generate unique ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Export/Import redirects (for backup/restore)
export const exportRedirects = () => {
  const redirects = loadRedirects();
  const dataStr = JSON.stringify(redirects, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `redirects-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

export const importRedirects = (jsonData) => {
  try {
    const importedRedirects = JSON.parse(jsonData);
    
    // Validate structure
    if (!Array.isArray(importedRedirects)) {
      throw new Error('Invalid format: expected array');
    }
    
    // Validate each redirect
    importedRedirects.forEach((redirect, index) => {
      if (!redirect.id || !redirect.shortUrl || !redirect.targetUrl) {
        throw new Error(`Invalid redirect at index ${index}: missing required fields`);
      }
    });
    
    redirectsData = importedRedirects;
    saveRedirects();
    
    return true;
  } catch (error) {
    throw new Error(`Import failed: ${error.message}`);
  }
};

// Initialize redirects data on first load
loadRedirects();
// Blog utilities for loading and processing markdown content

// Dynamically import all blog posts
const blogModules = import.meta.glob('/src/content/blog/*.md', { 
  eager: true,
  query: '?raw',
  import: 'default'
});

// Parse frontmatter from markdown content
export const parseFrontmatter = (content) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }
  
  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  // Parse YAML-like frontmatter
  const frontmatter = {};
  const lines = frontmatterStr.split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      // Parse booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: markdownContent };
};

// Get all blog posts with metadata
export const getAllPosts = () => {
  const posts = [];
  
  Object.entries(blogModules).forEach(([path, content]) => {
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);
    
    // Extract slug from file path
    const slug = path.split('/').pop().replace('.md', '');
    
    posts.push({
      slug,
      ...frontmatter,
      content: markdownContent,
      readTime: calculateReadTime(markdownContent)
    });
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get a single post by slug
export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
};

// Get featured posts
export const getFeaturedPosts = () => {
  const posts = getAllPosts();
  return posts.filter(post => post.featured);
};

// Get posts by tag
export const getPostsByTag = (tag) => {
  const posts = getAllPosts();
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
};

// Get all unique tags
export const getAllTags = () => {
  const posts = getAllPosts();
  const tags = new Set();
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
};

// Calculate reading time
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Search posts by title, content, or tags
export const searchPosts = (query) => {
  if (!query.trim()) {
    return getAllPosts();
  }
  
  const posts = getAllPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => {
    const titleMatch = post.title?.toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt?.toLowerCase().includes(searchTerm);
    const contentMatch = post.content?.toLowerCase().includes(searchTerm);
    const tagMatch = post.tags?.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || excerptMatch || contentMatch || tagMatch;
  });
};

// Paginate posts
export const paginatePosts = (posts, page = 1, postsPerPage = 6) => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1
  };
};

// Get related posts (same tags)
export const getRelatedPosts = (currentPost, limit = 3) => {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }
  
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.tags && 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
  
  return relatedPosts;
};
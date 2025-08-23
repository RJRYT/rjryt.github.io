// Project utilities for loading and processing markdown content

// Dynamically import all project files
const projectModules = import.meta.glob('/src/content/projects/*.md', { 
  eager: true,
  query: '?raw',
  import: 'default'
});

// Parse frontmatter from markdown content (same as blog utility)
const parseFrontmatter = (content) => {
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

// Get all projects with metadata
export const getAllProjects = () => {
  const projects = [];
  
  Object.entries(projectModules).forEach(([path, content]) => {
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);
    
    // Extract slug from file path
    const slug = path.split('/').pop().replace('.md', '');
    
    projects.push({
      slug,
      ...frontmatter,
      content: markdownContent
    });
  });
  
  // Sort by date (newest first)
  return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get a single project by slug
export const getProjectBySlug = (slug) => {
  const projects = getAllProjects();
  return projects.find(project => project.slug === slug);
};

// Get featured projects
export const getFeaturedProjects = () => {
  const projects = getAllProjects();
  return projects.filter(project => project.featured);
};

// Get projects by category
export const getProjectsByCategory = (category) => {
  const projects = getAllProjects();
  return projects.filter(project => 
    project.category && project.category.toLowerCase() === category.toLowerCase()
  );
};

// Get projects by status
export const getProjectsByStatus = (status) => {
  const projects = getAllProjects();
  return projects.filter(project => 
    project.status && project.status.toLowerCase() === status.toLowerCase()
  );
};

// Get projects by technology
export const getProjectsByTechnology = (tech) => {
  const projects = getAllProjects();
  return projects.filter(project => 
    project.technologies && 
    project.technologies.some(technology => 
      technology.toLowerCase() === tech.toLowerCase()
    )
  );
};

// Get all unique categories
export const getAllCategories = () => {
  const projects = getAllProjects();
  const categories = new Set();
  
  projects.forEach(project => {
    if (project.category) {
      categories.add(project.category);
    }
  });
  
  return Array.from(categories).sort();
};

// Get all unique technologies
export const getAllTechnologies = () => {
  const projects = getAllProjects();
  const technologies = new Set();
  
  projects.forEach(project => {
    if (project.technologies) {
      project.technologies.forEach(tech => technologies.add(tech));
    }
  });
  
  return Array.from(technologies).sort();
};

// Get all unique statuses
export const getAllStatuses = () => {
  const projects = getAllProjects();
  const statuses = new Set();
  
  projects.forEach(project => {
    if (project.status) {
      statuses.add(project.status);
    }
  });
  
  return Array.from(statuses).sort();
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

// Search projects by title, description, or technologies
export const searchProjects = (query) => {
  if (!query.trim()) {
    return getAllProjects();
  }
  
  const projects = getAllProjects();
  const searchTerm = query.toLowerCase();
  
  return projects.filter(project => {
    const titleMatch = project.title?.toLowerCase().includes(searchTerm);
    const descriptionMatch = project.description?.toLowerCase().includes(searchTerm);
    const categoryMatch = project.category?.toLowerCase().includes(searchTerm);
    const techMatch = project.technologies?.some(tech => 
      tech.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || descriptionMatch || categoryMatch || techMatch;
  });
};

// Filter projects by multiple criteria
export const filterProjects = (filters = {}) => {
  let projects = getAllProjects();
  
  if (filters.category) {
    projects = projects.filter(project => 
      project.category && project.category.toLowerCase() === filters.category.toLowerCase()
    );
  }
  
  if (filters.status) {
    projects = projects.filter(project => 
      project.status && project.status.toLowerCase() === filters.status.toLowerCase()
    );
  }
  
  if (filters.technology) {
    projects = projects.filter(project => 
      project.technologies && 
      project.technologies.some(tech => 
        tech.toLowerCase() === filters.technology.toLowerCase()
      )
    );
  }
  
  if (filters.featured !== undefined) {
    projects = projects.filter(project => 
      Boolean(project.featured) === Boolean(filters.featured)
    );
  }
  
  return projects;
};

// Sort projects by different criteria
export const sortProjects = (projects, sortBy = 'date') => {
  const sortedProjects = [...projects];
  
  switch (sortBy) {
    case 'date':
      return sortedProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'title':
      return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    case 'category':
      return sortedProjects.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    case 'status':
      return sortedProjects.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
    default:
      return sortedProjects;
  }
};

// Paginate projects
export const paginateProjects = (projects, page = 1, projectsPerPage = 9) => {
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  
  return {
    projects: projects.slice(startIndex, endIndex),
    totalProjects: projects.length,
    totalPages: Math.ceil(projects.length / projectsPerPage),
    currentPage: page,
    hasNextPage: endIndex < projects.length,
    hasPrevPage: page > 1
  };
};

// Get related projects (same category or technologies)
export const getRelatedProjects = (currentProject, limit = 3) => {
  const allProjects = getAllProjects();
  
  const relatedProjects = allProjects
    .filter(project => {
      if (project.slug === currentProject.slug) return false;
      
      // Check for same category
      if (project.category && currentProject.category && 
          project.category === currentProject.category) {
        return true;
      }
      
      // Check for shared technologies
      if (project.technologies && currentProject.technologies) {
        return project.technologies.some(tech => 
          currentProject.technologies.includes(tech)
        );
      }
      
      return false;
    })
    .slice(0, limit);
  
  return relatedProjects;
};

// Get project statistics
export const getProjectStats = () => {
  const projects = getAllProjects();
  
  return {
    total: projects.length,
    completed: projects.filter(p => p.status === 'Completed').length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    featured: projects.filter(p => p.featured).length,
    categories: getAllCategories().length,
    technologies: getAllTechnologies().length
  };
};
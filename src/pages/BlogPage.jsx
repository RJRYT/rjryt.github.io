import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Search, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllPosts } from "@/utils/blog";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    setPosts(getAllPosts());
    setFilteredPosts(getAllPosts());
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, posts]);

  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog by RJRYT | Web Development Insights</title>
        <meta name="description" content="Read blogs by RJRYT on web development, MERN stack tutorials, coding tips, and industry insights." />
        <meta name="keywords" content="web dev blog, MERN stack blog, coding tutorials, RJRYT blog" />
        <link rel="canonical" href="https://rjryt.github.io/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog by RJRYT | Web Development Insights" />
        <meta property="og:description" content="Read blogs by RJRYT on web development, MERN stack tutorials, coding tips, and industry insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rjryt.github.io/blog" />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog by RJRYT | Web Development Insights" />
        <meta name="twitter:description" content="Read blogs by RJRYT on web development, MERN stack tutorials, coding tips, and industry insights." />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <main className="pt-20">
          {/* Header */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/70 hover:text-accent-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                  Blog
                </h1>
                <div className="w-24 h-1 bg-primary-gradient mx-auto rounded-full mb-6"></div>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Insights, tutorials, and thoughts on development, bots, and
                  technology
                </p>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-6 rounded-2xl mb-12"
              >
                <div className="flex flex-col gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-accent/30 focus-visible:border-none focus-visible:ring-accent"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTag === "" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag("")}
                      className={
                        selectedTag === ""
                          ? "bg-primary-gradient"
                          : "glass border-accent/30"
                      }
                    >
                      All
                    </Button>
                    {allTags.map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                        className={
                          selectedTag === tag
                            ? "bg-primary-gradient"
                            : "glass border-accent/30"
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="pb-20">
            <div className="container mx-auto px-4">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-foreground/70">
                    No articles found.
                  </p>
                </motion.div>
              ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`glass-card rounded-2xl overflow-hidden group ${
                        post.featured ? "ring-2 ring-accent/50" : ""
                      }`}
                    >
                      {/* Featured Badge */}
                      {post.featured && (
                        <div className="absolute top-4 left-4 z-10 bg-primary-gradient text-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}

                      {/* Post Image */}
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 text-foreground/80 rounded text-xs font-medium"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Button */}
                        <Link to={`/blog/${post.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full glass border-accent/50 hover:bg-background text-foreground hover:text-foreground group-hover:border-accent transition-all"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
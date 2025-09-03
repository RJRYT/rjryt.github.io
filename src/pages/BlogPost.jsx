import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getPostBySlug } from "@/utils/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost || null);
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Article URL copied to clipboard!",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - RJRYT Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta
          name="keywords"
          content={`RJRYT, Blog, ${post.tags.join(", ")}, Web Development`}
        />
        <link rel="canonical" href={`https://rjryt.github.io/blog/${slug}`} />
        <meta name="author" content="RJRYT" />

        {/* Open Graph */}
        <meta property="og:title" content={`${post.title} - RJRYT Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://rjryt.github.io/blog/${slug}`}
        />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="article:author" content="RJRYT" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={post.tags.join(", ")} />
        {post.image && <meta property="og:image" content={post.image} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - RJRYT Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.image && <meta name="twitter:image" content={post.image} />}
        <meta
          name="twitter:url"
          content={`https://rjryt.github.io/blog/${slug}`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <main className="pt-20">
          {/* Header */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/blog">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/70 hover:text-accent-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Featured Image */}
                <div className="relative overflow-hidden rounded-2xl mb-8 aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                {/* Article Header */}
                <div className="glass-card p-8 rounded-2xl mb-8">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                      className="ml-auto text-foreground/70 hover:text-accent-foreground"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>

                  <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-muted/50 text-foreground/80 rounded-lg text-sm font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Article Content */}
                <div className="glass-card p-8 rounded-2xl">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold text-foreground mb-6 gradient-text">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold text-foreground mb-4 mt-8">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-foreground mb-3 mt-6">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-foreground/80 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        code: ({ inline, children }) =>
                          inline ? (
                            <code className="bg-muted/50 text-accent px-2 py-1 rounded text-sm">
                              {children}
                            </code>
                          ) : (
                            <code className="block bg-muted/30 text-foreground p-4 rounded-lg text-sm overflow-x-auto">
                              {children}
                            </code>
                          ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-foreground/80">{children}</li>
                        ),
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass-card p-8 rounded-2xl mt-8 text-center"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Found this helpful?
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Follow me for more development insights and tutorials
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="bg-primary-gradient hover:shadow-primary text-foreground"
                    >
                      <a
                        href="/r/github"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Follow on GitHub
                      </a>
                    </Button>
                    <Button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      variant="outline"
                      className="glass border-accent/50 hover:text-foreground/90 hover:bg-accent/50"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Get in Touch
                    </Button>
                  </div>
                </motion.div>
              </motion.article>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
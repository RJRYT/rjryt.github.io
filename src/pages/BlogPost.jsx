import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Github,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getPostBySlug } from "@/utils/blog";
import { SITE_URL, SITE_NAME, PERSON_ID } from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  // Must be synchronous so the post and Helmet metadata
  // are available during build-time SSR/prerendering.
  const post = getPostBySlug(slug);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);

      toast({
        title: "Link Copied",
        description: "Article URL copied to clipboard!",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

        <link rel="canonical" href={`${SITE_URL}/blog/${slug}`} />

        <meta name="author" content="RJRYT" />

        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`${post.title} - RJRYT Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/blog/${slug}`} />

        <meta property="article:author" content="RJRYT" />

        <meta property="article:published_time" content={post.date} />

        <meta property="article:tag" content={post.tags.join(", ")} />

        {post.image && (
          <>
            <meta
              property="og:image"
              content={`${SITE_URL}${
                post.image.startsWith("/") ? post.image : `/${post.image}`
              }`}
            />

            <meta
              property="og:image:alt"
              content={`${post.title} — RJRYT Blog`}
            />
          </>
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={`${post.title} - RJRYT Blog`} />

        <meta name="twitter:description" content={post.excerpt} />

        {post.image && (
          <>
            <meta
              name="twitter:image"
              content={`${SITE_URL}${
                post.image.startsWith("/") ? post.image : `/${post.image}`
              }`}
            />

            <meta
              name="twitter:image:alt"
              content={`${post.title} — RJRYT Blog`}
            />
          </>
        )}

        <meta name="twitter:url" content={`${SITE_URL}/blog/${slug}`} />

        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${SITE_URL}/blog/${slug}#blogpost`,

              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/blog/${slug}#webpage`,
              },

              headline: post.title,
              description: post.excerpt,

              image: post.image
                ? [
                    `${SITE_URL}${
                      post.image.startsWith("/") ? post.image : `/${post.image}`
                    }`,
                  ]
                : undefined,

              author: {
                "@id": PERSON_ID,
              },

              publisher: {
                "@id": PERSON_ID,
              },

              datePublished: post.date,
              dateModified: post.updatedAt || post.date,
              keywords: post.tags,
              url: `${SITE_URL}/blog/${slug}`,
              articleSection: "Web Development",
              inLanguage: "en",
            },

            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",

              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${SITE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blogs",
                  item: `${SITE_URL}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${SITE_URL}/blog/${slug}`,
                },
              ],
            },
          ])}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <main className="pt-20">
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/blog">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/70 hover:text-accent-foreground"
                    aria-label="Back to Blog"
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
                      aria-label="Share"
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
                      remarkPlugins={[remarkGfm]}
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

                        h4: ({ children }) => (
                          <h4 className="text-lg font-bold text-foreground mb-3 mt-5">
                            {children}
                          </h4>
                        ),

                        h5: ({ children }) => (
                          <h5 className="text-base font-bold text-foreground mb-2 mt-4">
                            {children}
                          </h5>
                        ),

                        h6: ({ children }) => (
                          <h6 className="text-sm font-bold text-foreground mb-2 mt-4">
                            {children}
                          </h6>
                        ),
                        p: ({ children }) => (
                          <p className="text-foreground/80 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-primary hover:underline underline-offset-4 transition-colors"
                            target={
                              href?.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              href?.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {children}
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="bg-muted/50 text-accent px-1.5 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),

                        pre: ({ children }) => (
                          <pre className="bg-muted/30 text-foreground p-4 rounded-lg overflow-x-auto mb-6 border border-border/50">
                            {children}
                          </pre>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside text-foreground/80 mb-4 space-y-2">
                            {children}
                          </ol>
                        ),

                        li: ({ children, className, ...props }) => (
                          <li
                            className={`text-foreground/80 ${className || ""}`}
                            {...props}
                          >
                            {children}
                          </li>
                        ),
                        input: ({ type, checked, disabled, ...props }) => {
                          if (type !== "checkbox") {
                            return <input type={type} {...props} />;
                          }

                          return (
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={disabled}
                              readOnly
                              className="mr-2 h-4 w-4 accent-primary align-middle"
                              {...props}
                            />
                          );
                        },
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/70">
                            {children}
                          </blockquote>
                        ),
                        hr: () => <hr className="my-8 border-border" />,
                        del: ({ children }) => (
                          <del className="text-foreground/50 line-through">
                            {children}
                          </del>
                        ),
                        table: ({ children }) => (
                          <div className="w-full overflow-x-auto mb-6 rounded-lg border border-border">
                            <table className="w-full min-w-[600px] border-collapse text-sm">
                              {children}
                            </table>
                          </div>
                        ),

                        thead: ({ children }) => (
                          <thead className="bg-muted/50">{children}</thead>
                        ),

                        tbody: ({ children }) => (
                          <tbody className="divide-y divide-border">
                            {children}
                          </tbody>
                        ),

                        tr: ({ children }) => (
                          <tr className="border-b border-border last:border-b-0">
                            {children}
                          </tr>
                        ),

                        th: ({ children }) => (
                          <th className="border-r border-border px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap last:border-r-0">
                            {children}
                          </th>
                        ),

                        td: ({ children }) => (
                          <td className="border-r border-border px-4 py-3 text-foreground/80 align-top last:border-r-0">
                            {children}
                          </td>
                        ),
                        img: ({ src, alt, title }) => (
                          <img
                            src={src}
                            alt={alt || ""}
                            title={title}
                            loading="lazy"
                            className="max-w-full h-auto rounded-lg my-6"
                          />
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-foreground">
                            {children}
                          </strong>
                        ),

                        em: ({ children }) => (
                          <em className="italic text-foreground/90">
                            {children}
                          </em>
                        ),
                        br: () => <br />,
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
                      asChild
                      variant="outline"
                      className="glass border-accent/50 hover:text-foreground/90 hover:bg-accent/50"
                      aria-label="Get in Touch"
                    >
                      <a href="/contact">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Get in Touch
                      </a>
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

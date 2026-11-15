import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Github,
  Share2,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/utils/blog";
import { SITE_URL, SITE_NAME, PERSON_ID, DEFAULT_IMAGE } from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const progressRef = useRef(null);
  const articleRef = useRef(null);
  const desktopTocRef = useRef(null);
  const mobileTocRef = useRef(null);
  const [activeHeading, setActiveHeading] = useState("");
  const [shareState, setShareState] = useState("idle");

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const relatedPosts = post ? getRelatedPosts(post) : [];
  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);

  useEffect(() => {
    if (!post) return undefined;

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const article = articleRef.current;
        if (!article) return;

        const articleTop = window.scrollY + article.getBoundingClientRect().top;
        const scrollableHeight = article.offsetHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0
            ? Math.min(1, Math.max(0, (window.scrollY - articleTop) / scrollableHeight))
            : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
          progressRef.current.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
        }

        const activationLine = window.innerHeight * 0.25;
        const headingElements = article.querySelectorAll(
          ".blog-article-content h2, .blog-article-content h3, .blog-article-content h4, .blog-article-content h5, .blog-article-content h6",
        );
        const activeHeadingElement = [...headingElements]
          .filter((heading) => heading.getBoundingClientRect().top <= activationLine)
          .at(-1);
        const nextActiveHeading = activeHeadingElement?.id || "";
        setActiveHeading((currentHeading) =>
          currentHeading === nextActiveHeading ? currentHeading : nextActiveHeading,
        );
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("load", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("load", updateProgress);
    };
  }, [post, headings]);

  useEffect(() => {
    if (!activeHeading) return;

    const scrollActiveLinkIntoView = (container) => {
      if (!container) return;

      const activeLink = container.querySelector('[aria-current="location"]');
      if (!activeLink) return;

      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      let nextScrollTop = container.scrollTop;

      if (linkRect.top < containerRect.top) {
        nextScrollTop += linkRect.top - containerRect.top;
      } else if (linkRect.bottom > containerRect.bottom) {
        nextScrollTop += linkRect.bottom - containerRect.bottom;
      } else {
        return;
      }

      container.scrollTo({
        top: nextScrollTop,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };

    scrollActiveLinkIntoView(desktopTocRef.current);
    if (mobileTocRef.current?.closest("details")?.open) {
      scrollActiveLinkIntoView(mobileTocRef.current);
    }
  }, [activeHeading]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareState("shared");
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareState("copied");
      toast({
        title: "Link copied",
        description: "The article URL is ready to share.",
      });
      window.setTimeout(() => setShareState("idle"), 2500);
    } catch {
      setShareState("error");
      toast({
        title: "Unable to share",
        description: "Your browser could not copy the article link.",
        variant: "destructive",
      });
    }
  };

  const articleImage = post.image ? absoluteImageUrl(post.image) : DEFAULT_IMAGE;
  const wordCount = post.content.trim().split(/\s+/).length;
  const currentHeading = headings.find((heading) => heading.id === activeHeading);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${slug}/#blogpost`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/blog/${slug}/#webpage`,
      },
      headline: post.title,
      description: post.excerpt,
      image: [articleImage],
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      keywords: post.tags || [],
      wordCount,
      timeRequired: `PT${Math.max(1, parseInt(post.readTime, 10) || 1)}M`,
      url: `${SITE_URL}/blog/${slug}/`,
      articleSection: "Web Development",
      inLanguage: "en",
      author: { "@type": "Person", "@id": PERSON_ID, name: "Robin Jr" },
      publisher: { "@type": "Person", "@id": PERSON_ID, name: "RJRYT" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${SITE_URL}/blog/${slug}/`,
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{post.title} - RJRYT Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta
          name="keywords"
          content={`RJRYT, Blog, ${(post.tags || []).join(", ")}, Web Development`}
        />
        <link rel="canonical" href={`${SITE_URL}/blog/${slug}/`} />
        <meta name="author" content="RJRYT" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`${post.title} - RJRYT Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${SITE_URL}/blog/${slug}/`} />
        <meta property="article:author" content="RJRYT" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={(post.tags || []).join(", ")} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:alt" content={`${post.title} — RJRYT Blog`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - RJRYT Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={articleImage} />
        <meta name="twitter:image:alt" content={`${post.title} — RJRYT Blog`} />
        <meta name="twitter:url" content={`${SITE_URL}/blog/${slug}/`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <div
          ref={progressRef}
          className="blog-reading-progress"
          role="progressbar"
          aria-label="Article reading progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
        />
        <Navigation />

        <main className="pt-20">
          <section className="relative overflow-hidden border-b border-border/70">
            <div className="portfolio-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="ambient-orb -left-40 top-0 h-96 w-96" aria-hidden="true" />
            <div className="ambient-orb -right-36 bottom-0 h-80 w-80" aria-hidden="true" />

            <div className="container relative mx-auto px-4 pb-10 pt-9 sm:pb-14 sm:pt-12">
              <div className="mx-auto max-w-6xl">
                <Link
                  to="/blog/"
                  className="mb-9 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  Back to journal
                </Link>

                <motion.article
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid items-center gap-9 lg:grid-cols-[1fr_0.95fr] lg:gap-14"
                >
                  <div>
                    <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      <BookOpen size={14} />
                      Developer journal
                    </p>
                    <h1 className="text-4xl font-bold leading-[1.07] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                      {post.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      {post.excerpt}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-primary" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 size={16} className="text-primary" />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <BookOpen size={16} className="text-primary" />
                        {headings.length} sections
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(post.tags || []).map((tag) => (
                        <Link
                          key={tag}
                          to={`/blog?search=${encodeURIComponent(tag)}`}
                          className="rounded-full border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-xl" />
                    <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-2 shadow-2xl shadow-foreground/10 sm:rounded-3xl sm:p-3">
                      <img
                        src={post.image || DEFAULT_IMAGE}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = DEFAULT_IMAGE;
                        }}
                        alt={`${post.title} article cover`}
                        className="aspect-[16/10] w-full rounded-xl object-cover sm:rounded-2xl"
                      />
                    </div>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
              <motion.article
                ref={articleRef}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="min-w-0"
              >
                {headings.length > 0 && (
                  <details className="blog-mobile-toc mb-5 lg:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 px-4 py-3 [&::-webkit-details-marker]:hidden">
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          In this article
                        </span>
                        <span className="mt-1 block truncate text-sm font-semibold text-foreground">
                          {currentHeading?.text || `${headings.length} sections`}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-primary">
                        Browse sections
                      </span>
                    </summary>
                    <nav aria-label="Article sections" className="mt-2">
                      <ol
                        ref={mobileTocRef}
                        className="max-h-64 space-y-1 overflow-y-auto rounded-xl border border-border/80 bg-card/80 p-2"
                      >
                        {headings.map((heading) => (
                          <li key={heading.id}>
                            <a
                              href={`#${heading.id}`}
                              aria-current={activeHeading === heading.id ? "location" : undefined}
                              onClick={(event) => {
                                event.currentTarget.closest("details").open = false;
                              }}
                              className={`block rounded-lg px-3 py-2 text-sm leading-5 transition ${
                                activeHeading === heading.id
                                  ? "bg-primary/10 font-semibold text-primary"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </details>
                )}

                <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/60 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {post.readTime} · {wordCount.toLocaleString()} words
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    aria-live="polite"
                  >
                    {shareState === "copied" || shareState === "shared" ? (
                      <Check size={16} />
                    ) : (
                      <Share2 size={16} />
                    )}
                    {shareState === "copied"
                      ? "Copied"
                      : shareState === "shared"
                        ? "Shared"
                        : shareState === "error"
                          ? "Share unavailable"
                          : "Share"}
                  </Button>
                </div>

                <div className="blog-article-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={createMarkdownComponents(headings)}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-10 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary">
                    Enjoyed this read?
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    Keep the conversation going.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Follow along for more practical development notes, or reach out to talk about a
                    project.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button asChild>
                      <a href="/r/github" target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Follow on GitHub
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/contact">Get in touch</Link>
                    </Button>
                  </div>
                </div>
              </motion.article>

              {headings.length > 0 && (
                <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
                  <nav
                    ref={desktopTocRef}
                    aria-label="On this page"
                    className="max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl border border-border/80 bg-card/55 p-5 backdrop-blur"
                  >
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      On this page
                    </p>
                    <ol className="space-y-1.5">
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            aria-current={activeHeading === heading.id ? "location" : undefined}
                            className={`block border-l-2 py-1 pl-3 text-xs leading-5 transition ${
                              activeHeading === heading.id
                                ? "border-primary font-semibold text-primary"
                                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-5 border-t border-border/70 pt-4">
                      <Button type="button" variant="outline" size="sm" onClick={handleShare}>
                        <Share2 size={14} />
                        Share article
                      </Button>
                    </div>
                  </nav>
                </aside>
              )}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="border-t border-border/70 bg-card/25">
              <div className="container mx-auto px-4 py-14 sm:py-20">
                <div className="mx-auto max-w-6xl">
                  <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        <Sparkles size={14} />
                        Keep exploring
                      </p>
                      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Related articles
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        More guides connected by the topics in this article.
                      </p>
                    </div>
                    <Link
                      to="/blog/"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Browse the journal <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost, index) => (
                      <RelatedArticle key={relatedPost.slug} post={relatedPost} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

const extractHeadings = (markdown) => {
  const slugCounts = new Map();
  const headings = [];
  const headingPattern = /^#{1,6}\s+(.+?)\s*#*\s*$/gm;
  let match;
  const contentWithoutCodeBlocks = markdown.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, "");

  while ((match = headingPattern.exec(contentWithoutCodeBlocks))) {
    const text = match[1].replace(/[`*_~[\]]/g, "").trim();
    const baseId =
      text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/\s+/g, "-") || "section";
    const count = slugCounts.get(baseId) || 0;
    slugCounts.set(baseId, count + 1);
    headings.push({
      text,
      id: count ? `${baseId}-${count}` : baseId,
    });
  }

  return headings;
};

const createMarkdownComponents = (headings) => {
  let headingIndex = 0;
  const renderHeading =
    (TagName) =>
    ({ children }) => {
      const heading = headings[headingIndex];
      headingIndex += 1;
      const id = heading?.id;

      return (
        <TagName id={id} className="scroll-mt-28">
          {children}
        </TagName>
      );
    };

  return {
    h1: renderHeading("h2"),
    h2: renderHeading("h2"),
    h3: renderHeading("h3"),
    h4: renderHeading("h4"),
    h5: renderHeading("h5"),
    h6: renderHeading("h6"),
    p: ({ children }) => <p>{children}</p>,
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    code: ({ className, children, ...props }) => (
      <code className={className} {...props}>
        {children}
      </code>
    ),
    pre: ({ children }) => <pre>{children}</pre>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children, className, ...props }) => (
      <li className={className} {...props}>
        {children}
      </li>
    ),
    input: ({ type, checked, disabled, ...props }) =>
      type === "checkbox" ? (
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          readOnly
          className="mr-2 h-4 w-4 align-middle accent-primary"
          {...props}
        />
      ) : (
        <input type={type} {...props} />
      ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    hr: () => <hr />,
    del: ({ children }) => <del>{children}</del>,
    table: ({ children }) => (
      <div className="blog-table-wrap">
        <table>{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => <th>{children}</th>,
    td: ({ children }) => <td>{children}</td>,
    img: ({ src, alt, title }) => <img src={src} alt={alt || ""} title={title} loading="lazy" />,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  };
};

const absoluteImageUrl = (image) =>
  image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

const RelatedArticle = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    whileHover={{ y: -5 }}
    className="group overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
  >
    <Link
      to={`/blog/${post.slug}/`}
      className="relative block aspect-[16/9] overflow-hidden bg-secondary/60"
      aria-label={`Read ${post.title}`}
    >
      {post.image ? (
        <img
          src={post.image}
          alt={`${post.title} article cover`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-secondary to-accent/15" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {post.tags?.[0] || "Article"}
      </span>
    </Link>

    <div className="p-5">
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 size={13} />
          {post.readTime}
        </span>
      </div>
      <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
        <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}/`}
        className="mt-5 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        Read article <ArrowRight size={15} />
      </Link>
    </div>
  </motion.article>
);

export default BlogPost;

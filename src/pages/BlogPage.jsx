import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Code2,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllPosts, getAllTags, formatDate } from "@/utils/blog";

const BLOG_TITLE = "Blog by RJRYT | Web Development Insights";
const BLOG_DESCRIPTION =
  "Read blogs by RJRYT on web development, MERN stack tutorials, coding tips, and industry insights.";
const BLOG_URL = "https://rjryt.com/blog/";
const BLOG_IMAGE = "https://rjryt.com/images/seo/rjryt-social-card.png";

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedTag, setSelectedTag] = useState("");

  const posts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const hasFilters = Boolean(searchTerm.trim() || selectedTag);
  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        [post.title, post.excerpt, post.content, ...(post.tags || [])].some((value) =>
          value?.toLowerCase().includes(query),
        );
      const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  const leadPost = hasFilters
    ? null
    : filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const archivePosts = leadPost
    ? filteredPosts.filter((post) => post.slug !== leadPost.slug)
    : filteredPosts;
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BLOG_URL}#articles`,
    name: "Articles by RJRYT",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `${BLOG_URL}${post.slug}/`,
        datePublished: post.date,
        image: post.image ? `https://rjryt.com${post.image}` : BLOG_IMAGE,
        author: { "@type": "Person", "@id": "https://rjryt.com/#person", name: "RJRYT" },
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        <meta
          name="keywords"
          content="web dev blog, MERN stack blog, coding tutorials, RJRYT blog"
        />
        <link rel="canonical" href={BLOG_URL} />
        <meta name="author" content="RJRYT" />
        <meta property="og:title" content={BLOG_TITLE} />
        <meta property="og:description" content={BLOG_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BLOG_URL} />
        <meta property="og:site_name" content="RJRYT Portfolio" />
        <meta property="og:image" content={BLOG_IMAGE} />
        <meta property="og:image:alt" content="RJRYT web development journal" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={BLOG_TITLE} />
        <meta name="twitter:description" content={BLOG_DESCRIPTION} />
        <meta name="twitter:url" content={BLOG_URL} />
        <meta name="twitter:image" content={BLOG_IMAGE} />
        <meta name="twitter:image:alt" content="RJRYT web development journal" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": `${BLOG_URL}#blog`,
              url: BLOG_URL,
              name: BLOG_TITLE,
              description: BLOG_DESCRIPTION,
              publisher: {
                "@type": "Person",
                "@id": "https://rjryt.com/#person",
              },
              author: {
                "@type": "Person",
                "@id": "https://rjryt.com/#person",
              },
              image: BLOG_IMAGE,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${BLOG_URL}#webpage`,
              },
            },
            itemList,
          ])}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-20">
          <section className="relative overflow-hidden border-b border-border/70">
            <div className="portfolio-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="ambient-orb -left-40 -top-20 h-96 w-96" aria-hidden="true" />
            <div className="ambient-orb -right-36 bottom-0 h-80 w-80" aria-hidden="true" />

            <div className="container relative mx-auto px-4 pb-14 pt-16 sm:pb-20 sm:pt-24 lg:pb-24">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="mx-auto max-w-6xl"
              >
                <p className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-8 bg-primary" />
                  Notes from the build
                </p>

                <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                      The developer
                      <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        field journal.
                      </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                      Practical guides, lessons learned, and ideas from building with modern web
                      technologies.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 lg:pb-2">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <BookOpen size={21} />
                    </span>
                    <div>
                      <p className="text-2xl font-bold">{posts.length}</p>
                      <p className="text-xs text-muted-foreground">articles to explore</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-5 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Code2 size={14} className="text-primary" />
                    Development notes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Tag size={14} className="text-primary" />
                    {allTags.length} topics
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={14} className="text-accent" />
                    Written from experience
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              {leadPost && <LeadArticle post={leadPost} />}

              <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {hasFilters ? "Search results" : "The archive"}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {hasFilters ? "Articles for you" : "Explore all articles"}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  <span className="font-semibold text-foreground">{filteredPosts.length}</span>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                  {hasFilters && " found"}
                </p>
              </div>

              <div className="mb-8 rounded-2xl border border-border/80 bg-card/60 p-3 shadow-sm backdrop-blur-xl sm:p-4">
                <label className="relative block">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    placeholder="Search articles, topics, or ideas…"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    aria-label="Search articles"
                    className="h-12 border-border/70 bg-background/70 pl-11 pr-4 focus-visible:ring-primary/40"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                  <span className="mr-1 text-xs font-semibold text-muted-foreground">Topics</span>
                  <TopicChip active={!selectedTag} onClick={() => setSelectedTag("")}>
                    All topics
                  </TopicChip>
                  {allTags.map((tag) => (
                    <TopicChip
                      key={tag}
                      active={selectedTag === tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    >
                      {tag}
                    </TopicChip>
                  ))}
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X size={13} />
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {archivePosts.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {archivePosts.map((post, index) => (
                    <ArticleCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
                  <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <Search size={20} />
                  </span>
                  <h3 className="text-lg font-bold">No articles found</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    Try another search or clear the topic filter to browse the full journal.
                  </p>
                  <Button type="button" variant="outline" onClick={clearFilters} className="mt-5">
                    Clear filters
                  </Button>
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

const TopicChip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
      active
        ? "border-primary/30 bg-primary text-primary-foreground shadow-sm shadow-primary/20"
        : "border-border/70 bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const LeadArticle = ({ post }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55 }}
    className="group relative mb-16 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm"
  >
    <Link
      to={`/blog/${post.slug}/`}
      className="grid lg:min-h-[390px] lg:grid-cols-[1.05fr_0.95fr]"
      aria-label={`Read ${post.title}`}
    >
      <div className="relative min-h-[230px] overflow-hidden bg-secondary/60 lg:order-2 lg:min-h-full">
        {post.image ? (
          <img
            src={post.image}
            alt={`${post.title} article cover`}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/seo/rjryt-social-card.png";
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-card to-accent/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
        <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
          <Sparkles size={12} className="text-amber-300" />
          {post.featured ? "Featured article" : "Latest article"}
        </span>
        <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 shadow-lg transition-transform group-hover:rotate-45">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-primary" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} className="text-primary" />
            {post.readTime}
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(post.tags || []).slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/70 bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read the article
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  </motion.article>
);

const ArticleCard = ({ post, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.45, delay: Math.min(index % 3, 2) * 0.07 }}
    whileHover={{ y: -5 }}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
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
            event.currentTarget.src = "/images/seo/rjryt-social-card.png";
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-secondary to-accent/15" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
      <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {post.tags?.[0] || "Article"}
      </span>
      <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white text-slate-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight size={16} />
      </span>
    </Link>

    <div className="flex flex-1 flex-col p-5 sm:p-6">
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
      <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
        <Link to={`/blog/${post.slug}/`}>{post.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(post.tags || []).slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary/80 px-2 py-1 text-[11px] font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
        {(post.tags || []).length > 3 && (
          <span className="rounded-md bg-secondary/80 px-2 py-1 text-[11px] text-muted-foreground">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      <Link
        to={`/blog/${post.slug}/`}
        className="mt-auto inline-flex items-center gap-2 border-t border-border/70 pt-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        Read article <ArrowRight size={15} />
      </Link>
    </div>
  </motion.article>
);

export default BlogPage;

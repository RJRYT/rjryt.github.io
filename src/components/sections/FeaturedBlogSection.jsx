import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, getAllPosts } from "@/utils/blog";

const FeaturedBlogSection = () => {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  const selectedPosts = (featuredPosts.length ? featuredPosts : posts).slice(0, 3);

  if (!selectedPosts.length) return null;

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="featured-writing-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,_hsl(var(--accent)/.10),_transparent_35%)]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.25em] text-accent">Field notes</p>
            <h2 id="featured-writing-title" className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Ideas worth sharing
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Practical guides and notes from building for the modern web.
            </p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent">
            Browse the journal <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          {selectedPosts.slice(0, 1).map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              className="group relative min-h-[25rem] overflow-hidden rounded-[1.75rem] border border-border bg-card/60"
            >
              <Link to={`/blog/${post.slug}/`} className="absolute inset-0">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-card to-accent/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/5" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-foreground/70">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{post.readTime}</span>
                  </div>
                  <h3 className="max-w-3xl text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{post.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <BookOpen size={16} /> Read the article <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[.16em] text-foreground backdrop-blur-md">
                  <Sparkles size={12} className="text-accent" /> Featured writing
                </span>
              </Link>
            </motion.article>
          ))}

          <div className="grid gap-5">
            {selectedPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-border bg-card/55 transition-colors hover:border-primary/40 hover:bg-card/80"
              >
                <Link to={`/blog/${post.slug}/`} className="flex h-full min-h-44 gap-4 p-5">
                  {post.image && (
                    <div className="hidden w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:block">
                      <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-col justify-center">
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{formatDate(post.date)}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readTime}</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogSection;

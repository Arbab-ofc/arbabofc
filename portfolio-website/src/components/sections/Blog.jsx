import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { useData } from "../../contexts/DataContext";
import { truncate } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Blog = () => {
  const { blogList } = useData();
  const posts = blogList.length ? blogList.slice(0, 6) : [];
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0d1224] dark:via-[#0a101f] dark:to-[#060a16] px-6 py-10 md:px-10 md:py-12">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_12%_20%,rgba(99,102,241,0.14),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(251,191,36,0.12),transparent_42%)] pointer-events-none" />
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -right-16 top-12 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] dark:text-gray-200">
                Blog
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.16)]" />
              </p>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">Signals & Stories</h2>
                <p className="text-slate-600 dark:text-gray-300 max-w-2xl">
                  Fresh takes on engineering, AI, and product craft — concise reads with practical takeaways.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              as="a"
              href="/blog"
              className="group border-amber-500/40 text-amber-700 bg-amber-100/70 hover:bg-amber-100 hover:border-amber-500/60 dark:border-amber-300/50 dark:text-amber-100 dark:bg-amber-400/10 dark:hover:bg-amber-400/20 dark:hover:border-amber-300/80"
            >
              <span className="relative z-10">View all</span>
              <span className="ml-2 transition-transform group-hover:translate-x-1">↗</span>
            </Button>
          </div>

          {posts.length === 0 ? (
            <div className="relative mt-8 rounded-2xl border border-black/10 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-white/5 px-6 py-10 dark:text-gray-200">
              Blog posts will appear here. CMS-ready for Markdown content.
            </div>
          ) : (
            <div className="relative mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-300">
                      <span>{featured.category || "Blog"}</span>
                      <span>{featured.readTime || "5–8 min read"}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
                      {featured.title}
                    </h3>
                    <p className="text-slate-700 dark:text-gray-200 text-sm md:text-base">
                      {truncate(featured.excerpt || featured.subtitle, 190)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(featured.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] bg-amber-50 text-amber-700 border border-amber-100 dark:bg-white/10 dark:border-white/20 dark:text-amber-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/blog/${featured.slug || featured.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex w-fit items-center gap-2 text-amber-700 dark:text-amber-200 text-sm font-semibold"
                    >
                      Read the story <span className="text-base">↗</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {rest.map((post, idx) => (
                  <motion.div
                    key={post.slug || post.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-5 hover:border-amber-300/60 hover:bg-amber-50 transition-all dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-amber-300/40 dark:hover:bg-white/[0.08]"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-tr from-amber-300/15 via-indigo-400/10 to-transparent" />
                    <div className="relative flex flex-col gap-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-gray-400 flex items-center justify-between">
                        <span>{post.category || "Blog"}</span>
                        <span>{post.readTime || "5–8 min"}</span>
                      </p>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-gray-300 line-clamp-3">
                        {truncate(post.excerpt || post.subtitle, 110)}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-2">
                          {(post.tags || []).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-full text-[11px] bg-amber-50 text-amber-700 border border-amber-100 dark:bg-white/5 dark:border-white/15 dark:text-gray-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/blog/${post.slug || post.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-[12px] font-semibold text-amber-700 dark:text-amber-200 inline-flex items-center gap-1"
                        >
                          Read <span className="transition-transform group-hover:translate-x-1">↗</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;

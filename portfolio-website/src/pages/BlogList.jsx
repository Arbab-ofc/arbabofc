import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useData } from "../contexts/DataContext";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { truncate } from "../utils/helpers";
import SEOHead from "../components/seo/SEOHead";

const BlogList = () => {
  const { blogList } = useData();

  return (
    <Layout>
      <SEOHead title="Blog" />
      <section className="section pt-28">
        <div className="container space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Blog</p>
              <h1 className="text-4xl font-bold text-white">Latest Writing</h1>
              <p className="text-gray-400 text-sm mt-1">Gen AI, RAG, MERN, and data-driven engineering notes.</p>
            </div>
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-white/10 text-white border-white/15">
              {blogList.length} posts
            </div>
          </div>
          {blogList.length === 0 ? (
            <Card className="text-gray-300">No posts yet. Admin dashboard will publish Markdown posts.</Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogList.map((post, idx) => (
                <Card
                  key={post.slug || post.title}
                  className="space-y-3 overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/0 dark:from-white/5 dark:via-white/5 dark:to-white/0 relative"
                >
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.25),transparent_45%)] pointer-events-none" />
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.readTime || "5–8 min read"}</span>
                    <span className="uppercase tracking-[0.18em]">{post.category || "Blog"}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white leading-snug">{post.title}</h3>
                  <p className="text-gray-300 text-sm">{truncate(post.excerpt || post.subtitle, 160)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {(post.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full text-[11px] bg-white/10 border border-white/15 text-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug || post.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button variant="ghost">Read</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogList;

import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../components/layout/Layout";
import { useData } from "../contexts/DataContext";
import SEOHead from "../components/seo/SEOHead";
import { Card } from "../components/common/Card";
import { slugify } from "../utils/helpers";

const BlogDetail = () => {
  const { slug } = useParams();
  const { blogList } = useData();
  const post =
    blogList.find((p) => (p.slug || slugify(p.title || "post")) === slug) ||
    blogList.find((p) => p.id === slug);

  if (!blogList.length && !post) {
    return (
      <Layout>
        <div className="section pt-28">
          <div className="container text-white">Loading blog...</div>
        </div>
      </Layout>
    );
  }

  if (!post && blogList.length) {
    return (
      <Layout>
        <div className="section pt-28">
          <div className="container text-white">Blog not found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title={post.title} description={post.excerpt} />
      <section className="section pt-28">
        <div className="container max-w-4xl space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/90 via-white/80 to-white/90 text-slate-900 shadow-[0_20px_70px_rgba(0,0,0,0.25)] dark:from-[#0f1424] dark:via-[#0c1020] dark:to-[#0a0d18] dark:text-white p-6">
            <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.3),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.28),transparent_42%)]" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-500/30">
                  {post.category || "Blog"}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/70 text-slate-800 border border-white/60 dark:bg-white/10 dark:text-white dark:border-white/15">
                  {post.readTime || "5–8 min read"}
                </span>
                {(post.tags || []).slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/70 text-slate-800 border border-white/60 dark:bg-white/10 dark:text-white dark:border-white/15">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
              {post.subtitle && <p className="text-gray-600 dark:text-gray-300 text-lg">{post.subtitle}</p>}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b0f1c] text-gray-100 shadow-[0_26px_70px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-gradient-to-r from-[#171c2c] via-[#121827] to-[#0c1220]">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_3px_rgba(255,95,87,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_0_3px_rgba(255,189,46,0.25)]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_0_3px_rgba(40,200,64,0.25)]" />
              <span className="text-[11px] text-gray-600 dark:text-gray-400 ml-3 font-mono tracking-wide">blog.md</span>
              <span className="ml-auto text-[11px] text-emerald-300 font-mono">zsh — ssh prod</span>
            </div>
            <Card className="!rounded-none border-0 bg-transparent prose prose-lg prose-slate prose-headings:text-slate-100 prose-p:text-slate-200 prose-li:marker:text-emerald-400 dark:prose-invert max-w-none prose-a:text-emerald-300 p-6 font-mono leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;

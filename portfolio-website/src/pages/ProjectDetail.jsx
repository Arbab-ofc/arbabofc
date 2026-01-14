import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../components/layout/Layout";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import SEOHead from "../components/seo/SEOHead";
import { slugify } from "../utils/helpers";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projects } = useData();
  const project = projects.find((p) => (p.slug ? p.slug === slug : slugify(p.title) === slug));
  const heroImage = project?.images?.[0];
  const hasLive = !!project?.liveUrl;
  const hasGithub = !!project?.githubUrl;

  if (!project) {
    return (
      <Layout>
        <div className="section">
          <div className="container text-center text-white">
            <p className="text-lg">Project not found.</p>
            <Link to="/projects">
              <Button variant="ghost" className="mt-4">
                Back to projects
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title={project.title} description={project.description} />
      <section className="section pt-32">
        <div className="container max-w-6xl space-y-8">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 dark:border-white/10 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-[#050814] dark:via-[#070b1a] dark:to-[#050814] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_50%_90%,rgba(251,191,36,0.12),transparent_45%)] dark:opacity-50" />
            <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link to="/">
                    <Button
                      variant="ghost"
                      className="!px-3 !py-1.5 text-xs bg-white text-slate-900 border border-slate-200 hover:text-amber-700 dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:text-amber-200"
                    >
                      ← Back
                    </Button>
                  </Link>
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-900/5 text-slate-800 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/20">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-100 dark:border-emerald-400/40">
                    {project.status}
                  </span>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 text-slate-900 dark:bg-black/50 dark:text-[#d0ffd6] font-mono shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-white/5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs text-slate-600 dark:text-white/70">EcoBloom.sh</span>
                  </div>
                  <div className="space-y-2 px-4 py-4 text-sm leading-relaxed">
                    <div className="text-emerald-700 dark:text-emerald-300">$ npm start</div>
                    <div className="text-slate-900 dark:text-white">
                      Launching <span className="text-amber-600 dark:text-amber-200">{project.title}</span>...
                    </div>
                    <div className="text-slate-700 dark:text-white/80">→ {project.subtitle}</div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded border border-emerald-400/60 text-[11px] text-emerald-800 bg-emerald-50 dark:text-emerald-100 dark:bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {hasLive && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:border-emerald-300 hover:shadow-sm dark:border-emerald-400/60 dark:bg-emerald-500/10 dark:text-emerald-100"
                        >
                          Live Demo
                        </a>
                      )}
                      {hasGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 hover:border-blue-300 hover:shadow-sm dark:border-blue-300/60 dark:bg-blue-500/10 dark:text-blue-100"
                        >
                          GitHub
                        </a>
                      )}
                      {!hasLive && !hasGithub && (
                        <span className="inline-flex items-center gap-2 rounded-lg border border-amber-300/60 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/10 dark:text-amber-100">
                          Links coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/60 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                {heroImage ? (
                  <img src={heroImage} alt={`${project.title} preview`} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full min-h-[280px] grid place-items-center text-center px-6 text-slate-800 dark:text-white bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black">
                    <div className="space-y-2">
                      <div className="text-sm uppercase tracking-[0.16em] text-slate-500 dark:text-white/60">Preview</div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">Media coming soon</p>
                      <p className="text-sm text-slate-600 dark:text-white/70">Cloudinary-ready gallery will appear here when available.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card className="space-y-6 bg-white text-slate-900 dark:bg-slate-950 dark:text-white border border-slate-200/70 dark:border-white/10 shadow-2xl rounded-3xl">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-black/60 font-mono text-sm text-slate-900 dark:text-emerald-100 shadow-[0_18px_50px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-white/5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-600 dark:text-white/70">EcoBloom-log.sh</span>
              </div>
              <div className="grid lg:grid-cols-[1.45fr_0.9fr] gap-8 p-5">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.fullDescription}</ReactMarkdown>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/5 p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-white/70 mb-2">Tech stack</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs dark:bg-white/10 dark:text-white dark:border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-white/5 p-4 shadow-sm">
                      <div className="text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-white/70">Status</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">{project.status}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-white/5 p-4 shadow-sm">
                      <div className="text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-white/70">Category</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white">{project.category}</div>
                    </div>
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 shadow-sm hover:shadow-md transition text-emerald-900 dark:border-emerald-400/60 dark:bg-emerald-500/10 dark:text-emerald-50"
                      >
                        <div className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">Live</div>
                        <div className="text-sm font-semibold break-all">{project.liveUrl}</div>
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm hover:shadow-md transition text-blue-900 dark:border-blue-300/70 dark:bg-blue-500/10 dark:text-blue-50"
                      >
                        <div className="text-xs uppercase tracking-[0.14em] text-blue-700 dark:text-blue-200">GitHub</div>
                        <div className="text-sm font-semibold break-all">{project.githubUrl}</div>
                      </a>
                    )}
                    {!hasLive && !hasGithub && (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm text-amber-900 dark:border-amber-300/60 dark:bg-amber-500/10 dark:text-amber-50">
                        <div className="text-xs uppercase tracking-[0.14em] text-amber-700 dark:text-amber-200">Links</div>
                        <div className="text-sm font-semibold">Coming soon</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;

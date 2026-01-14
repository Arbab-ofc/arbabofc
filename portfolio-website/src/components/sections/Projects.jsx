import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { useData } from "../../contexts/DataContext";
import { classNames, truncate } from "../../utils/helpers";
import { Heart } from "lucide-react";

const Projects = () => {
  const { projects, likeProject, unlikeProject, likes } = useData();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const filtered = (category === "all" ? projects : projects.filter((p) => p.category === category)).filter((p) =>
    `${p.title} ${p.subtitle} ${p.tags?.join(" ")} ${p.technologies?.join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <SectionHeader title="Projects" subtitle="Showcase" />
          <div className="flex gap-2 flex-wrap items-center">
            {categories.map((cat) => (
              <button
                key={`cat-${cat}`}
                onClick={() => setCategory(cat)}
                className={classNames(
                  "px-3 py-1 rounded-full text-xs border transition backdrop-blur",
                  category === cat
                    ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200 text-blue-900 shadow-sm dark:from-blue-600/30 dark:to-purple-600/30 dark:border-blue-500/50 dark:text-blue-100"
                    : "bg-white/70 text-slate-800 border-black/10 hover:bg-white dark:bg-white/5 dark:text-gray-300 dark:border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
            <input
              type="search"
              placeholder="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 px-3 rounded-full bg-white/80 text-slate-900 border border-black/10 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filtered.map((project, idx) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <Card className="space-y-4 h-full flex flex-col bg-gradient-to-br from-white/80 via-white/70 to-white/90 text-slate-900 dark:from-white/5 dark:via-white/3 dark:to-white/5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200 dark:bg-white/10 dark:text-blue-200 dark:border-white/15">
                      {project.category}
                    </span>
                    {project.status && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-green-500/15 dark:text-green-200 dark:border-green-500/40">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">❤️ {project.likes || 0}</span>
                    <button
                      className={classNames(
                        "h-10 w-10 grid place-items-center rounded-full border transition",
                        likes?.[project.slug || project.title]
                          ? "bg-pink-100 border-pink-200 text-pink-700 dark:bg-pink-500/20 dark:border-pink-400/60 dark:text-pink-200"
                          : "bg-white/60 border-black/10 text-slate-700 hover:text-pink-500 hover:border-pink-400/60 dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
                      )}
                      onClick={() => (likes?.[project.slug || project.title] ? unlikeProject(project) : likeProject(project))}
                      aria-label={likes?.[project.slug || project.title] ? "Unlike project" : "Like project"}
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{project.subtitle}</p>
                </div>
                <p className="text-gray-700 dark:text-gray-400 text-sm flex-1 leading-relaxed">{truncate(project.description, 180)}</p>
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/5 dark:text-gray-200 dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400">{(project.technologies || []).slice(0, 3).join(" • ")}</div>
                  <Link to={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="ghost">View</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

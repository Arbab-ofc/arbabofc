import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { useData } from "../../contexts/DataContext";
import { classNames, truncate } from "../../utils/helpers";
import { Heart } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Projects = () => {
  const { projects, likeProject, unlikeProject, likes } = useData();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const filtered = (category === "all" ? projects : projects.filter((p) => p.category === category)).filter((p) =>
    `${p.title} ${p.subtitle} ${p.tags?.join(" ")} ${p.technologies?.join(" ")}`.toLowerCase().includes(search.toLowerCase())
  );

  const hasMultipleSlides = filtered.length > 1;

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: hasMultipleSlides,
      slides: {
        perView: 1,
        spacing: 12,
      },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 1, spacing: 14 } },
        "(min-width: 900px)": { slides: { perView: 1, spacing: 16 } },
        "(min-width: 1200px)": { slides: { perView: 1, spacing: 18 } },
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        if (!hasMultipleSlides) return;
        let timeout;
        let mouseOver = false;
        const clearNextTimeout = () => clearTimeout(timeout);
        const nextTimeout = () => {
          clearTimeout(timeout);
          if (mouseOver || !slider) return;
          timeout = setTimeout(() => slider.next(), 3000);
        };
        slider.on("created", () => {
          setCurrentSlide(slider.track.details.rel);
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", () => {
          nextTimeout();
          setCurrentSlide(slider.track.details.rel);
        });
        slider.on("updated", () => {
          nextTimeout();
          setCurrentSlide(slider.track.details.rel);
        });
        slider.on("destroyed", clearNextTimeout);
      },
    ]
  );

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
      instanceRef.current.moveToIdx(0);
      setCurrentSlide(0);
    }
  }, [filtered.length, category, search, instanceRef]);

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
        {filtered.length === 0 ? (
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-300">No projects match your filters yet.</div>
        ) : (
          <div className="mt-8 relative max-w-4xl mx-auto">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-amber-400/15 via-blue-500/10 to-purple-500/15 pointer-events-none" aria-hidden />
            <div ref={sliderRef} className="keen-slider relative">
              {filtered.map((project, idx) => (
                <div key={project.slug || project.title || idx} className="keen-slider__slide pb-10">
                  <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                    <Card
                      interactive={false}
                      className="space-y-4 h-full flex flex-col bg-gradient-to-br from-white/92 via-white/85 to-white/96 text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.16)] border border-white/70 dark:from-[#0f1425] dark:via-[#0d1220] dark:to-[#0c0f1c] dark:text-white dark:border-white/15 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.16),transparent_42%)] opacity-80 pointer-events-none" />
                      <div className="relative space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
                        <div className="flex items-center gap-2 self-start sm:self-auto mt-1 sm:mt-0">
                          <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap px-2 py-1 rounded-full bg-white/60 border border-black/10 dark:bg-white/10 dark:border-white/15 inline-flex items-center gap-2">
                            <span>❤️</span>
                            {project.likes || 0}
                          </span>
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
                      <div className="space-y-2 relative z-10">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{project.subtitle}</p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-400 text-sm flex-1 leading-relaxed relative z-10">{truncate(project.description, 180)}</p>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {(project.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/5 dark:text-gray-200 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 relative z-10">
                        <div className="text-xs text-gray-600 dark:text-gray-400">{(project.technologies || []).slice(0, 3).join(" • ")}</div>
                        <Link to={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Button variant="ghost">View</Button>
                        </Link>
                      </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>

            {loaded && instanceRef.current && hasMultipleSlides && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => instanceRef.current?.prev()}
                  className="h-10 w-10 rounded-full border border-white/20 bg-white/70 text-slate-800 shadow-sm hover:border-amber-400 hover:text-amber-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  aria-label="Previous project"
                >
                  ←
                </button>
                <div className="flex items-center gap-1">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => instanceRef.current?.moveToIdx(i)}
                      className={classNames(
                        "h-2.5 w-2.5 rounded-full transition",
                        currentSlide === i ? "bg-gradient-to-r from-amber-400 to-purple-500" : "bg-white/40"
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => instanceRef.current?.next()}
                  className="h-10 w-10 rounded-full border border-white/20 bg-white/70 text-slate-800 shadow-sm hover:border-amber-400 hover:text-amber-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

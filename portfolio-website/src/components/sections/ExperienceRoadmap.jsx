import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { useData } from "../../contexts/DataContext";
import { classNames } from "../../utils/helpers";

const getIcon = (name) => {
  const Icon = Icons[name] || Icons.Circle;
  return <Icon size={18} />;
};

const filters = [
  { key: "all", label: "All" },
  { key: "education", label: "Education" },
  { key: "internship", label: "Internship" },
  { key: "career", label: "Career" },
  { key: "goal", label: "Goal" },
];

const ExperienceRoadmap = () => {
  const { experienceRoadmap } = useData();
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () => (filter === "all" ? experienceRoadmap : experienceRoadmap.filter((item) => item.type === filter)),
    [filter, experienceRoadmap]
  );

  return (
    <section id="roadmap" className="section">
      <div className="container">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <SectionHeader title="Experience Roadmap" subtitle="Timeline" />
          <div className="flex gap-2 flex-wrap bg-white/5 dark:bg-white/5 border border-white/10 rounded-full px-2 py-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition",
                  filter === f.key
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none hidden lg:block" />
          <div className="flex flex-col gap-10">
            {filtered.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className={classNames(
                    "relative lg:w-1/2",
                    isLeft ? "lg:pr-12 lg:self-start text-left" : "lg:pl-12 lg:self-end lg:text-left"
                  )}
                >
                  <div
                    className={classNames(
                      "absolute lg:top-4 lg:-translate-y-1/2 lg:w-10 lg:h-10 w-12 h-12 rounded-full grid place-items-center border shadow-xl shadow-black/15 dark:shadow-black/40 backdrop-blur-lg",
                      "bg-white/10 border-white/20"
                    )}
                    style={{
                      color: item.color,
                      left: isLeft ? "calc(100% + 16px)" : undefined,
                      right: !isLeft ? "calc(100% + 16px)" : undefined,
                      top: isLeft ? "8px" : "8px",
                    }}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <div
                    className={classNames(
                      "rounded-2xl border border-white/10 bg-white/80 dark:bg-white/5 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-md p-5 relative overflow-hidden",
                      "before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_45%)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">{item.type}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">{item.title}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.subtitle}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                    {item.achievements && (
                      <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside mt-2 space-y-1">
                        {item.achievements.map((ach) => (
                          <li key={ach}>{ach}</li>
                        ))}
                      </ul>
                    )}
                    {item.projects && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">Projects: {item.projects.join(", ")}</div>
                    )}
                  </div>
                </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceRoadmap;

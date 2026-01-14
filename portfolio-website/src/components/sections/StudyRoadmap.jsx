import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { useData } from "../../contexts/DataContext";
import { classNames } from "../../utils/helpers";

const phaseColors = {
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-green-500/15 dark:text-green-200 dark:border-green-500/40 whitespace-nowrap",
  "in-progress": "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500/40 whitespace-nowrap",
  planned: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-gray-200 dark:border-white/15 whitespace-nowrap",
};

const StudyRoadmap = () => {
  const { studyRoadmap } = useData();
  const [phase, setPhase] = useState("all");

  const filtered = useMemo(
    () => (phase === "all" ? studyRoadmap : studyRoadmap.filter((item) => item.phase === phase)),
    [phase, studyRoadmap]
  );

  return (
    <section id="study-roadmap" className="section">
      <div className="container">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <SectionHeader title="Study Roadmap" subtitle="Learning Journey" />
          <div className="flex gap-2">
            {["all", "completed", "in-progress", "planned"].map((status) => (
              <button
                key={status}
                onClick={() => setPhase(status)}
                className={classNames(
                  "px-3 py-1 rounded-full text-xs border transition",
                  phase === status
                    ? "bg-blue-100 border-blue-200 text-blue-900 shadow-sm dark:bg-blue-500/20 dark:border-blue-400/50 dark:text-blue-100"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-gray-300 dark:border-white/10"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
              <Card className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.subtitle}</p>
                  </div>
                  <span
                    className={classNames(
                      "px-3 py-1 rounded-full text-xs border",
                      phaseColors[item.phase] || "bg-white/5 text-gray-200 border-white/15"
                    )}
                  >
                    {item.phase}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${item.proficiency || 0}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
                      {topic}
                    </span>
                  ))}
                </div>
                {item.resources && (
                  <div className="text-xs text-gray-400">
                    Resources:{" "}
                    {item.resources.map((res) => (
                      <span key={res} className="text-gray-200 mr-2">
                        {res}
                      </span>
                    ))}
                  </div>
                )}
                {item.projects && (
                  <div className="text-xs text-gray-300">Projects completed: {item.projects}</div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyRoadmap;

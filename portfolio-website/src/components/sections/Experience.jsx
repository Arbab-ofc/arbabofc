import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { useData } from "../../contexts/DataContext";
import { classNames } from "../../utils/helpers";

const Experience = () => {
  const { experiences } = useData();

  const leftColumn = experiences.filter((_, idx) => idx % 2 === 0);
  const rightColumn = experiences.filter((_, idx) => idx % 2 !== 0);

  const renderCard = (exp, idx) => (
    <motion.div
      key={exp.company + exp.position}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      className="relative"
    >
      <div className="absolute -left-6 top-6 hidden lg:block h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_0_8px_rgba(16,185,129,0.18)] dark:shadow-[0_0_0_8px_rgba(16,185,129,0.08)]" />
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/85 via-white/75 to-white/90 text-slate-900 shadow-[0_22px_60px_rgba(0,0,0,0.18)] dark:from-white/5 dark:via-white/5 dark:to-white/5 dark:text-white overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-500" />
        <div className="p-5 lg:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-[0.18em]">
                <Briefcase className="h-4 w-4 opacity-70" />
                {exp.company}
              </div>
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-500/30">
                  <Calendar className="h-3 w-3" />
                  {exp.duration}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/15">
                  <MapPin className="h-3 w-3" />
                  {exp.location}
                </span>
              </div>
            </div>
            {exp.certificateUrl && (
              <a
                href={exp.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full text-[11px] font-semibold border bg-white/70 text-slate-800 border-slate-200 shadow-sm hover:border-emerald-400 hover:text-emerald-700 dark:bg-white/10 dark:text-white dark:border-white/15"
              >
                View certificate
              </a>
            )}
            {exp.current && (
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold border bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm dark:bg-green-500/15 dark:text-green-200 dark:border-green-500/30">
                Current
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{exp.description}</p>

          {exp.achievements?.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {exp.achievements.map((ach) => (
                <div
                  key={ach}
                  className="rounded-xl border border-white/15 bg-white/60 text-slate-800 px-3 py-2 text-xs dark:bg-white/5 dark:text-gray-200 dark:border-white/10"
                >
                  {ach}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-semibold shadow-sm shadow-slate-200/60 dark:bg-white/5 dark:border-white/10 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <SectionHeader title="Experience" subtitle="Professional Journey" />
          <div className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-gradient-to-r from-slate-100 to-white text-slate-800 border-slate-200 shadow-sm shadow-slate-200/70 dark:bg-gradient-to-r dark:from-emerald-500/30 dark:via-blue-500/30 dark:to-purple-500/30 dark:border-white/15 dark:text-white dark:shadow-[0_0_20px_rgba(79,70,229,0.25)]">
            {experiences.length} roles
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-6">{leftColumn.map(renderCard)}</div>
          <div className="space-y-6 lg:pt-10">{rightColumn.map(renderCard)}</div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

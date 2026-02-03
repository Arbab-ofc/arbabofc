import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "../common/Button";
import { useData } from "../../contexts/DataContext";
import resumePdf from "../../assets/arbabofcme.pdf";

const formatExperienceDisplay = (summary) => {
  if (!summary) return { value: "--", label: "Experience" };
  const years = Number(summary.years) || 0;
  const months = Number(summary.months) || 0;
  if (!years && !months) return { value: "0 mos", label: summary.label || "Experience" };

  const parts = [];
  if (years) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months) parts.push(`${months} mo${months === 1 ? "" : "s"}`);

  return { value: parts.join(" "), label: summary.label || "Experience" };
};

const Hero = () => {
  const { settings } = useData();
  const personal = settings.personalInfo || {};
  const experience = formatExperienceDisplay(settings.experienceSummary);
  const resumeLink = personal.resumeUrl || resumePdf;
  const internshipsCount = Number(settings.internshipsCount) || 0;
  const heroTagline = "Build. Ship. Repeat.";
  const heroWordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="section pt-20 md:pt-24">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">Full-Stack & Data</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient block">{personal.fullName || "Arbab Arshad"}</span>
              <span className="text-gray-200">{personal.title}</span>
            </h1>
            <motion.p
              className="mt-4 max-w-xl flex flex-wrap gap-x-2 text-lg sm:text-xl font-mono font-semibold tracking-tight text-slate-800 dark:text-white/90"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12 }}
            >
              {heroTagline.split(" ").map((word, index) => (
                <motion.span key={`${word}-${index}`} variants={heroWordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-3">
            <Button as="a" href="#projects">
              View Projects
            </Button>
            <Button variant="ghost" as="a" href="#contact">
              Contact Me
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold text-white">10+</p>
              <p>Full-stack projects</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold text-white">{internshipsCount}</p>
              <p>Internships</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold text-white">{experience.value}</p>
              <p className="text-gray-400">{experience.label}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-500/30">
              Data Science
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/15 dark:text-purple-100 dark:border-purple-500/30">
              Gen AI
            </span>
          </div>
        </div>
        <motion.div
          className="relative rounded-3xl h-full w-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4f7ff] to-white dark:from-[#05060c] dark:via-[#0c0f1f] dark:to-[#05060c]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.2),transparent_40%)] dark:bg-[radial-gradient(circle_at_25%_10%,rgba(59,130,246,0.22),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.24),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px]" aria-hidden />
          <div className="absolute inset-6 rounded-3xl border border-black/10 dark:border-white/10" aria-hidden />
          <div className="relative p-6 sm:p-7 lg:p-8 flex flex-col gap-5 h-full">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="pl-3 sm:pl-4 lg:pl-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">Based in</p>
                <p className="text-2xl sm:text-3xl font-semibold text-white leading-tight">{personal.location}</p>
                <p className="text-sm text-gray-400 mt-1">Full-Stack MERN · Data Analytics</p>
              </div>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-200/50 dark:bg-emerald-500/25 dark:border-emerald-300/60 dark:text-emerald-50 dark:shadow-lg dark:shadow-emerald-500/30 dark:backdrop-blur whitespace-nowrap self-start lg:self-auto">
                Open for roles
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Email</p>
                <a className="text-white font-semibold block mt-1 break-all" href={`mailto:${personal.email}`}>
                  {personal.email}
                </a>
              </div>
              <div className="lg:text-right">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">Phone</p>
                <a className="text-white font-semibold block mt-1 break-all" href={`tel:${personal.phone}`}>
                  {personal.phone}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5 shadow-lg shadow-blue-900/10 dark:shadow-2xl dark:shadow-blue-900/40">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">Current Focus</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-1 leading-snug">
                Realtime experiences, secure systems, data-driven product decisions.
              </h3>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-xs">
              <motion.a
                href={resumeLink}
                download
                className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col sm:flex-row flex-wrap items-center gap-3 text-center sm:text-left shadow-lg shadow-emerald-500/15 dark:shadow-emerald-500/25 backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-emerald-200/60 hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 via-blue-500/30 to-emerald-500/30 border border-white/15 text-white shadow-inner shadow-emerald-500/30 shrink-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                >
                  <Rocket className="h-5 w-5" strokeWidth={2.2} />
                </motion.span>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white leading-tight">Download CV</p>
                  <p className="text-[11px] text-gray-300 dark:text-emerald-100/90">Latest resume PDF</p>
                </div>
                <div className="sm:ml-auto self-center sm:self-auto text-[11px] text-emerald-700 dark:text-emerald-100 px-2 py-1 rounded-full bg-emerald-100 border border-emerald-200 dark:bg-emerald-500/15 dark:border-emerald-300/30">
                  PDF
                </div>
              </motion.a>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-white">{experience.value}</p>
                <p className="text-gray-400">{experience.label}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

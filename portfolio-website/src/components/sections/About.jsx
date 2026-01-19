import React from "react";
import SectionHeader from "../common/SectionHeader";
import { useData } from "../../contexts/DataContext";
import { Mail, MapPin, Phone, Award } from "lucide-react";

const About = () => {
  const { settings, education } = useData();
  const currentEdu = education.find((item) => item.status === "current");
  const cgpaValue = (settings.educationCgpa || "0").toString().replace(/cgpa[:\s]*/i, "").trim() || "0";

  return (
    <section id="about" className="section">
      <div className="container mt-10 md:mt-12">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <SectionHeader title="About" subtitle="Profile" />
          <div className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-gradient-to-r from-emerald-200/70 via-blue-200/70 to-purple-200/70 text-slate-900 border-white/60 shadow-sm shadow-emerald-200/40 dark:bg-white/5 dark:border-white/10 dark:text-white">
            Full-Stack · Data Analytics · MERN
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
          {/* Identity + contact */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/90 text-slate-900 shadow-[0_24px_70px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-[#0d101d]/85 dark:text-white">
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.22),transparent_42%),radial-gradient(circle_at_60%_90%,rgba(251,191,36,0.2),transparent_48%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:140px_140px] opacity-30" />

            <div className="relative p-7 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">Who I am</p>
                  <h3 className="text-3xl font-semibold text-gradient">Arbab Arshad</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Building resilient products with data-driven decisions.</p>
                </div>
                <div className="px-4 py-2 rounded-2xl border bg-white/80 text-slate-900 border-white/40 shadow-sm dark:bg-white/10 dark:text-white dark:border-white/15">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-200">Open for Roles</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-100">{settings.personalInfo.bio}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Email",
                    value: settings.personalInfo.email,
                    icon: <Mail size={16} />,
                    tone: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-100 dark:border-emerald-500/30",
                  },
                  {
                    label: "Phone",
                    value: settings.personalInfo.phone,
                    icon: <Phone size={16} />,
                    tone: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-100 dark:border-blue-500/30",
                  },
                  {
                    label: "Location",
                    value: settings.personalInfo.location,
                    icon: <MapPin size={16} />,
                    tone: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-100 dark:border-amber-500/30",
                  },
                  {
                    label: "Role",
                    value: "Full-Stack Developer & Data Analyst",
                    icon: <Award size={16} />,
                    tone: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-100 dark:border-purple-500/30",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl border border-white/20 bg-white/80 text-slate-900 shadow-sm dark:bg-white/5 dark:text-white dark:border-white/10 flex items-start gap-3"
                  >
                    <div className={`h-9 w-9 rounded-xl grid place-items-center ${item.tone}`}>{item.icon}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white border border-white/20 dark:bg-white/10 dark:text-white">
                  MERN
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-slate-800 border border-white/40 dark:bg-white/10 dark:text-white">
                  Data Analytics
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-slate-800 border border-white/40 dark:bg-white/10 dark:text-white">
                  Secure Systems
                </span>
              </div>
            </div>
          </div>

          {/* Education timeline */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/85 via-white/75 to-white/90 dark:from-white/5 dark:via-white/5 dark:to-white/5 p-7 shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.3),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(16,185,129,0.3),transparent_45%)]" />
            <div className="flex items-center justify-between gap-3 relative">
              <h3 className="text-xl font-semibold text-gradient">Education</h3>
              {currentEdu && (
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-100 dark:border-blue-500/30">
                  Current
                </span>
              )}
            </div>
            <div className="mt-4 space-y-5 relative">
              <div className="absolute left-[12px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-400 via-blue-400 to-purple-400 opacity-50" />
              {education.map((item, idx) => (
                <div key={item.institution + idx} className="relative pl-10">
                  <div className="absolute left-1 top-2 h-4 w-4 rounded-full bg-white border-2 border-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.15)] dark:bg-white/10" />
                  <div className="rounded-2xl border border-white/15 bg-white/80 text-slate-900 shadow-sm px-4 py-3 dark:bg-white/5 dark:text-white dark:border-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{item.status}</p>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.duration}</span>
                    </div>
                    <p className="text-lg font-semibold">{item.institution}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.degree}</p>
                    {item.highlights && (
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                        {item.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {currentEdu && cgpaValue && (
              <div className="mt-4 p-3 rounded-2xl border text-sm bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-100 dark:border-blue-500/30">
                Pursuing {currentEdu.degree} · CGPA {cgpaValue}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";

const Footer = () => (
  <footer className="border-t border-black/5 bg-transparent text-slate-900 dark:border-white/10 dark:bg-transparent dark:text-white">
    <div className="container px-3 lg:px-0 py-5 space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white/95 text-slate-900 font-mono text-sm shadow-sm overflow-hidden dark:border-white/15 dark:bg-[rgba(11,15,28,0.95)] dark:text-white">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-100/80 dark:border-white/15 dark:bg-[rgba(255,255,255,0.05)]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-[11px] text-slate-500 dark:text-white/70">footer.log</span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-3">
          <div className="space-y-1">
            <div className="text-emerald-700 dark:text-emerald-300">$ whoami</div>
            <div className="text-slate-900 dark:text-white">Arbab Arshad</div>
            <div className="text-slate-700 dark:text-gray-200">→ Build. Ship. Repeat.</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-[11px] dark:bg-emerald-500/15 dark:border-emerald-400/30 dark:text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              Open to offers
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-emerald-700 dark:text-emerald-300">$ contact --list</div>
            <div className="flex flex-col gap-2 text-slate-800 dark:text-white">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hidden sm:flex items-center gap-2 hover:text-amber-700 dark:hover:text-amber-200">
                <Mail size={16} />
                {PERSONAL_INFO.email}
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-amber-700 dark:hover:text-amber-200">
                <Phone size={16} />
                {PERSONAL_INFO.phone}
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="h-9 w-9 rounded-lg border border-slate-200 bg-white grid place-items-center text-slate-800 hover:border-amber-400 hover:text-amber-700 transition dark:border-white/15 dark:bg-white/5 dark:text-white sm:hidden"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://github.com/Arbab-ofc/"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg border border-slate-200 bg-white grid place-items-center text-slate-800 hover:border-amber-400 hover:text-amber-700 transition dark:border-white/15 dark:bg-white/5 dark:text-white"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/arbab-ofc/"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg border border-slate-200 bg-white grid place-items-center text-slate-800 hover:border-amber-400 hover:text-amber-700 transition dark:border-white/15 dark:bg-white/5 dark:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-600 dark:text-white/60">
        <span className="font-semibold text-slate-800 dark:text-white">Arbab Arshad</span>
        <span className="mx-2 text-slate-400 dark:text-white/40">|</span>
        <span className="text-slate-700 dark:text-white">Building things that scale</span>
        <div className="mt-1 text-slate-500 dark:text-white/40">© {new Date().getFullYear()} Arbab Arshad. Crafted with care.</div>
      </div>
    </div>
  </footer>
);

export default Footer;

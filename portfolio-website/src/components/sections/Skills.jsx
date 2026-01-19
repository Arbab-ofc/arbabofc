import React, { useMemo, useState } from "react";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { useData } from "../../contexts/DataContext";

const Skills = () => {
  const { skills } = useData();
  const entries = useMemo(() => Object.entries(skills), [skills]);
  const [active, setActive] = useState(() => entries[0]?.[0] || "");

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader title="Technical Skills" subtitle="Capabilities" />
        <div className="flex flex-wrap gap-2 mt-4">
          {entries.map(([category]) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`px-3 py-1.5 rounded-full text-xs border transition ${
                active === category
                  ? "bg-blue-100 border-blue-200 text-blue-900 shadow-sm dark:bg-blue-500/20 dark:border-blue-400/50 dark:text-blue-100"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-white/5 dark:text-gray-300 dark:border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Card className="space-y-3 !p-5 mt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{active}</p>
          <div className="flex flex-wrap gap-2">
            {(skills[active] || []).map((item) => (
              <span key={item} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-100">
                {item}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Skills;

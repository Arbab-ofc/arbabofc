import React from "react";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { useData } from "../../contexts/DataContext";

const Skills = () => {
  const { skills } = useData();
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader title="Technical Skills" subtitle="Capabilities" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map(([category, list]) => (
            <Card key={category} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{category}</p>
              <div className="flex flex-wrap gap-2">
                {list.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-100">
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

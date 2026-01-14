import React from "react";
import { Trophy } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { Card } from "../common/Card";
import { useData } from "../../contexts/DataContext";

const Achievements = () => {
  const { achievements } = useData();
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeader title="Achievements" subtitle="Highlights" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <Card key={item.title} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-full grid place-items-center bg-white/5 border border-white/10">
                  <Trophy size={18} />
                </span>
                <div>
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

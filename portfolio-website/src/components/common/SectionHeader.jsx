import React from "react";

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col gap-2 mb-8">
    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">{subtitle}</p>
    <h2 className="text-3xl md:text-4xl font-semibold text-gradient">{title}</h2>
  </div>
);

export default SectionHeader;

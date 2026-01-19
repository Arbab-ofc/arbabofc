import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 });
  const [viewport, setViewport] = useState("lg");

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "phase", header: "Phase" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "proficiency", header: "Progress" },
    ],
    []
  );

  const table = useReactTable({
    data: studyRoadmap,
    columns,
    state: { globalFilter, columnFilters, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // sync phase filter into table column filter
  useEffect(() => {
    if (phase === "all") {
      setColumnFilters((prev) => prev.filter((f) => f.id !== "phase"));
    } else {
      setColumnFilters((prev) => {
        const others = prev.filter((f) => f.id !== "phase");
        return [...others, { id: "phase", value: phase }];
      });
    }
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [phase]);

  const pageCount = table.getPageCount();
  const { pageIndex, pageSize } = table.getState().pagination;
  const rows = table.getRowModel().rows;
  const filteredRows = table.getFilteredRowModel().rows;
  const filteredCount = filteredRows.length;
  const isMobile = viewport === "sm";
  const mobileRows = useMemo(() => filteredRows, [filteredRows]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (lg.matches) {
        setViewport("lg");
      } else if (md.matches) {
        setViewport("md");
      } else {
        setViewport("sm");
      }
    };
    update();
    md.addEventListener ? md.addEventListener("change", update) : md.addListener(update);
    lg.addEventListener ? lg.addEventListener("change", update) : lg.addListener(update);
    return () => {
      md.removeEventListener ? md.removeEventListener("change", update) : md.removeListener(update);
      lg.removeEventListener ? lg.removeEventListener("change", update) : lg.removeListener(update);
    };
  }, []);

  useEffect(() => {
    const desiredPageSize = viewport === "lg" ? 4 : viewport === "md" ? 2 : 1;
    if (pageSize !== desiredPageSize) {
      table.setPageSize(desiredPageSize);
      table.setPageIndex(0);
    }
  }, [pageSize, table, viewport]);


  return (
    <section id="study-roadmap" className="section">
      <style>{`
        @keyframes progressGlow {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(56,189,248,0)); }
          50% { filter: drop-shadow(0 0 6px rgba(56,189,248,0.45)); }
        }
      `}</style>
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
        <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="search"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search roadmap..."
              className="h-10 w-full sm:w-64 px-3 rounded-xl bg-white/80 text-slate-900 border border-black/10 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {rows.length} of {table.getFilteredRowModel().rows.length} shown
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
            <span>Cards per view</span>
            <span className="px-2 py-1 rounded-full border border-slate-200 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
              {viewport === "lg" ? 4 : viewport === "md" ? 2 : 1}
            </span>
          </div>
        </div>
        {isMobile ? (
          <div className="mt-6 flex overflow-x-auto snap-x snap-proximity pb-2 -mx-3 px-3 gap-6">
            {mobileRows.map((row) => {
              const item = row.original;
              return (
                <div key={item.id} className="min-w-[85%] snap-center">
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
                    <div className="relative h-1.5 w-[90%] rounded-full bg-slate-200/70 dark:bg-slate-900/70 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                        initial={{ width: 0, opacity: 0.85 }}
                        whileInView={{ width: `${item.proficiency || 0}%`, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        style={{ animation: "progressGlow 2.2s ease-in-out infinite" }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item.topics || []).map((topic) => (
                        <span key={topic} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {item.resources && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200">
                          📚 {item.resources.length} resources
                        </span>
                      )}
                      {item.projects && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200">
                          🚀 {item.projects} projects
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {rows.map((row, idx) => {
              const item = row.original;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                >
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
                    <div className="relative h-1.5 w-[90%] rounded-full bg-slate-200/70 dark:bg-slate-900/70 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                        initial={{ width: 0, opacity: 0.85 }}
                        whileInView={{ width: `${item.proficiency || 0}%`, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        style={{ animation: "progressGlow 2.2s ease-in-out infinite" }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item.topics || []).map((topic) => (
                        <span key={topic} className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {item.resources && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200">
                          📚 {item.resources.length} resources
                        </span>
                      )}
                      {item.projects && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200">
                          🚀 {item.projects} projects
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
        {!isMobile && pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 text-sm">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={classNames(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 transition",
                !table.getCanPreviousPage()
                  ? "border-slate-200 bg-white/70 text-slate-400 opacity-60 cursor-not-allowed dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                  : "border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-amber-400"
              )}
            >
              ←
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => {
              const isCurrent = idx === pageIndex;
              // show first, last, current +/-1, with ellipses
              const show =
                idx === 0 ||
                idx === pageCount - 1 ||
                (idx >= pageIndex - 1 && idx <= pageIndex + 1);
              if (!show) {
                if (idx === 1 && pageIndex > 2)
                  return (
                    <span key={`ellipsis-left`} className="px-2 text-slate-500 dark:text-white/60">
                      …
                    </span>
                  );
                if (idx === pageCount - 2 && pageIndex < pageCount - 3)
                  return (
                    <span key={`ellipsis-right`} className="px-2 text-slate-500 dark:text-white/60">
                      …
                    </span>
                  );
                return null;
              }
              return (
                <button
                  key={`page-${idx}`}
                  type="button"
                  onClick={() => table.setPageIndex(idx)}
                  className={classNames(
                    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 transition",
                    isCurrent
                      ? "!border-blue-500 !text-blue-700 !bg-blue-50 shadow-sm dark:!border-amber-400 dark:!text-amber-100 dark:!bg-amber-400/15"
                      : "border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-amber-400"
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={classNames(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 transition",
                !table.getCanNextPage()
                  ? "border-slate-200 bg-white/70 text-slate-400 opacity-60 cursor-not-allowed dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                  : "border-slate-200 bg-white/80 text-slate-800 shadow-sm hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-amber-400"
              )}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudyRoadmap;

import React from "react";
import { ArrowUpRight, ArrowDownRight, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export const CategoryBadge = ({ cat }: { cat: string }) => {
  const map: Record<string, string> = {
    "Process Automation": "bg-blue-50 text-blue-700 border-blue-200",
    "Action Automation":  "bg-purple-50 text-purple-700 border-purple-200",
    "Control Automation": "bg-orange-50 text-orange-700 border-orange-200",
    "Data Automation":    "bg-teal-50 text-teal-700 border-teal-200",
    "Workflow Automation":"bg-indigo-50 text-indigo-700 border-indigo-200",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${map[cat] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {cat}
    </span>
  );
};

export const StatusDot = ({ status }: { status: string }) => {
  const map: Record<string, { dot: string; text: string; cls: string }> = {
    Active:           { dot: "bg-emerald-500", text: "Active",           cls: "text-emerald-700" },
    Success:          { dot: "bg-emerald-500", text: "Success",          cls: "text-emerald-700" },
    Failed:           { dot: "bg-red-500",     text: "Failed",           cls: "text-red-600" },
    "Partial Success":{ dot: "bg-amber-400",   text: "Partial Success",  cls: "text-amber-700" },
    Skipped:          { dot: "bg-slate-400",   text: "Skipped",          cls: "text-slate-500" },
    Running:          { dot: "bg-blue-500 animate-pulse", text: "Running", cls: "text-blue-600" },
  };
  const s = map[status] ?? { dot: "bg-slate-300", text: status, cls: "text-slate-600" };
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
      <span className={`text-xs font-semibold ${s.cls}`}>{s.text}</span>
    </div>
  );
};

export const KpiCard = ({
  icon: Icon, iconBg, iconColor, label, value, sub, subUp, subColor
}: {
  icon: any; iconBg: string; iconColor: string; label: string;
  value: string; sub?: string; subUp?: boolean; subColor?: string;
}) => (
  <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-start gap-3">
    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-slate-500 leading-none mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
      {sub && (
        <p className={`text-[11px] mt-1 flex items-center gap-0.5 ${subColor ?? "text-slate-400"}`}>
          {subUp !== undefined && (
            subUp
              ? <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              : <ArrowDownRight className="w-3 h-3 text-red-500" />
          )}
          {sub}
        </p>
      )}
    </div>
  </div>
);

export const FilterBar = ({ extras }: { extras?: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-2 mb-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
      <input placeholder="Search automation..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
    </div>
    {["Status: All","Category: All","Trigger Type: All","Entity: All"].map(f => (
      <select key={f} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 focus:outline-none cursor-pointer">
        <option>{f}</option>
      </select>
    ))}
    <button className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50">
      <Filter className="w-3.5 h-3.5" /> Filters
    </button>
    {extras}
  </div>
);

export const Pagination = ({ total, page, setPage, perPage = 10 }: { total: string; page: number; setPage: (p: number) => void; perPage?: number }) => (
  <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
    <p className="text-xs text-slate-500">{total}</p>
    <div className="flex items-center gap-1">
      <button onClick={() => setPage(Math.max(1, page - 1))} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled={page === 1}>
        <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
      </button>
      {[1, 2, 3].map(p => (
        <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium transition-colors ${page === p ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{p}</button>
      ))}
      <span className="px-1 text-slate-400 text-xs">...</span>
      <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50">15</button>
      <button onClick={() => setPage(page + 1)} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50">
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
      </button>
      <select className="ml-2 text-xs border border-slate-200 rounded px-2 py-1.5 text-slate-600 focus:outline-none">
        <option>10 / page</option><option>20 / page</option><option>50 / page</option>
      </select>
    </div>
  </div>
);

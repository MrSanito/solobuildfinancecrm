import React, { useState } from "react";
import { Info, Play, CheckCircle2, AlertTriangle, Clock, TrendingUp, Search, Calendar, Filter, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { KpiCard, CategoryBadge, StatusDot } from "./Shared";
import { execLogRows } from "../data";

export function ExecutionLogTab() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-4">
      {/* Info notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-xs text-blue-800">Execution logs are retained for 365 days. Last updated: 16 May 2025, 09:35 AM</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard icon={Play}          iconBg="bg-blue-100"    iconColor="text-blue-600"    label="Executions (Today)"             value="248"    sub="↑ 18.7% vs yesterday (209)"  subColor="text-emerald-600" />
        <KpiCard icon={CheckCircle2}  iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Successful Executions (Today)"  value="233"    sub="93.9% success rate"           subColor="text-emerald-600" />
        <KpiCard icon={AlertTriangle} iconBg="bg-red-100"     iconColor="text-red-500"     label="Failed Executions (Today)"      value="15"     sub="6.1% failure rate"            subColor="text-red-500" />
        <KpiCard icon={Clock}         iconBg="bg-purple-100"  iconColor="text-purple-600"  label="Avg. Execution Time (Today)"    value="2.48s"  sub="↓ 0.5s vs yesterday (3.05s)" subColor="text-emerald-600" />
        <KpiCard icon={TrendingUp}    iconBg="bg-amber-100"   iconColor="text-amber-600"   label="Time Saved (Today, Est.)"       value="8.6 hrs" sub="↑ 1.2 hrs vs yesterday"      subColor="text-emerald-600" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input placeholder="Search by automation name, trigger or ID..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-64 focus:outline-none bg-white" />
        </div>
        {["Status: All","Category: All","Trigger Type: All","Entity: All"].map(f => (
          <select key={f} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 focus:outline-none">
            <option>{f}</option>
          </select>
        ))}
        <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-xs text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />16 May 2025 - 16 May 2025
        </div>
        <button className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50">
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50 font-medium">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Execution ID","Automation Name","Category","Trigger","Entity","Status","Executed At","Duration","Records Affected","Details"].map(h => (
                  <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 px-3 text-left whitespace-nowrap first:pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {execLogRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 pl-4">
                    <span className="text-[11px] font-mono text-blue-600 font-semibold">{row.id}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="text-xs font-semibold text-slate-800 whitespace-nowrap">{row.name}</p>
                    <p className="text-[10px] text-slate-400 whitespace-nowrap">{row.sub}</p>
                  </td>
                  <td className="py-2.5 px-3"><CategoryBadge cat={row.cat} /></td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />{row.trigger}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.entity}</td>
                  <td className="py-2.5 px-3"><StatusDot status={row.status} /></td>
                  <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.execAt}</td>
                  <td className="py-2.5 px-3 text-xs font-semibold text-slate-700">{row.dur}</td>
                  <td className="py-2.5 px-3 text-xs text-slate-700 font-semibold text-center">{row.records}</td>
                  <td className="py-2.5 px-3 pr-4">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-slate-500">Showing 1 to 10 of 248 executions</p>
          <div className="flex items-center gap-4">
            {/* Legend */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { color: "bg-emerald-500", label: "Success", sub: "Execution completed successfully" },
                { color: "bg-red-500",     label: "Failed",  sub: "Execution failed due to error" },
                { color: "bg-amber-400",   label: "Partial", sub: "Completed with some issues" },
                { color: "bg-slate-400",   label: "Skipped", sub: "Skipped as per conditions" },
                { color: "bg-blue-500",    label: "Running", sub: "Execution is in progress" },
              ].map((leg, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${leg.color}`} />
                  <span className="text-[10px] text-slate-500">{leg.label}</span>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page-1))} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40" disabled={page===1}><ChevronLeft className="w-3.5 h-3.5 text-slate-500" /></button>
              {[1,2,3,4,5].map(p => <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 flex items-center justify-center rounded border text-xs font-medium ${page===p?"bg-blue-600 text-white border-blue-600":"border-slate-200 text-slate-500 hover:bg-slate-50"}`}>{p}</button>)}
              <span className="px-1 text-slate-400 text-xs">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-xs text-slate-500 hover:bg-slate-50">25</button>
              <button onClick={() => setPage(page+1)} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50"><ChevronRight className="w-3.5 h-3.5 text-slate-500" /></button>
              <select className="ml-2 text-xs border border-slate-200 rounded px-2 py-1.5 text-slate-600 focus:outline-none"><option>10 / page</option></select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

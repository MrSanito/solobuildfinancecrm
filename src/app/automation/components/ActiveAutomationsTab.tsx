import React, { useState } from "react";
import { Shield, Play, CheckCircle2, AlertTriangle, Clock, Zap, Search, Filter, RefreshCw, Database, Bell, Calendar, ChevronRight } from "lucide-react";
import { KpiCard, CategoryBadge, StatusDot, Pagination } from "./Shared";
import { automationRows } from "../data";

export function ActiveAutomationsTab() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-4">
      {/* Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm">
        <Shield className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-blue-800 text-xs">Automations are managed by SB Auto AI team. You can view activity and request changes if required.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard icon={Zap}           iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Total Active Automations" value="89"    sub="↑ 12.6% vs previous 7 days" subColor="text-emerald-600" />
        <KpiCard icon={Play}          iconBg="bg-blue-100"    iconColor="text-blue-600"    label="Executions (Last 7 Days)"  value="1,248" sub="↑ 16.5% vs previous 7 days" subColor="text-emerald-600" />
        <KpiCard icon={CheckCircle2}  iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Success Rate"              value="98.2%" sub="↑ 2.3% vs previous 7 days"  subColor="text-emerald-600" />
        <KpiCard icon={AlertTriangle} iconBg="bg-red-100"     iconColor="text-red-500"     label="Failed Executions"         value="7"     sub="↑ 22.2% vs previous 7 days" subColor="text-red-500" />
        <KpiCard icon={Clock}         iconBg="bg-blue-100"    iconColor="text-blue-600"    label="Time Saved (Est.)"         value="124 hrs" sub="↑ 24.9% vs previous 7 days" subColor="text-emerald-600" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input placeholder="Search automation..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-44 focus:outline-none bg-white" />
        </div>
        {["Status: Active","Category: All","Trigger Type: All","Entity: All"].map(f => (
          <select key={f} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 focus:outline-none">
            <option>{f}</option>
          </select>
        ))}
        <button className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50">
          <Filter className="w-3.5 h-3.5" /> Filters
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-700">
          <RefreshCw className="w-3.5 h-3.5" /> Request Change
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Automation Name","Category","Trigger","Purpose","Status","Last Executed","Success Rate","Executions (10)","Actions"].map(h => (
                  <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 px-3 text-left whitespace-nowrap first:pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {automationRows.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors cursor-pointer">
                  <td className="py-3 px-3 pl-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${row.cat.includes("Process") ? "bg-blue-50" : row.cat.includes("Action") ? "bg-purple-50" : "bg-orange-50"}`}>
                        {row.cat.includes("Process") ? <Database className="w-3 h-3 text-blue-500" /> : row.cat.includes("Action") ? <Bell className="w-3 h-3 text-purple-500" /> : <Shield className="w-3 h-3 text-orange-500" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 whitespace-nowrap">{row.name}</p>
                        <p className="text-[10px] text-slate-400 whitespace-nowrap">{row.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3"><CategoryBadge cat={row.cat} /></td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-slate-400" />{row.trigger}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-500 whitespace-nowrap">{row.purpose}</td>
                  <td className="py-3 px-3"><StatusDot status={row.status} /></td>
                  <td className="py-3 px-3 text-xs text-slate-500 whitespace-nowrap">{row.lastExec}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.rate}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{row.rate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs font-semibold text-slate-700">{row.execs}</td>
                  <td className="py-3 px-3 pr-4">
                    <button className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline whitespace-nowrap">
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total="Showing 1 to 8 of 89 automations" page={page} setPage={setPage} />
      </div>

      {/* Bottom banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-800">Need a change in an automation?</p>
          <p className="text-xs text-slate-500 mt-0.5">You can request a change for any automation. Our team will review and get back to you.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 shrink-0">
          Request Change
        </button>
      </div>
    </div>
  );
}

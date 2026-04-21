import React, { useState } from "react";
import { Info, Activity, CheckCircle2, AlertTriangle, Users, Clock, Search, Calendar, Filter } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { KpiCard, CategoryBadge, StatusDot, Pagination } from "./Shared";
import { activityRows, activityPieData, topActivities, timelineData } from "../data";

export function ActivityLogTab() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-4">
      {/* Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-xs text-blue-800">Activity logs are retained for 365 days. Last updated: 16 May 2025, 09:15 AM</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiCard icon={Activity}      iconBg="bg-blue-100"    iconColor="text-blue-600"    label="Total Activities (Today)"       value="356"   sub="↑ 15.6% vs yesterday (308)"  subColor="text-emerald-600" />
        <KpiCard icon={CheckCircle2}  iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Successful Activities (Today)"  value="312"   sub="87.6% success rate"           subColor="text-emerald-600" />
        <KpiCard icon={AlertTriangle} iconBg="bg-red-100"     iconColor="text-red-500"     label="Failed Activities (Today)"      value="28"    sub="7.9% failure rate"            subColor="text-red-500" />
        <KpiCard icon={Users}         iconBg="bg-amber-100"   iconColor="text-amber-600"   label="Manual Interventions (Today)"   value="16"    sub="4.5% of total activities"     subColor="text-slate-400" />
        <KpiCard icon={Clock}         iconBg="bg-purple-100"  iconColor="text-purple-600"  label="Avg. Activity Time (Today)"     value="1.72s" sub="↓ 0.28s vs yesterday (2.0s)" subColor="text-emerald-600" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4">
        {/* Left - Table */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input placeholder="Search by automation name, activity or details..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-64 focus:outline-none bg-white" />
            </div>
            {["Status: All","Category: All","Entity: All","User: All"].map(f => (
              <select key={f} className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 focus:outline-none">
                <option>{f}</option>
              </select>
            ))}
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-xs text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />16 May 2025
            </div>
            <button className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Time","Activity","Automation","Category","Entity","Status","Triggered By","Details"].map(h => (
                      <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 px-3 text-left whitespace-nowrap first:pl-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activityRows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 pl-4">
                        {row.time.split("\n").map((t, j) => (
                          <p key={j} className={`whitespace-nowrap ${j === 0 ? "text-xs text-slate-500" : "text-[10px] text-slate-400"}`}>{t}</p>
                        ))}
                      </td>
                      <td className="py-2.5 px-3">
                        {row.activity.split("\n").map((t, j) => (
                          <p key={j} className={`whitespace-nowrap ${j === 0 ? "text-xs font-semibold text-slate-700" : "text-[10px] text-slate-400"}`}>{t}</p>
                        ))}
                      </td>
                      <td className="py-2.5 px-3 text-xs text-blue-600 font-medium whitespace-nowrap">{row.automation}</td>
                      <td className="py-2.5 px-3"><CategoryBadge cat={row.cat} /></td>
                      <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.entity}</td>
                      <td className="py-2.5 px-3"><StatusDot status={row.status} /></td>
                      <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.triggeredBy}</td>
                      <td className="py-2.5 px-3 pr-4 text-xs text-slate-500">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination total="Showing 1 to 10 of 356 activities" page={page} setPage={setPage} />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Activity Summary donut */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Activity Summary</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">Today</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={activityPieData} cx="50%" cy="50%" innerRadius={24} outerRadius={44} dataKey="value" strokeWidth={0}>
                      {activityPieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-base font-bold text-slate-900">356</p>
                  <p className="text-[8px] text-slate-400">Total</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                {activityPieData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-[10px] text-slate-500">{d.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">{d.value} ({((d.value / 356) * 100).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Activities */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Top Activities</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">Today</span>
            </div>
            <div className="space-y-2.5">
              {topActivities.map((a, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs text-slate-600 truncate pr-2">{a.name}</span>
                    <span className="text-xs font-semibold text-slate-700 shrink-0">{a.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(a.count / 86) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity by Time */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Activity by Time</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">Today</span>
            </div>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={2} />
                  <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Interventions */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Recent Interventions</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { name: "Vendor Payment Approval", user: "John Patel", type: "Approved", time: "08:30 AM" },
                { name: "GST Due Date Alert",      user: "Mira Shah",  type: "Override", time: "09:00 AM" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.user}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.type === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.type}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

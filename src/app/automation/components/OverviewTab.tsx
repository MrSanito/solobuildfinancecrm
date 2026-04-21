import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Shield, Play, CheckCircle2, AlertTriangle, Clock, Users, Info, Search, Filter, Database, Bell, Calendar, ChevronRight, ArrowUpRight } from "lucide-react";
import { KpiCard, CategoryBadge, StatusDot, Pagination } from "./Shared";
import { automationRows, categoryPieData } from "../data";

export function OverviewTab() {
  const [page, setPage] = useState(1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
      {/* Main column */}
      <div className="space-y-4">
        {/* Info banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900">Automation is managed by SB Auto AI team</p>
              <p className="text-xs text-blue-700 mt-0.5">You can view all automations and their activity. Changes can only be requested.</p>
            </div>
            <button className="ml-auto shrink-0 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700">Learn More</button>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Why is editing restricted?</p>
              <p className="text-xs text-slate-500 mt-0.5">Automation rules impact critical financial operations. To ensure accuracy and safety, only authorised team members can create or modify automations.</p>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiCard icon={Play}         iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Total Executions (10)" value="1,248" sub="↑ 18.6% vs previous 7 days" subColor="text-emerald-600" />
          <KpiCard icon={CheckCircle2} iconBg="bg-emerald-100" iconColor="text-emerald-600" label="Successful Executions"  value="1,224" sub="↑ 18.2% vs previous 7 days" subColor="text-emerald-600" />
          <KpiCard icon={AlertTriangle} iconBg="bg-red-100"    iconColor="text-red-500"     label="Failed Executions"      value="24"    sub="↑ 22.2% vs previous 7 days" subColor="text-red-500" />
          <KpiCard icon={Clock}         iconBg="bg-blue-100"   iconColor="text-blue-600"    label="Time Saved (Est.)"      value="124 hrs" sub="↑ 24.6% vs previous 7 days" subColor="text-emerald-600" />
          <KpiCard icon={Users}         iconBg="bg-amber-100"  iconColor="text-amber-600"   label="Manual Interventions"   value="23"    sub="↓ 11.5% vs previous 7 days" subColor="text-red-500" />
        </div>

        {/* Active Automations table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800">Active Automations</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">Read Only</span>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-40 focus:outline-none" />
              </div>
              <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50"><Filter className="w-3.5 h-3.5 text-slate-400" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Automation Name","Category","Trigger","Purpose","Status","Last Executed","Success Rate"].map(h => (
                    <th key={h} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2.5 px-3 text-left whitespace-nowrap first:pl-4">{h}</th>
                  ))}
                  <th className="py-2.5 px-3 pr-4" />
                </tr>
              </thead>
              <tbody>
                {automationRows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-3 pl-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${i % 3 === 0 ? "bg-blue-50" : i % 3 === 1 ? "bg-purple-50" : "bg-orange-50"}`}>
                          {i % 3 === 0 ? <Database className="w-3 h-3 text-blue-500" /> : i % 3 === 1 ? <Bell className="w-3 h-3 text-purple-500" /> : <Shield className="w-3 h-3 text-orange-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 whitespace-nowrap">{row.name}</p>
                          <p className="text-[10px] text-slate-400">{row.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3"><CategoryBadge cat={row.cat} /></td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                        <Calendar className="w-3 h-3 text-slate-400" />{row.trigger}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.purpose}</td>
                    <td className="py-2.5 px-3"><StatusDot status={row.status} /></td>
                    <td className="py-2.5 px-3 text-xs text-slate-500 whitespace-nowrap">{row.lastExec}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.rate}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{row.rate}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 pr-4"><ChevronRight className="w-4 h-4 text-slate-300" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination total="Showing 1 to 6 of 89 automations" page={page} setPage={setPage} />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Automation by Category */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Automation by Category</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={28} outerRadius={50} dataKey="value" strokeWidth={0}>
                      {categoryPieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-lg font-bold text-slate-900">112</p>
                  <p className="text-[9px] text-slate-400">Total</p>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                {categoryPieData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-[10px] text-slate-500 leading-none">{d.name.replace(" Automation","")}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automation Governance */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Automation Governance</h3>
            <div className="space-y-2.5">
              {[
                "All changes are logged and monitored",
                "Rules go through review before activation",
                "You will be notified of any critical automation changes",
                "Request changes using 'Request Change' button",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Need a new automation */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Need a New Automation?</h3>
              <p className="text-xs text-slate-500 mt-1">Can't find an automation you need? Request a new automation and our team will review and implement it for you.</p>
            </div>
            <button className="mt-4 flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-fit">
              Request New Automation <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="space-y-4">
        {/* Automation at a Glance */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Automation at a Glance</h3>
            <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">Last 7 Days</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Total Automations", value: "112", color: "text-slate-800" },
              { label: "Active",            value: "89",  color: "text-emerald-600" },
              { label: "Paused",            value: "14",  color: "text-amber-600"  },
              { label: "Success Rate",      value: "98.2%", color: "text-emerald-600", big: true },
              { label: "Manual Interventions", value: "7", color: "text-slate-800" },
            ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center py-1.5 ${i < 4 ? "border-b border-slate-50" : ""}`}>
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Automation Activity */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Recent Automation Activity</h3>
            <button className="text-xs text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Bank Statement Reconciliation", entity: "SB Auto Parts",    time: "16 May, 09:21 AM", status: "Success" },
              { name: "Payment Reminder (Overdue)",    entity: "SB Auto Pvt Ltd",  time: "16 May, 09:30 AM", status: "Success" },
              { name: "Expense Auto-Categorization",   entity: "SB Auto",          time: "16 May, 09:15 AM", status: "Success" },
              { name: "GST Due Date Alert",            entity: "",                 time: "16 May, 07:00 AM", status: "Failed" },
              { name: "Cash Flow Threshold Alert",     entity: "SB Logistics",     time: "16 May, 06:45 AM", status: "Success" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${item.status === "Success" ? "bg-emerald-500" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 leading-tight truncate">{item.name}</p>
                  {item.entity && <p className="text-[10px] text-slate-400">{item.entity}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-slate-400">{item.time}</p>
                  <p className={`text-[10px] font-semibold ${item.status === "Success" ? "text-emerald-600" : "text-red-600"}`}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Top Performing Automations</h3>
            <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">Last 7 Days</span>
          </div>
          <div>
            <div className="grid grid-cols-3 text-[10px] font-bold text-slate-400 uppercase mb-2 px-1">
              <span>Automation</span><span className="text-right">Executions</span><span className="text-right">Success Rate</span>
            </div>
            {[
              { name: "Bank Statement Rec.",     ex: 356, rate: "99.2%" },
              { name: "Expense Auto-Categ.",     ex: 198, rate: "98.9%" },
              { name: "Payment Reminder (OD)",   ex: 210, rate: "97.6%" },
              { name: "Invoice Zero Extraction", ex: 142, rate: "97.3%" },
              { name: "Vendor Payment Matching", ex: 96,  rate: "96.8%" },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-3 py-2 border-b border-slate-50 last:border-0 px-1">
                <span className="text-xs text-slate-600 truncate pr-2">{item.name}</span>
                <span className="text-xs font-semibold text-slate-700 text-right">{item.ex}</span>
                <span className="text-xs font-semibold text-emerald-600 text-right">{item.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

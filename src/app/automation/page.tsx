"use client";
import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  CheckCircle2, AlertTriangle, Clock, Zap, BarChart2, Play,
  Search, Filter, ChevronRight, ChevronLeft, Eye, Download,
  RefreshCw, Bell, Info, Shield, ArrowUpRight, ArrowDownRight,
  Calendar, Settings, MoreHorizontal, AlertCircle, Activity,
  Users, FileText, TrendingUp, Database
} from "lucide-react";

// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

type TabId = "overview" | "active" | "execution" | "activity" | "custom";

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────

const CategoryBadge = ({ cat }: { cat: string }) => {
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

const StatusDot = ({ status }: { status: string }) => {
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

const KpiCard = ({
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

const FilterBar = ({ extras }: { extras?: React.ReactNode }) => (
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

const Pagination = ({ total, page, setPage, perPage = 10 }: { total: string; page: number; setPage: (p: number) => void; perPage?: number }) => (
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

// ─── DATA ─────────────────────────────────────────────────────────────────────

const automationRows = [
  { name: "Bank Statement Reconciliation",  sub: "Auto match bank transactions",   cat: "Process Automation", trigger: "Bank Statement Uploaded",     purpose: "Auto reconcile bank entries",   status: "Active", lastExec: "16 May, 08:45 AM", rate: 99.2, execs: 398 },
  { name: "Payment Reminder (Overdue)",     sub: "Send reminder to overdue customers", cat: "Action Automation",  trigger: "Receivable Overdue (N Days)", purpose: "Improve collections",           status: "Active", lastExec: "16 May, 08:30 AM", rate: 97.6, execs: 210 },
  { name: "Expense Auto-Categorization",   sub: "Auto categorize expenses",        cat: "Process Automation", trigger: "Expense Voucher Created",     purpose: "Maintain accuracy",             status: "Active", lastExec: "16 May, 08:20 AM", rate: 98.9, execs: 188 },
  { name: "GST Due Date Alert",            sub: "Notify before GST filing due date", cat: "Action Automation",  trigger: "Scheduled (Daily)",           purpose: "Ensure compliance",             status: "Active", lastExec: "16 May, 07:02 AM", rate: 100,  execs: 84  },
  { name: "Cash Flow Threshold Alert",     sub: "Alert when cash below threshold", cat: "Control Automation", trigger: "Cash Balance Updated",        purpose: "Prevent cash shortfall",        status: "Active", lastExec: "16 May, 06:45 AM", rate: 97.2, execs: 72  },
  { name: "Vendor Payment Approval",       sub: "Auto route high value payments",  cat: "Control Automation", trigger: "Payment Created",             purpose: "Maintain approval policy",      status: "Active", lastExec: "15 May, 09:18 PM", rate: 98.7, execs: 64  },
  { name: "Inventory Reorder Alert",       sub: "Alert when stock below reorder level", cat: "Action Automation", trigger: "Stock Level Below Threshold", purpose: "Avoid stockouts",            status: "Active", lastExec: "15 May, 07:13 PM", rate: 96.3, execs: 48  },
  { name: "TDS Due Date Reminder",         sub: "Reminder for TDS deposit",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           purpose: "Ensure timely deposit",         status: "Active", lastExec: "15 May, 07:00 AM", rate: 100,  execs: 42  },
];

const execLogRows = [
  { id: "EXE-2025-05-16-001248", name: "Bank Statement Reconciliation",  sub: "Auto match bank transactions",   cat: "Process Automation", trigger: "Bank Statement Uploaded",     entity: "SB Auto Parts",    status: "Success",  execAt: "16 May 2025, 09:12 AM", dur: "2.3s",  records: 125 },
  { id: "EXE-2025-05-16-001247", name: "Payment Reminder (Overdue)",     sub: "Send reminder to overdue customers", cat: "Action Automation",  trigger: "Receivable Overdue (N Days)", entity: "SB Auto Pvt Ltd",  status: "Success",  execAt: "16 May 2025, 09:10 AM", dur: "1.84s", records: 18  },
  { id: "EXE-2025-05-16-001246", name: "Expense Auto-Categorization",   sub: "Auto categorize expenses",        cat: "Process Automation", trigger: "Expense Voucher Created",     entity: "SB Retail",        status: "Success",  execAt: "16 May 2025, 09:08 AM", dur: "1.62s", records: 37  },
  { id: "EXE-2025-05-16-001245", name: "GST Due Date Alert",            sub: "Notify before GST filing",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           entity: "SB Exports",       status: "Failed",   execAt: "16 May 2025, 09:00 AM", dur: "0.65s", records: 0   },
  { id: "EXE-2025-05-16-001244", name: "Cash Flow Threshold Alert",     sub: "Alert when cash below threshold", cat: "Control Automation", trigger: "Cash Balance Updated",        entity: "SB Logistics",     status: "Success",  execAt: "16 May 2025, 08:45 AM", dur: "1.3s",  records: 1   },
  { id: "EXE-2025-05-16-001243", name: "Vendor Payment Approval",       sub: "Auto route high value payments",  cat: "Control Automation", trigger: "Payment Created",             entity: "SB Motors",        status: "Success",  execAt: "16 May 2025, 09:30 AM", dur: "2.1s",  records: 1   },
  { id: "EXE-2025-05-16-001242", name: "Inventory Reorder Alert",       sub: "Alert when stock below reorder",  cat: "Action Automation",  trigger: "Stock Level Below Threshold", entity: "SB Utilities",     status: "Success",  execAt: "16 May 2025, 08:15 AM", dur: "1.08s", records: 6   },
  { id: "EXE-2025-05-16-001241", name: "TDS Due Date Reminder",         sub: "Reminder for TDS deposit",        cat: "Action Automation",  trigger: "Scheduled (Daily)",           entity: "SB Auto Exports",  status: "Failed",   execAt: "16 May 2025, 08:00 AM", dur: "0.76s", records: 0   },
  { id: "EXE-2025-05-16-001240", name: "Invoice Data Extraction",       sub: "Extract data from uploaded invoices", cat: "Process Automation", trigger: "Invoice Document Uploaded", entity: "SB Auto Parts",   status: "Success",  execAt: "16 May 2025, 07:50 AM", dur: "3.2s",  records: 42  },
  { id: "EXE-2025-05-16-001239", name: "Duplicate Payment Check",       sub: "Detect duplicate payments",       cat: "Process Automation", trigger: "Payment Created",             entity: "SB Retail",        status: "Success",  execAt: "16 May 2025, 07:40 AM", dur: "1.27s", records: 0   },
];

const activityRows = [
  { time: "16 May 2025\n08:12 AM", activity: "Bank statement uploaded\nFile: HDFC_00020025.csv",          automation: "Bank Statement Reconciliation",  cat: "Process Automation", entity: "SB Auto Parts",    status: "Success", triggeredBy: "System",     details: "513 transactions processed" },
  { time: "16 May 2025\n09:10 AM", activity: "Invoice INV-2025-1287 (3 days overdue)",                   automation: "Payment Reminder (Overdue)",     cat: "Action Automation",  entity: "SB Auto Pvt Ltd",  status: "Success", triggeredBy: "System",     details: "Reminder sent to customer" },
  { time: "16 May 2025\n09:08 AM", activity: "Expense categorized\nEXP-2025-0231",                       automation: "Expense Auto-Categorization",    cat: "Process Automation", entity: "SB Retail",        status: "Success", triggeredBy: "System",     details: "Category: Office Supplies" },
  { time: "16 May 2025\n09:00 AM", activity: "GST due date check failed\nReturn: GSTR-1\nMay 2025",      automation: "GST Due Date Alert",             cat: "Action Automation",  entity: "SB Exports",       status: "Failed",  triggeredBy: "System",     details: "Due date passed on 15 May 2025" },
  { time: "16 May 2025\n08:45 AM", activity: "Cash balance below threshold\nAvailable: ₹1,24,560",       automation: "Cash Flow Threshold Alert",      cat: "Control Automation", entity: "SB Logistics",     status: "Success", triggeredBy: "System",     details: "Alert sent to Finance team" },
  { time: "16 May 2025\n08:30 AM", activity: "Vendor payment created\nVEND-2025-1672",                   automation: "Vendor Payment Approval",        cat: "Control Automation", entity: "SB Motors",        status: "Success", triggeredBy: "John Patel", details: "Payment queued for approval" },
  { time: "16 May 2025\n08:15 AM", activity: "Stock below reorder level\nItem: Brake Pad - EP1228",      automation: "Inventory Reorder Alert",        cat: "Action Automation",  entity: "SB Utilities",     status: "Success", triggeredBy: "System",     details: "PO suggested to vendor" },
  { time: "16 May 2025\n08:00 AM", activity: "TDS deposit reminder sent\nChallan: CPF032456",            automation: "TDS Due Date Reminder",          cat: "Action Automation",  entity: "SB Auto Exports",  status: "Failed",  triggeredBy: "System",     details: "Email delivery failed" },
  { time: "16 May 2025\n07:50 AM", activity: "Invoice document captured\nINV-2025-1288.pdf",             automation: "Invoice Data Extraction",        cat: "Process Automation", entity: "SB Auto Parts",    status: "Success", triggeredBy: "System",     details: "Data extracted successfully" },
  { time: "16 May 2025\n07:13 AM", activity: "Duplicate payment detected\nRef: PAY-2025-9105",           automation: "Duplicate Payment Check",        cat: "Control Automation", entity: "SB Retail",        status: "Success", triggeredBy: "System",     details: "Marked as duplicate and skipped" },
];

const categoryPieData = [
  { name: "Process Automation",   value: 36, color: "#3b82f6" },
  { name: "Action Automation",    value: 28, color: "#8b5cf6" },
  { name: "Control Automation",   value: 22, color: "#f97316" },
  { name: "Data Automation",      value: 16, color: "#14b8a6" },
  { name: "Workflow Automation",  value: 10, color: "#6366f1" },
];

const activityPieData = [
  { name: "Success",             value: 312, color: "#22c55e" },
  { name: "Failed",              value: 28,  color: "#ef4444" },
  { name: "Manual Intervention", value: 16,  color: "#f97316" },
  { name: "Skipped",             value: 0,   color: "#94a3b8" },
];

const timelineData = [
  { time: "12AM", v: 4  }, { time: "2AM",  v: 2  }, { time: "4AM",  v: 6  },
  { time: "6AM",  v: 18 }, { time: "8AM",  v: 42 }, { time: "10AM", v: 58 },
  { time: "12PM", v: 65 }, { time: "2PM",  v: 48 }, { time: "4PM",  v: 72 },
  { time: "6PM",  v: 55 }, { time: "8PM",  v: 30 }, { time: "10PM", v: 14 },
];

const topActivities = [
  { name: "Bank Statement Reconciliation", count: 86 },
  { name: "Payment Reminder (Overdue)",    count: 64 },
  { name: "Expense Auto-Categorization",  count: 42 },
  { name: "Cash Flow Threshold Alert",    count: 28 },
];

// ─── TAB 1: OVERVIEW ──────────────────────────────────────────────────────────

function OverviewTab() {
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

// ─── TAB 2: ACTIVE AUTOMATIONS (READ-ONLY) ────────────────────────────────────

function ActiveAutomationsTab() {
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

// ─── TAB 3: EXECUTION LOG ─────────────────────────────────────────────────────

function ExecutionLogTab() {
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

// ─── TAB 4: ACTIVITY LOG ──────────────────────────────────────────────────────

function ActivityLogTab() {
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

// ─── TAB 5: PLACEHOLDER ───────────────────────────────────────────────────────

function CustomTab() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <Settings className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800">Your Custom Tab</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">This section is reserved for your custom content. Build and plug in your component here.</p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "overview",  label: "Overview" },
  { id: "active",    label: "Active Automations (Read-Only)" },
  { id: "execution", label: "Execution Log" },
  { id: "activity",  label: "Activity Log" },
  { id: "custom",    label: "Custom Tab" },
];

export default function AutomationDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="w-full bg-slate-50">
      {/* ── TOP NAV ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="px-6 py-5">
        {activeTab === "overview"  && <OverviewTab />}
        {activeTab === "active"    && <ActiveAutomationsTab />}
        {activeTab === "execution" && <ExecutionLogTab />}
        {activeTab === "activity"  && <ActivityLogTab />}
        {activeTab === "custom"    && <CustomTab />}
      </div>
    </div>
  );
}
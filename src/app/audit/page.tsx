"use client";

import React, { useState } from "react";
import {
  Building2, Calendar, Download, Bell, Settings, ChevronDown,
  Search, X, ChevronLeft, ChevronRight, MoreHorizontal,
  CheckCircle2, Clock, AlertTriangle, XCircle, RefreshCw,
  FileText, Database, Shield, Cpu, Lock, Zap, Eye,
  BookOpen, HelpCircle, Users, Activity,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────
type AuditTab = "audit" | "useractivity" | "system" | "datachange" | "automation" | "access" | "errors" | "version";
type ActionType = "Updated" | "Created" | "Deleted" | "Imported";

// ── Mock Data ─────────────────────────────────────────────
const auditTabs: { id: AuditTab; label: string }[] = [
  { id: "audit",        label: "Audit Trail"            },
  { id: "useractivity", label: "User Activity Logs"     },
  { id: "system",       label: "System Logs"            },
  { id: "datachange",   label: "Data Change Logs"       },
  { id: "automation",   label: "Automation Logs"        },
  { id: "access",       label: "Access Logs"            },
  { id: "errors",       label: "Error & Exception Logs" },
  { id: "version",      label: "Version History"        },
];

interface AuditRow {
  datetime: string;
  userName: string;
  userInitials: string;
  userColor: string;
  action: ActionType;
  module: string;
  reference: string;
  description: string;
  before: string;
  after: string;
  ip: string;
  source: string;
}

const auditRows: AuditRow[] = [
  {
    datetime: "16 May 2025, 10:32 AM",
    userName: "Vikram Mehta",
    userInitials: "VM",
    userColor: "bg-blue-500",
    action: "Updated",
    module: "Finance",
    reference: "VCH-005925",
    description: "Updated voucher amount Ledger: Salaries-Superme",
    before: "₹45,000.00",
    after: "₹52,500.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 10:15 AM",
    userName: "Ankit Kumar",
    userInitials: "AK",
    userColor: "bg-green-500",
    action: "Created",
    module: "Finance",
    reference: "VCH-005124",
    description: "Created payment voucher Party: ABC Motors",
    before: "—",
    after: "₹1,25,030.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:58 AM",
    userName: "Sneha Singh",
    userInitials: "SS",
    userColor: "bg-purple-500",
    action: "Deleted",
    module: "Finance",
    reference: "VCH-005023",
    description: "Deleted journal voucher Party: Mac Income",
    before: "₹18,000.00",
    after: "—",
    ip: "103.45.12.10",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:40 AM",
    userName: "Vikram Mehta",
    userInitials: "VM",
    userColor: "bg-blue-500",
    action: "Updated",
    module: "Master Data",
    reference: "LED-000345",
    description: "Updated ledger details Ledger: MAC Varma",
    before: "Active",
    after: "Inactive",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 09:18 AM",
    userName: "System",
    userInitials: "SY",
    userColor: "bg-gray-500",
    action: "Imported",
    module: "Data Sync",
    reference: "SYNC-003789",
    description: "Imported 56 vouchers from TallyPrime",
    before: "—",
    after: "56 records",
    ip: "System",
    source: "Integration",
  },
  {
    datetime: "16 May 2025, 09:35 AM",
    userName: "Ankit Kumar",
    userInitials: "AK",
    userColor: "bg-green-500",
    action: "Updated",
    module: "Finance",
    reference: "VCH-005022",
    description: "Updated tax amount Ledger: GST Outward",
    before: "₹7,200.00",
    after: "₹7,503.00",
    ip: "103.45.12.67",
    source: "Manual",
  },
  {
    datetime: "16 May 2025, 08:32 AM",
    userName: "Sneha Singh",
    userInitials: "SS",
    userColor: "bg-purple-500",
    action: "Created",
    module: "Finance",
    reference: "VCH-005021",
    description: "Created receipt voucher Party: XYZ Traders",
    before: "—",
    after: "₹80,000.00",
    ip: "103.45.12.10",
    source: "Manual",
  },
];

const actionConfig: Record<ActionType, { bg: string; text: string; dot: string }> = {
  Updated:  { bg: "bg-blue-50",   text: "text-blue-700",  dot: "bg-blue-500"   },
  Created:  { bg: "bg-green-50",  text: "text-green-700", dot: "bg-green-500"  },
  Deleted:  { bg: "bg-red-50",    text: "text-red-700",   dot: "bg-red-500"    },
  Imported: { bg: "bg-orange-50", text: "text-orange-700",dot: "bg-orange-500" },
};

const logSummary = [
  { label: "Total Logs",      value: "12,418" },
  { label: "Data Changes",    value: "3,214"  },
  { label: "Created",         value: "2,845"  },
  { label: "Updated",         value: "6,128"  },
  { label: "Deleted",         value: "1,485"  },
  { label: "Imported",        value: "1,258"  },
  { label: "Failed / Errors", value: "134",   highlight: true },
];

const topUsers = [
  { name: "Vikram Mehta", count: 2845 },
  { name: "Ankit Kumar",  count: 2212 },
  { name: "Sneha Singh",  count: 1980 },
  { name: "Leela Varma",  count: 1236 },
  { name: "Rohan Shah",   count: 845  },
];

const whatIsTracked = [
  { icon: Database,  color: "bg-blue-50",   tc: "text-blue-600",   label: "Data Changes",   sub: "Create, update, delete of\nvouchers, ledgers, masters." },
  { icon: Users,     color: "bg-green-50",  tc: "text-green-600",  label: "User Activities",sub: "Logins, logouts, report access,\nexports and more." },
  { icon: Cpu,       color: "bg-orange-50", tc: "text-orange-600", label: "System Events",  sub: "Data sync, migrations,\nbackground jobs." },
  { icon: Zap,       color: "bg-purple-50", tc: "text-purple-600", label: "Automations",    sub: "Automation triggers,\nexecutions and results." },
  { icon: Shield,    color: "bg-red-50",    tc: "text-red-500",    label: "Security Events",sub: "Access attempts, failures,\nand permission changes." },
];

// ── Sub-components ────────────────────────────────────────
function ActionBadge({ action }: { action: ActionType }) {
  const cfg = actionConfig[action];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${cfg.bg} ${cfg.text}`}>
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      {action}
    </span>
  );
}

function UserAvatar({ initials, color, size = "sm" }: { initials: string; color: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "size-6 text-[10px]" : "size-7 text-xs";
  return (
    <div className={`${sz} rounded-full ${color} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function SelectFilter({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">{label}</label>
      <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-xs font-medium text-gray-700 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 transition-colors min-w-[110px]">
        <span className="truncate">{options[0]}</span>
        <ChevronDown size={11} className="text-gray-400 shrink-0" />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function AuditLogs() {
  const [activeTab, setActiveTab] = useState<AuditTab>("audit");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">

      {/* ── Top Nav ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-gray-900">Audit &amp; Logs</h1>
            <p className="text-xs text-gray-400">Track, monitor and review all system activities, data changes and access logs.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Entity */}
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              <Building2 size={12} className="text-gray-400" /> All Entities (7)
              <ChevronDown size={11} className="text-gray-400" />
            </button>
            {/* Date */}
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              <Calendar size={12} className="text-gray-400" /> 01 Apr 2024 – 31 Mar 2025
              <ChevronDown size={11} className="text-gray-400" />
            </button>
            {/* Export */}
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Download size={12} /> Export
              <ChevronDown size={11} className="text-gray-400" />
            </button>
            {/* Alerts */}
            <button className="relative flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Bell size={12} /> Alerts
              <span className="absolute -top-1.5 -right-1.5 size-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">!</span>
            </button>
            {/* User */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5">
              <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">VM</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-700 leading-none">Vikram Mehta</p>
                <p className="text-[9px] text-gray-400">Admin</p>
              </div>
            </div>
            {/* Data Verified */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1.5">
              <CheckCircle2 size={12} className="text-green-600" />
              <div>
                <p className="text-[10px] font-bold text-green-800 leading-none">Data Verified</p>
                <p className="text-[9px] text-green-600">All data is up to date</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div className="overflow-x-auto border-t border-gray-100">
          <div className="flex px-4 md:px-6 min-w-max">
            {auditTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === t.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 md:p-6 flex gap-4 items-start">

        {/* ── Main (Left + Center) ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* ── Filters Panel ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-700 mb-3">Filters</p>
            <div className="flex flex-wrap gap-3 mb-3">
              <SelectFilter label="Date Range"      options={["01 Apr 2024 – 31 Mar 2025"]} />
              <SelectFilter label="User"            options={["All Users"]}                />
              <SelectFilter label="Entity"          options={["All Entities"]}             />
              <SelectFilter label="Action Type"     options={["All Actions"]}              />
              <SelectFilter label="Module"          options={["All Modules"]}              />
              <SelectFilter label="Reference Type"  options={["All Types"]}               />
            </div>

            {/* Search row */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex-1 relative min-w-[260px]">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by voucher ID, ledger, user or reference..."
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
                />
              </div>
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Settings size={12} /> More Filters
              </button>
              <button className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Clear All
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* ── Audit Trail Table ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-800">Audit Trail</h2>
                <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                  1,248 Records
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-400">Showing 1–25 of 1,248</p>
                {/* Pagination */}
                <div className="flex items-center gap-1">
                  <button className="size-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
                    <ChevronLeft size={11} className="text-gray-400" />
                  </button>
                  {[1,2,3,4,5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCurrentPage(n)}
                      className={`size-6 text-[10px] font-medium rounded border transition-all ${
                        currentPage === n
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="text-gray-400 text-xs px-0.5">...</span>
                  <button className="size-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
                    <ChevronRight size={11} className="text-gray-400" />
                  </button>
                </div>
                <select className="border border-gray-200 rounded-lg px-2 py-1 text-[10px] text-gray-600 bg-white focus:outline-none">
                  <option>25 / page</option>
                  <option>50 / page</option>
                  <option>100 / page</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Date & Time","User","Action","Module","Reference","Description / Change Summary","Before","After","IP Address","Source",""].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[10px] text-gray-400 font-bold uppercase tracking-wide whitespace-nowrap">
                        {h && (
                          <div className="flex items-center gap-1">
                            {h}
                            {!["Description / Change Summary",""].includes(h) && (
                              <Activity size={9} className="text-gray-300" />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {auditRows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap text-[11px]">{row.datetime}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <UserAvatar initials={row.userInitials} color={row.userColor} />
                          <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{row.userName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <ActionBadge action={row.action} />
                      </td>
                      <td className="px-3 py-3 text-gray-600 whitespace-nowrap text-[11px]">{row.module}</td>
                      <td className="px-3 py-3">
                        <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                          {row.reference}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-700 text-[11px] max-w-[200px]">
                        <p className="leading-snug">{row.description}</p>
                      </td>
                      <td className="px-3 py-3 text-gray-500 whitespace-nowrap text-[11px]">{row.before}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-[11px]">
                        <span className={row.after === "—" ? "text-gray-400" : row.action === "Deleted" ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                          {row.after}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-500 whitespace-nowrap text-[11px] font-mono">{row.ip}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          row.source === "Manual"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-purple-50 text-purple-700"
                        }`}>
                          {row.source}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                          <MoreHorizontal size={13} className="text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-gray-100 text-center">
              <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 mx-auto">
                View All Audit Trail Log <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* ── What is tracked ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <p className="text-sm font-bold text-gray-800 mb-4">What is tracked?</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {whatIsTracked.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className={`size-8 ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
                    <item.icon size={14} className={item.tc} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 leading-tight">{item.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug whitespace-pre-line">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="w-52 shrink-0 space-y-4">

          {/* Log Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-800 mb-3">Log Summary (MTD)</p>
            <div className="flex flex-col gap-0.5">
              {logSummary.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className={`text-xs font-bold ${s.highlight ? "text-red-600" : "text-gray-800"}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Active Users */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">Top Active Users</p>
            </div>
            <div className="flex flex-col gap-2">
              {topUsers.map((u, i) => (
                <div key={u.name} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-bold w-4">{i + 1}.</span>
                  <UserAvatar
                    initials={u.name.split(" ").map(n => n[0]).join("")}
                    color={["bg-blue-500","bg-green-500","bg-purple-500","bg-orange-500","bg-teal-500"][i]}
                  />
                  <span className="text-[11px] text-gray-700 font-medium flex-1 truncate">{u.name}</span>
                  <span className="text-[10px] font-bold text-gray-800">{u.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline mt-3 w-full justify-center border-t border-gray-100 pt-2">
              View All Users <ChevronRight size={11} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
            <div className="flex flex-col gap-0.5">
              {[
                { label: "Search Voucher",        Icon: FileText    },
                { label: "Search Ledger",          Icon: BookOpen    },
                { label: "View User Activity",     Icon: Users       },
                { label: "Export Audit Logs",      Icon: Download    },
                { label: "Schedule Audit Report",  Icon: Clock       },
              ].map(({ label, Icon }) => (
                <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <Icon size={12} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <span className="text-xs text-gray-700">{label}</span>
                  </div>
                  <ChevronRight size={11} className="text-gray-300 group-hover:text-gray-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle size={14} className="text-blue-500" />
              <p className="text-sm font-bold text-gray-800">Need Help?</p>
            </div>
            <p className="text-xs text-gray-400 mb-3">Learn more about Audit &amp; Logs</p>
            <button className="flex items-center justify-center gap-2 w-full border border-blue-200 text-blue-600 text-xs font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <BookOpen size={12} /> View Help Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
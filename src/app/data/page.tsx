"use client";

import React, { useState } from "react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  RefreshCw, Bell, Settings, Building2, CheckCircle2,
  Clock, AlertTriangle, XCircle, ChevronRight, MoreHorizontal,
  Database, FileText, BarChart2, Layers, Upload, Activity,
  Wrench, AlertCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────
type SyncTab = "sync" | "consistency" | "errors" | "conflict" | "mapping" | "history" | "importexport" | "health";
type SyncStatus = "Synced" | "Pending" | "Failed" | "Not Configured";

// ── Mock Data ─────────────────────────────────────────────
const syncTabs: { id: SyncTab; label: string; Icon: React.ElementType }[] = [
  { id: "sync",         label: "Sync Status",         Icon: RefreshCw    },
  { id: "consistency",  label: "Data Consistency",     Icon: CheckCircle2 },
  { id: "errors",       label: "Error Logs",           Icon: AlertTriangle},
  { id: "conflict",     label: "Conflict Resolution",  Icon: AlertCircle  },
  { id: "mapping",      label: "Data Mapping",         Icon: Layers       },
  { id: "history",      label: "Sync History",         Icon: Clock        },
  { id: "importexport", label: "Import / Export",      Icon: Upload       },
  { id: "health",       label: "Data Health",          Icon: Activity     },
];

const overallSync = {
  score: 98,
  label: "Healthy",
  synced: 6,
  pending: 1,
  failed: 0,
  notConfigured: 0,
};

const lastSync = {
  time: "Today, 08:45 AM",
  date: "17 May 2025",
  nextScheduled: "Today, 01:00 PM",
  nextDate: "17 May 2025",
};

const totalEntities = { total: 7, active: 7, inactive: 0, archived: 0 };
const totalRecords = { total: "2,45,678", vouchers: "1,25,890", ledgers: "18,765", masters: "1,01,023" };
const healthScore = { score: 94, trend: "+4" };

const entitySyncRows: {
  name: string; type: string; lastSync: string; status: SyncStatus;
  records: string; pending: number; health: number; color: string;
}[] = [
  { name: "SB Auto Pvt Ltd",  type: "Company", lastSync: "Today, 08:45 AM", status: "Synced",          records: "43,678", pending: 0,  health: 98, color: "#3b82f6" },
  { name: "SB Auto Parts",    type: "Company", lastSync: "Today, 08:42 AM", status: "Synced",          records: "28,934", pending: 0,  health: 97, color: "#8b5cf6" },
  { name: "SB Auto Exports",  type: "Company", lastSync: "Today, 08:41 AM", status: "Synced",          records: "32,156", pending: 2,  health: 92, color: "#f97316" },
  { name: "SB Retail",        type: "Company", lastSync: "Today, 08:40 AM", status: "Synced",          records: "22,341", pending: 0,  health: 99, color: "#22c55e" },
  { name: "SB Logistics",     type: "Company", lastSync: "Today, 08:38 AM", status: "Synced",          records: "19,876", pending: 0,  health: 95, color: "#f59e0b" },
  { name: "SB Utilities",     type: "Company", lastSync: "Today, 08:35 AM", status: "Pending",         records: "12,345", pending: 24, health: 88, color: "#06b6d4" },
  { name: "SB Motors",        type: "Company", lastSync: "–",               status: "Not Configured",  records: "0",      pending: 0,  health: 0,  color: "#6b7280" },
];

const syncActivity = [
  { entity: "SB Auto Pvt Ltd", time: "Today, 08:45 AM", status: "Success" as const },
  { entity: "SB Auto Parts",   time: "Today, 08:42 AM", status: "Success" as const },
  { entity: "SB Auto Exports", time: "Today, 08:41 AM", status: "Success" as const },
  { entity: "SB Retail",       time: "Today, 08:40 AM", status: "Success" as const },
  { entity: "SB Utilities",    time: "Today, 08:30 AM", status: "Pending" as const },
  { entity: "SB Motors",       time: "18 May 2025, 11:20 PM", status: "Failed" as const },
];

const recordSyncData = [
  { name: "Vouchers", value: 125890, pct: 51.2, color: "#3b82f6" },
  { name: "Ledgers",  value: 18765,  pct: 7.6,  color: "#22c55e" },
  { name: "Masters",  value: 101023, pct: 41.1, color: "#f97316" },
];

const topChanges = [
  { name: "Sales Voucher",    icon: "📄", count: 1245 },
  { name: "Payment Voucher",  icon: "💳", count: 687  },
  { name: "Purchase Voucher", icon: "🛒", count: 816  },
  { name: "Journal Voucher",  icon: "📒", count: 423  },
  { name: "Ledger Updated",   icon: "📊", count: 212  },
];

const syncPerfData = [
  { date: "13 May", pct: 92 },
  { date: "14 May", pct: 95 },
  { date: "15 May", pct: 88 },
  { date: "16 May", pct: 96 },
  { date: "17 May", pct: 94 },
  { date: "18 May", pct: 97 },
  { date: "19 May", pct: 93 },
];

// ── Status Config ─────────────────────────────────────────
const statusConfig: Record<SyncStatus, { icon: React.ElementType; color: string; bg: string; dot: string }> = {
  "Synced":         { icon: CheckCircle2, color: "text-green-700",  bg: "bg-green-50  border-green-200", dot: "bg-green-500"  },
  "Pending":        { icon: Clock,        color: "text-amber-700",  bg: "bg-amber-50  border-amber-200", dot: "bg-amber-500"  },
  "Failed":         { icon: XCircle,      color: "text-red-700",    bg: "bg-red-50    border-red-200",   dot: "bg-red-500"    },
  "Not Configured": { icon: AlertTriangle,color: "text-gray-600",   bg: "bg-gray-50   border-gray-200",  dot: "bg-gray-400"   },
};

const activityConfig = {
  "Success": { color: "text-green-600 bg-green-50", icon: CheckCircle2 },
  "Pending":  { color: "text-amber-600 bg-amber-50", icon: Clock        },
  "Failed":   { color: "text-red-600 bg-red-50",     icon: XCircle      },
};

// ── Sub-components ────────────────────────────────────────
function StatCard({ icon: Icon, iconBg, label, value, sub, subItems }: {
  icon: React.ElementType; iconBg: string; label: string; value: string;
  sub?: string; subItems?: { label: string; value: string | number; color?: string }[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start gap-3">
        <div className={`size-8 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
          <Icon size={15} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 leading-tight">{label}</p>
          <p className="text-xl font-bold text-gray-900 leading-tight mt-0.5">{value}</p>
          {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
        </div>
      </div>
      {subItems && (
        <div className="mt-3 grid grid-cols-3 gap-1.5 pt-3 border-t border-gray-50">
          {subItems.map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-xs font-bold ${s.color || "text-gray-800"}`}>{s.value}</p>
              <p className="text-[9px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HealthDonut({ score }: { score: number }) {
  const data = [
    { name: "Score", value: score,       color: "#22c55e" },
    { name: "Rest",  value: 100 - score, color: "#f3f4f6" },
  ];
  return (
    <div className="relative" style={{ width: 80, height: 80 }}>
      <ResponsiveContainer width={80} height={80}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={38} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
            {data.map((_, i) => <Cell key={i} fill={data[i].color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold text-gray-900 leading-none">{score}</span>
        <span className="text-[8px] text-gray-400">/100</span>
      </div>
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-2.5 text-xs">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }} className="font-medium">
          {p.name}: <span className="text-gray-800">{p.value}{p.name === "pct" ? "%" : ""}</span>
        </p>
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────
export default function DataSection() {
  const [activeTab, setActiveTab] = useState<SyncTab>("sync");

  return (
    <div className="w-full bg-[#f8f9fc]">

      {/* ── Top Nav ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-gray-900">Data</h1>
            <p className="text-xs text-gray-400">Data sync, integrity and management</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Entities dropdown */}
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <Building2 size={12} /> All Entities (7)
              <ChevronRight size={12} className="rotate-90 text-gray-400" />
            </button>
            {/* Sync Status */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">All Synced</span>
              <RefreshCw size={11} className="text-green-500" />
            </div>
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors">
              <RefreshCw size={12} /> Sync Now
            </button>
            <button className="relative border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-50">
              <Bell size={13} /> Alerts
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">13</span>
            </button>
            <button className="border border-gray-200 rounded-lg p-1.5 hover:bg-gray-50">
              <Settings size={14} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1">
              <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">VM</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-700 leading-none">Vikram Mehta</p>
                <p className="text-[9px] text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sub Tabs ── */}
        <div className="overflow-x-auto border-t border-gray-100">
          <div className="flex px-4 md:px-6 min-w-max">
            {syncTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === t.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <t.Icon size={12} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 md:p-6 space-y-4">

        {/* ── Top Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

          {/* Overall Sync Status */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-700">Overall Sync Status</p>
            </div>
            <div className="flex items-center gap-3">
              <HealthDonut score={overallSync.score} />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-gray-600">Synced</span>
                  <span className="text-[10px] font-bold text-gray-800 ml-auto">{overallSync.synced}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-amber-400" />
                  <span className="text-[10px] text-gray-600">Pending</span>
                  <span className="text-[10px] font-bold text-gray-800 ml-auto">{overallSync.pending}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-red-500" />
                  <span className="text-[10px] text-gray-600">Failed</span>
                  <span className="text-[10px] font-bold text-gray-800 ml-auto">{overallSync.failed}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-gray-300" />
                  <span className="text-[10px] text-gray-600">Not Config.</span>
                  <span className="text-[10px] font-bold text-gray-800 ml-auto">{overallSync.notConfigured}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {overallSync.score}% {overallSync.label}
              </span>
            </div>
          </div>

          {/* Last Successful Sync */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-700 mb-3">Last Successful Sync</p>
            <div className="flex flex-col gap-2">
              <div className="bg-green-50 border border-green-100 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className="text-[10px] font-bold text-green-700">{lastSync.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 pl-4">{lastSync.date}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1">Next Scheduled Sync</p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock size={12} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-700">{lastSync.nextScheduled}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 pl-4">{lastSync.nextDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Entities */}
          <StatCard
            icon={Building2}
            iconBg="bg-blue-500"
            label="Total Entities"
            value={String(totalEntities.total)}
            subItems={[
              { label: "Active",   value: totalEntities.active,   color: "text-green-600" },
              { label: "Inactive", value: totalEntities.inactive, color: "text-gray-500"  },
              { label: "Archived", value: totalEntities.archived, color: "text-gray-400"  },
            ]}
          />

          {/* Total Records */}
          <StatCard
            icon={Database}
            iconBg="bg-purple-500"
            label="Total Records (All Time)"
            value={totalRecords.total}
            subItems={[
              { label: "Vouchers", value: totalRecords.vouchers, color: "text-blue-600"  },
              { label: "Ledgers",  value: totalRecords.ledgers,  color: "text-green-600" },
              { label: "Masters",  value: totalRecords.masters,  color: "text-orange-600"},
            ]}
          />

          {/* Data Health Score */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-bold text-gray-700 mb-2">Data Health Score</p>
            <div className="flex items-center justify-between">
              <HealthDonut score={healthScore.score} />
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                  +{healthScore.trend} vs Last Week
                </span>
              </div>
            </div>
            <div className="mt-3">
              <ResponsiveContainer width="100%" height={40}>
                <AreaChart data={syncPerfData}>
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="pct" stroke="#22c55e" strokeWidth={1.5} fill="url(#healthGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Entity Sync Overview Table ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Entity Sync Overview</h2>
            <button className="p-1 hover:bg-gray-50 rounded-md">
              <MoreHorizontal size={14} className="text-gray-400" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-gray-100">
                <tr className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  {["Entity Name","Type","Last Sync Time","Sync Status","Records Synced","Pending Records","Data Health","Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {entitySyncRows.map((row) => {
                  const sc = statusConfig[row.status];
                  return (
                    <tr key={row.name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: row.color + "20" }}>
                            <Building2 size={11} style={{ color: row.color }} />
                          </div>
                          <span className="font-semibold text-gray-800 whitespace-nowrap">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {row.lastSync === "–" ? <span className="text-gray-300">–</span> : row.lastSync}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.bg} ${sc.color}`}>
                          <sc.icon size={9} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800">{row.records}</td>
                      <td className="px-4 py-3">
                        {row.pending > 0 ? (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{row.pending}</span>
                        ) : (
                          <span className="text-gray-300">0</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {row.health > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
                              <div
                                className="h-1.5 rounded-full transition-all"
                                style={{
                                  width: `${row.health}%`,
                                  backgroundColor: row.health >= 95 ? "#22c55e" : row.health >= 88 ? "#f59e0b" : "#ef4444"
                                }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-gray-700">{row.health}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-300 text-xs">–</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors" title="Refresh">
                            <RefreshCw size={11} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors" title="View">
                            <BarChart2 size={11} className="text-gray-400" />
                          </button>
                          {row.status === "Not Configured" ? (
                            <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-semibold transition-colors">
                              Configure
                            </button>
                          ) : (
                            <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                              <MoreHorizontal size={11} className="text-gray-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-50 text-center">
            <button className="text-xs text-blue-600 hover:underline">View All Entities →</button>
          </div>
        </div>

        {/* ── Bottom 4-column Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Sync Activity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Sync Activity <span className="text-gray-400 font-normal">(Last 24 Hours)</span></h2>
              <a href="#" className="text-[10px] text-blue-600">View All</a>
            </div>
            <div className="flex flex-col gap-2">
              {syncActivity.map((a, i) => {
                const cfg = activityConfig[a.status];
                return (
                  <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                    <div className={`size-6 rounded-lg ${cfg.color.split(" ")[1]} flex items-center justify-center shrink-0 mt-0.5`}>
                      <cfg.icon size={11} className={cfg.color.split(" ")[0]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-gray-700 leading-tight truncate">{a.entity}</p>
                      <p className="text-[9px] text-gray-400">{a.time}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${cfg.color}`}>
                      {a.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Record Sync Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-xs font-bold text-gray-800 mb-3">Record Sync Summary <span className="text-gray-400 font-normal">(All Entities)</span></h2>
            <div className="flex items-center gap-3">
              <div className="relative shrink-0" style={{ width: 110, height: 110 }}>
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie data={recordSyncData} cx="50%" cy="50%" innerRadius={36} outerRadius={52} dataKey="value" paddingAngle={2} stroke="none">
                      {recordSyncData.map((_, i) => <Cell key={i} fill={recordSyncData[i].color} />)}
                    </Pie>
                    <Tooltip
                      formatter={(v: any, n: any) => [v?.toLocaleString() ?? "0", n]}
                      contentStyle={{ borderRadius: 8, fontSize: 10 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-gray-900">2,45,678</span>
                  <span className="text-[8px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {recordSyncData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600 flex-1">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-800">{d.value.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400">({d.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Data Changes */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Top Data Changes <span className="text-gray-400 font-normal">(Last 24 Hours)</span></h2>
              <a href="#" className="text-[10px] text-blue-600">View All</a>
            </div>
            <div className="flex flex-col gap-2">
              {topChanges.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.icon}</span>
                    <span className="text-[11px] text-gray-700 font-medium">{c.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-900">{c.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Performance */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Sync Performance <span className="text-gray-400 font-normal">(Last 7 Days)</span></h2>
              <a href="#" className="text-[10px] text-blue-600">View Report</a>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={syncPerfData}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 8, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 8, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(v: any) => [`${v}%`, "Success Rate"]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11 }}
                />
                <Area
                  type="monotone"
                  dataKey="pct"
                  name="pct"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#perfGrad)"
                  dot={{ r: 3, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 1.5 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[10px] text-gray-400 border-t border-gray-200 pt-3 pb-1">
          <p>📦 Data Source: TallyPrime (ODBC)</p>
          <p>🕐 Last Full Sync: 16 May 2025, 11:00 PM</p>
          <p>🌍 Timezone: Asia/Kolkata</p>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={11} /> Sync Settings
          </button>
        </div>
      </div>
    </div>
  );
}
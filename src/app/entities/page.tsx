"use client";

import React, { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, Wallet, Users, ShoppingCart, Building2,
  RefreshCw, Bell, Settings, ChevronDown, ArrowUpRight,
  ArrowDownRight, CheckCircle2, AlertTriangle, X, Filter,
  Download, MoreHorizontal, Gauge,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────
type Tab = "overview" | "financial" | "profitability" | "cash" | "receivables" | "payables" | "intercompany" | "performance" | "risk" | "capital" | "reports";

// ── Mock Data ─────────────────────────────────────────────
const entities = [
  { id: "all", label: "All Entities" },
  { id: "single", label: "Single Entity" },
  { id: "custom", label: "Custom Selection" },
];

const selectedEntities = ["SB Auto Pvt Ltd","SB Auto Parts","SB Auto Exports","SB Retail","SB Logistics"];

const tabs: { id: Tab; label: string }[] = [
  { id: "overview",      label: "Overview" },
  { id: "financial",     label: "Financial Summary" },
  { id: "profitability", label: "Profitability" },
  { id: "cash",          label: "Cash & Liquidity" },
  { id: "receivables",   label: "Receivables" },
  { id: "payables",      label: "Payables" },
  { id: "intercompany",  label: "Inter-Company" },
  { id: "performance",   label: "Performance" },
  { id: "risk",          label: "Risk & Compliance" },
  { id: "capital",       label: "Capital Allocation" },
  { id: "reports",       label: "Reports" },
];

const statCards = [
  { label: "Total Revenue (MTD)",       value: "₹1.84Cr", change: "+12%", up: true,  Icon: TrendingUp,  iconBg: "bg-blue-500"   },
  { label: "Total Profit (MTD)",        value: "₹24.6L",  change: "+8%",  up: true,  Icon: TrendingUp,  iconBg: "bg-green-500"  },
  { label: "Total Cash in Hand",        value: "₹38.2L",  change: "-3%",  up: false, Icon: Wallet,      iconBg: "bg-purple-500" },
  { label: "Total Outstanding (AR)",    value: "₹62.4L",  change: "+5%",  up: false, Icon: Users,       iconBg: "bg-orange-500" },
  { label: "Total Payables (AP)",       value: "₹44.8L",  change: "-2%",  up: true,  Icon: ShoppingCart,iconBg: "bg-red-500"    },
  { label: "Net Worth (All Entities)",  value: "₹2.42Cr", change: "+9%",  up: true,  Icon: Building2,   iconBg: "bg-teal-500"   },
];

const entityColors = ["#3b82f6","#8b5cf6","#f97316","#22c55e","#f59e0b","#ef4444","#06b6d4"];
const entityPerf = [
  { name: "SB Auto Pvt Ltd",  rev: "₹42.1L", cash: "₹8.5L",  arOut: "₹14.2L", apOut: "₹8.4L", profit: "14.7%", health: "Healthy", hc: "text-green-600 bg-green-50",  color: "#3b82f6" },
  { name: "SB Auto Parts",    rev: "₹28.4L", cash: "₹5.2L",  arOut: "₹9.8L",  apOut: "₹6.1L", profit: "13.4%", health: "Healthy", hc: "text-green-600 bg-green-50",  color: "#8b5cf6" },
  { name: "SB Auto Exports",  rev: "₹22.6L", cash: "₹4.1L",  arOut: "₹8.4L",  apOut: "₹5.2L", profit: "12.8%", health: "Planning",hc: "text-blue-600 bg-blue-50",    color: "#f97316" },
  { name: "SB Retail",        rev: "₹19.6L", cash: "₹3.8L",  arOut: "₹7.2L",  apOut: "₹4.8L", profit: "10.7%", health: "Healthy", hc: "text-green-600 bg-green-50",  color: "#22c55e" },
  { name: "SB Logistics",     rev: "₹14.2L", cash: "₹2.4L",  arOut: "₹5.8L",  apOut: "₹3.6L", profit: "10.6%", health: "Planning",hc: "text-blue-600 bg-blue-50",    color: "#f59e0b" },
  { name: "SB Utilities",     rev: "₹9.4L",  cash: "₹1.8L",  arOut: "₹4.2L",  apOut: "₹2.8L", profit: "9.2%",  health: "Warning", hc: "text-amber-600 bg-amber-50",  color: "#ef4444" },
  { name: "SB Motors",        rev: "₹6.8L",  cash: "₹1.2L",  arOut: "₹3.1L",  apOut: "₹2.1L", profit: "8.8%",  health: "At Risk", hc: "text-red-600 bg-red-50",      color: "#06b6d4" },
];

const revByEntityData = entityPerf.map((e) => ({
  name: e.name.replace("SB ",""),
  value: parseFloat(e.rev.replace("₹","").replace("L",""))
}));

const profitByEntityData = entityPerf.map((e) => ({
  name: e.name.replace("SB ",""),
  value: parseFloat(e.profit.replace("%",""))
}));

const cashByEntityData = entityPerf.map((e, i) => ({
  name: e.name.replace("SB ",""),
  amount: parseFloat(e.cash.replace("₹","").replace("L","")),
  color: entityColors[i],
}));

const healthScoreData = [
  { name: "80–100 Healthy", value: 4, color: "#22c55e" },
  { name: "60–80 Stable",   value: 2, color: "#3b82f6" },
  { name: "40–60 Warning",  value: 1, color: "#f59e0b" },
  { name: "20–40 At Risk",  value: 0, color: "#f97316" },
  { name: "0–20 Critical",  value: 0, color: "#ef4444" },
];

const topContributors = [
  { name: "SB Auto Pvt Ltd", contribution: "₹42.1L", up: true  },
  { name: "SB Auto Parts",   contribution: "₹28.4L", up: true  },
  { name: "SB Auto Exports", contribution: "₹22.6L", up: false },
  { name: "SB Retail",       contribution: "₹19.6L", up: true  },
];

const topConsumers = [
  { name: "SB Auto Pvt Ltd", consumption: "₹18.4L", up: false },
  { name: "SB Utilities",    consumption: "₹12.8L", up: false },
  { name: "SB Logistics",    consumption: "₹9.6L",  up: true  },
  { name: "SB Motors",       consumption: "₹8.2L",  up: false },
];

const atRiskEntities = [
  { name: "SB Motors",    risk: "Low Cash",      level: "High"   },
  { name: "SB Utilities", risk: "High AR Aging", level: "Medium" },
];

const cashContribData = [
  { entity: "SB Auto Pvt Ltd",  inflow: 42, outflow: 28, net: 14 },
  { entity: "SB Auto Parts",    inflow: 28, outflow: 18, net: 10 },
  { entity: "SB Auto Exports",  inflow: 22, outflow: 16, net: 6  },
  { entity: "SB Retail",        inflow: 19, outflow: 14, net: 5  },
];

const interCompany = {
  transactions: "₹14.2L",
  eliminatedRevenue: "₹8.4L",
  eliminatedExpenses: "₹6.2L",
  netImpact: "₹2.1L",
};

const healthGaugeScore = 72;

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-2.5 text-xs">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || p.fill }} className="font-medium">
          {p.name}: <span className="text-gray-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ── Semi-circular gauge ───────────────────────────────────
function GaugeChart({ score }: { score: number }) {
  const angle = (score / 100) * 180 - 90;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 80, cy = 80, r = 55;
  const zones = [
    { from: -90, to: -54, color: "#ef4444" },
    { from: -54, to: -18, color: "#f97316" },
    { from: -18, to:  18, color: "#f59e0b" },
    { from:  18, to:  54, color: "#3b82f6" },
    { from:  54, to:  90, color: "#22c55e" },
  ];
  const arc = (from: number, to: number) => {
    const r1 = 38, r2 = 55;
    const x1 = cx + r2 * Math.cos(toRad(from));
    const y1 = cy + r2 * Math.sin(toRad(from));
    const x2 = cx + r2 * Math.cos(toRad(to));
    const y2 = cy + r2 * Math.sin(toRad(to));
    const x3 = cx + r1 * Math.cos(toRad(to));
    const y3 = cy + r1 * Math.sin(toRad(to));
    const x4 = cx + r1 * Math.cos(toRad(from));
    const y4 = cy + r1 * Math.sin(toRad(from));
    return `M ${x1} ${y1} A ${r2} ${r2} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 0 0 ${x4} ${y4} Z`;
  };
  const nx = cx + (r - 6) * Math.cos(toRad(angle));
  const ny = cy + (r - 6) * Math.sin(toRad(angle));
  return (
    <svg width={160} height={100} viewBox="0 0 160 100">
      {zones.map((z, i) => (
        <path key={i} d={arc(z.from, z.to)} fill={z.color} opacity={0.85} />
      ))}
      <circle cx={cx} cy={cy} r={5} fill="#374151" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#374151" strokeWidth={2.5} strokeLinecap="round" />
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1f2937">{score}</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize={8} fill="#6b7280">/100</text>
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function MultiEntityView() {
  const [entityView, setEntityView] = useState("all");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [compareMode, setCompareMode] = useState<"consolidated" | "compare">("consolidated");

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">

      {/* ── Top Nav ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Multi-Entity Overview</h1>
            <p className="text-xs text-gray-400">Consolidated financial overview across your businesses</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sync Status */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-700">All Synced</span>
              <RefreshCw size={12} className="text-green-500 ml-1" />
            </div>
            {/* Alerts */}
            <button className="relative flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
              <Bell size={14} className="text-gray-500" />
              <span className="text-xs text-gray-600">Alerts</span>
              <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">10</span>
            </button>
            <button className="border border-gray-200 rounded-lg p-1.5 hover:bg-gray-50">
              <Settings size={14} className="text-gray-500" />
            </button>
            {/* Avatar */}
            <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">VM</span>
            </div>
            {/* Save View */}
            <button className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">
              <Download size={12} /> Save View
            </button>
          </div>
        </div>

        {/* ── Entity Controls ── */}
        <div className="px-4 md:px-6 py-2 flex flex-col md:flex-row md:items-center gap-3 border-t border-gray-100">
          {/* Entity View toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
            {entities.map((e) => (
              <button
                key={e.id}
                onClick={() => setEntityView(e.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  entityView === e.id ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>

          {/* Selected Entity Chips */}
          <div className="flex items-center gap-1.5 flex-wrap flex-1">
            {selectedEntities.map((e, i) => (
              <span key={e} className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium border"
                style={{ borderColor: entityColors[i] + "40", backgroundColor: entityColors[i] + "15", color: entityColors[i] }}>
                {e}
                <X size={9} className="opacity-60 cursor-pointer" />
              </span>
            ))}
            <button className="flex items-center gap-1 px-2 py-1 border border-dashed border-gray-300 rounded-lg text-[10px] text-gray-400 hover:border-gray-400 transition-colors">
              <Filter size={9} /> +2 more
            </button>
          </div>

          {/* Comparison Mode */}
          <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5 shrink-0">
            {(["consolidated","compare"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setCompareMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  compareMode === m ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="overflow-x-auto">
          <div className="flex px-4 md:px-6 border-t border-gray-100 gap-0 min-w-max">
            {tabs.map((t) => (
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
      <div className="p-4 md:p-6 space-y-4">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statCards.map((c) => (
            <div key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[10px] text-gray-500 leading-tight">{c.label}</p>
                <div className={`size-6 ${c.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                  <c.Icon size={11} className="text-white" />
                </div>
              </div>
              <p className="text-base font-bold text-gray-900 leading-tight">{c.value}</p>
              <div className="flex items-center gap-0.5 mt-1">
                {c.up ? <ArrowUpRight size={11} className="text-green-500" /> : <ArrowDownRight size={11} className="text-red-500" />}
                <span className={`text-[10px] font-semibold ${c.up ? "text-green-600" : "text-red-500"}`}>{c.change}</span>
                <span className="text-[10px] text-gray-400 ml-0.5">vs Last Month</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Entity Performance Summary ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Entity Performance Summary (MTD)</h2>
            <div className="flex items-center gap-2">
              <button className="text-xs text-blue-600 hover:underline">View All Entities →</button>
              <button className="p-1 hover:bg-gray-50 rounded-md">
                <MoreHorizontal size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-gray-100">
                <tr className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  {["Entity","Revenue","Cash","Cash in Hand","AR Outstanding","AP Outstanding","Net Profit %","Health"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {entityPerf.map((e, i) => (
                  <tr key={e.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: e.color + "20" }}>
                          <Building2 size={11} style={{ color: e.color }} />
                        </div>
                        <span className="font-semibold text-gray-800 whitespace-nowrap">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-800">{e.rev}</td>
                    <td className="px-4 py-3 text-gray-600">––</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{e.cash}</td>
                    <td className="px-4 py-3 font-bold text-orange-600">{e.arOut}</td>
                    <td className="px-4 py-3 font-bold text-red-500">{e.apOut}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">{e.profit}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${e.hc}`}>{e.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Revenue by Entity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-bold text-gray-800">Revenue by Entity (MTD)</h2>
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-lg">MTD ▾</span>
            </div>
            <div className="flex gap-4">
              <div style={{ width: 160, height: 160 }} className="shrink-0 relative">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={revByEntityData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={2} stroke="none">
                      {revByEntityData.map((_, i) => <Cell key={i} fill={entityColors[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`₹${v}L`, ""]} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-1.5 justify-center flex-1">
                {revByEntityData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: entityColors[i] }} />
                    <span className="text-[10px] text-gray-600 flex-1 truncate">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-800">₹{d.value}L</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profit by Entity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Profit by Entity (MTD)</h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={profitByEntityData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip formatter={(v: number) => [`${v}%`, "Profit %"]} contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="value" name="Profit %" radius={[4,4,0,0]}>
                  {profitByEntityData.map((_, i) => <Cell key={i} fill={entityColors[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Cash + Health Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Cash in Hand by Entity */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Cash in Hand by Entity</h2>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 text-[10px] text-gray-400 font-medium uppercase pb-1 border-b border-gray-100">
                <span>Entity</span>
                <span className="col-span-2 text-right">Amount (₹)</span>
              </div>
              {cashByEntityData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-600 w-24 shrink-0">{d.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${(d.amount / 8.5) * 100}%`, backgroundColor: d.color }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 w-10 text-right">₹{d.amount}L</span>
                </div>
              ))}
            </div>
          </div>

          {/* Entity Health Score */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Entity Health Score</h2>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center">
                <GaugeChart score={healthGaugeScore} />
                <p className="text-[10px] text-gray-400 text-center mt-1">Avg. Health Score</p>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {healthScoreData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="size-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600 flex-1">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Cash Contribution + Top Contributors + Consumers + At Risk ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Cash Contribution */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Cash Contribution (vs Consumption)</h2>
              <div className="flex gap-1">
                {["MTD","FTD"].map((t) => (
                  <button key={t} className={`px-2 py-0.5 rounded text-[10px] font-medium ${t === "MTD" ? "bg-blue-50 text-blue-600" : "text-gray-400"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-gray-400 font-medium grid grid-cols-4 pb-1 border-b border-gray-100 gap-1">
              <span>Entity</span><span>Cash Inflow</span><span>Cash Outflow</span><span>Net Contribution</span>
            </div>
            {cashContribData.map((d) => (
              <div key={d.entity} className="grid grid-cols-4 gap-1 py-1.5 border-b border-gray-50 last:border-0 items-center">
                <div className="flex items-center gap-1">
                  <div className="size-4 rounded bg-blue-50 flex items-center justify-center"><Building2 size={8} className="text-blue-500" /></div>
                </div>
                <span className="text-[10px] text-green-600 font-bold">₹{d.inflow}L</span>
                <span className="text-[10px] text-red-500 font-bold">₹{d.outflow}L</span>
                <div className="flex items-center gap-0.5">
                  <ArrowUpRight size={9} className="text-green-500" />
                  <span className="text-[10px] font-bold text-gray-800">₹{d.net}L</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Top Contributors (MTD)</h2>
              <a href="#" className="text-[10px] text-blue-600">View All</a>
            </div>
            <div className="text-[10px] text-gray-400 font-medium grid grid-cols-3 pb-1 border-b border-gray-100">
              <span className="col-span-2">Entity</span><span className="text-right">Contribution (₹)</span>
            </div>
            {topContributors.map((d) => (
              <div key={d.name} className="grid grid-cols-3 py-2 border-b border-gray-50 last:border-0 items-center">
                <div className="col-span-2 flex items-center gap-1.5">
                  <div className="size-5 rounded bg-green-50 flex items-center justify-center"><Building2 size={9} className="text-green-500" /></div>
                  <span className="text-[10px] text-gray-700 font-medium">{d.name}</span>
                </div>
                <div className="flex items-center justify-end gap-0.5">
                  {d.up ? <ArrowUpRight size={10} className="text-green-500" /> : <ArrowDownRight size={10} className="text-red-500" />}
                  <span className="text-[10px] font-bold text-gray-800">{d.contribution}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Consumers */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">Top Consumers (MTD)</h2>
              <a href="#" className="text-[10px] text-blue-600">View All</a>
            </div>
            <div className="text-[10px] text-gray-400 font-medium grid grid-cols-3 pb-1 border-b border-gray-100">
              <span className="col-span-2">Entity</span><span className="text-right">Consumption (₹)</span>
            </div>
            {topConsumers.map((d) => (
              <div key={d.name} className="grid grid-cols-3 py-2 border-b border-gray-50 last:border-0 items-center">
                <div className="col-span-2 flex items-center gap-1.5">
                  <div className="size-5 rounded bg-red-50 flex items-center justify-center"><Building2 size={9} className="text-red-500" /></div>
                  <span className="text-[10px] text-gray-700 font-medium">{d.name}</span>
                </div>
                <div className="flex items-center justify-end gap-0.5">
                  {d.up ? <ArrowUpRight size={10} className="text-green-500" /> : <ArrowDownRight size={10} className="text-red-500" />}
                  <span className="text-[10px] font-bold text-gray-800">{d.consumption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* At Risk Entities */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-800">At Risk Entities</h2>
              <a href="#" className="text-[10px] text-blue-600">View All</a>
            </div>
            <div className="text-[10px] text-gray-400 font-medium grid grid-cols-3 pb-1 border-b border-gray-100">
              <span>Entity</span><span className="text-center">Risk</span><span className="text-right">Risk Reason</span>
            </div>
            {atRiskEntities.map((d) => (
              <div key={d.name} className="grid grid-cols-3 py-2 border-b border-gray-50 last:border-0 items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded bg-red-50 flex items-center justify-center"><AlertTriangle size={9} className="text-red-500" /></div>
                  <span className="text-[10px] text-gray-700 font-medium">{d.name}</span>
                </div>
                <span className={`text-[10px] font-bold text-center ${d.level === "High" ? "text-red-600" : "text-amber-500"}`}>{d.level}</span>
                <span className="text-[10px] text-gray-500 text-right leading-tight">{d.risk}</span>
              </div>
            ))}
            {atRiskEntities.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No entities at risk</p>
            )}
          </div>
        </div>

        {/* ── Inter-Company Summary ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-gray-800 mb-3">Inter-Company Summary (MTD)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Inter-Company Transactions", value: interCompany.transactions, color: "text-blue-600",  bg: "bg-blue-50"  },
                  { label: "Eliminated Revenue",         value: interCompany.eliminatedRevenue,  color: "text-red-500",   bg: "bg-red-50"   },
                  { label: "Eliminated Expenses",        value: interCompany.eliminatedExpenses, color: "text-orange-500",bg: "bg-orange-50"},
                  { label: "Net Inter-Company Impact",   value: interCompany.netImpact,          color: "text-green-600", bg: "bg-green-50" },
                ].map((c) => (
                  <div key={c.label} className={`${c.bg} rounded-xl p-3`}>
                    <p className="text-[10px] text-gray-500 mb-1 leading-tight">{c.label}</p>
                    <p className={`text-sm font-bold ${c.color}`}>{c.value}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      <ArrowDownRight size={10} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">vs Last Month</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Info box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 max-w-xs">
              <p className="text-xs font-bold text-blue-800 mb-1">💡 What is Inter-Company?</p>
              <p className="text-[10px] text-blue-700 leading-relaxed">
                Transactions between entities in the selected group are eliminated in consolidated view to avoid double counting.
              </p>
              <a href="#" className="text-[10px] text-blue-600 font-semibold mt-1 inline-block hover:underline">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
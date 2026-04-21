"use client";

import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Droplets, Users, ShoppingCart, TrendingUp, BarChart2,
  Zap, ListChecks, Shield, FileCheck, Building2, PieChartIcon,
  LineChartIcon, ChevronRight, Plus, ArrowUpRight, ArrowDownRight,
  AlertTriangle, CheckCircle2, Clock, Calendar,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────
const cashFlowData = [
  { date: "Apr 1",  inflow: 42, outflow: 28 },
  { date: "Apr 8",  inflow: 38, outflow: 32 },
  { date: "Apr 15", inflow: 55, outflow: 25 },
  { date: "Apr 22", inflow: 47, outflow: 35 },
  { date: "Apr 29", inflow: 60, outflow: 28 },
  { date: "May 6",  inflow: 52, outflow: 40 },
  { date: "May 13", inflow: 65, outflow: 30 },
];

const revExpData = [
  { date: "Apr 1",  revenue: 80, expense: 55 },
  { date: "Apr 8",  revenue: 72, expense: 60 },
  { date: "Apr 15", revenue: 95, expense: 52 },
  { date: "Apr 22", revenue: 88, expense: 65 },
  { date: "Apr 29", revenue: 105, expense: 58 },
  { date: "May 6",  revenue: 92, expense: 70 },
  { date: "May 13", revenue: 118, expense: 62 },
];

const agingData = [
  { date: "Apr 1",  d30: 30, d60: 18, d90: 12, d120: 8 },
  { date: "Apr 8",  d30: 35, d60: 20, d90: 10, d120: 6 },
  { date: "Apr 15", d30: 28, d60: 22, d90: 15, d120: 9 },
  { date: "Apr 22", d30: 40, d60: 16, d90: 11, d120: 7 },
  { date: "Apr 29", d30: 33, d60: 24, d90: 13, d120: 5 },
];

const agingDonutData = [
  { name: "0–30 Days",   value: 42, color: "#22c55e" },
  { name: "31–60 Days",  value: 28, color: "#f59e0b" },
  { name: "61–90 Days",  value: 18, color: "#f97316" },
  { name: "91–120 Days", value: 8,  color: "#ef4444" },
  { name: "120+ Days",   value: 4,  color: "#7c3aed" },
];

const collectionTrendData = [
  { month: "Nov", rate: 82 }, { month: "Dec", rate: 78 },
  { month: "Jan", rate: 85 }, { month: "Feb", rate: 80 },
  { month: "Mar", rate: 88 }, { month: "Apr", rate: 91 },
  { month: "May", rate: 87 },
];

const spendData = [
  { month: "Nov", actual: 65, budget: 70 },
  { month: "Dec", actual: 72, budget: 70 },
  { month: "Jan", actual: 68, budget: 75 },
  { month: "Feb", actual: 80, budget: 75 },
  { month: "Mar", actual: 74, budget: 80 },
  { month: "Apr", actual: 85, budget: 80 },
  { month: "May", actual: 78, budget: 85 },
];

const topCostCenters = [
  { name: "Operations",  amount: "₹18.2L" },
  { name: "Sales",       amount: "₹12.5L" },
  { name: "HR & Admin",  amount: "₹9.8L"  },
  { name: "IT & Infra",  amount: "₹6.4L"  },
];

const actions = [
  { priority: "HIGH",   action: "Approve vendor payment",     type: "Payment",  impact: "₹4.2L",  risk: "High"   },
  { priority: "HIGH",   action: "Review overdue AR aging",     type: "Review",   impact: "₹8.1L",  risk: "High"   },
  { priority: "MEDIUM", action: "Renew GST filing – May",     type: "Compliance",impact: "₹1.5L",  risk: "Medium" },
  { priority: "LOW",    action: "Reconcile bank statement",    type: "Recon",    impact: "₹0.8L",  risk: "Low"    },
];

const riskMetrics = [
  { label: "Liquidity Risk",      level: "High",   bars: [1,1,1,1,0], color: "bg-red-500"    },
  { label: "Receivable Risk",     level: "High",   bars: [1,1,1,1,0], color: "bg-red-500"    },
  { label: "Compliance Risk",     level: "Medium", bars: [1,1,1,0,0], color: "bg-amber-400"  },
  { label: "Expense Volatility",  level: "Low",    bars: [1,1,0,0,0], color: "bg-green-500"  },
];

const entities = [
  { name: "SB Auto Pvt Ltd",  revenue: "₹42.1L", profit: "₹6.2L",  cash: "₹8.5L"  },
  { name: "SB Auto Parts",    revenue: "₹28.4L", profit: "₹3.8L",  cash: "₹5.2L"  },
  { name: "SB Retail",        revenue: "₹19.6L", profit: "₹2.1L",  cash: "₹3.8L"  },
  { name: "SB Logistics",     revenue: "₹14.2L", profit: "₹1.5L",  cash: "₹2.4L"  },
];

const priorityColor: Record<string, string> = {
  HIGH:   "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW:    "bg-green-100 text-green-700",
};
const riskBadge: Record<string, string> = {
  High:   "text-red-500",
  Medium: "text-amber-500",
  Low:    "text-green-500",
};

// ── Section Card ──────────────────────────────────────────
function SectionCard({
  num, icon: Icon, title, iconBg, children,
}: {
  num: string; icon: React.ElementType; title: string; iconBg: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className={`size-7 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-gray-700 tracking-wide">
            {num}. {title}
          </span>
        </div>
        <ChevronRight size={14} className="text-gray-400" />
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}

// ── KV Row ────────────────────────────────────────────────
function KVRow({ label, value, sub, valueColor = "text-gray-800" }: { label: string; value: string; sub?: string; valueColor?: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-xs text-gray-400 leading-tight">{label}</p>
      <p className={`text-base font-bold ${valueColor} leading-tight`}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

// ── Risk Bars ─────────────────────────────────────────────
function RiskBars({ bars, color }: { bars: number[]; color: string }) {
  return (
    <div className="flex gap-0.5">
      {bars.map((active, i) => (
        <div key={i} className={`h-3 w-3 rounded-sm ${active ? color : "bg-gray-100"}`} />
      ))}
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-gray-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────
export default function OwnerDashboard() {
  const [activeTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-3 md:p-5 font-sans">
      {/* ── Grid Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">

        {/* ── 1. Cash & Liquidity ── */}
        <SectionCard num="1" icon={Droplets} title="Cash & Liquidity" iconBg="bg-blue-500">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <KVRow label="Net Cash Available" value="₹12.4L" />
            <KVRow label="Runway" value="47 days" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-blue-50 rounded-xl p-2.5">
              <p className="text-xs text-blue-500 font-medium">Bank Balance</p>
              <p className="text-base font-bold text-blue-700">₹18.6L</p>
            </div>
            <div className="bg-green-50 rounded-xl p-2.5">
              <p className="text-xs text-green-500 font-medium">Cash In Hand</p>
              <p className="text-base font-bold text-green-700">₹2.1L</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium mb-1.5">Upcoming Outflows</p>
          <div className="flex gap-2">
            {["7 Days","30 Days"].map((d) => (
              <div key={d} className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
                <p className="text-xs text-orange-400">{d}</p>
                <p className="text-sm font-bold text-orange-600">{d === "7 Days" ? "₹4.2L" : "₹14.8L"}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 4. Profit Snapshot ── */}
        <SectionCard num="4" icon={TrendingUp} title="Profit Snapshot" iconBg="bg-green-500">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Revenue (MTD)",     value: "₹82.4L", color: "text-blue-600"  },
              { label: "Expenses (MTD)",    value: "₹54.2L", color: "text-red-500"   },
              { label: "Net Profit (MTD)",  value: "₹28.2L", color: "text-green-600" },
              { label: "Adjusted Profit",   value: "₹24.8L", color: "text-purple-600"},
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-sm text-gray-400 leading-tight mb-0.5">{s.label}</p>
                <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 5. Revenue Quality ── */}
        <SectionCard num="5" icon={BarChart2} title="Revenue Quality" iconBg="bg-cyan-500">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Booked Revenue",     value: "₹82.4L" },
              { label: "Collected Revenue",  value: "₹74.1L" },
              { label: "Leakage %",          value: "10.1%", color: "text-red-500" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-sm text-gray-400">{s.label}</p>
                <p className={`text-base font-bold ${s.color || "text-gray-800"}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-1">Collection Efficiency Trend</p>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={collectionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[70, 100]} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2.5, fill: "#fff", stroke: "#3b82f6", strokeWidth: 1.5 }} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* ── 8. Risk Engine ── */}
        <SectionCard num="8" icon={Shield} title="Risk Engine" iconBg="bg-red-500">
          <div className="flex flex-col gap-2.5">
            {riskMetrics.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-2">
                <p className="text-sm text-gray-600 flex-1 leading-tight">{r.label}</p>
                <RiskBars bars={r.bars} color={r.color} />
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  r.level === "High" ? "border-red-200 text-red-600 bg-red-50" :
                  r.level === "Medium" ? "border-amber-200 text-amber-600 bg-amber-50" :
                  "border-green-200 text-green-600 bg-green-50"
                }`}>{r.level}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 9. Compliance Status ── */}
        <SectionCard num="9" icon={FileCheck} title="Compliance Status" iconBg="bg-amber-500">
          <div className="flex flex-col gap-2.5">
            {[
              { label: "GST",  status: "Ready" },
              { label: "TDS",  status: "Ready" },
              { label: "Upcoming Deadlines", status: "3" },
              { label: "Filing Blockers", status: "2", alert: true },
            ].map((c) => (
              <div key={c.label} className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{c.label}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  c.status === "Ready" ? "bg-green-100 text-green-700" :
                  c.alert ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-600"
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 11. Capital Allocation ── */}
        <SectionCard num="11" icon={PieChartIcon} title="Capital Allocation" iconBg="bg-purple-500">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Available Capital", value: "₹24.5L", color: "text-green-600", bg: "bg-green-50" },
              { label: "Locked Capital",    value: "₹18.2L", color: "text-red-600",   bg: "bg-red-50"   },
              { label: "Deployable Capital",value: "₹6.3L",  color: "text-blue-600",  bg: "bg-blue-50"  },
            ].map((c) => (
              <div key={c.label} className={`${c.bg} rounded-xl p-2.5 text-center`}>
                <p className="text-xs text-gray-500 leading-tight mb-0.5">{c.label}</p>
                <p className={`text-sm font-bold ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium mb-2">Suggested Allocation</p>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { icon: "📦", label: "Inventory", pct: "35%" },
              { icon: "📈", label: "Growth",    pct: "25%" },
              { icon: "💰", label: "Reserve",   pct: "25%" },
              { icon: "⚠️", label: "Payables",  pct: "15%" },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center bg-gray-50 rounded-lg p-2 gap-1">
                <span className="text-lg">{a.icon}</span>
                <p className="text-sm text-gray-500 text-center leading-tight">{a.label}</p>
                <p className="text-base font-bold text-gray-700">{a.pct}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── Row 2: Receivables | Expense Intelligence | Multi-Entity ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">

        {/* ── 2. Receivables Pressure ── */}
        <SectionCard num="2" icon={Users} title="Receivables Pressure" iconBg="bg-orange-500">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <KVRow label="Total Outstanding" value="₹38.4L" />
            <KVRow label="Overdue Amount" value="₹14.2L" valueColor="text-red-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium mb-2">Aging Snapshot</p>
          <div className="flex gap-3 items-center">
            <div style={{ width: 90, height: 90 }} className="shrink-0">
              <ResponsiveContainer width={90} height={90}>
                <PieChart>
                  <Pie data={agingDonutData} cx="50%" cy="50%" innerRadius={26} outerRadius={42} dataKey="value" paddingAngle={2} stroke="none">
                    {agingDonutData.map((_, i) => <Cell key={i} fill={agingDonutData[i].color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ borderRadius: 8, fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {agingDonutData.map((d) => (
                <div key={d.name} className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <div className="size-2 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-gray-500">{d.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-700">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium mt-3 mb-1.5">Top 5 Delayed Clients</p>
          <div className="flex flex-col gap-1">
            {["Alpha Corp","Beta Mfg","Gamma Ltd","Delta Inc","Epsilon Co"].map((name, i) => (
              <div key={name} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-full bg-orange-100 flex items-center justify-center">
                    <Users size={10} className="text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-600">{name}</span>
                </div>
                <span className="text-xs font-bold text-red-500">₹{[3.2,2.8,2.1,1.9,1.4][i]}L</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 6. Expense Intelligence ── */}
        <SectionCard num="6" icon={Zap} title="Expense Intelligence" iconBg="bg-yellow-500">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Total Spend (MTD)", value: "₹54.2L" },
              { label: "Budget (MTD)",       value: "₹58.0L" },
              { label: "Variance",           value: "+6.6%", color: "text-green-600" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-sm text-gray-400">{s.label}</p>
                <p className={`text-base font-bold ${s.color || "text-gray-800"}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-1.5">Spend vs Budget</p>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={spendData} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="actual" name="Actual" fill="#f97316" radius={[2,2,0,0]} />
              <Bar dataKey="budget" name="Budget" fill="#d1d5db" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mb-1.5 mt-2">Top Cost Centers / Categories</p>
          <div className="flex flex-col gap-1.5">
            {topCostCenters.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-yellow-400" />
                  <span className="text-sm text-gray-600">{c.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-700">{c.amount}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 10. Multi-Entity Overview ── */}
        <SectionCard num="10" icon={Building2} title="Multi-Entity Overview" iconBg="bg-indigo-500">
          <div className="mb-1">
            <div className="grid grid-cols-4 text-sm text-gray-400 font-medium uppercase tracking-wide pb-1.5 border-b border-gray-100">
              <span>Entity</span>
              <span className="text-right">Revenue</span>
              <span className="text-right">Profit</span>
              <span className="text-right">Cash</span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-gray-50">
            {entities.map((e) => (
              <div key={e.name} className="grid grid-cols-4 items-center py-2">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                    <Building2 size={12} className="text-indigo-500" />
                  </div>
                  <span className="text-sm text-gray-600 leading-tight truncate">{e.name}</span>
                </div>
                <span className="text-base font-bold text-gray-800 text-right">{e.revenue}</span>
                <span className="text-base font-bold text-green-600 text-right">{e.profit}</span>
                <span className="text-base font-bold text-blue-600 text-right">{e.cash}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── Row 3: Payables | Actions Panel ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">

        {/* ── 3. Payables Pressure ── */}
        <SectionCard num="3" icon={ShoppingCart} title="Payables Pressure" iconBg="bg-red-500">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <KVRow label="Total Payables" value="₹28.6L" />
            <KVRow label="Due Soon" value="₹8.4L" valueColor="text-orange-600" />
          </div>
          <p className="text-xs text-gray-400 font-medium mb-1.5">Critical Payments (Next 7 Days)</p>
          <div className="flex flex-col gap-1.5 mb-3">
            {["Supplier A","Supplier B","Supplier C"].map((s, i) => (
              <div key={s} className="flex items-center justify-between bg-red-50 rounded-lg px-2.5 py-1.5">
                <span className="text-sm text-gray-700">{s}</span>
                <span className="text-sm font-bold text-red-600">{["₹3.2L","₹2.1L","₹1.8L"][i]}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium mb-1.5">Top Vendors by Exposure</p>
          <div className="flex flex-col gap-1">
            {["Vendor X","Vendor Y","Vendor Z","Vendor W","Vendor V"].map((v, i) => (
              <div key={v} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 rounded-full bg-red-100 flex items-center justify-center">
                    <ShoppingCart size={9} className="text-red-500" />
                  </div>
                  <span className="text-xs text-gray-600">{v}</span>
                </div>
                <span className="text-xs font-bold text-gray-700">₹{[5.4,4.2,3.8,2.9,2.1][i]}L</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 7. Actions Panel ── */}
        <div className="md:col-span-2">
          <SectionCard num="7" icon={ListChecks} title="Actions Panel (Top Priorities)" iconBg="bg-blue-600">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100">
                    {["Priority","Action","Type","Impact (Cash)","Risk Reduction"].map((h) => (
                      <th key={h} className="text-left pb-2 pr-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {actions.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 pr-3">
                        <span className={`px-2 py-0.5 rounded text-sm font-bold ${priorityColor[a.priority]}`}>
                          {a.priority}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-gray-700 font-medium text-base">{a.action}</td>
                      <td className="py-2.5 pr-3 text-gray-500 text-sm">{a.type}</td>
                      <td className="py-2.5 pr-3 font-bold text-gray-800 text-base">{a.impact}</td>
                      <td className="py-2.5">
                        <span className={`text-sm font-bold ${riskBadge[a.risk]}`}>● {a.risk}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="#" className="flex items-center justify-center gap-1 mt-3 text-sm text-blue-600 py-2 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors">
              View All Actions <ChevronRight size={14} />
            </a>
          </SectionCard>
        </div>
      </div>

      {/* ── Row 4: Trends Overview ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="size-7 rounded-lg bg-teal-500 flex items-center justify-center">
            <LineChartIcon size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-gray-700 tracking-wide">12. Trends Overview</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cash Flow Trend */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-2">
              Cash Flow Trend (Inflow vs Outflow)
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-green-400 inline-block" />Inflow</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-red-400 inline-block" />Outflow</span>
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={cashFlowData} barSize={10} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="inflow"  name="Inflow"  fill="#22c55e" radius={[2,2,0,0]} />
                <Bar dataKey="outflow" name="Outflow" fill="#f87171" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Expense */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-2">
              Revenue vs Expense Trend
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500 inline-block" />Revenue</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-red-400 inline-block" />Expense</span>
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={revExpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="expense"  name="Expense"  stroke="#f87171" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Receivables Aging Trend */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-2">
              Receivables Aging Trend
              {["0–30","31–60","61–90","91–120"].map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  <span className="size-2 rounded-full inline-block" style={{ backgroundColor: ["#22c55e","#f59e0b","#f97316","#ef4444"][i] }} />
                  <span className="text-xs">{l}</span>
                </span>
              ))}
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={agingData} barSize={8} barGap={1}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="d30"  name="0–30"    stackId="a" fill="#22c55e" />
                <Bar dataKey="d60"  name="31–60"   stackId="a" fill="#f59e0b" />
                <Bar dataKey="d90"  name="61–90"   stackId="a" fill="#f97316" />
                <Bar dataKey="d120" name="91–120+"  stackId="a" fill="#ef4444" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 size-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-50">
        <Plus size={22} />
      </button>
    </div>
  );
}
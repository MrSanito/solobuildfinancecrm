"use client";

import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, Banknote, Building2,
  Users, ShoppingCart, ChevronRight, Plus, ArrowUpRight,
  ArrowDownRight, FileText, BookOpen, BarChart2, PieChartIcon,
  CreditCard, Receipt, CheckCircle2, AlertCircle, RefreshCw,
  Wallet, Activity,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type TabId = "accounting" | "vouchers" | "banking" | "inventory" | "manufacturing" | "logistics" | "payroll" | "compliance" | "masters" | "settings";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const incomeExpenseTrend = [
  { month: "Apr 24", revenue: 62,  expenses: 48 },
  { month: "May 24", revenue: 58,  expenses: 52 },
  { month: "Jun 24", revenue: 75,  expenses: 55 },
  { month: "Jul 24", revenue: 68,  expenses: 50 },
  { month: "Aug 24", revenue: 82,  expenses: 60 },
  { month: "Sep 24", revenue: 78,  expenses: 58 },
  { month: "Oct 24", revenue: 90,  expenses: 65 },
  { month: "Nov 24", revenue: 85,  expenses: 62 },
  { month: "Dec 24", revenue: 102, expenses: 72 },
  { month: "Jan 25", revenue: 95,  expenses: 68 },
  { month: "Feb 25", revenue: 112, expenses: 74 },
  { month: "Mar 25", revenue: 118, expenses: 80 },
];

const recentTransactions = [
  { date: "16 May 25", voucher: "SAL-2025-1248", type: "Sales",    particulars: "Invoice to Alpha Corp",    account: "Debtors A/c",       debit: "—",       credit: "₹82,400", amount: "₹82,400", createdBy: "Ravi M.",    status: "Synced" },
  { date: "16 May 25", voucher: "PUR-2025-0842", type: "Purchase", particulars: "Purchase from Vendor X",   account: "Creditors A/c",     debit: "₹54,200", credit: "—",       amount: "₹54,200", createdBy: "Priya S.",   status: "Synced" },
  { date: "16 May 25", voucher: "PAY-2025-0631", type: "Payment",  particulars: "Vendor payment – May",     account: "Bank A/c – HDFC",   debit: "₹28,000", credit: "—",       amount: "₹28,000", createdBy: "System",     status: "Pending Sync" },
  { date: "15 May 25", voucher: "REC-2025-0419", type: "Receipt",  particulars: "Collection from Beta Mfg", account: "Bank A/c – ICICI",  debit: "—",       credit: "₹38,400", amount: "₹38,400", createdBy: "Mira S.",    status: "Synced" },
  { date: "15 May 25", voucher: "JNL-2025-0187", type: "Journal",  particulars: "Depreciation entry",        account: "Depreciation A/c",  debit: "₹6,200",  credit: "₹6,200",  amount: "₹6,200",  createdBy: "System",     status: "Synced" },
];

const typeStyle: Record<string, string> = {
  Sales:    "bg-blue-100 text-blue-700",
  Purchase: "bg-orange-100 text-orange-700",
  Payment:  "bg-green-100 text-green-700",
  Receipt:  "bg-teal-100 text-teal-700",
  Journal:  "bg-purple-100 text-purple-700",
};

const statusStyle: Record<string, string> = {
  "Synced":       "bg-green-100 text-green-700",
  "Pending Sync": "bg-orange-100 text-orange-700",
};

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon, iconBg, iconColor, label, value, vs, trend,
}: {
  icon: any; iconBg: string; iconColor: string;
  label: string; value: string; vs: string; trend: "up" | "down";
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 font-medium leading-tight">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
      <div className="flex items-center gap-1">
        {trend === "up"
          ? <ArrowUpRight className="w-3 h-3 text-green-500" />
          : <ArrowDownRight className="w-3 h-3 text-red-500" />}
        <p className={`text-[11px] font-medium ${trend === "up" ? "text-green-600" : "text-red-500"}`}>{vs}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{children}</p>;
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-600 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-gray-800">₹{p.value}L</span>
        </p>
      ))}
    </div>
  );
};

// ─── ACCOUNTING TAB ───────────────────────────────────────────────────────────
function AccountingTab() {
  return (
    <div className="space-y-4">

      {/* ── Row 1: 7 KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <KpiCard icon={TrendingUp}   iconBg="bg-green-50"   iconColor="text-green-600"  label="Net Profit (MTD)"           value="₹28.2L" vs="vs Last Month ↑12.4%" trend="up" />
        <KpiCard icon={BarChart2}    iconBg="bg-blue-50"    iconColor="text-blue-600"   label="Revenue (MTD)"              value="₹82.4L" vs="vs Last Month ↑8.6%"  trend="up" />
        <KpiCard icon={Activity}     iconBg="bg-red-50"     iconColor="text-red-500"    label="Total Expenses (MTD)"       value="₹54.2L" vs="vs Last Month ↑4.2%"  trend="down" />
        <KpiCard icon={Wallet}       iconBg="bg-teal-50"    iconColor="text-teal-600"   label="Cash in Hand"               value="₹2.1L"  vs="vs Last Month ↓1.8%"  trend="down" />
        <KpiCard icon={Building2}    iconBg="bg-indigo-50"  iconColor="text-indigo-600" label="Bank Balance"               value="₹18.6L" vs="vs Last Month ↑5.2%"  trend="up" />
        <KpiCard icon={Users}        iconBg="bg-orange-50"  iconColor="text-orange-600" label="Outstanding Receivables"    value="₹38.4L" vs="vs Last Month ↑3.1%"  trend="up" />
        <KpiCard icon={ShoppingCart} iconBg="bg-purple-50"  iconColor="text-purple-600" label="Outstanding Payables"       value="₹28.6L" vs="vs Last Month ↓2.4%"  trend="down" />
      </div>

      {/* ── Row 2: P&L | Trend Chart | Balance Sheet ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-3">

        {/* P&L Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Profit &amp; Loss (MTD)</SectionLabel>
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { label: "Revenue",           value: "₹82.4L", color: "text-gray-800", bold: false },
              { label: "Cost of Goods Sold",value: "₹42.6L", color: "text-gray-800", bold: false },
              { label: "Gross Profit",      value: "₹39.8L", color: "text-green-600", bold: true  },
              { label: "Expenses",          value: "₹11.6L", color: "text-gray-800", bold: false },
              { label: "Other Income",      value: "₹0.4L",  color: "text-gray-800", bold: false },
              { label: "Net Profit",        value: "₹28.2L", color: "text-blue-600",  bold: true  },
            ].map((row) => (
              <div key={row.label} className={`flex items-center justify-between py-2 ${row.label === "Net Profit" ? "bg-blue-50 -mx-4 px-4 rounded-b-xl mt-1" : ""}`}>
                <span className={`text-xs ${row.bold ? "font-bold text-gray-800" : "text-gray-600"}`}>{row.label}</span>
                <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income & Expense Trend */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Income &amp; Expense Trend</SectionLabel>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded inline-block" />Revenue</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400 rounded inline-block" />Expenses</span>
              </div>
              <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none">
                <option>MTD</option><option>YTD</option><option>Last 12M</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={incomeExpenseTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[0, 130]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="revenue"  name="Revenue"  stroke="#3b82f6" strokeWidth={2} dot={{ r: 2.5, fill: "#fff", stroke: "#3b82f6", strokeWidth: 1.5 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#f87171" strokeWidth={2} dot={{ r: 2.5, fill: "#fff", stroke: "#f87171", strokeWidth: 1.5 }} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Balance Sheet Snapshot */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Balance Sheet Snapshot</SectionLabel>
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { label: "Total Assets",       value: "₹1.24Cr", color: "text-gray-800", bg: "" },
              { label: "Total Liabilities",  value: "₹68.4L",  color: "text-gray-800", bg: "" },
              { label: "Net Worth",          value: "₹55.6L",  color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Current Assets",     value: "₹82.4L",  color: "text-gray-800", bg: "" },
              { label: "Current Liabilities",value: "₹48.2L",  color: "text-gray-800", bg: "" },
            ].map((row) => (
              <div key={row.label} className={`flex items-center justify-between py-2 ${row.bg ? `${row.bg} -mx-4 px-4` : ""}`}>
                <span className={`text-xs ${row.label === "Net Worth" ? "font-bold text-gray-800" : "text-gray-600"}`}>{row.label}</span>
                <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Top Accounts | Cash Flow | Entry Stats | Recent Vouchers ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">

        {/* Top 5 Income Accounts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Top 5 Income Accounts (MTD)</SectionLabel>
          <div className="flex flex-col gap-2">
            {[
              { n: 1, name: "Sales – Auto Parts",   val: "₹42.4L" },
              { n: 2, name: "Sales – Retail",        val: "₹18.6L" },
              { n: 3, name: "Service Revenue",       val: "₹12.2L" },
              { n: 4, name: "Export Sales",          val: "₹8.4L"  },
              { n: 5, name: "Other Income",          val: "₹0.8L"  },
            ].map((row) => (
              <div key={row.n} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4">{row.n}.</span>
                  <span className="text-xs text-gray-600 truncate">{row.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800 shrink-0">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Expense Accounts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Top 5 Expense Accounts (MTD)</SectionLabel>
          <div className="flex flex-col gap-2">
            {[
              { n: 1, name: "COGS – Auto Parts",  val: "₹28.2L" },
              { n: 2, name: "Employee Salaries",  val: "₹9.8L"  },
              { n: 3, name: "Logistics & Freight",val: "₹6.4L"  },
              { n: 4, name: "Rent & Utilities",   val: "₹4.2L"  },
              { n: 5, name: "Marketing",          val: "₹2.8L"  },
            ].map((row) => (
              <div key={row.n} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4">{row.n}.</span>
                  <span className="text-xs text-gray-600 truncate">{row.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-800 shrink-0">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Cash Flow (MTD)</SectionLabel>
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { label: "Cash Inflows",   value: "₹68.4L",  color: "text-gray-800", bg: ""         },
              { label: "Cash Outflows",  value: "₹54.2L",  color: "text-gray-800", bg: ""         },
              { label: "Net Cash Flow",  value: "₹14.2L",  color: "text-blue-600", bg: "bg-blue-50", bold: true },
              { label: "Opening Cash",   value: "₹6.5L",   color: "text-gray-800", bg: ""         },
              { label: "Closing Cash",   value: "₹20.7L",  color: "text-green-600",bg: ""         },
            ].map((row) => (
              <div key={row.label} className={`flex items-center justify-between py-2 ${(row as any).bg ? `-mx-4 px-4 ${(row as any).bg}` : ""}`}>
                <span className={`text-xs ${(row as any).bold ? "font-bold text-gray-800" : "text-gray-600"}`}>{row.label}</span>
                <span className={`text-xs font-bold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entry Statistics */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Entry Statistics (MTD)</SectionLabel>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: FileText,    iconBg: "bg-blue-50",   iconColor: "text-blue-500",   label: "Total Vouchers",     value: "1,248" },
              { icon: BookOpen,    iconBg: "bg-purple-50",  iconColor: "text-purple-500", label: "Manual Vouchers",    value: "842"   },
              { icon: RefreshCw,   iconBg: "bg-green-50",   iconColor: "text-green-500",  label: "Auto Vouchers",      value: "406"   },
              { icon: AlertCircle, iconBg: "bg-red-50",     iconColor: "text-red-500",    label: "Cancelled Vouchers", value: "12"    },
              { icon: Activity,    iconBg: "bg-orange-50",  iconColor: "text-orange-500", label: "Pending Sync",       value: "28"    },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md ${row.iconBg} flex items-center justify-center shrink-0`}>
                    <row.icon className={`w-3 h-3 ${row.iconColor}`} />
                  </div>
                  <span className="text-xs text-gray-600">{row.label}</span>
                </div>
                <span className="text-xs font-bold text-gray-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Vouchers */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Recent Vouchers</SectionLabel>
          <div className="flex flex-col gap-2">
            {[
              { type: "Sales",    icon: TrendingUp,   iconBg: "bg-blue-50",    iconColor: "text-blue-500",  sub: "SAL-2025-1248",   val: "₹82,400" },
              { type: "Purchase", icon: ShoppingCart,  iconBg: "bg-orange-50",  iconColor: "text-orange-500",sub: "PUR-2025-0842",   val: "₹54,200" },
              { type: "Payment",  icon: CreditCard,    iconBg: "bg-green-50",   iconColor: "text-green-500", sub: "PAY-2025-0631",   val: "₹28,000" },
              { type: "Receipt",  icon: Receipt,       iconBg: "bg-teal-50",    iconColor: "text-teal-500",  sub: "REC-2025-0419",   val: "₹38,400" },
              { type: "Journal",  icon: BookOpen,      iconBg: "bg-purple-50",  iconColor: "text-purple-500",sub: "JNL-2025-0187",   val: "₹6,200"  },
            ].map((row) => (
              <div key={row.type} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-md ${row.iconBg} flex items-center justify-center shrink-0`}>
                    <row.icon className={`w-3 h-3 ${row.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{row.type}</p>
                    <p className="text-[10px] text-gray-400">{row.sub}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-800 shrink-0">{row.val}</span>
              </div>
            ))}
          </div>
          <a href="#" className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium hover:underline">
            View All Vouchers <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── Row 4: Recent Transactions + Quick Links ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-3">

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-800">Recent Transactions</p>
            <a href="#" className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
              View All Transactions <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Date","Voucher No.","Type","Particulars","Account","Debit (₹)","Credit (₹)","Amount (₹)","Created By","Status"].map((h) => (
                    <th key={h} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider py-2.5 px-3 text-left whitespace-nowrap first:pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-2.5 px-3 pl-4 text-gray-500 whitespace-nowrap">{tx.date}</td>
                    <td className="py-2.5 px-3 text-blue-600 font-medium whitespace-nowrap">{tx.voucher}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeStyle[tx.type]}`}>{tx.type}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{tx.particulars}</td>
                    <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{tx.account}</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-800 whitespace-nowrap">{tx.debit}</td>
                    <td className="py-2.5 px-3 font-semibold text-gray-800 whitespace-nowrap">{tx.credit}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-800 whitespace-nowrap">{tx.amount}</td>
                    <td className="py-2.5 px-3 text-gray-500 whitespace-nowrap">{tx.createdBy}</td>
                    <td className="py-2.5 px-3 pr-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyle[tx.status]}`}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <SectionLabel>Quick Links</SectionLabel>
          <div className="flex flex-col gap-0.5">
            {[
              { icon: BookOpen,    label: "Chart of Accounts" },
              { icon: FileText,    label: "Journal Entries"   },
              { icon: BarChart2,   label: "Trial Balance"     },
              { icon: TrendingUp,  label: "Profit & Loss Report" },
              { icon: PieChartIcon,label: "Balance Sheet Report" },
            ].map((link) => (
              <button key={link.label} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <link.icon className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-700 font-medium">{link.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            ))}
          </div>
          <a href="#" className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium px-3 hover:underline">
            View All Reports <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── PLACEHOLDER TAB ──────────────────────────────────────────────────────────
function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{label}</h3>
      <p className="text-sm text-gray-400 mt-1">This section will be built out next.</p>
    </div>
  );
}

// ─── TABS CONFIG ──────────────────────────────────────────────────────────────
const TABS: { id: TabId; label: string }[] = [
  { id: "accounting",    label: "Accounting"     },
  { id: "vouchers",      label: "Vouchers"       },
  { id: "banking",       label: "Banking"        },
  { id: "inventory",     label: "Inventory"      },
  { id: "manufacturing", label: "Manufacturing"  },
  { id: "logistics",     label: "Logistics"      },
  { id: "payroll",       label: "Payroll"        },
  { id: "compliance",    label: "Compliance"     },
  { id: "masters",       label: "Masters"        },
  { id: "settings",      label: "Settings"       },
];

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<TabId>("accounting");

  return (
    <div className="w-full bg-[#f8f9fc]">

      {/* ── Tab Bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-5">
          <div className="flex items-center gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="p-5">
        {activeTab === "accounting"    && <AccountingTab />}
        {activeTab !== "accounting"    && <PlaceholderTab label={TABS.find(t => t.id === activeTab)?.label ?? ""} />}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 z-50">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

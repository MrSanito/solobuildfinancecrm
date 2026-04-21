"use client";

import React, { useState } from "react";
import {
  CheckCircle2, Download, ChevronRight, MoreVertical,
  BarChart2, FileText, BookOpen, TrendingUp, ShoppingCart,
  Star, Shield, Calendar, HelpCircle, ChevronDown,
  Package, Database, Eye, Users, Clock, AlertCircle,
  Bell, Search, PieChart, Layers, Receipt, CreditCard,
  RefreshCw, ArrowUpRight, Play, Save, X, Plus, 
  MoreHorizontal, ArrowRight, DollarSign, CheckSquare, 
  Square, Settings2, Lock, Grip,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type TabId = "overview" | "financial" | "account" | "tax" | "inventory" | "custom";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const catColors: Record<string, string> = {
  "Financial Reports":     "bg-blue-100 text-blue-700",
  "Account Reports":       "bg-orange-100 text-orange-700",
  "Tax Reports":           "bg-yellow-100 text-yellow-700",
  "Inventory/Ops Reports": "bg-teal-100 text-teal-700",
  "Custom Reports":        "bg-purple-100 text-purple-700",
  "Ledger Details":        "bg-orange-100 text-orange-700",
  "Ledger Summary":        "bg-blue-100 text-blue-700",
  "Aging Analysis":        "bg-red-100 text-red-700",
};

function CatBadge({ cat }: { cat: string }) {
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${catColors[cat] ?? "bg-gray-100 text-gray-600"}`}>
      {cat}
    </span>
  );
}

function FormatBadge({ fmt }: { fmt: "PDF" | "XLSX" }) {
  return fmt === "PDF"
    ? <span className="flex items-center gap-1 text-[10px] font-bold text-red-600"><FileText className="w-3 h-3" />PDF</span>
    : <span className="flex items-center gap-1 text-[10px] font-bold text-green-600"><Database className="w-3 h-3" />XLSX</span>;
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS: { id: TabId; label: string }[] = [
  { id: "overview",   label: "Overview"               },
  { id: "financial",  label: "Financial Reports"      },
  { id: "account",    label: "Account Reports"        },
  { id: "tax",        label: "Tax Reports"            },
  { id: "inventory",  label: "Inventory/Ops Reports"  },
  { id: "custom",     label: "Custom Reports"         },
];

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ setActiveTab }: { setActiveTab: (id: TabId) => void }) {
  return (
    <div className="flex gap-5 items-start">
      {/* Left Sidebar (Filters) */}
      <div className="w-56 shrink-0 space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Entity</label>
            <select className="w-full text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:bg-white transition-colors outline-none cursor-pointer">
              <option>All Entities (7)</option>
              <option>SB Auto Pvt Ltd</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Report Type</label>
            <select className="w-full text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:bg-white transition-colors outline-none cursor-pointer">
              <option>All Reports</option>
              <option>Financial</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Period</label>
            <select className="w-full text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:bg-white transition-colors outline-none cursor-pointer">
              <option>FY 2024-25</option>
              <option>FY 2023-24</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Currency</label>
            <select className="w-full text-xs font-medium border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:bg-white transition-colors outline-none cursor-pointer">
              <option>INR (₹)</option>
              <option>USD ($)</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-bold text-blue-900">Drill Anywhere</p>
          </div>
          <p className="text-[10px] text-blue-700 leading-relaxed">
            Click on any numeric value in the reports to drill down to the transaction level details.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-bold text-gray-800 mb-3">Data Integrity</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Last Sync</span>
              <span className="font-semibold text-gray-800">10 mins ago</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Source</span>
              <span className="font-semibold text-gray-800">Tally Prime</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Mismatches</span>
              <span className="font-semibold text-green-600">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {[
            { id: "financial", icon: BarChart2,   iconBg: "bg-blue-50",   iconColor: "text-blue-600",   label: "Financial Reports", count: 32 },
            { id: "account",   icon: Layers,      iconBg: "bg-orange-50", iconColor: "text-orange-600", label: "Account Reports",   count: 45 },
            { id: "tax",       icon: Shield,      iconBg: "bg-yellow-50", iconColor: "text-yellow-600", label: "Tax Reports",       count: 14 },
            { id: "inventory", icon: Package,     iconBg: "bg-teal-50",   iconColor: "text-teal-600",   label: "Inventory/Ops",     count: 28 },
            { id: "custom",    icon: Star,        iconBg: "bg-purple-50", iconColor: "text-purple-600", label: "Custom Reports",    count: 15 },
          ].map((c) => (
            <button key={c.id} onClick={() => setActiveTab(c.id as TabId)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{c.label}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-gray-400">{c.count} Reports</span>
                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <ReportTable rows={financialRecentRows} viewAllLabel="View All Reports" />
      </div>

      {/* Right Sidebar */}
      <div className="w-48 shrink-0 space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
          <div className="flex flex-col gap-0.5">
            {["Create Custom Report","Schedule Report","Saved Reports","Report Templates","Export History"].map((label) => (
              <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="text-xs text-gray-700">{label}</span>
                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500" />
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-bold text-gray-800 mb-3">Data Match Summary</p>
          <div className="space-y-3">
             <div className="flex items-start gap-2">
               <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-gray-600">Assets & Liabilities <span className="font-bold text-green-600">Matched</span></p>
             </div>
             <div className="flex items-start gap-2">
               <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-gray-600">Income & Expense <span className="font-bold text-green-600">Matched</span></p>
             </div>
             <div className="flex items-start gap-2">
               <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
               <p className="text-[10px] text-gray-600">Opening Balances <span className="font-bold text-green-600">Matched</span></p>
             </div>
          </div>
        </div>
        <NeedHelpCard />
      </div>
    </div>
  );
}

// ─── FINANCIAL REPORTS TAB ────────────────────────────────────────────────────
const financialCards = [
  { icon: BarChart2,   iconBg: "bg-green-50",  iconColor: "text-green-600",  label: "Profit & Loss",   sub: "Statement of income and expenses",     count: 12 },
  { icon: Layers,      iconBg: "bg-blue-50",   iconColor: "text-blue-600",   label: "Balance Sheet",   sub: "Statement of financial position",      count: 8  },
  { icon: RefreshCw,   iconBg: "bg-teal-50",   iconColor: "text-teal-600",   label: "Cash Flow",       sub: "Cash inflows and outflows",            count: 6  },
  { icon: TrendingUp,  iconBg: "bg-orange-50", iconColor: "text-orange-600", label: "Ratio Analysis",  sub: "Financial ratios and KPIs",            count: 15 },
  { icon: ArrowUpRight,iconBg: "bg-purple-50", iconColor: "text-purple-600", label: "Fund Flow",       sub: "Sources and application of funds",     count: 6  },
  { icon: PieChart,    iconBg: "bg-pink-50",   iconColor: "text-pink-600",   label: "Budget vs Actual",sub: "Compare budget with actuals",          count: 8  },
];

const financialRecentRows = [
  { name: "Profit & Loss Statement",  cat: "Financial Reports", entity: "All Entities",    period: "Apr 2024 – Mar 2025", generated: "16 May 2025, 09:15 AM", fmt: "PDF"  as const },
  { name: "Balance Sheet",            cat: "Financial Reports", entity: "All Entities",    period: "Mar 2025",            generated: "16 May 2025, 09:12 AM", fmt: "XLSX" as const },
  { name: "Cash Flow Statement",      cat: "Financial Reports", entity: "All Entities",    period: "Apr 2024 – Mar 2025", generated: "16 May 2025, 09:10 AM", fmt: "PDF"  as const },
  { name: "Fund Flow Statement",      cat: "Financial Reports", entity: "All Entities",    period: "Apr 2024 – Mar 2025", generated: "15 May 2025, 07:45 PM", fmt: "PDF"  as const },
  { name: "Budget vs Actual – P&L",   cat: "Financial Reports", entity: "SB Auto Pvt Ltd", period: "Apr 2024 – Mar 2025", generated: "15 May 2025, 06:30 PM", fmt: "XLSX" as const },
];

const financialPopularChips = ["All", "Profitability", "Liquidity", "Position", "Cash Flow", "Budgeting", "Analysis"];
const financialPopular = [
  { icon: BarChart2,    label: "Profit & Loss Statement",  sub: "Detailed income and expense statement"        },
  { icon: Layers,       label: "Balance Sheet",            sub: "Statement of financial position"               },
  { icon: RefreshCw,    label: "Cash Flow Statement",      sub: "Operating, investing and financing flows"     },
  { icon: Database,     label: "Trial Balance",            sub: "List of all ledger balances"                   },
  { icon: BookOpen,     label: "Day Book",                 sub: "Daily transaction summary"                     },
  { icon: FileText,     label: "Ledger Summary",           sub: "Summary of all ledger accounts"                },
  { icon: ShoppingCart, label: "Expense Summary",          sub: "Breakdown of expenses"                         },
  { icon: TrendingUp,   label: "Revenue Analysis",         sub: "Revenue trends and analysis"                   },
];

function FinancialTab() {
  const [chip, setChip] = useState("All");
  return (
    <div className="flex gap-5 items-start">
      {/* Main */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {financialCards.map((c) => (
            <button key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{c.label}</p>
              <p className="text-[10px] text-gray-400 leading-snug mb-3">{c.sub}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{c.count} Reports</span>
                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View All <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Recently Viewed */}
        <ReportTable rows={financialRecentRows} viewAllLabel="View All Financial Reports" />

        {/* Popular Reports */}
        <PopularReports chips={financialPopularChips} reports={financialPopular} viewAllLabel="View All Reports" />
      </div>

      {/* Right Sidebar */}
      <FinancialRightSidebar />
    </div>
  );
}

// ─── ACCOUNT REPORTS TAB ──────────────────────────────────────────────────────
const accountCards = [
  { icon: BookOpen,   iconBg: "bg-blue-50",   iconColor: "text-blue-600",   label: "Ledger Summary",       sub: "Summary of all ledgers with opening, transactions and closing balance.", count: 7 },
  { icon: FileText,   iconBg: "bg-teal-50",   iconColor: "text-teal-600",   label: "Ledger Details",       sub: "Detailed transactions of a specific ledger.",                           count: 7 },
  { icon: Layers,     iconBg: "bg-orange-50", iconColor: "text-orange-600", label: "Account Group Summary",sub: "Summary of accounts by groups.",                                        count: 5 },
  { icon: Users,      iconBg: "bg-green-50",  iconColor: "text-green-600",  label: "Receivables Analysis", sub: "Detailed analysis of debtors and outstanding amounts.",                 count: 6 },
  { icon: CreditCard, iconBg: "bg-red-50",    iconColor: "text-red-500",    label: "Payables Analysis",    sub: "Detailed analysis of creditors and outstanding amounts.",               count: 6 },
  { icon: Clock,      iconBg: "bg-purple-50", iconColor: "text-purple-600", label: "Aging Analysis",       sub: "Aging of receivables and payables.",                                    count: 4 },
];

const accountRecentRows = [
  { name: "Sundry Debtors Ledger",  cat: "Ledger Details",  entity: "All Entities", period: "Apr 2024 – Mar 2025", generated: "16 May 2025, 09:20 AM", fmt: "PDF"  as const },
  { name: "Sundry Creditors Ledger",cat: "Ledger Details",  entity: "All Entities", period: "Apr 2024 – Mar 2025", generated: "16 May 2025, 09:18 AM", fmt: "PDF"  as const },
  { name: "Ledger Summary",         cat: "Ledger Summary",  entity: "All Entities", period: "Mar 2025",            generated: "16 May 2025, 06:15 AM", fmt: "XLSX" as const },
  { name: "Debtors Aging Report",   cat: "Aging Analysis",  entity: "All Entities", period: "As on 31 Mar 2025",   generated: "15 May 2025, 07:40 PM", fmt: "PDF"  as const },
  { name: "Creditors Aging Report", cat: "Aging Analysis",  entity: "All Entities", period: "As on 31 Mar 2025",   generated: "15 May 2025, 07:35 PM", fmt: "PDF"  as const },
];

const accountPopularChips = ["All", "Ledgers", "Receivables", "Payables", "Aging", "Summary"];
const accountPopular = [
  { icon: BookOpen,   label: "Ledger Summary",       sub: "Summary of all ledgers"           },
  { icon: FileText,   label: "Ledger Details",        sub: "Transactions of a specific ledger"},
  { icon: Users,      label: "Debtors Ledger",        sub: "Detailed debtor transactions"     },
  { icon: CreditCard, label: "Creditors Ledger",      sub: "Detailed creditor transactions"   },
  { icon: TrendingUp, label: "Receivables Aging",     sub: "Aging of debtors"                 },
  { icon: AlertCircle,label: "Payables Aging",        sub: "Aging of creditors"               },
  { icon: Layers,     label: "Account Group Summary", sub: "Summary by account groups"        },
  { icon: Database,   label: "Inactive Accounts",     sub: "List of inactive accounts"        },
];

function AccountTab() {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-1 min-w-0 space-y-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Account Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">Detailed insights into your accounts, ledgers and transactions.</p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {accountCards.map((c) => (
            <button key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{c.label}</p>
              <p className="text-[10px] text-gray-400 leading-snug mb-3">{c.sub}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{c.count} Reports</span>
                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  View All <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <ReportTable rows={accountRecentRows} viewAllLabel="View All Account Reports" />
        <PopularReports chips={accountPopularChips} reports={accountPopular} viewAllLabel="View All Account Reports" />
      </div>

      <AccountRightSidebar />
    </div>
  );
}

// ─── TAX REPORTS TAB ──────────────────────────────────────────────────────────
const taxCards = [
  { icon: Shield,     iconBg: "bg-yellow-50",  iconColor: "text-yellow-600", label: "GST Reports",       sub: "GST returns and filing reports",            count: 8 },
  { icon: FileText,   iconBg: "bg-orange-50",  iconColor: "text-orange-600", label: "TDS Reports",       sub: "TDS deducted and deposited reports",         count: 6 },
  { icon: Receipt,    iconBg: "bg-blue-50",    iconColor: "text-blue-600",   label: "Input Tax Credit",  sub: "ITC summary and reconciliation reports",     count: 5 },
  { icon: BarChart2,  iconBg: "bg-teal-50",    iconColor: "text-teal-600",   label: "Tax Summary",       sub: "Overall tax summary and liability",          count: 4 },
  { icon: AlertCircle,iconBg: "bg-red-50",     iconColor: "text-red-500",    label: "Tax Compliance",    sub: "Compliance status and due date tracker",     count: 7 },
  { icon: BookOpen,   iconBg: "bg-purple-50",  iconColor: "text-purple-600", label: "E-Filing Reports",  sub: "E-filed returns and acknowledgements",       count: 3 },
];

const taxRecentRows = [
  { name: "GSTR-1 Summary",       cat: "Tax Reports", entity: "All Entities", period: "Apr 2025",            generated: "16 May 2025, 09:00 AM", fmt: "PDF"  as const },
  { name: "GSTR-3B Summary",      cat: "Tax Reports", entity: "All Entities", period: "Apr 2025",            generated: "16 May 2025, 08:55 AM", fmt: "PDF"  as const },
  { name: "TDS Challan Report",   cat: "Tax Reports", entity: "All Entities", period: "Q4 FY 2024-25",       generated: "15 May 2025, 06:10 PM", fmt: "XLSX" as const },
  { name: "ITC Reconciliation",   cat: "Tax Reports", entity: "SB Auto Parts", period: "Apr 2024 – Mar 2025",generated: "15 May 2025, 05:30 PM", fmt: "PDF"  as const },
];

function TaxTab() {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-1 min-w-0 space-y-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Tax Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">GST, TDS and all tax compliance reports in one place.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {taxCards.map((c) => (
            <button key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{c.label}</p>
              <p className="text-[10px] text-gray-400 leading-snug mb-3">{c.sub}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{c.count} Reports</span>
                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">View All <ChevronRight className="w-3 h-3" /></span>
              </div>
            </button>
          ))}
        </div>
        <ReportTable rows={taxRecentRows} viewAllLabel="View All Tax Reports" />
      </div>
      <GenericRightSidebar title="Tax Insights (MTD)" stats={[
        { label: "Total Tax Reports",   value: "33" },
        { label: "GST Returns Filed",   value: "12" },
        { label: "TDS Challans",        value: "8"  },
        { label: "Pending Filings",     value: "3"  },
        { label: "Data Accuracy",       value: "98.2%", highlight: true },
      ]} quickActions={[
        "GST Summary", "TDS Statement", "ITC Report", "Tax Compliance", "Export History",
      ]} />
    </div>
  );
}

// ─── INVENTORY/OPS REPORTS TAB ────────────────────────────────────────────────
const inventoryCards = [
  { icon: Package,    iconBg: "bg-teal-50",   iconColor: "text-teal-600",   label: "Stock Summary",       sub: "Inventory levels across all warehouses",    count: 10 },
  { icon: BarChart2,  iconBg: "bg-blue-50",   iconColor: "text-blue-600",   label: "Stock Valuation",     sub: "Current value of all stock items",           count: 6  },
  { icon: ShoppingCart,iconBg:"bg-orange-50", iconColor: "text-orange-600", label: "Purchase Reports",    sub: "Vendor purchases and order analysis",        count: 8  },
  { icon: Receipt,    iconBg: "bg-green-50",  iconColor: "text-green-600",  label: "Sales Reports",       sub: "Sales performance and revenue analysis",     count: 9  },
  { icon: AlertCircle,iconBg: "bg-red-50",    iconColor: "text-red-500",    label: "Reorder Reports",     sub: "Items below reorder level",                  count: 4  },
  { icon: TrendingUp, iconBg: "bg-purple-50", iconColor: "text-purple-600", label: "Movement Analysis",   sub: "Item-wise inward and outward movement",      count: 5  },
];

const inventoryRecentRows = [
  { name: "Stock Summary Report",    cat: "Inventory/Ops Reports", entity: "All Entities", period: "As on 16 May 2025", generated: "16 May 2025, 08:40 AM", fmt: "PDF"  as const },
  { name: "Inventory Valuation",     cat: "Inventory/Ops Reports", entity: "All Entities", period: "As on 31 Mar 2025", generated: "15 May 2025, 07:20 PM", fmt: "XLSX" as const },
  { name: "Purchase Order Summary",  cat: "Inventory/Ops Reports", entity: "SB Auto Parts",period: "Apr 2024 – Mar 2025",generated:"15 May 2025, 06:50 PM", fmt: "PDF"  as const },
];

function InventoryTab() {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-1 min-w-0 space-y-5">
        <div>
          <h2 className="text-base font-bold text-gray-900">Inventory/Ops Reports</h2>
          <p className="text-xs text-gray-400 mt-0.5">Stock, inventory valuation and operational performance reports.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {inventoryCards.map((c) => (
            <button key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-blue-200 transition-all group">
              <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-3`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{c.label}</p>
              <p className="text-[10px] text-gray-400 leading-snug mb-3">{c.sub}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">{c.count} Reports</span>
                <span className="text-[10px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">View All <ChevronRight className="w-3 h-3" /></span>
              </div>
            </button>
          ))}
        </div>
        <ReportTable rows={inventoryRecentRows} viewAllLabel="View All Inventory Reports" />
      </div>
      <GenericRightSidebar title="Inventory Insights" stats={[
        { label: "Total Items",        value: "2,842" },
        { label: "Active Items",       value: "2,618" },
        { label: "Below Reorder",      value: "38",  highlight: false },
        { label: "Total Stock Value",  value: "₹2.4Cr" },
        { label: "Data Accuracy",      value: "98.2%", highlight: true },
      ]} quickActions={[
        "Stock Summary", "Inventory Valuation", "Reorder Report", "Purchase Register", "Sales Register",
      ]} />
    </div>
  );
}


// ─── SHARED: REPORT TABLE ─────────────────────────────────────────────────────
function ReportTable({ rows, viewAllLabel }: { rows: typeof financialRecentRows; viewAllLabel: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-800">Recently Viewed Reports</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Report Name","Category","Entity","Period","Last Generated","Format","Action"].map((h) => (
                <th key={h} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider py-2.5 px-4 text-left whitespace-nowrap first:pl-5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="py-3 px-4 pl-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">{row.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4"><CatBadge cat={row.cat} /></td>
                <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{row.entity}</td>
                <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{row.period}</td>
                <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{row.generated}</td>
                <td className="py-3 px-4"><FormatBadge fmt={row.fmt} /></td>
                <td className="py-3 px-4 pr-5">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-gray-100">
        <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
          {viewAllLabel} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── SHARED: POPULAR REPORTS ──────────────────────────────────────────────────
function PopularReports({ chips, reports, viewAllLabel }: { chips: string[]; reports: typeof financialPopular; viewAllLabel: string }) {
  const [chip, setChip] = useState("All");
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <p className="text-sm font-bold text-gray-800 shrink-0">Popular Reports</p>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <button key={c} onClick={() => setChip(c)} className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${chip === c ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 bg-white"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {reports.map((r) => (
          <button key={r.label} className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <r.icon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">{r.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{r.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
        <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
          {viewAllLabel} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── FINANCIAL RIGHT SIDEBAR ──────────────────────────────────────────────────
function FinancialRightSidebar() {
  return (
    <div className="w-48 shrink-0 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
        <div className="flex flex-col gap-0.5">
          {["Create Custom Report","Schedule Report","Saved Reports","Report Templates","Export History"].map((label) => (
            <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <span className="text-xs text-gray-700">{label}</span>
              <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500" />
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Report Insights</p>
        <div className="space-y-2">
          {[
            { label: "Total Reports",         value: "128" },
            { label: "Reports Generated (7D)", value: "24" },
            { label: "Scheduled Reports",     value: "18" },
            { label: "Data Accuracy",         value: "98.2%", highlight: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`text-xs font-bold ${s.highlight ? "text-blue-600" : "text-gray-800"}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <NeedHelpCard />
    </div>
  );
}

// ─── ACCOUNT RIGHT SIDEBAR ────────────────────────────────────────────────────
function AccountRightSidebar() {
  return (
    <div className="w-48 shrink-0 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
        <div className="flex flex-col gap-0.5">
          {["Search Ledger","Create Custom Report","Saved Reports","Chart of Accounts","Export History"].map((label) => (
            <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <span className="text-xs text-gray-700">{label}</span>
              <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500" />
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Account Insights (MTD)</p>
        <div className="space-y-2">
          {[
            { label: "Total Ledgers",        value: "8,432" },
            { label: "Active Ledgers",       value: "7,921" },
            { label: "New Ledgers",          value: "18"    },
            { label: "Transactions Count",   value: "1,25,890" },
            { label: "Data Accuracy",        value: "98.2%", highlight: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`text-xs font-bold ${(s as any).highlight ? "text-blue-600" : "text-gray-800"}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <NeedHelpCard label="View Account Report Help" />
    </div>
  );
}

// ─── GENERIC RIGHT SIDEBAR ────────────────────────────────────────────────────
function GenericRightSidebar({ title, stats, quickActions }: {
  title: string;
  stats: { label: string; value: string; highlight?: boolean }[];
  quickActions: string[];
}) {
  return (
    <div className="w-48 shrink-0 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
        <div className="flex flex-col gap-0.5">
          {quickActions.map((label) => (
            <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <span className="text-xs text-gray-700">{label}</span>
              <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500" />
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">{title}</p>
        <div className="space-y-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`text-xs font-bold ${s.highlight ? "text-blue-600" : "text-gray-800"}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <NeedHelpCard />
    </div>
  );
}

// ─── NEED HELP CARD ───────────────────────────────────────────────────────────
function NeedHelpCard({ label = "View Report Help" }: { label?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="w-4 h-4 text-blue-500" />
        <p className="text-sm font-bold text-gray-800">Need Help?</p>
      </div>
      <p className="text-xs text-gray-400 mb-3">Explore report guide and examples</p>
      <button className="flex items-center justify-center gap-2 w-full border border-blue-200 text-blue-600 text-xs font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
        <BookOpen className="w-3.5 h-3.5" /> {label}
      </button>
    </div>
  );
}

// ── Mock chart data ──────────────────────────────────────
const chartData = [
  { name: "SB Auto\nPvt Ltd",  value: 1309.88, color: "#3b82f6" },
  { name: "SB Auto\nParts",    value: 867.65,  color: "#8b5cf6" },
  { name: "SB Auto\nExports",  value: 566.43,  color: "#f97316" },
  { name: "SB Retail",         value: 634.30,  color: "#22c55e" },
  { name: "SB\nLogistics",     value: 543.12,  color: "#f59e0b" },
  { name: "SB\nUtilities",     value: 433.10,  color: "#ef4444" },
  { name: "SB\nMotors",        value: 211.90,  color: "#06b6d4" },
];

// ── Mock preview table data ───────────────────────────────
const previewData = [
  {
    entity: "SB Auto Pvt Ltd", isGroup: true,
    children: [
      { customer: "ABC Motors",  month: "Apr 2024", revenue: "12,40,91,800.00", grossProfit: "2,45,67,890.00", margin: "19.72%", outstanding: "98,76,543.00" },
      { customer: "XYZ Traders", month: "Apr 2024", revenue: "1,87,65,432.00",  grossProfit: "32,41,560.00",   margin: "17.48%", outstanding: "8,76,543.00"  },
      { customer: "—",           month: "Apr 2024", revenue: "1,65,43,210.00",  grossProfit: "—",              margin: "17.48%", outstanding: "6,54,321.00"  },
    ],
  },
  { entity: "SB Auto Parts",   isGroup: true, revenue: "8,76,54,320.00", grossProfit: "1,35,64,309.00", margin: "15.47%", outstanding: "76,54,320.00" },
  { entity: "SB Auto Exports", isGroup: true, revenue: "6,54,32,109.00", grossProfit: "98,76,109.00",   margin: "15.08%", outstanding: "54,32,109.00" },
];

// ── Field pill ───────────────────────────────────────────
function FieldPill({ label, badge, color = "bg-gray-100 text-gray-700", onRemove }: {
  label: string; badge?: string; color?: string; onRemove?: () => void;
}) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium w-full ${color}`}>
      <Grip size={10} className="text-gray-400 shrink-0 cursor-grab" />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="text-[9px] font-bold bg-white/60 px-1.5 py-0.5 rounded border border-current/20 shrink-0">{badge}</span>
      )}
      {onRemove && (
        <button onClick={onRemove} className="shrink-0 hover:text-red-500 transition-colors">
          <X size={10} />
        </button>
      )}
    </div>
  );
}

// ── Checkbox row ─────────────────────────────────────────
function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button onClick={onChange} className="shrink-0">
        {checked
          ? <CheckSquare size={14} className="text-blue-600" />
          : <Square size={14} className="text-gray-300" />
        }
      </button>
      <span className="text-xs text-gray-700">{label}</span>
    </label>
  );
}

// ── Custom tooltip ────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-2.5 text-xs">
      <p className="font-semibold text-gray-700 mb-0.5">{label}</p>
      <p className="font-bold text-blue-600">₹{payload[0].value}L</p>
    </div>
  );
};

// ── Saved report row ──────────────────────────────────────
function SavedReportRow({ icon, label, sub, badge, badgeColor }: {
  icon: React.ReactNode; label: string; sub: string; badge: string; badgeColor: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded-lg px-1 transition-colors cursor-pointer">
      <div className="size-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-xs font-semibold text-gray-800 leading-tight truncate">{label}</p>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${badgeColor}`}>{badge}</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{sub}</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
function CustomReportTab() {
  const [showSubtotals, setShowSubtotals] = useState(true);
  const [showGrandTotal, setShowGrandTotal] = useState(true);
  const [viewType, setViewType] = useState<"Table" | "Pivot" | "Chart">("Table");
  const [savedTab, setSavedTab] = useState<"all" | "mine" | "shared">("all");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [expandedEntity, setExpandedEntity] = useState<string | null>("SB Auto Pvt Ltd");

  const [rows, setRows] = useState([
    { label: "Entity",   color: "bg-blue-50 text-blue-700" },
    { label: "Customer", color: "bg-purple-50 text-purple-700" },
    { label: "Month",    color: "bg-teal-50 text-teal-700" },
  ]);

  const [measures, setMeasures] = useState([
    { label: "Revenue (₹)",     badge: "SUM",     color: "bg-blue-50 text-blue-700" },
    { label: "Gross Profit (₹)",badge: "SUM",     color: "bg-green-50 text-green-700" },
    { label: "Margin %",        badge: "Formula", color: "bg-orange-50 text-orange-700" },
    { label: "Outstanding (₹)", badge: "SUM",     color: "bg-purple-50 text-purple-700" },
  ]);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Top Banner ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Lock size={11} className="text-blue-500" />
            <span>My Permissions: <span className="font-semibold text-blue-600">Create &amp; Edit</span></span>
          </div>
          <button className="flex items-center gap-1 text-blue-600 font-semibold hover:underline">
            <HelpCircle size={11} /> How it works
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            <Play size={12} fill="white" /> Run Report
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Save size={12} /> Save Report
          </button>
          <button className="p-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">
            <MoreHorizontal size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* ── Main 3-column layout ── */}
      <div className="flex gap-4 items-start">

        {/* ── LEFT: Report Builder ── */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-800 mb-4">Report Builder</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

              {/* 1. Rows */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">1. Rows (Group by)</p>
                <div className="flex flex-col gap-1.5 mb-2">
                  {rows.map((r, i) => (
                    <FieldPill
                      key={i}
                      label={r.label}
                      color={r.color}
                      onRemove={() => setRows(rows.filter((_, idx) => idx !== i))}
                    />
                  ))}
                </div>
                <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline">
                  <Plus size={11} /> Add Row
                </button>
              </div>

              {/* 2. Columns */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">2. Columns (Measured)</p>
                <div className="flex flex-col gap-1.5 mb-2">
                  {measures.map((m, i) => (
                    <FieldPill
                      key={i}
                      label={m.label}
                      badge={m.badge}
                      color={m.color}
                      onRemove={() => setMeasures(measures.filter((_, idx) => idx !== i))}
                    />
                  ))}
                </div>
                <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline">
                  <Plus size={11} /> Add Measure
                </button>
              </div>

              {/* 3. Filters */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">3. Filters</p>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Date Range</p>
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-[10px] font-medium text-gray-700">
                      <span>01 Apr 2024 – 31 Mar 2025</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Entity</p>
                    <div className="border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-[10px] font-medium text-gray-700 flex items-center justify-between">
                      <span>All Entities (7)</span>
                      <ChevronDown size={10} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Customer Group</p>
                    <div className="border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-[10px] font-medium text-gray-700 flex items-center justify-between">
                      <span>All</span><ChevronDown size={10} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Transaction Type</p>
                    <div className="border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-[10px] font-medium text-gray-700 flex items-center justify-between">
                      <span>All</span><ChevronDown size={10} />
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline mt-1">
                    <Plus size={11} /> Add Filter
                  </button>
                </div>
              </div>

              {/* 4. View & Options */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">4. View &amp; Options</p>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1.5">View Type</p>
                    <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
                      {(["Table","Pivot","Chart"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setViewType(v)}
                          className={`flex-1 text-[10px] font-semibold py-1 rounded-md transition-all ${
                            viewType === v ? "bg-white text-gray-800 shadow-sm" : "text-gray-400"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Currency</p>
                    <div className="border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 text-[10px] font-medium text-gray-700 flex items-center justify-between">
                      <span>INR</span><ChevronDown size={10} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <CheckRow label="Show Subtotals"   checked={showSubtotals}   onChange={() => setShowSubtotals(!showSubtotals)} />
                    <CheckRow label="Show Grand Total" checked={showGrandTotal}  onChange={() => setShowGrandTotal(!showGrandTotal)} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium mb-1">Decimal Places</p>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setDecimalPlaces(Math.max(0, decimalPlaces - 1))} className="size-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs">–</button>
                      <span className="w-6 text-center text-xs font-bold text-gray-800">{decimalPlaces}</span>
                      <button onClick={() => setDecimalPlaces(Math.min(4, decimalPlaces + 1))} className="size-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs">+</button>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline">
                    More Options <ChevronDown size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Report Preview ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-800">Report Preview</p>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">Sample Data</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>Showing top 100 rows</span>
                <span>Rows: <strong className="text-gray-700">100</strong></span>
                <span>Cols: <strong className="text-gray-700">4</strong></span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["Entity","Customer","Month","Revenue (₹)","Gross Profit (₹)","Margin %","Outstanding (₹)"].map((h) => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] text-gray-400 font-bold uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((entity) => (
                    <React.Fragment key={entity.entity}>
                      {/* Entity group row */}
                      <tr
                        className="bg-blue-50/30 hover:bg-blue-50/50 cursor-pointer border-b border-gray-100"
                        onClick={() => setExpandedEntity(expandedEntity === entity.entity ? null : entity.entity)}
                      >
                        <td className="px-4 py-2.5 font-bold text-gray-800 whitespace-nowrap" colSpan={3}>
                          <div className="flex items-center gap-2">
                            <ChevronRight size={12} className={`text-blue-500 transition-transform ${expandedEntity === entity.entity ? "rotate-90" : ""}`} />
                            {entity.entity}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-bold text-gray-800 whitespace-nowrap">{entity.revenue ?? ""}</td>
                        <td className="px-4 py-2.5 font-bold text-gray-800 whitespace-nowrap">{entity.grossProfit ?? ""}</td>
                        <td className="px-4 py-2.5 font-bold text-gray-800">{(entity as any).margin ?? ""}</td>
                        <td className="px-4 py-2.5 font-bold text-gray-800 whitespace-nowrap">{(entity as any).outstanding ?? ""}</td>
                      </tr>
                      {/* Children rows */}
                      {entity.children && expandedEntity === entity.entity && entity.children.map((child, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/40">
                          <td className="px-4 py-2 text-gray-400 pl-8">—</td>
                          <td className="px-4 py-2 text-gray-700">{child.customer}</td>
                          <td className="px-4 py-2 text-gray-500">{child.month}</td>
                          <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{child.revenue}</td>
                          <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{child.grossProfit}</td>
                          <td className="px-4 py-2 text-gray-800">{child.margin}</td>
                          <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{child.outstanding}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {showGrandTotal && (
                    <tr className="bg-gray-50 border-t border-gray-200">
                      <td className="px-4 py-2.5 font-bold text-gray-900" colSpan={3}>Grand Total</td>
                      <td className="px-4 py-2.5 font-bold text-gray-900 whitespace-nowrap">22,36,54,310.00</td>
                      <td className="px-4 py-2.5 font-bold text-gray-900 whitespace-nowrap">5,76,06,320.00</td>
                      <td className="px-4 py-2.5 font-bold text-gray-900">20.85%</td>
                      <td className="px-4 py-2.5 font-bold text-gray-900 whitespace-nowrap">2,39,63,173.00</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">All amounts are in INR</p>
            </div>
          </div>

          {/* ── Summary Chart ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-800">Summary Chart</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-lg flex items-center gap-1">
                  Revenue (₹) <ChevronDown size={11} />
                </span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mb-3">₹ in Lakhs</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="value" name="Revenue (₹)" radius={[4,4,0,0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={chartData[i].color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Start with a Template ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-gray-800">Start with a Template</p>
              <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
                View All Templates <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { icon: Users,     color: "bg-blue-50",   tc: "text-blue-600",   label: "Sales Analysis",       sub: "Analyse sales by customer, product and period." },
                { icon: TrendingUp,color: "bg-orange-50", tc: "text-orange-600", label: "Expense Breakdown",    sub: "Track and analyse expenses by category." },
                { icon: BarChart2, color: "bg-teal-50",   tc: "text-teal-600",   label: "Outstanding Report",   sub: "Track receivables and outstanding aging." },
                { icon: RefreshCw, color: "bg-green-50",  tc: "text-green-600",  label: "Cash Flow Summary",    sub: "Analyse cash in-flows and out-flows." },
                { icon: Package,   color: "bg-purple-50", tc: "text-purple-600", label: "Inventory Summary",    sub: "Track stock levels and movement." },
              ].map((t) => (
                <button key={t.label} className="flex flex-col items-start p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all text-left">
                  <div className={`size-8 rounded-lg ${t.color} flex items-center justify-center mb-2`}>
                    <t.icon size={15} className={t.tc} />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 leading-tight mb-1">{t.label}</p>
                  <p className="text-[10px] text-gray-400 leading-snug">{t.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Saved Reports + Insights ── */}
        <div className="w-56 shrink-0 space-y-4">

          {/* Saved Reports */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-800">Saved Reports</p>
              <button className="text-[10px] text-blue-600 font-semibold hover:underline">View All</button>
            </div>
            {/* Sub-tabs */}
            <div className="flex border-b border-gray-100 px-1 pt-1">
              {[["all","All (18)"],["mine","My Reports (9)"],["shared","Shared (12)"]] .map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setSavedTab(id as any)}
                  className={`flex-1 text-[10px] font-semibold py-2 rounded-t-lg transition-colors ${
                    savedTab === id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="p-3 space-y-0.5">
              <SavedReportRow
                icon={<TrendingUp size={13} className="text-blue-600" />}
                label="Revenue by Customer (Monthly)"
                sub="Updated: 16 May 2025, 07:45 AM"
                badge="Shared"
                badgeColor="bg-purple-100 text-purple-700"
              />
              <SavedReportRow
                icon={<DollarSign size={13} className="text-orange-600" />}
                label="Expense by Category (Entity-wise)"
                sub="Updated: 15 May 2025, 09:30 PM"
                badge="My Report"
                badgeColor="bg-blue-100 text-blue-700"
              />
              <SavedReportRow
                icon={<BarChart2 size={13} className="text-teal-600" />}
                label="Outstanding by Region"
                sub="Updated: 15 May 2025, 06:20 PM"
                badge="Shared"
                badgeColor="bg-purple-100 text-purple-700"
              />
              <SavedReportRow
                icon={<Package size={13} className="text-green-600" />}
                label="Top 10 Products by Profit"
                sub="Updated: 14 May 2025, 05:05 PM"
                badge="My Report"
                badgeColor="bg-blue-100 text-blue-700"
              />
              <SavedReportRow
                icon={<RefreshCw size={13} className="text-purple-600" />}
                label="Cash Movement Summary"
                sub="Updated: 14 May 2025, 04:50 PM"
                badge="Shared"
                badgeColor="bg-purple-100 text-purple-700"
              />
              <button className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline w-full justify-center pt-2">
                <Plus size={11} /> Create New Report
              </button>
            </div>
          </div>

          {/* Report Insights */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-800 mb-3">Report Insights</p>
            <div className="flex flex-col gap-1">
              {[
                { label: "Total Custom Reports",      value: "128" },
                { label: "Reports Generated (7D)",    value: "24"  },
                { label: "Scheduled Reports",         value: "18"  },
                { label: "Most Used Report",          value: "Revenue by Customer (Monthly)", small: true },
                { label: "Data Accuracy",             value: "98.2%", highlight: true },
              ].map((s) => (
                <div key={s.label} className="flex items-start justify-between py-1.5 border-b border-gray-50 last:border-0 gap-2">
                  <span className="text-[10px] text-gray-500 flex-1 leading-tight">{s.label}</span>
                  <span className={`text-[10px] font-bold text-right leading-tight ${
                    s.highlight ? "text-blue-600" : "text-gray-800"
                  } ${s.small ? "text-[9px] max-w-[80px]" : ""}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Custom Reports Work */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-bold text-gray-800 mb-3">How Custom Reports Work</p>
            <div className="flex flex-col gap-3">
              {[
                { num: "1", text: "Select rows, columns and filters to build your report." },
                { num: "2", text: "Drill down any number to view ledger → voucher → source." },
                { num: "3", text: "Save and share reports with your team." },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-2">
                  <div className="size-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{s.num}</div>
                  <p className="text-[10px] text-gray-600 leading-snug">{s.text}</p>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline mt-3">
              Learn more about custom reports <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="w-full">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 pt-5 pb-0">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          {/* Title */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Reports</h1>
            <p className="text-xs text-gray-400 mt-0.5">Accurate. Traceable. Audit-ready.</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Data Verified */}
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-green-800 leading-none">Data Verified</p>
                <p className="text-[10px] text-green-600 leading-none mt-0.5">All data is up to date</p>
              </div>
            </div>
            {/* Date */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white hover:bg-gray-50">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 leading-none">FY 2024-25</p>
                <p className="text-[10px] text-gray-400 mt-0.5">01 Apr 2024 – 31 Mar 2025</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {/* Export */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            {/* Alerts */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50 relative">
              <Bell className="w-3.5 h-3.5" /> Alerts
              <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">12</span>
            </button>
            {/* Custom Report */}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
              Custom Report
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-0 overflow-x-auto -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
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

      {/* ── Tab Content ── */}
      <div className="p-5">
        {activeTab === "overview"  && <OverviewTab setActiveTab={setActiveTab} />}
        {activeTab === "financial" && <FinancialTab />}
        {activeTab === "account"   && <AccountTab />}
        {activeTab === "tax"       && <TaxTab />}
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "custom"    && <CustomReportTab />}
      </div>
    </div>
  );
}

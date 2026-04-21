"use client";

import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Finance Terminal</h1>
          <p className="text-slate-400">Manage global accounts and treasury</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <DollarSign size={16} />
          <span>New Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: "$4,250,000", change: "+12.5%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Operating Expenses", value: "$1,840,000", change: "-2.3%", icon: ArrowDownRight, color: "text-red-500" },
          { label: "Net Cash flow", value: "$2,410,000", change: "+5.1%", icon: ArrowUpRight, color: "text-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1d2e] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <stat.icon size={20} className="text-slate-400" />
              </div>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1d2e] border border-white/5 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="size-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
          <Wallet className="text-blue-500" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Finance Module Core</h2>
        <p className="text-slate-400 max-w-md">
          Placeholder for historical data, profit/loss statements, and multi-currency auditing.
        </p>
      </div>
    </div>
  );
}

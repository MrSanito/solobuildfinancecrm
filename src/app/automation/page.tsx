"use client";
import { Zap, Play, Settings2 } from "lucide-react";
export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automation Hub</h1>
          <p className="text-slate-400">Streamline recurring reconciliation and workflows</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          <Play size={16} /> <span>Run All Bots</span>
        </button>
      </div>
      <div className="space-y-4">
        {["Invoice Auto-Reconciliation", "Tax Provisioning Logic", "Expense Categorization AI"].map((flow, i) => (
          <div key={i} className="bg-[#1a1d2e] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Zap size={20} />
              </div>
              <h3 className="text-white font-medium">{flow}</h3>
            </div>
            <button className="p-2 text-slate-500 hover:text-white transition-colors">
              <Settings2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { History, ShieldCheck, Search } from "lucide-react";
export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Audit & Logs</h1>
        <p className="text-slate-400">Security event monitoring and transaction history</p>
      </div>
      <div className="bg-[#1a1d2e] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type="text" placeholder="Search events..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all" />
          </div>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
          <ShieldCheck className="text-slate-600 mb-4" size={40} />
          <h2 className="text-white font-semibold mb-1">Log Streaming is Active</h2>
          <p className="text-slate-500 text-sm">Real-time system actions are being recorded to the immutable ledger.</p>
        </div>
      </div>
    </div>
  );
}

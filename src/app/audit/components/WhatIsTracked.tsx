import React from "react";
import { Database, Users, Cpu, Zap, Shield } from "lucide-react";

const whatIsTracked = [
  { icon: Database,  color: "bg-blue-50",   tc: "text-blue-600",   label: "Data Changes",   sub: "Create, update, delete of\nvouchers, ledgers, masters." },
  { icon: Users,     color: "bg-green-50",  tc: "text-green-600",  label: "User Activities",sub: "Logins, logouts, report access,\nexports and more." },
  { icon: Cpu,       color: "bg-orange-50", tc: "text-orange-600", label: "System Events",  sub: "Data sync, migrations,\nbackground jobs." },
  { icon: Zap,       color: "bg-purple-50", tc: "text-purple-600", label: "Automations",    sub: "Automation triggers,\nexecutions and results." },
  { icon: Shield,    color: "bg-red-50",    tc: "text-red-500",    label: "Security Events",sub: "Access attempts, failures,\nand permission changes." },
];

export function WhatIsTracked() {
  return (
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
  );
}

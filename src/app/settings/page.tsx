"use client";
import { Settings, User, Bell, Shield, Wallet } from "lucide-react";
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Configure global platform preferences</p>
      </div>
      <div className="bg-[#1a1d2e] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-xl">
        {[
          { icon: User, label: "Account Profile", sub: "Personal details and display name" },
          { icon: Wallet, label: "Billing & Treasury", sub: "Subscription plans and capital management" },
          { icon: Bell, label: "Notifications", sub: "Email and real-time alert preferences" },
          { icon: Shield, label: "Security", sub: "2FA, session management and encryption" },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-colors text-left group">
            <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">{item.label}</h3>
              <p className="text-slate-500 text-sm">{item.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

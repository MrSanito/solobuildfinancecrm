import React from "react";
import { Building2, Calendar, Download, Bell, ChevronDown, CheckCircle2 } from "lucide-react";
import { auditTabs, AuditTab } from "../data";

export function TopNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: AuditTab;
  setActiveTab: (val: AuditTab) => void;
}) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-base font-bold text-gray-900">Audit &amp; Logs</h1>
          <p className="text-xs text-gray-400">Track, monitor and review all system activities, data changes and access logs.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Entity */}
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            <Building2 size={12} className="text-gray-400" /> All Entities (7)
            <ChevronDown size={11} className="text-gray-400" />
          </button>
          {/* Date */}
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
            <Calendar size={12} className="text-gray-400" /> 01 Apr 2024 – 31 Mar 2025
            <ChevronDown size={11} className="text-gray-400" />
          </button>
          {/* Export */}
          <button className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
            <Download size={12} /> Export
            <ChevronDown size={11} className="text-gray-400" />
          </button>
          {/* Alerts */}
          <button className="relative flex items-center gap-1.5 border border-gray-200 bg-white rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
            <Bell size={12} /> Alerts
            <span className="absolute -top-1.5 -right-1.5 size-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">!</span>
          </button>
          {/* User */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">VM</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-700 leading-none">Vikram Mehta</p>
              <p className="text-[9px] text-gray-400">Admin</p>
            </div>
          </div>
          {/* Data Verified */}
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1.5">
            <CheckCircle2 size={12} className="text-green-600" />
            <div>
              <p className="text-[10px] font-bold text-green-800 leading-none">Data Verified</p>
              <p className="text-[9px] text-green-600">All data is up to date</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="overflow-x-auto border-t border-gray-100">
        <div className="flex px-4 md:px-6 min-w-max">
          {auditTabs.map((t) => (
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
  );
}

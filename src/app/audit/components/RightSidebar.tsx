import React from "react";
import { FileText, BookOpen, Users, Download, Clock, ChevronRight, HelpCircle } from "lucide-react";
import { logSummary, topUsers } from "../data";
import { UserAvatar } from "./Shared";

export function RightSidebar() {
  return (
    <div className="w-52 shrink-0 space-y-4">
      {/* Log Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Log Summary (MTD)</p>
        <div className="flex flex-col gap-0.5">
          {logSummary.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className={`text-xs font-bold ${s.highlight ? "text-red-600" : "text-gray-800"}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Active Users */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">Top Active Users</p>
        </div>
        <div className="flex flex-col gap-2">
          {topUsers.map((u, i) => (
            <div key={u.name} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-bold w-4">{i + 1}.</span>
              <UserAvatar
                initials={u.name.split(" ").map(n => n[0]).join("")}
                color={["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-teal-500"][i]}
              />
              <span className="text-[11px] text-gray-700 font-medium flex-1 truncate">{u.name}</span>
              <span className="text-[10px] font-bold text-gray-800">{u.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline mt-3 w-full justify-center border-t border-gray-100 pt-2">
          View All Users <ChevronRight size={11} />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-2">Quick Actions</p>
        <div className="flex flex-col gap-0.5">
          {[
            { label: "Search Voucher", Icon: FileText },
            { label: "Search Ledger", Icon: BookOpen },
            { label: "View User Activity", Icon: Users },
            { label: "Export Audit Logs", Icon: Download },
            { label: "Schedule Audit Report", Icon: Clock },
          ].map(({ label, Icon }) => (
            <button key={label} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-2">
                <Icon size={12} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs text-gray-700">{label}</span>
              </div>
              <ChevronRight size={11} className="text-gray-300 group-hover:text-gray-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle size={14} className="text-blue-500" />
          <p className="text-sm font-bold text-gray-800">Need Help?</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">Learn more about Audit &amp; Logs</p>
        <button className="flex items-center justify-center gap-2 w-full border border-blue-200 text-blue-600 text-xs font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
          <BookOpen size={12} /> View Help Guide
        </button>
      </div>
    </div>
  );
}

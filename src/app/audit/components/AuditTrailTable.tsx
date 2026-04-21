import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, Activity } from "lucide-react";
import { auditRows } from "../data";
import { ActionBadge, UserAvatar } from "./Shared";

export function AuditTrailTable({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  setCurrentPage: (val: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-800">Audit Trail</h2>
          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            1,248 Records
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[10px] text-gray-400">Showing 1–25 of 1,248</p>
          <div className="flex items-center gap-1">
            <button className="size-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
              <ChevronLeft size={11} className="text-gray-400" />
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`size-6 text-[10px] font-medium rounded border transition-all ${
                  currentPage === n
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-gray-400 text-xs px-0.5">...</span>
            <button className="size-6 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50">
              <ChevronRight size={11} className="text-gray-400" />
            </button>
          </div>
          <select className="border border-gray-200 rounded-lg px-2 py-1 text-[10px] text-gray-600 bg-white focus:outline-none">
            <option>25 / page</option>
            <option>50 / page</option>
            <option>100 / page</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Date & Time", "User", "Action", "Module", "Reference", "Description / Change Summary", "Before", "After", "IP Address", "Source", ""].map((h) => (
                <th key={h} className="text-left px-3 py-2.5 text-[10px] text-gray-400 font-bold uppercase tracking-wide whitespace-nowrap">
                  {h && (
                    <div className="flex items-center gap-1">
                      {h}
                      {!["Description / Change Summary", ""].includes(h) && (
                        <Activity size={9} className="text-gray-300" />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {auditRows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-3 py-3 text-gray-600 whitespace-nowrap text-[11px]">{row.datetime}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <UserAvatar initials={row.userInitials} color={row.userColor} />
                    <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">{row.userName}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <ActionBadge action={row.action} />
                </td>
                <td className="px-3 py-3 text-gray-600 whitespace-nowrap text-[11px]">{row.module}</td>
                <td className="px-3 py-3">
                  <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                    {row.reference}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-700 text-[11px] max-w-[200px]">
                  <p className="leading-snug">{row.description}</p>
                </td>
                <td className="px-3 py-3 text-gray-500 whitespace-nowrap text-[11px]">{row.before}</td>
                <td className="px-3 py-3 whitespace-nowrap text-[11px]">
                  <span className={row.after === "—" ? "text-gray-400" : row.action === "Deleted" ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                    {row.after}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-500 whitespace-nowrap text-[11px] font-mono">{row.ip}</td>
                <td className="px-3 py-3">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    row.source === "Manual"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-purple-50 text-purple-700"
                  }`}>
                    {row.source}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                    <MoreHorizontal size={13} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-100 text-center">
        <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 mx-auto">
          View All Audit Trail Log <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

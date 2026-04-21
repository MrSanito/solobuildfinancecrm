import React from "react";
import { ChevronDown } from "lucide-react";
import { ActionType, actionConfig } from "../data";

export function ActionBadge({ action }: { action: ActionType }) {
  const cfg = actionConfig[action];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${cfg.bg} ${cfg.text}`}>
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      {action}
    </span>
  );
}

export function UserAvatar({ initials, color, size = "sm" }: { initials: string; color: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "size-6 text-[10px]" : "size-7 text-xs";
  return (
    <div className={`${sz} rounded-full ${color} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

export function SelectFilter({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wide">{label}</label>
      <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-xs font-medium text-gray-700 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 transition-colors min-w-[110px]">
        <span className="truncate">{options[0]}</span>
        <ChevronDown size={11} className="text-gray-400 shrink-0" />
      </div>
    </div>
  );
}

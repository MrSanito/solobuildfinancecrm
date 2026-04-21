import React from "react";
import { Search, Settings } from "lucide-react";
import { SelectFilter } from "./Shared";

export function FiltersPanel({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <p className="text-xs font-bold text-gray-700 mb-3">Filters</p>
      <div className="flex flex-wrap gap-3 mb-3">
        <SelectFilter label="Date Range" options={["01 Apr 2024 – 31 Mar 2025"]} />
        <SelectFilter label="User" options={["All Users"]} />
        <SelectFilter label="Entity" options={["All Entities"]} />
        <SelectFilter label="Action Type" options={["All Actions"]} />
        <SelectFilter label="Module" options={["All Modules"]} />
        <SelectFilter label="Reference Type" options={["All Types"]} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1 relative min-w-[260px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by voucher ID, ledger, user or reference..."
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors"
          />
        </div>
        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Settings size={12} /> More Filters
        </button>
        <button className="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Clear All
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

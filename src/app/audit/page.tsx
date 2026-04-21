"use client";

import React, { useState } from "react";
import { TopNav } from "./components/TopNav";
import { FiltersPanel } from "./components/FiltersPanel";
import { AuditTrailTable } from "./components/AuditTrailTable";
import { WhatIsTracked } from "./components/WhatIsTracked";
import { RightSidebar } from "./components/RightSidebar";
import { AuditTab } from "./data";

export default function AuditLogs() {
  const [activeTab, setActiveTab] = useState<AuditTab>("audit");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── Content ── */}
      <div className="p-4 md:p-6 flex gap-4 items-start">
        {/* ── Main (Left + Center) ── */}
        <div className="flex-1 min-w-0 space-y-4">
          <FiltersPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <AuditTrailTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <WhatIsTracked />
        </div>

        <RightSidebar />
      </div>
    </div>
  );
}
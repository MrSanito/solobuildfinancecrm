"use client";
import React, { useState } from "react";
import { OverviewTab } from "./components/OverviewTab";
import { ActiveAutomationsTab } from "./components/ActiveAutomationsTab";
import { ExecutionLogTab } from "./components/ExecutionLogTab";
import { ActivityLogTab } from "./components/ActivityLogTab";
import { CustomTab } from "./components/CustomTab";

type TabId = "overview" | "active" | "execution" | "activity" | "custom";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview",  label: "Overview" },
  { id: "active",    label: "Active Automations (Read-Only)" },
  { id: "execution", label: "Execution Log" },
  { id: "activity",  label: "Activity Log" },
  { id: "custom",    label: "Custom Tab" },
];

export default function AutomationDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="w-full bg-slate-50">
      {/* ── TOP NAV ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="px-6 py-5">
        {activeTab === "overview"  && <OverviewTab />}
        {activeTab === "active"    && <ActiveAutomationsTab />}
        {activeTab === "execution" && <ExecutionLogTab />}
        {activeTab === "activity"  && <ActivityLogTab />}
        {activeTab === "custom"    && <CustomTab />}
      </div>
    </div>
  );
}
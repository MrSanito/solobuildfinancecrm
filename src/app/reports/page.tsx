"use client";
import React from "react";
import { BarChart3, Download, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-slate-500">Generate and export comprehensive financial statements</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
            <Filter size={16} /> <span>Filter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
            <Download size={16} /> <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          "Profit & Loss Statement",
          "Balance Sheet Consolidated",
          "Cash Flow Forecasting",
          "GST GSTR-3B Reconciliation"
        ].map((report, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-slate-800 font-bold">{report}</h3>
                <p className="text-slate-400 text-xs">Last generated: 2 hours ago</p>
              </div>
            </div>
            <button className="text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

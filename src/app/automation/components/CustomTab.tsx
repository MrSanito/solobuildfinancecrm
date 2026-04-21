import React from "react";
import { Settings } from "lucide-react";

export function CustomTab() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <Settings className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-800">Your Custom Tab</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">This section is reserved for your custom content. Build and plug in your component here.</p>
    </div>
  );
}

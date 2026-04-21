"use client"

import React from 'react'
import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="navbar bg-white border-b border-slate-100 px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex-none">
        <button 
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm btn-square"
        >
          <Menu className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      <div className="flex-1 mx-3">
        <label className="input input-bordered input-sm flex items-center gap-2 w-full max-w-sm bg-slate-50 border-slate-200">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search..." className="grow text-sm" />
        </label>
      </div>
      <div className="flex-none flex items-center gap-3">
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-xs"></span>
          <button className="btn btn-ghost btn-sm btn-square">
            <Bell className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">Sarah Johnson</p>
            <p className="text-xs text-slate-400">Production Manager</p>
          </div>
          <div className="avatar placeholder">
            <div className="bg-blue-500 text-white rounded-full w-9 h-9 text-sm font-bold flex items-center justify-center">
              SJ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

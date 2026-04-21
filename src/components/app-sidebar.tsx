"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Layers,
  Database,
  Zap,
  BarChart3,
  History,
  Settings,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Owner Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Finance",
      url: "/finance",
      icon: Wallet,
    },
    {
      title: "Multi-Entity Overview",
      url: "/entities",
      icon: Layers,
    },
    {
      title: "Data",
      url: "/data",
      icon: Database,
    },
    {
      title: "Automation",
      url: "/automation",
      icon: Zap,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
    {
      title: "Audit & Logs",
      url: "/audit",
      icon: History,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-sidebar border-r border-sidebar-border"
    >
      {/* ── Header ── */}
      <SidebarHeader className="h-16 flex items-center px-5 border-b border-sidebar-border">
        {/* Expanded */}
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">
          <div className="size-9 min-w-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-900/40 shrink-0">
            <span className="text-white font-extrabold text-base tracking-tight">M</span>
          </div>
          <span className="font-extrabold text-sm tracking-widest uppercase text-sidebar-foreground truncate">
            FinanceCRM
          </span>
        </div>
        {/* Collapsed */}
        <div className="hidden group-data-[collapsible=icon]:flex size-9 rounded-xl bg-orange-500 items-center justify-center shadow-lg shadow-orange-900/40">
          <span className="text-white font-extrabold text-base">F</span>
        </div>
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="bg-sidebar">
        <SidebarMenu className="px-3 py-4 gap-0.5">
          {data.navMain.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => setOpenMobile(false)}
                  className="h-10 px-3 rounded-lg transition-all duration-150 
                    data-[active=true]:bg-blue-700 data-[active=true]:text-white
                    data-[active=true]:shadow-md data-[active=true]:shadow-blue-900/40
                    group/menu-item"
                >
                  {item.icon && (
                    <item.icon
                      className="size-[18px] shrink-0 transition-colors duration-150 group-data-[active=true]:text-white"
                    />
                  )}
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden truncate flex-1">
                    {item.title}
                  </span>
                  {(item as any).badge && (
                    <span
                      className={`
                        group-data-[collapsible=icon]:hidden
                        ml-auto min-w-5 h-5 px-1.5 rounded-full
                        text-[11px] font-bold text-white
                        flex items-center justify-center
                        ${(item as any).badgeColor ?? "bg-blue-500"}
                      `}
                    >
                      {(item as any).badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center overflow-hidden">
          <div className="shrink-0 size-9 rounded-full bg-sidebar-primary/20 border border-sidebar-primary/30 flex items-center justify-center">
            <span className="text-sidebar-primary text-xs font-bold">SJ</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden min-w-0">
            <span className="text-sm font-semibold text-sidebar-foreground leading-tight truncate">
              Sarah Johnson
            </span>
            <span className="text-xs text-sidebar-foreground/50 truncate">Production Manager</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
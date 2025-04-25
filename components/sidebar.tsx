"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  BarChart,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu,
  Plus,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarProps = {
  user: any
}

export default function Sidebar({ user }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#" },
    { icon: FileText, label: "My Forms", href: "#" },
    { icon: BarChart, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help", href: "#" },
  ]

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md border-2 border-black shadow-md"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar backdrop for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r-2 border-black z-40 transition-all duration-300 shadow-xl",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            {!collapsed && <span className="text-xl font-bold">FormCraft</span>}
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 hidden md:block">
              <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>

          {/* User profile */}
          <div
            className={cn(
              "flex items-center p-4 border-b-2 border-black",
              collapsed ? "justify-center" : "justify-start",
            )}
          >
            <div className="w-10 h-10 bg-[#FF7043] rounded-full flex items-center justify-center text-white font-bold">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            {!collapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="font-medium truncate">{user?.email}</p>
                <p className="text-xs text-gray-500 truncate">Free Plan</p>
              </div>
            )}
          </div>

          {/* Create new form button */}
          <div className="p-4">
            <button
              className={cn(
                "flex items-center justify-center bg-[#FF7043] text-white rounded-md border-2 border-black hover:bg-[#F4511E] transition-colors",
                collapsed ? "w-full p-3" : "w-full p-3",
              )}
            >
              <Plus className="h-5 w-5" />
              {!collapsed && <span className="ml-2">New Form</span>}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md p-3 hover:bg-gray-100 transition-colors",
                      collapsed ? "justify-center" : "justify-start",
                    )}
                  >
                    <item.icon className="h-5 w-5 text-gray-700" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Upgrade banner */}
          {!collapsed && (
            <div className="p-4 border-t-2 border-black">
              <div className="bg-[#FFF3E0] p-3 rounded-md border-2 border-black">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-[#FB8C00]" />
                  <span className="ml-2 font-medium">Upgrade to Pro</span>
                </div>
                <p className="text-xs mt-1">Get unlimited forms and responses</p>
                <button className="w-full mt-2 bg-[#FB8C00] text-white p-2 rounded-md text-sm font-medium border-2 border-black">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

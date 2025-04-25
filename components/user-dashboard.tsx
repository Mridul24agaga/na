"use client"

import { useState } from "react"
import { FileText, BarChart, Clock, Plus, Search, ArrowUpRight, MoreHorizontal, Sparkles } from "lucide-react"

type UserDashboardProps = {
  user: any
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for recent forms
  const recentForms = [
    { id: 1, title: "Customer Feedback", responses: 24, lastUpdated: "2 days ago" },
    { id: 2, title: "Event Registration", responses: 156, lastUpdated: "1 week ago" },
    { id: 3, title: "Product Survey", responses: 78, lastUpdated: "3 weeks ago" },
  ]

  // Filter forms based on search query
  const filteredForms = recentForms.filter((form) => form.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your forms today.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center border-2 border-black">
              <FileText className="h-6 w-6 text-[#1E88E5]" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-gray-600">Total Forms</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center border-2 border-black">
              <BarChart className="h-6 w-6 text-[#43A047]" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">258</h3>
          <p className="text-gray-600">Total Responses</p>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#FFF3E0] rounded-full flex items-center justify-center border-2 border-black">
              <Clock className="h-6 w-6 text-[#FB8C00]" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2 days ago</h3>
          <p className="text-gray-600">Last Activity</p>
        </div>
      </div>

      {/* Create new form card */}
      <div className="bg-white p-6 rounded-lg border-2 border-black mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create a new SEO tool</h2>
            <p className="text-gray-600 mb-4 md:mb-0">
              Describe the SEO tool you want to build and we'll generate it for you.
            </p>
          </div>
          <button className="bg-[#FF7043] text-white px-4 py-2 rounded-md hover:bg-[#F4511E] transition-colors text-sm font-medium border-2 border-black flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create New Tool
          </button>
        </div>

        <div className="mt-6">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
            rows={3}
            placeholder="Describe the SEO tool you want to build..."
          ></textarea>

          <div className="flex justify-end mt-4">
            <button className="bg-[#FF7043] text-white px-4 py-2 rounded-md hover:bg-[#F4511E] transition-colors text-sm font-medium border-2 border-black flex items-center">
              Generate Tool <Sparkles className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent forms */}
      <div className="bg-white p-6 rounded-lg border-2 border-black">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 md:mb-0">Recent Forms</h2>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search forms..."
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredForms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Form Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Responses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form) => (
                  <tr key={form.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-medium">{form.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{form.responses}</td>
                    <td className="py-3 px-4">{form.lastUpdated}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No forms found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new form.</p>
          </div>
        )}
      </div>
    </div>
  )
}

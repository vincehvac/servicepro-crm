'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/supabase'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && <h1 className="text-xl font-bold">ServicePro</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-gray-800 p-2 rounded"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800 transition"
            >
              <span className="text-xl">📊</span>
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            <Link
              href="/dashboard/jobs"
              className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800 transition"
            >
              <span className="text-xl">📋</span>
              {sidebarOpen && <span>Jobs</span>}
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800 transition"
            >
              <span className="text-xl">👥</span>
              {sidebarOpen && <span>Customers</span>}
            </Link>
            <Link
              href="/dashboard/technicians"
              className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800 transition"
            >
              <span className="text-xl">👷</span>
              {sidebarOpen && <span>Technicians</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin User</span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { getCurrentUser, getJobs, getTechnicians } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    activeJobs: 0,
    completedToday: 0,
    availableTechs: 0,
    pendingJobs: 0
  })

  useEffect(() => {
    checkAuth()
    loadStats()
  }, [])

  const checkAuth = async () => {
    const user = await getCurrentUser()
    if (!user) {
      router.push('/login')
    }
  }

  const loadStats = async () => {
    try {
      const { data: jobs } = await getJobs()
      const { data: techs } = await getTechnicians()

      if (jobs && techs) {
        setStats({
          activeJobs: jobs.filter(j => j.status === 'In Progress').length,
          completedToday: jobs.filter(j => j.status === 'Completed').length,
          availableTechs: techs.filter(t => t.status === 'Available').length,
          pendingJobs: jobs.filter(j => j.status === 'Open').length
        })
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Jobs</p>
              <p className="text-3xl font-bold text-blue-600">{stats.activeJobs}</p>
            </div>
            <div className="text-4xl">🔧</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Today</p>
              <p className="text-3xl font-bold text-green-600">{stats.completedToday}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Available Techs</p>
              <p className="text-3xl font-bold text-purple-600">{stats.availableTechs}</p>
            </div>
            <div className="text-4xl">👷</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Jobs</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingJobs}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h3 className="card-title">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/jobs?action=create')}
            className="btn btn-primary"
          >
            ➕ Create New Job
          </button>
          <button
            onClick={() => router.push('/dashboard/customers?action=add')}
            className="btn btn-secondary"
          >
            👤 Add Customer
          </button>
          <button
            onClick={() => router.push('/dashboard/technicians?action=add')}
            className="btn btn-secondary"
          >
            👷 Add Technician
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="card-title">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-semibold">New job created</p>
                <p className="text-sm text-gray-600">HVAC Maintenance - Johnson Residence</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 min ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold">Job completed</p>
                <p className="text-sm text-gray-600">AC Repair - Smith Commercial</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">15 min ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👷</span>
              <div>
                <p className="font-semibold">Technician assigned</p>
                <p className="text-sm text-gray-600">Mike Rodriguez assigned to Installation job</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">30 min ago</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
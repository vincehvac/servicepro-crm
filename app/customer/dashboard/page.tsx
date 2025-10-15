'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, signOut, getJobs } from '@/lib/supabase'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/customer/login')
        return
      }
      
      setUser(currentUser)
      
      // Load customer's jobs
      const { data } = await getJobs()
      if (data) {
        // Filter jobs for this customer (in production, filter by customer_id)
        setJobs(data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/customer/login')
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Open': 'bg-yellow-100 text-yellow-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      'Completed': 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.user_metadata?.name || user?.email}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="card text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">New Service Request</h3>
            <p className="text-gray-600">Submit a new service request</p>
          </button>

          <button className="card text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Schedule Service</h3>
            <p className="text-gray-600">Book an appointment</p>
          </button>

          <button className="card text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">View Invoices</h3>
            <p className="text-gray-600">Check payment history</p>
          </button>
        </div>

        {/* Service Requests */}
        <div className="card">
          <h2 className="card-title">Your Service Requests</h2>
          
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-600 mb-4">No service requests yet</p>
              <button className="btn btn-primary">
                Create Your First Request
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Technician:</span>
                      <span className="ml-2 font-medium">
                        {job.technicians?.name || 'Not assigned yet'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Scheduled:</span>
                      <span className="ml-2 font-medium">
                        {job.scheduled_time
                          ? new Date(job.scheduled_time).toLocaleString()
                          : 'Not scheduled'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="btn btn-sm btn-secondary">View Details</button>
                    {job.status !== 'Completed' && (
                      <>
                        <button className="btn btn-sm btn-secondary">Reschedule</button>
                        <button className="btn btn-sm btn-danger">Cancel</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-8 card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-gray-600">Our support team is here to assist you</p>
            </div>
            <button className="btn btn-primary">
              📞 Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
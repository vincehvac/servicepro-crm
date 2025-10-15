'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { getJobs, createJob, updateJob, deleteJob, getCustomers, getTechnicians, Job } from '@/lib/supabase'

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [technicians, setTechnicians] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer_id: '',
    tech_id: '',
    status: 'Open' as Job['status'],
    scheduled_time: ''
  })

  useEffect(() => {
    loadData()
  }, [filterStatus])

  const loadData = async () => {
    setLoading(true)
    try {
      const filters = filterStatus !== 'all' ? { status: filterStatus } : undefined
      const [jobsRes, customersRes, techsRes] = await Promise.all([
        getJobs(filters),
        getCustomers(),
        getTechnicians()
      ])

      if (jobsRes.data) setJobs(jobsRes.data)
      if (customersRes.data) setCustomers(customersRes.data)
      if (techsRes.data) setTechnicians(techsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingJob) {
        await updateJob(editingJob.id, formData)
      } else {
        await createJob(formData)
      }
      
      setShowModal(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving job:', error)
      alert('Error saving job')
    }
  }

  const handleEdit = (job: any) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      description: job.description,
      customer_id: job.customer_id,
      tech_id: job.tech_id || '',
      status: job.status,
      scheduled_time: job.scheduled_time || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id)
        loadData()
      } catch (error) {
        console.error('Error deleting job:', error)
        alert('Error deleting job')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      customer_id: '',
      tech_id: '',
      status: 'Open',
      scheduled_time: ''
    })
    setEditingJob(null)
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'Open': 'badge badge-warning',
      'Scheduled': 'badge badge-primary',
      'In Progress': 'badge badge-primary',
      'Completed': 'badge badge-success'
    }
    return badges[status] || 'badge'
  }

  if (loading) {
    return (
      <DashboardLayout title="Jobs">
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Jobs">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('Open')}
            className={`btn ${filterStatus === 'Open' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilterStatus('Scheduled')}
            className={`btn ${filterStatus === 'Scheduled' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setFilterStatus('In Progress')}
            className={`btn ${filterStatus === 'In Progress' ? 'btn-primary' : 'btn-secondary'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('Completed')}
            className={`btn ${filterStatus === 'Completed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn btn-primary"
        >
          ➕ Create Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Customer</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Scheduled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div>
                        <div className="font-semibold">{job.title}</div>
                        <div className="text-sm text-gray-600">{job.description}</div>
                      </div>
                    </td>
                    <td>{job.customers?.name || 'N/A'}</td>
                    <td>{job.technicians?.name || 'Unassigned'}</td>
                    <td>
                      <span className={getStatusBadge(job.status)}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      {job.scheduled_time
                        ? new Date(job.scheduled_time).toLocaleString()
                        : 'Not scheduled'}
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="btn btn-sm btn-secondary"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="btn btn-sm btn-danger"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingJob ? 'Edit Job' : 'Create New Job'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Customer</label>
                <select
                  className="form-input"
                  value={formData.customer_id}
                  onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Technician (Optional)</label>
                <select
                  className="form-input"
                  value={formData.tech_id}
                  onChange={(e) => setFormData({ ...formData, tech_id: e.target.value })}
                >
                  <option value="">Unassigned</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} - {tech.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
                >
                  <option value="Open">Open</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="form-label">Scheduled Time (Optional)</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={formData.scheduled_time}
                  onChange={(e) => setFormData({ ...formData, scheduled_time: e.target.value })}
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingJob ? 'Update Job' : 'Create Job'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
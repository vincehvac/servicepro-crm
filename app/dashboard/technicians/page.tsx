'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { getTechnicians, createTechnician, updateTechnician, deleteTechnician, Technician } from '@/lib/supabase'

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTech, setEditingTech] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    status: 'Available' as Technician['status'],
    skills: ''
  })

  useEffect(() => {
    loadTechnicians()
  }, [])

  const loadTechnicians = async () => {
    setLoading(true)
    try {
      const { data } = await getTechnicians()
      if (data) setTechnicians(data)
    } catch (error) {
      console.error('Error loading technicians:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingTech) {
        await updateTechnician(editingTech.id, formData)
      } else {
        await createTechnician(formData)
      }
      
      setShowModal(false)
      resetForm()
      loadTechnicians()
    } catch (error) {
      console.error('Error saving technician:', error)
      alert('Error saving technician')
    }
  }

  const handleEdit = (tech: any) => {
    setEditingTech(tech)
    setFormData({
      name: tech.name,
      status: tech.status,
      skills: tech.skills
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this technician?')) {
      try {
        await deleteTechnician(id)
        loadTechnicians()
      } catch (error) {
        console.error('Error deleting technician:', error)
        alert('Error deleting technician')
      }
    }
  }

  const toggleStatus = async (tech: any) => {
    const newStatus = tech.status === 'Available' ? 'Busy' : 'Available'
    try {
      await updateTechnician(tech.id, { status: newStatus })
      loadTechnicians()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      status: 'Available',
      skills: ''
    })
    setEditingTech(null)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Available': 'bg-green-100 text-green-800',
      'Busy': 'bg-yellow-100 text-yellow-800',
      'Offline': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <DashboardLayout title="Technicians">
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Technicians">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="card !p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold">
                {technicians.filter(t => t.status === 'Available').length} Available
              </span>
            </div>
          </div>
          <div className="card !p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-semibold">
                {technicians.filter(t => t.status === 'Busy').length} Busy
              </span>
            </div>
          </div>
          <div className="card !p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="font-semibold">
                {technicians.filter(t => t.status === 'Offline').length} Offline
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="btn btn-primary"
        >
          ➕ Add Technician
        </button>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No technicians found
          </div>
        ) : (
          technicians.map((tech) => (
            <div key={tech.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    👷
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tech.name}</h3>
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(tech.status)}`}>
                      {tech.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {tech.skills.split(',').map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(tech)}
                  className={`btn flex-1 ${tech.status === 'Available' ? 'btn-warning' : 'btn-success'}`}
                >
                  {tech.status === 'Available' ? '⏸️ Set Busy' : '▶️ Set Available'}
                </button>
                <button
                  onClick={() => handleEdit(tech)}
                  className="btn btn-secondary"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(tech.id)}
                  className="btn btn-danger"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">
              {editingTech ? 'Edit Technician' : 'Add New Technician'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Technician['status'] })}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="form-label">Skills (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="HVAC, Plumbing, Electrical"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter skills separated by commas
                </p>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingTech ? 'Update Technician' : 'Add Technician'}
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
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'technician' | 'dispatcher'
  created_at?: string
}

export interface Job {
  id: string
  title: string
  description: string
  customer_id: string
  tech_id?: string
  status: 'Open' | 'Scheduled' | 'In Progress' | 'Completed'
  scheduled_time?: string
  created_at?: string
  updated_at?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  created_at?: string
}

export interface Technician {
  id: string
  name: string
  status: 'Available' | 'Busy' | 'Offline'
  skills: string
  created_at?: string
}

// Auth Helper Functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email: string, password: string, name: string, role: string = 'technician') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
      },
    },
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Job Functions
export const getJobs = async (filters?: { status?: string; tech_id?: string }) => {
  let query = supabase.from('jobs').select('*, customers(*), technicians(*)')
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  
  if (filters?.tech_id) {
    query = query.eq('tech_id', filters.tech_id)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const createJob = async (job: Partial<Job>) => {
  const { data, error } = await supabase.from('jobs').insert([job]).select()
  return { data, error }
}

export const updateJob = async (id: string, updates: Partial<Job>) => {
  const { data, error } = await supabase.from('jobs').update(updates).eq('id', id).select()
  return { data, error }
}

export const deleteJob = async (id: string) => {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  return { error }
}

// Customer Functions
export const getCustomers = async () => {
  const { data, error } = await supabase.from('customers').select('*').order('name')
  return { data, error }
}

export const createCustomer = async (customer: Partial<Customer>) => {
  const { data, error } = await supabase.from('customers').insert([customer]).select()
  return { data, error }
}

export const updateCustomer = async (id: string, updates: Partial<Customer>) => {
  const { data, error } = await supabase.from('customers').update(updates).eq('id', id).select()
  return { data, error }
}

export const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from('customers').delete().eq('id', id)
  return { error }
}

// Technician Functions
export const getTechnicians = async () => {
  const { data, error } = await supabase.from('technicians').select('*').order('name')
  return { data, error }
}

export const createTechnician = async (technician: Partial<Technician>) => {
  const { data, error } = await supabase.from('technicians').insert([technician]).select()
  return { data, error }
}

export const updateTechnician = async (id: string, updates: Partial<Technician>) => {
  const { data, error } = await supabase.from('technicians').update(updates).eq('id', id).select()
  return { data, error }
}

export const deleteTechnician = async (id: string) => {
  const { error } = await supabase.from('technicians').delete().eq('id', id)
  return { error }
}
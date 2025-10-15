import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ServicePro Elite CRM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete HVAC Service Management System
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Internal Team Portal */}
          <div className="card">
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold mb-4">Internal Team</h2>
              <p className="text-gray-600 mb-6">
                Access the internal dashboard to manage jobs, customers, and technicians
              </p>
              <Link href="/login" className="btn btn-primary w-full block text-center">
                Team Login
              </Link>
            </div>
          </div>

          {/* Customer Portal */}
          <div className="card">
            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold mb-4">Customer Portal</h2>
              <p className="text-gray-600 mb-6">
                View your service requests, schedule appointments, and track jobs
              </p>
              <Link href="/customer/login" className="btn btn-primary w-full block text-center">
                Customer Login
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Job Management</h3>
              <p className="text-gray-600">
                Create, assign, and track service jobs in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👷</div>
              <h3 className="text-xl font-semibold mb-2">Technician Dispatch</h3>
              <p className="text-gray-600">
                Optimize routes and assign jobs based on skills and availability
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-gray-600">
                Track performance metrics and generate detailed reports
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Invoice Management</h3>
              <p className="text-gray-600">
                Create and manage invoices with automated billing
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile Access</h3>
              <p className="text-gray-600">
                Access the system from any device, anywhere
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Notifications</h3>
              <p className="text-gray-600">
                Real-time alerts for job updates and customer requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
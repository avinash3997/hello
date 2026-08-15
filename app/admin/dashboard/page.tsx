import { DashboardHeader } from '@/components/dashboard/header'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getSession()

  // Ensure user is super admin
  if (!session || session.role !== 'super_admin') {
    redirect('/auth/login')
  }

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader title="Vidyalaya System Admin" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Schools</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">12</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Pending Requests</p>
            <p className="text-4xl font-serif font-bold text-accent mt-2">3</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Users</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">248</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Active Assessments</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">1,340</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/admin/requests">
            <div className="bg-surface rounded-lg border border-border p-6 hover:border-accent transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-accent font-bold text-lg">+</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-1">School Requests</h3>
              <p className="text-ink/60 text-sm">Review registration requests</p>
            </div>
          </Link>
          <Link href="/admin/schools">
            <div className="bg-surface rounded-lg border border-border p-6 hover:border-accent transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-proficient/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-proficient font-bold text-lg">🏫</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-1">Manage Schools</h3>
              <p className="text-ink/60 text-sm">View all schools in the system</p>
            </div>
          </Link>
          <Link href="/admin/curriculum">
            <div className="bg-surface rounded-lg border border-border p-6 hover:border-accent transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-basic/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-basic font-bold text-lg">📚</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-1">Master Curriculum</h3>
              <p className="text-ink/60 text-sm">Configure standard subjects</p>
            </div>
          </Link>
        </div>

        <Link href="/admin/monitoring" className="mb-8 block rounded-lg border border-accent/30 bg-accent/5 p-5 transition-colors hover:border-accent">
          <p className="font-serif text-lg font-bold text-ink">Open system monitoring</p>
          <p className="mt-1 text-sm text-ink/60">Review service health, capacity, uptime, and recent platform activity.</p>
        </Link>

        {/* Recent Activity */}
        <div className="bg-surface rounded-lg border border-border">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-2xl font-bold text-ink">System Overview</h2>
            <p className="text-ink/60 text-sm mt-1">
              Key metrics and system status
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-paper rounded-lg">
                <div>
                  <p className="font-medium text-ink">Latest Registrations</p>
                  <p className="text-sm text-ink/60">3 schools awaiting approval</p>
                </div>
                <span className="text-accent font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-paper rounded-lg">
                <div>
                  <p className="font-medium text-ink">Active Terms</p>
                  <p className="text-sm text-ink/60">Current assessment period</p>
                </div>
                <span className="text-proficient font-bold">Term 1</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-paper rounded-lg">
                <div>
                  <p className="font-medium text-ink">System Health</p>
                  <p className="text-sm text-ink/60">All services operational</p>
                </div>
                <span className="text-advanced font-bold">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

import { DashboardHeader } from '@/components/dashboard/header'
import { DataTable } from '@/components/admin/data-table'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function TeachersPage() {
  const session = await getSession()

  if (!session || (session.role !== 'school_admin' && session.role !== 'super_admin')) {
    redirect('/auth/login')
  }

  const teachers = [
    { id: '1', name: 'Priya Poudel', email: 'priya.poudel@shiningstars.edu.np', phone: '9841234567', joinDate: '2020-01-15', status: 'Active' },
    { id: '2', name: 'Rajesh Kumar', email: 'rajesh.kumar@shiningstars.edu.np', phone: '9841234568', joinDate: '2019-06-01', status: 'Active' },
    { id: '3', name: 'Anita Sharma', email: 'anita.sharma@shiningstars.edu.np', phone: '9841234569', joinDate: '2021-02-10', status: 'Active' },
    { id: '4', name: 'Bikram Rana', email: 'bikram.rana@shiningstars.edu.np', phone: '9841234570', joinDate: '2022-08-20', status: 'Active' },
    { id: '5', name: 'Sunita Thapa', email: 'sunita.thapa@shiningstars.edu.np', phone: '9841234571', joinDate: '2023-01-05', status: 'Active' },
  ]

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader
        title="Manage Teachers"
        schoolName="Shining Stars Primary School"
        academicYear="2026"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Teachers</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">{teachers.length}</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Active Teachers</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">
              {teachers.filter(t => t.status === 'Active').length}
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Avg Tenure</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">3.5y</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Subject Masters</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">5</p>
          </div>
        </div>

        {/* Teachers Table */}
        <DataTable
          title="Teachers"
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Joined', accessor: 'joinDate' },
            { header: 'Status', accessor: 'status' },
          ]}
          data={teachers}
          onAdd={() => {}}
        />

        {/* Teacher Onboarding */}
        <div className="mt-8 bg-surface rounded-lg border border-border p-6">
          <h3 className="font-serif text-lg font-bold text-ink mb-4">Add New Teacher</h3>
          <p className="text-ink/60 text-sm mb-6">
            When you add a new teacher, the system will generate temporary credentials and send them via email.
          </p>
          <Button className="bg-accent text-ink hover:bg-accent/90">
            + Add New Teacher
          </Button>
        </div>
      </div>
    </main>
  )
}

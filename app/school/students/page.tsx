import { DashboardHeader } from '@/components/dashboard/header'
import { DataTable } from '@/components/admin/data-table'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function StudentsPage() {
  const session = await getSession()

  if (!session || (session.role !== 'school_admin' && session.role !== 'super_admin')) {
    redirect('/auth/login')
  }

  const students = [
    { id: '1', name: 'Arun Sharma', rollNo: '001', grade: '1', section: 'A', dob: '2019-03-15', enrolled: '2025-01-10' },
    { id: '2', name: 'Bhawna Singh', rollNo: '002', grade: '1', section: 'A', dob: '2019-05-22', enrolled: '2025-01-10' },
    { id: '3', name: 'Chandra Poudel', rollNo: '003', grade: '1', section: 'A', dob: '2019-07-10', enrolled: '2025-01-10' },
    { id: '4', name: 'Deepak Rana', rollNo: '001', grade: '1', section: 'B', dob: '2019-04-18', enrolled: '2025-01-10' },
    { id: '5', name: 'Esha Thapa', rollNo: '002', grade: '1', section: 'B', dob: '2019-06-25', enrolled: '2025-01-10' },
    { id: '6', name: 'Faisal Ahmad', rollNo: '001', grade: '2', section: 'A', dob: '2018-02-14', enrolled: '2024-01-15' },
    { id: '7', name: 'Geeta Sharma', rollNo: '002', grade: '2', section: 'A', dob: '2018-08-09', enrolled: '2024-01-15' },
    { id: '8', name: 'Hari Neupane', rollNo: '003', grade: '2', section: 'A', dob: '2018-11-30', enrolled: '2024-01-15' },
  ]

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader
        title="Manage Students"
        schoolName="Shining Stars Primary School"
        academicYear="2026"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">{students.length}</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Grade 1 Students</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">
              {students.filter(s => s.grade === '1').length}
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Grade 2 Students</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">
              {students.filter(s => s.grade === '2').length}
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Avg Age</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">6-7</p>
          </div>
        </div>

        {/* Import Section */}
        <div className="mb-8 bg-surface rounded-lg border border-border p-6">
          <h3 className="font-serif font-bold text-ink mb-3">Bulk Import</h3>
          <p className="text-ink/60 text-sm mb-4">
            Import students from a CSV file. Ensure columns: Name, Roll No, Grade, Section, DOB
          </p>
          <div className="flex gap-2">
            <Button className="bg-accent text-ink hover:bg-accent/90">
              Download Template
            </Button>
            <Button variant="outline" className="text-ink border-ink">
              Import CSV
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <DataTable
          title="Students"
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Roll No', accessor: 'rollNo' },
            { header: 'Grade', accessor: 'grade' },
            { header: 'Section', accessor: 'section' },
            { header: 'Date of Birth', accessor: 'dob' },
            { header: 'Enrolled', accessor: 'enrolled' },
          ]}
          data={students}
          onAdd={() => {}}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {students.slice(0, 3).map((student) => (
            <Link key={student.id} href={`/school/students/profile/${student.id}`}>
              <Button variant="outline" className="border-ink text-ink hover:bg-paper">
                Open {student.name}&apos;s profile
              </Button>
            </Link>
          ))}
        </div>

        {/* Parent Links */}
        <div className="mt-8 bg-surface rounded-lg border border-border p-6">
          <h3 className="font-serif text-lg font-bold text-ink mb-4">Link Parents</h3>
          <p className="text-ink/60 text-sm mb-6">
            Create parent accounts and link them to students for report card access
          </p>
          <Button className="bg-accent text-ink hover:bg-accent/90">
            Manage Parent Links
          </Button>
        </div>
      </div>
    </main>
  )
}

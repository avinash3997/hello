import { DashboardHeader } from '@/components/dashboard/header'
import { DataTable } from '@/components/admin/data-table'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function ClassesPage() {
  const session = await getSession()

  if (!session || (session.role !== 'school_admin' && session.role !== 'super_admin')) {
    redirect('/auth/login')
  }

  const classes = [
    { id: '1', grade: '1', section: 'A', studentCount: 28, teacherName: 'Priya Poudel', academicYear: '2026' },
    { id: '2', grade: '1', section: 'B', studentCount: 30, teacherName: 'Rajesh Kumar', academicYear: '2026' },
    { id: '3', grade: '2', section: 'A', studentCount: 25, teacherName: 'Anita Sharma', academicYear: '2026' },
    { id: '4', grade: '3', section: 'A', studentCount: 32, teacherName: 'Bikram Rana', academicYear: '2026' },
    { id: '5', grade: '4', section: 'A', studentCount: 29, teacherName: 'Priya Poudel', academicYear: '2026' },
    { id: '6', grade: '5', section: 'A', studentCount: 27, teacherName: 'Rajesh Kumar', academicYear: '2026' },
  ]

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader
        title="Manage Classes"
        schoolName="Shining Stars Primary School"
        academicYear="2026"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Classes</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">{classes.length}</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">
              {classes.reduce((sum, c) => sum + c.studentCount, 0)}
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Grades Offered</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">1-5</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Avg Class Size</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">
              {Math.round(classes.reduce((sum, c) => sum + c.studentCount, 0) / classes.length)}
            </p>
          </div>
        </div>

        {/* Classes Table */}
        <DataTable
          title="Classes"
          columns={[
            { header: 'Grade', accessor: 'grade' },
            { header: 'Section', accessor: 'section' },
            { header: 'Students', accessor: 'studentCount' },
            { header: 'Class Teacher', accessor: 'teacherName' },
            { header: 'Academic Year', accessor: 'academicYear' },
          ]}
          data={classes}
          onAdd={() => {}}
        />

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink mb-3">Assign Teachers</h3>
            <p className="text-ink/60 text-sm mb-4">Link teachers to specific classes and subjects</p>
            <Button className="bg-accent text-ink hover:bg-accent/90 w-full">
              Manage Assignments
            </Button>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink mb-3">Class Settings</h3>
            <p className="text-ink/60 text-sm mb-4">Configure academic year and remedial thresholds</p>
            <Button className="bg-accent text-ink hover:bg-accent/90 w-full">
              Edit Settings
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

import { DashboardHeader } from '@/components/dashboard/header'
import { DataTable } from '@/components/admin/data-table'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default async function SchoolDashboard() {
  const session = await getSession()

  // Ensure user is school admin
  if (!session || (session.role !== 'school_admin' && session.role !== 'super_admin')) {
    redirect('/auth/login')
  }

  // Mock data
  const classes = [
    { id: '1', grade: '1', section: 'A', studentCount: 28, teachers: 2 },
    { id: '2', grade: '1', section: 'B', studentCount: 30, teachers: 2 },
    { id: '3', grade: '2', section: 'A', studentCount: 25, teachers: 2 },
    { id: '4', grade: '3', section: 'A', studentCount: 32, teachers: 2 },
    { id: '5', grade: '5', section: 'A', studentCount: 27, teachers: 2 },
  ]

  const teachers = [
    { id: '1', name: 'Priya Poudel', email: 'priya@example.edu.np', phone: '9841234567', classes: 'Grade 1-2' },
    { id: '2', name: 'Rajesh Kumar', email: 'rajesh@example.edu.np', phone: '9841234568', classes: 'Grade 2-3' },
    { id: '3', name: 'Anita Sharma', email: 'anita@example.edu.np', phone: '9841234569', classes: 'Grade 3-4' },
    { id: '4', name: 'Bikram Rana', email: 'bikram@example.edu.np', phone: '9841234570', classes: 'Grade 4-5' },
  ]

  const students = [
    { id: '1', name: 'Arun Sharma', rollNo: '001', grade: '1', section: 'A', dob: '2019-03-15' },
    { id: '2', name: 'Bhawna Singh', rollNo: '002', grade: '1', section: 'A', dob: '2019-05-22' },
    { id: '3', name: 'Chandra Poudel', rollNo: '003', grade: '1', section: 'A', dob: '2019-07-10' },
    { id: '4', name: 'Deepak Rana', rollNo: '004', grade: '1', section: 'B', dob: '2019-04-18' },
  ]

  const subjects = [
    { id: '1', name: 'Nepali', displayOrder: 1 },
    { id: '2', name: 'English', displayOrder: 2 },
    { id: '3', name: 'Mathematics', displayOrder: 3 },
    { id: '4', name: 'Social Studies', displayOrder: 4 },
    { id: '5', name: 'Science', displayOrder: 5 },
  ]

  const terms = [
    { id: '1', name: 'Term 1', startDate: '2026-01-15', endDate: '2026-04-30', status: 'Active' },
    { id: '2', name: 'Term 2', startDate: '2026-05-01', endDate: '2026-08-31', status: 'Upcoming' },
    { id: '3', name: 'Term 3', startDate: '2026-09-01', endDate: '2026-12-31', status: 'Upcoming' },
  ]

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader 
        title="School Admin Dashboard"
        schoolName="Shining Stars Primary School"
        academicYear="2026"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Setup Checklist */}
        <div className="mb-8 bg-surface rounded-lg border border-border p-6">
          <h2 className="font-serif text-2xl font-bold text-ink mb-4">
            Setup Checklist
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 bg-advanced rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-ink font-medium">Configure academic terms</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 bg-advanced rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-ink font-medium">
                Create classes (Grade 1-5)
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 border-2 border-accent rounded-full flex-shrink-0" />
              <span className="text-ink font-medium">Add teachers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 border-2 border-accent rounded-full flex-shrink-0" />
              <span className="text-ink font-medium">Enroll students</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 border-2 border-accent rounded-full flex-shrink-0" />
              <span className="text-ink font-medium">
                Configure curriculum units
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-paper rounded">
              <div className="w-5 h-5 border-2 border-accent rounded-full flex-shrink-0" />
              <span className="text-ink font-medium">Assign teachers to classes</span>
            </div>
          </div>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-surface border border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-accent data-[state=active]:text-ink">
              Overview
            </TabsTrigger>
            <TabsTrigger value="classes" className="data-[state=active]:bg-accent data-[state=active]:text-ink">
              Classes
            </TabsTrigger>
            <TabsTrigger value="teachers" className="data-[state=active]:bg-accent data-[state=active]:text-ink">
              Teachers
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-accent data-[state=active]:text-ink">
              Students
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-accent data-[state=active]:text-ink">
              Curriculum
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-surface rounded-lg border border-border p-6">
                <p className="text-ink/60 text-sm font-medium">Total Classes</p>
                <p className="text-4xl font-serif font-bold text-ink mt-2">5</p>
              </div>
              <div className="bg-surface rounded-lg border border-border p-6">
                <p className="text-ink/60 text-sm font-medium">Total Teachers</p>
                <p className="text-4xl font-serif font-bold text-ink mt-2">8</p>
              </div>
              <div className="bg-surface rounded-lg border border-border p-6">
                <p className="text-ink/60 text-sm font-medium">Total Students</p>
                <p className="text-4xl font-serif font-bold text-ink mt-2">143</p>
              </div>
              <div className="bg-surface rounded-lg border border-border p-6">
                <p className="text-ink/60 text-sm font-medium">Active Terms</p>
                <p className="text-4xl font-serif font-bold text-proficient mt-2">
                  2
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <DataTable
              title="Classes"
              columns={[
                { header: 'Grade', accessor: 'grade' },
                { header: 'Section', accessor: 'section' },
                { header: 'Students', accessor: 'studentCount' },
                { header: 'Teachers', accessor: 'teachers' },
              ]}
              data={classes}
              onAdd={() => {}}
            />
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-4">
            <DataTable
              title="Teachers"
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Email', accessor: 'email' },
                { header: 'Phone', accessor: 'phone' },
                { header: 'Classes', accessor: 'classes' },
              ]}
              data={teachers}
              onAdd={() => {}}
            />
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <Button className="bg-accent text-ink hover:bg-accent/90">
                  + Add Student
                </Button>
                <Button variant="outline" className="text-ink border-ink">
                  Import CSV
                </Button>
              </div>
            </div>
            <DataTable
              title="Students"
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Roll No', accessor: 'rollNo' },
                { header: 'Grade', accessor: 'grade' },
                { header: 'Section', accessor: 'section' },
              ]}
              data={students}
            />
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-ink mb-4">Subjects & Units</h3>
                <DataTable
                  title="Subjects"
                  columns={[
                    { header: 'Subject Name', accessor: 'name' },
                    { header: 'Order', accessor: 'displayOrder' },
                  ]}
                  data={subjects}
                  onAdd={() => {}}
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-serif text-lg font-bold text-ink mb-4">Academic Terms</h3>
                <DataTable
                  title="Terms"
                  columns={[
                    { header: 'Term Name', accessor: 'name' },
                    { header: 'Start Date', accessor: 'startDate' },
                    { header: 'End Date', accessor: 'endDate' },
                    { header: 'Status', accessor: 'status' },
                  ]}
                  data={terms}
                  onAdd={() => {}}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TeacherDashboard() {
  const myClasses = [
    { name: 'Grade 3 - English', students: 28, section: 'A' },
    { name: 'Grade 4 - Mathematics', students: 31, section: 'A' },
    { name: 'Grade 5 - Science', students: 26, section: 'B' },
  ]

  const pendingTasks = [
    { title: 'Assessment Scores Due', due: 'Tomorrow', type: 'assessment' },
    { title: 'Remedial Review', due: '2 days', type: 'remedial' },
    { title: 'Attendance Submission', due: '3 days', type: 'attendance' },
  ]

  const recentActivity = [
    { action: 'Saved 28 assessments for Grade 3', time: '2 hours ago' },
    { action: 'Assigned 3 remedial tasks to Aman Sharma', time: '4 hours ago' },
    { action: 'Submitted attendance for Grade 4', time: '1 day ago' },
  ]

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              Teacher Dashboard
            </h1>
            <p className="text-ink/60 text-sm">Welcome back! Academic Year 2026</p>
          </div>
          <Button variant="outline" className="text-ink border-ink">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/teacher/gradebook">
            <Button className="w-full bg-accent text-ink hover:bg-accent/90 h-24 font-serif text-base">
              <div className="text-center">
                <div className="text-2xl">📋</div>
                Gradebook
              </div>
            </Button>
          </Link>
          <Link href="/teacher/remedials">
            <Button className="w-full bg-proficient text-white hover:bg-proficient/90 h-24 font-serif text-base">
              <div className="text-center">
                <div className="text-2xl">🎯</div>
                Remedials
              </div>
            </Button>
          </Link>
          <Link href="/teacher/attendance">
            <Button className="w-full bg-advanced text-white hover:bg-advanced/90 h-24 font-serif text-base">
              <div className="text-center">
                <div className="text-2xl">✓</div>
                Attendance
              </div>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button className="w-full bg-ink text-white hover:bg-ink/90 h-24 font-serif text-base">
              <div className="text-center">
                <div className="text-2xl">📊</div>
                Analytics
              </div>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Classes */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg border border-border p-6 mb-8">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                My Classes
              </h2>
              <div className="space-y-3">
                {myClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-border rounded-lg hover:border-accent transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-serif font-bold text-ink">
                          {cls.name}
                        </h3>
                        <p className="text-sm text-ink/60">
                          Section {cls.section}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium">
                        {cls.students} students
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Pending Tasks
              </h2>
              <div className="space-y-3">
                {pendingTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border-l-4 rounded ${
                      task.type === 'assessment'
                        ? 'border-l-accent bg-accent/5'
                        : task.type === 'remedial'
                          ? 'border-l-proficient bg-proficient/5'
                          : 'border-l-advanced bg-advanced/5'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-ink">{task.title}</p>
                        <p className="text-xs text-ink/60 mt-1">Due: {task.due}</p>
                      </div>
                      <span className="text-xs font-medium text-accent">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-border last:border-b-0"
                  >
                    <p className="text-sm text-ink">{activity.action}</p>
                    <p className="text-xs text-ink/60 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Performance */}
            <div className="bg-surface rounded-lg border border-border p-6 mt-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Class Performance
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ink">Grade 3</span>
                    <span className="font-mono text-ink/60">3.7</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-advanced" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ink">Grade 4</span>
                    <span className="font-mono text-ink/60">3.5</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-proficient" style={{ width: '88%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-ink">Grade 5</span>
                    <span className="font-mono text-ink/60">3.4</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-proficient" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

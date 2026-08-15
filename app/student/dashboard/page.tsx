'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StudentDashboard() {
  const subjects = [
    {
      name: 'English Language Arts',
      score: 88,
      grade: 'A+',
      status: 'advanced',
    },
    {
      name: 'Mathematics',
      score: 75,
      grade: 'B+',
      status: 'proficient',
    },
    {
      name: 'Science & Technology',
      score: 79,
      grade: 'A',
      status: 'proficient',
    },
    {
      name: 'Social Studies',
      score: 81,
      grade: 'A',
      status: 'advanced',
    },
  ]

  const remedialsAssigned = [
    { title: 'Reading Comprehension Exercises', subject: 'English', status: '2/3 completed' },
    { title: 'Multiplication Practice', subject: 'Mathematics', status: '0/4 completed' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'advanced':
        return { bg: 'bg-advanced/10', text: 'text-advanced', label: 'Advanced' }
      case 'proficient':
        return { bg: 'bg-proficient/10', text: 'text-proficient', label: 'Proficient' }
      default:
        return { bg: 'bg-basic/10', text: 'text-basic', label: 'Basic' }
    }
  }

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              Your Learning Dashboard
            </h1>
            <p className="text-ink/60 text-sm">Grade 3 • Academic Year 2026</p>
          </div>
          <Button variant="outline" className="text-ink border-ink">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Overall GPA</p>
            <p className="text-5xl font-serif font-bold text-proficient mt-2">
              3.6
            </p>
            <p className="text-sm text-ink/60 mt-2">Out of 4.0</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">
              Attendance
            </p>
            <p className="text-5xl font-serif font-bold text-advanced mt-2">
              95%
            </p>
            <p className="text-sm text-ink/60 mt-2">42 of 44 classes</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">
              Remedial Tasks
            </p>
            <p className="text-5xl font-serif font-bold text-accent mt-2">2</p>
            <p className="text-sm text-ink/60 mt-2">In progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Performance */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg border border-border p-6 mb-8">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Subject Performance
              </h2>
              <div className="space-y-4">
                {subjects.map((subject) => {
                  const colors = getStatusColor(subject.status)
                  return (
                    <div
                      key={subject.name}
                      className={`p-4 rounded-lg border border-border ${colors.bg}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-ink">{subject.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-serif font-bold ${colors.text}`}>
                            {subject.grade}
                          </span>
                          <span className={`text-xs font-medium ${colors.text}`}>
                            {colors.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full ${colors.text} bg-current`}
                            style={{ width: `${subject.score}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm text-ink/60 w-10">
                          {subject.score}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Latest Assignments */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Latest Assignments
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-4 border border-border rounded-lg hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-ink">
                          Unit {item} Reading Task
                        </p>
                        <p className="text-sm text-ink/60">English Language Arts</p>
                      </div>
                      <span className="px-2 py-1 bg-advanced/10 text-advanced text-xs font-medium rounded">
                        Submitted
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-ink/60">
                      <span>Due: {item} days ago</span>
                      <span>Score: {88 - item * 2}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Remedial Tasks */}
          <div>
            <div className="bg-surface rounded-lg border border-border p-6 mb-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Your Remedial Tasks
              </h2>
              {remedialsAssigned.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-ink/60 text-sm mb-3">
                    No remedial tasks at this time
                  </p>
                  <p className="text-xs text-ink/60">
                    Keep performing well and maintain your progress!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {remedialsAssigned.map((task, idx) => (
                    <div key={idx} className="p-4 border border-border rounded-lg">
                      <p className="font-medium text-ink text-sm mb-1">
                        {task.title}
                      </p>
                      <p className="text-xs text-ink/60 mb-2">{task.subject}</p>
                      <div className="w-full h-2 bg-paper rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-accent"
                          style={{
                            width: task.status === '2/3 completed' ? '67%' : '0%',
                          }}
                        />
                      </div>
                      <p className="text-xs text-ink/60">{task.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">
                Resources
              </h2>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full text-ink border-ink hover:bg-paper justify-start"
                >
                  📚 Study Materials
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-ink border-ink hover:bg-paper justify-start"
                >
                  ❓ Ask Teacher
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-ink border-ink hover:bg-paper justify-start"
                >
                  📊 View Progress
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

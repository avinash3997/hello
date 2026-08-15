'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Analytics() {
  const performanceByGrade = [
    { grade: 'Grade 1', advanced: 15, proficient: 22, basic: 8, below: 2 },
    { grade: 'Grade 2', advanced: 18, proficient: 25, basic: 5, below: 1 },
    { grade: 'Grade 3', advanced: 22, proficient: 20, basic: 6, below: 2 },
    { grade: 'Grade 4', advanced: 20, proficient: 23, basic: 7, below: 3 },
    { grade: 'Grade 5', advanced: 18, proficient: 26, basic: 8, below: 2 },
  ]

  const remedialsOverTime = [
    { month: 'January', started: 8, completed: 5, inProgress: 3 },
    { month: 'February', started: 12, completed: 9, inProgress: 3 },
    { month: 'March', started: 10, completed: 8, inProgress: 2 },
    { month: 'April', started: 15, completed: 11, inProgress: 4 },
  ]

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-ink">
            Analytics & Insights
          </h1>
          <Link href="/school/dashboard">
            <Button variant="outline" className="text-ink border-ink">
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Avg Performance</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">3.4</p>
            <p className="text-xs text-ink/60 mt-2">Out of 4.0</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Remedials Active</p>
            <p className="text-4xl font-serif font-bold text-accent mt-2">23</p>
            <p className="text-xs text-ink/60 mt-2">Students being helped</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Completion Rate</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">78%</p>
            <p className="text-xs text-ink/60 mt-2">Of remedial tasks</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Improvement Rate</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">+12%</p>
            <p className="text-xs text-ink/60 mt-2">Compared to last term</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Distribution by Grade */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="font-serif text-xl font-bold text-ink mb-4">
              Performance Distribution by Grade
            </h2>
            <div className="space-y-4">
              {performanceByGrade.map((item) => {
                const total = item.advanced + item.proficient + item.basic + item.below
                return (
                  <div key={item.grade}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-ink">{item.grade}</p>
                      <p className="text-xs text-ink/60">
                        {item.advanced} • {item.proficient} • {item.basic} • {item.below}
                      </p>
                    </div>
                    <div className="flex h-6 rounded-full overflow-hidden gap-0.5">
                      <div
                        className="bg-advanced"
                        style={{
                          width: `${(item.advanced / total) * 100}%`,
                        }}
                        title="Advanced"
                      />
                      <div
                        className="bg-proficient"
                        style={{
                          width: `${(item.proficient / total) * 100}%`,
                        }}
                        title="Proficient"
                      />
                      <div
                        className="bg-basic"
                        style={{
                          width: `${(item.basic / total) * 100}%`,
                        }}
                        title="Basic"
                      />
                      <div
                        className="bg-below-basic"
                        style={{
                          width: `${(item.below / total) * 100}%`,
                        }}
                        title="Below Basic"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-advanced rounded-full" />
                <span className="text-ink/60">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-proficient rounded-full" />
                <span className="text-ink/60">Proficient</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-basic rounded-full" />
                <span className="text-ink/60">Basic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-below-basic rounded-full" />
                <span className="text-ink/60">Below Basic</span>
              </div>
            </div>
          </div>

          {/* Remedials Over Time */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="font-serif text-xl font-bold text-ink mb-4">
              Remedials Over Time
            </h2>
            <div className="space-y-6">
              {remedialsOverTime.map((item) => {
                const total = item.started
                return (
                  <div key={item.month}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-ink">{item.month}</p>
                      <p className="text-xs text-ink/60">
                        {item.completed} / {item.started} completed
                      </p>
                    </div>
                    <div className="flex h-5 rounded-full overflow-hidden gap-0.5 bg-paper">
                      <div
                        className="bg-advanced"
                        style={{
                          width: `${(item.completed / total) * 100}%`,
                        }}
                        title="Completed"
                      />
                      <div
                        className="bg-accent"
                        style={{
                          width: `${(item.inProgress / total) * 100}%`,
                        }}
                        title="In Progress"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-advanced rounded-full" />
                <span className="text-ink/60">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-ink/60">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif text-xl font-bold text-ink mb-4">
              Top Performing Subjects
            </h3>
            <div className="space-y-3">
              {[
                { subject: 'English Language Arts', score: 3.8 },
                { subject: 'Social Studies', score: 3.7 },
                { subject: 'Science', score: 3.6 },
                { subject: 'Mathematics', score: 3.2 },
              ].map((item) => (
                <div key={item.subject} className="flex justify-between items-center">
                  <span className="text-sm text-ink">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-paper rounded-full overflow-hidden">
                      <div
                        className="h-full bg-advanced"
                        style={{ width: `${(item.score / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-ink/60 w-8">
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif text-xl font-bold text-ink mb-4">
              Areas Needing Support
            </h3>
            <div className="space-y-3">
              {[
                { area: 'Mathematics Problem Solving', students: 8 },
                { area: 'Reading Comprehension', students: 5 },
                { area: 'Writing Structure', students: 6 },
                { area: 'Scientific Reasoning', students: 3 },
              ].map((item) => (
                <div key={item.area} className="flex justify-between items-center">
                  <span className="text-sm text-ink">{item.area}</span>
                  <span className="px-2 py-1 bg-below-basic/10 text-below-basic text-xs font-medium rounded">
                    {item.students} students
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

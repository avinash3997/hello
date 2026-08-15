'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface RemedialsStudent {
  id: string
  name: string
  rollNumber: string
  indicator: string
  score: 1 | 2
  remedialsAssigned: number
  remedialsCompleted: number
  progress: number
  lastAttempt?: string
}

export default function RemedialsWorkflow() {
  const [remedialsStudents] = useState<RemedialsStudent[]>([
    {
      id: '1',
      name: 'Aman Sharma',
      rollNumber: '001',
      indicator: 'Reading Comprehension',
      score: 1,
      remedialsAssigned: 3,
      remedialsCompleted: 1,
      progress: 33,
      lastAttempt: '2 days ago',
    },
    {
      id: '2',
      name: 'Bikram Singh',
      rollNumber: '002',
      indicator: 'Writing Skills',
      score: 2,
      remedialsAssigned: 2,
      remedialsCompleted: 0,
      progress: 0,
    },
    {
      id: '3',
      name: 'Chandra Rai',
      rollNumber: '003',
      indicator: 'Listening Ability',
      score: 1,
      remedialsAssigned: 4,
      remedialsCompleted: 3,
      progress: 75,
      lastAttempt: 'Today',
    },
    {
      id: '4',
      name: 'Disha Poudel',
      rollNumber: '004',
      indicator: 'Speaking Fluency',
      score: 2,
      remedialsAssigned: 2,
      remedialsCompleted: 2,
      progress: 100,
      lastAttempt: '3 days ago',
    },
  ])

  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              Remedial Tasks Management
            </h1>
            <p className="text-ink/60 text-sm">Track and monitor student remedial work</p>
          </div>
          <Link href="/teacher/dashboard">
            <Button variant="outline" className="text-ink border-ink">
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Students in Remedial</p>
            <p className="text-4xl font-serif font-bold text-accent mt-2">4</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Tasks Assigned</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">11</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Completed Tasks</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">6</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Avg Progress</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">52%</p>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {remedialsStudents.map((student) => (
            <div
              key={student.id}
              className="bg-surface rounded-lg border border-border overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-paper/50 transition-colors"
                onClick={() =>
                  setExpandedStudent(
                    expandedStudent === student.id ? null : student.id
                  )
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-ink text-lg">
                      {student.name}
                    </h3>
                    <p className="text-ink/60 text-sm">
                      Roll: {student.rollNumber} • {student.indicator}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-ink/60 text-xs uppercase tracking-wide">
                        Score
                      </p>
                      <p
                        className={`font-serif font-bold text-lg ${
                          student.score === 1
                            ? 'text-below-basic'
                            : 'text-basic'
                        }`}
                      >
                        {student.score}/4
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-ink/60 text-xs uppercase tracking-wide">
                        Progress
                      </p>
                      <p className="font-serif font-bold text-lg text-ink">
                        {student.progress}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      student.progress === 100 ? 'bg-advanced' : 'bg-accent'
                    }`}
                    style={{ width: `${student.progress}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-ink/60">
                  <span>
                    {student.remedialsCompleted} / {student.remedialsAssigned} tasks
                    completed
                  </span>
                  {student.lastAttempt && (
                    <span>Last attempt: {student.lastAttempt}</span>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedStudent === student.id && (
                <div className="border-t border-border p-6 bg-paper/50">
                  <h4 className="font-serif font-bold text-ink mb-4">
                    Assigned Remedial Tasks
                  </h4>
                  <div className="space-y-3 mb-6">
                    {[1, 2, 3, 4].map((taskNum) => {
                      const isCompleted = taskNum <= student.remedialsCompleted
                      return (
                        <div
                          key={taskNum}
                          className={`p-4 rounded border ${
                            isCompleted
                              ? 'bg-advanced/5 border-advanced/20'
                              : 'bg-paper border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center ${
                                  isCompleted
                                    ? 'bg-advanced border-advanced'
                                    : 'border-border'
                                }`}
                              >
                                {isCompleted && (
                                  <span className="text-white text-xs">✓</span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-ink">
                                  Task {taskNum}: Reading Comprehension Exercise
                                </p>
                                <p className="text-xs text-ink/60">
                                  Focus: {student.indicator}
                                </p>
                              </div>
                            </div>
                            {isCompleted && (
                              <span className="text-xs text-advanced font-medium">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    {student.remedialsAssigned > 4 && (
                      <p className="text-sm text-ink/60">
                        +{student.remedialsAssigned - 4} more tasks
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-accent text-ink hover:bg-accent/90"
                    >
                      + Add Task
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-ink border-ink hover:bg-paper"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-serif font-bold text-ink text-lg mb-3">
            How Remedials Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-ink/60">
            <div>
              <h4 className="font-medium text-ink mb-2">Automatic Triggering</h4>
              <p>
                When you save assessment scores in the gradebook, students scoring
                below your school&apos;s threshold (typically below 3) automatically
                receive remedial tasks.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-2">Manual Assignment</h4>
              <p>
                You can also manually assign remedial tasks to any student through
                this interface, or assign them to groups of students at once.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-2">Task Completion</h4>
              <p>
                Mark tasks as completed when students finish remedial work. Track
                progress to see which students need additional support.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-2">Follow-up Assessments</h4>
              <p>
                After remedial tasks, re-assess students in the gradebook to track
                improvement and determine if additional support is needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

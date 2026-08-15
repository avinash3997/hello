'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface StudentAttendance {
  id: string
  name: string
  rollNumber: string
  classesAttended: number
  totalClasses: number
  percentage: number
}

export default function AttendanceTracker() {
  const [students] = useState<StudentAttendance[]>([
    {
      id: '1',
      name: 'Aman Sharma',
      rollNumber: '001',
      classesAttended: 42,
      totalClasses: 44,
      percentage: 95,
    },
    {
      id: '2',
      name: 'Bikram Singh',
      rollNumber: '002',
      classesAttended: 38,
      totalClasses: 44,
      percentage: 86,
    },
    {
      id: '3',
      name: 'Chandra Rai',
      rollNumber: '003',
      classesAttended: 41,
      totalClasses: 44,
      percentage: 93,
    },
    {
      id: '4',
      name: 'Disha Poudel',
      rollNumber: '004',
      classesAttended: 40,
      totalClasses: 44,
      percentage: 91,
    },
    {
      id: '5',
      name: 'Ema Thapa',
      rollNumber: '005',
      classesAttended: 35,
      totalClasses: 44,
      percentage: 80,
    },
  ])

  const getAttendanceColor = (
    percentage: number
  ): { bg: string; text: string } => {
    if (percentage >= 90) return { bg: 'bg-advanced/10', text: 'text-advanced' }
    if (percentage >= 80) return { bg: 'bg-proficient/10', text: 'text-proficient' }
    if (percentage >= 70)
      return { bg: 'bg-basic/10', text: 'text-basic' }
    return { bg: 'bg-below-basic/10', text: 'text-below-basic' }
  }

  const avgAttendance =
    (
      students.reduce((sum, s) => sum + s.percentage, 0) / students.length
    ).toFixed(0)

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink">
              Class Attendance
            </h1>
            <p className="text-ink/60 text-sm">Grade 3 - Term 1, 2026</p>
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
            <p className="text-ink/60 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">
              {students.length}
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">
              Avg Attendance
            </p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">
              {avgAttendance}%
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">
              Classes Held
            </p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">44</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">
              Absent Today
            </p>
            <p className="text-4xl font-serif font-bold text-accent mt-2">1</p>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-paper border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink uppercase">
                  Roll
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-ink uppercase">
                  Student Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-ink uppercase">
                  Classes
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-ink uppercase">
                  Attendance %
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-ink uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                const colors = getAttendanceColor(student.percentage)
                return (
                  <tr
                    key={student.id}
                    className={`border-b border-border hover:bg-paper ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-paper/50'
                    }`}
                  >
                    <td className="px-6 py-4 text-ink font-medium">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 text-ink">{student.name}</td>
                    <td className="px-6 py-4 text-center text-ink font-mono">
                      {student.classesAttended}/{student.totalClasses}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div
                          className={`px-3 py-1 rounded-full font-bold ${colors.bg} ${colors.text}`}
                        >
                          {student.percentage}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-accent hover:bg-accent/10"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Attendance Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink text-lg mb-4">
              Attendance Levels
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-3 bg-advanced/10 rounded">
                <span className="text-ink font-medium">Excellent (90%+)</span>
                <span className="text-ink/60 font-mono">4 students</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-proficient/10 rounded">
                <span className="text-ink font-medium">Good (80-89%)</span>
                <span className="text-ink/60 font-mono">1 student</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-basic/10 rounded">
                <span className="text-ink font-medium">Fair (70-79%)</span>
                <span className="text-ink/60 font-mono">0 students</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-below-basic/10 rounded">
                <span className="text-ink font-medium">Poor (&lt;70%)</span>
                <span className="text-ink/60 font-mono">0 students</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink text-lg mb-4">
              Mark Today&apos;s Attendance
            </h3>
            <p className="text-ink/60 text-sm mb-4">
              Quickly mark attendance for today&apos;s class session
            </p>
            <Button className="w-full bg-accent text-ink hover:bg-accent/90 mb-3">
              Open Attendance
            </Button>
            <Button
              variant="outline"
              className="w-full text-ink border-ink hover:bg-paper"
            >
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

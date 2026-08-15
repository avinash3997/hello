'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Assessment {
  studentId: string
  studentName: string
  rollNumber: string
  indicatorId: string
  score: 1 | 2 | 3 | 4 | null
  notes: string
}

const scoreColors: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: 'bg-below-basic/10', text: 'text-below-basic', label: 'Below Basic' },
  2: { bg: 'bg-basic/10', text: 'text-basic', label: 'Basic' },
  3: { bg: 'bg-proficient/10', text: 'text-proficient', label: 'Proficient' },
  4: { bg: 'bg-advanced/10', text: 'text-advanced', label: 'Advanced' },
}

export default function TeacherGradebook() {
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      studentId: '1',
      studentName: 'Aman Sharma',
      rollNumber: '001',
      indicatorId: '1',
      score: 4,
      notes: 'Excellent grasp of concepts',
    },
  ])

  const students = [
    { id: '1', name: 'Aman Sharma', rollNumber: '001' },
    { id: '2', name: 'Bikram Singh', rollNumber: '002' },
    { id: '3', name: 'Chandra Rai', rollNumber: '003' },
    { id: '4', name: 'Disha Poudel', rollNumber: '004' },
    { id: '5', name: 'Ema Thapa', rollNumber: '005' },
  ]

  const indicators = [
    { id: '1', name: 'Reading Comprehension' },
    { id: '2', name: 'Writing Skills' },
    { id: '3', name: 'Listening Ability' },
    { id: '4', name: 'Speaking Fluency' },
    { id: '5', name: 'Vocabulary Usage' },
  ]

  const getAssessment = (studentId: string, indicatorId: string) => {
    return assessments.find(
      (a) => a.studentId === studentId && a.indicatorId === indicatorId
    )
  }

  const setScore = (studentId: string, indicatorId: string, score: 1 | 2 | 3 | 4) => {
    const existing = getAssessment(studentId, indicatorId)
    if (existing) {
      setAssessments(
        assessments.map((a) =>
          a.studentId === studentId && a.indicatorId === indicatorId
            ? { ...a, score }
            : a
        )
      )
    } else {
      const student = students.find((s) => s.id === studentId)
      if (student) {
        setAssessments([
          ...assessments,
          {
            studentId,
            studentName: student.name,
            rollNumber: student.rollNumber,
            indicatorId,
            score,
            notes: '',
          },
        ])
      }
    }
  }

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-ink">
              Grade 3 - English Gradebook
            </h1>
            <p className="text-ink/60 text-sm">Term 1, 2026</p>
          </div>
          <Link href="/teacher/dashboard">
            <Button variant="outline" className="text-ink border-ink">
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 overflow-x-auto">
        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4">
          {Object.entries(scoreColors).map(([score, { bg, text, label }]) => (
            <div key={score} className={`flex items-center gap-2 px-3 py-2 rounded ${bg}`}>
              <div className={`w-3 h-3 rounded ${text} bg-current`} />
              <span className={`text-sm font-medium ${text}`}>
                {score}: {label}
              </span>
            </div>
          ))}
        </div>

        {/* Gradebook Table */}
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm font-mono">
            <thead className="bg-paper border-b border-border sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-ink uppercase sticky left-0 bg-paper z-10">
                  Roll
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-ink uppercase sticky left-12 bg-paper z-10">
                  Student Name
                </th>
                {indicators.map((ind) => (
                  <th
                    key={ind.id}
                    className="px-3 py-3 text-center text-xs font-bold text-ink uppercase min-w-24"
                  >
                    {ind.name.split(' ')[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr
                  key={student.id}
                  className={`border-b border-border ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-paper/50'
                  } hover:bg-paper`}
                >
                  <td className="px-4 py-3 font-bold text-ink sticky left-0 bg-inherit z-10">
                    {student.rollNumber}
                  </td>
                  <td className="px-4 py-3 text-ink sticky left-12 bg-inherit z-10">
                    {student.name}
                  </td>
                  {indicators.map((indicator) => {
                    const assessment = getAssessment(student.id, indicator.id)
                    const score = assessment?.score
                    const cellId = `${student.id}-${indicator.id}`
                    const isSelected = selectedCell === cellId

                    return (
                      <td
                        key={indicator.id}
                        className="px-3 py-2 text-center min-w-24"
                      >
                        <div className="flex gap-1 justify-center">
                          {[1, 2, 3, 4].map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setScore(
                                  student.id,
                                  indicator.id,
                                  s as 1 | 2 | 3 | 4
                                )
                                setSelectedCell(null)
                              }}
                              className={`w-7 h-7 rounded font-bold text-xs transition-all ${
                                score === s
                                  ? `${
                                      scoreColors[s].bg
                                    } ${scoreColors[s].text} ring-2 ring-offset-1 ring-accent`
                                  : 'bg-border text-ink/40 hover:bg-ink/10'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        {score && (
                          <p className={`text-xs mt-1 font-medium ${scoreColors[score].text}`}>
                            {scoreColors[score].label}
                          </p>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Section */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            className="bg-ink text-white hover:bg-ink/90"
            onClick={() => setSaved(true)}
          >
            Save Assessments
          </Button>
          <Button
            variant="outline"
            className="text-ink border-ink hover:bg-paper"
            onClick={() => {
              setAssessments([])
              setSaved(false)
            }}
          >
            Reset
          </Button>
          {saved && (
            <span role="status" className="text-sm font-medium text-proficient">
              Assessments saved for this session.
            </span>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-serif font-bold text-ink mb-3">Remedial Auto-Trigger</h3>
          <p className="text-ink/60 text-sm mb-4">
            Scores below your school&apos;s threshold (default: below 4) automatically
            trigger remedial tasks. Teachers can track and update remedial attempts
            separately.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="font-mono font-bold text-below-basic">1</span>
              <span className="text-ink/60">Below Basic: Immediate remedial</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono font-bold text-basic">2</span>
              <span className="text-ink/60">Basic: May trigger remedial</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono font-bold text-proficient">3</span>
              <span className="text-ink/60">Proficient: No remedial</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono font-bold text-advanced">4</span>
              <span className="text-ink/60">Advanced: No remedial</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

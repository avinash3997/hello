'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PrintButton } from '@/components/PrintButton'

interface ReportCard {
  subject: string
  percentage: number
  letterGrade: string
  gpa: number
  status: 'proficient' | 'basic' | 'below' | 'advanced'
}

export default function ParentDashboard() {
  const [selectedChild] = useState('Aman Sharma')
  const [reportCards] = useState<ReportCard[]>([
    {
      subject: 'Nepali',
      percentage: 82,
      letterGrade: 'A',
      gpa: 3.6,
      status: 'advanced',
    },
    {
      subject: 'English',
      percentage: 88,
      letterGrade: 'A+',
      gpa: 4.0,
      status: 'advanced',
    },
    {
      subject: 'Mathematics',
      percentage: 75,
      letterGrade: 'B+',
      gpa: 3.2,
      status: 'proficient',
    },
    {
      subject: 'Science & Technology',
      percentage: 79,
      letterGrade: 'A',
      gpa: 3.6,
      status: 'proficient',
    },
    {
      subject: 'Social Studies & Moral Education',
      percentage: 81,
      letterGrade: 'A',
      gpa: 3.6,
      status: 'advanced',
    },
  ])

  const overallGPA = (
    reportCards.reduce((sum, rc) => sum + rc.gpa, 0) / reportCards.length
  ).toFixed(1)

  const getStatusColor = (
    status: string
  ): { bg: string; text: string; border: string } => {
    switch (status) {
      case 'advanced':
        return { bg: 'bg-advanced/10', text: 'text-advanced', border: 'border-advanced/20' }
      case 'proficient':
        return {
          bg: 'bg-proficient/10',
          text: 'text-proficient',
          border: 'border-proficient/20',
        }
      case 'basic':
        return { bg: 'bg-basic/10', text: 'text-basic', border: 'border-basic/20' }
      case 'below':
        return {
          bg: 'bg-below-basic/10',
          text: 'text-below-basic',
          border: 'border-below-basic/20',
        }
      default:
        return { bg: 'bg-muted/10', text: 'text-ink', border: 'border-border' }
    }
  }

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">V</span>
            </div>
            <div>
              <p className="font-serif text-ink font-bold text-lg">Vidyalaya Parent</p>
              <p className="text-ink/60 text-xs">Viewing: {selectedChild}</p>
            </div>
          </div>
          <Button variant="outline" className="text-ink border-ink">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Overall GPA</p>
            <p className="text-5xl font-serif font-bold text-ink mt-2">
              {overallGPA}
            </p>
            <p className="text-sm text-ink/60 mt-1">Out of 4.0</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Subject Performance</p>
            <div className="mt-3 flex gap-2">
              {['A+', 'A', 'B+', 'A', 'A'].map((grade, idx) => (
                <div key={idx} className="w-full text-center">
                  <div className="bg-paper rounded px-2 py-1 text-ink font-bold text-sm">
                    {grade}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Remedial Status</p>
            <p className="text-3xl font-serif font-bold text-advanced mt-2">
              No Action
            </p>
            <p className="text-sm text-ink/60 mt-1">
              All indicators at proficient level
            </p>
          </div>
        </div>

        {/* Report Card Details */}
        <div className="bg-surface rounded-lg border border-border overflow-hidden mb-8">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-2xl font-bold text-ink">
              Subject-wise Report Card
            </h2>
            <p className="text-ink/60 text-sm mt-1">Term 1, Grade 3, Academic Year 2026</p>
          </div>

          <div className="divide-y divide-border">
            {reportCards.map((rc) => {
              const colors = getStatusColor(rc.status)
              return (
                <div
                  key={rc.subject}
                  className={`p-6 hover:bg-paper/50 transition-colors border-l-4 ${colors.border}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-ink text-lg">
                        {rc.subject}
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-6 md:text-right">
                      <div>
                        <p className="text-ink/60 text-xs uppercase tracking-wide">
                          Percentage
                        </p>
                        <p className="font-serif font-bold text-ink text-2xl">
                          {rc.percentage}%
                        </p>
                      </div>

                      <div>
                        <p className="text-ink/60 text-xs uppercase tracking-wide">
                          Letter Grade
                        </p>
                        <p
                          className={`font-serif font-bold text-2xl ${colors.text}`}
                        >
                          {rc.letterGrade}
                        </p>
                      </div>

                      <div>
                        <p className="text-ink/60 text-xs uppercase tracking-wide">
                          GPA
                        </p>
                        <p className={`font-serif font-bold text-2xl ${colors.text}`}>
                          {rc.gpa.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${colors.bg} transition-all`}
                      style={{ width: `${rc.percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Grade Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink text-lg mb-4">
              Grade Scale
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">A+</span>
                <span className="font-mono font-bold text-ink">90–100%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">A</span>
                <span className="font-mono font-bold text-ink">80–89%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">B+</span>
                <span className="font-mono font-bold text-ink">70–79%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">B</span>
                <span className="font-mono font-bold text-ink">60–69%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">C+</span>
                <span className="font-mono font-bold text-ink">50–59%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-ink/60">C</span>
                <span className="font-mono font-bold text-ink">40–49%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-ink/60">D</span>
                <span className="font-mono font-bold text-ink">35–39%</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="font-serif font-bold text-ink text-lg mb-4">
              Print Report Card
            </h3>
            <p className="text-ink/60 text-sm mb-4">
              Download or print a formal report card for your records. This report
              can be used for school admissions or record-keeping purposes.
            </p>
            <PrintButton className="w-full bg-ink text-white hover:bg-ink/90 mb-3" />
            <Link href="/parent/report-card/1/1">
              <Button
                variant="outline"
                className="w-full text-ink border-ink hover:bg-paper"
              >
                Open Formal Report Card
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Teacher */}
        <div className="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
          <h3 className="font-serif font-bold text-ink text-lg mb-2">
            Questions About Your Child&apos;s Progress?
          </h3>
          <p className="text-ink/60 text-sm mb-4">
            You can message your child&apos;s teachers directly through Vidyalaya.
          </p>
          <Button className="bg-accent text-ink hover:bg-accent/90">
            Message Teachers
          </Button>
        </div>
      </div>
    </main>
  )
}

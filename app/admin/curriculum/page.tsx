'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ConfirmButton } from '@/components/ConfirmButton'

interface Indicator {
  id: string
  name: string
  description: string
  grade: number
}

interface Unit {
  id: string
  name: string
  subject: string
  grade: number
  indicators: Indicator[]
  weeks: number
  description: string
}

export default function CurriculumLibrary() {
  const [units] = useState<Unit[]>([
    {
      id: '1',
      name: 'Phonemic Awareness & Letter Recognition',
      subject: 'English Language Arts',
      grade: 1,
      weeks: 4,
      description: 'Introduction to sound patterns and letter identification',
      indicators: [
        {
          id: '1',
          name: 'Identifies letter names and sounds',
          description: 'Student can correctly identify upper and lowercase letters',
          grade: 1,
        },
        {
          id: '2',
          name: 'Segments words into phonemes',
          description: 'Student can break words into individual sounds',
          grade: 1,
        },
        {
          id: '3',
          name: 'Blends sounds into words',
          description: 'Student can combine phonemes to form words',
          grade: 1,
        },
      ],
    },
    {
      id: '2',
      name: 'Basic Arithmetic Operations',
      subject: 'Mathematics',
      grade: 1,
      weeks: 6,
      description: 'Addition and subtraction within 20',
      indicators: [
        {
          id: '4',
          name: 'Counts to 20 accurately',
          description: 'Student can count to 20 without errors',
          grade: 1,
        },
        {
          id: '5',
          name: 'Adds single-digit numbers',
          description: 'Student demonstrates fluency with addition facts',
          grade: 1,
        },
        {
          id: '6',
          name: 'Subtracts single-digit numbers',
          description: 'Student demonstrates fluency with subtraction facts',
          grade: 1,
        },
      ],
    },
    {
      id: '3',
      name: 'Living Things & Their Habitats',
      subject: 'Science & Technology',
      grade: 2,
      weeks: 5,
      description: 'Exploration of animals, plants, and ecosystems',
      indicators: [
        {
          id: '7',
          name: 'Identifies characteristics of living things',
          description: 'Student can name features of plants and animals',
          grade: 2,
        },
        {
          id: '8',
          name: 'Describes habitats',
          description: 'Student can explain where organisms live',
          grade: 2,
        },
        {
          id: '9',
          name: 'Explains food chains',
          description: 'Student understands predator-prey relationships',
          grade: 2,
        },
      ],
    },
    {
      id: '4',
      name: 'Word Problems & Multi-Digit Operations',
      subject: 'Mathematics',
      grade: 3,
      weeks: 8,
      description: 'Problem-solving with two and three-digit numbers',
      indicators: [
        {
          id: '10',
          name: 'Solves addition word problems',
          description: 'Student applies addition to real-world scenarios',
          grade: 3,
        },
        {
          id: '11',
          name: 'Multiplies by single digits',
          description: 'Student demonstrates multiplication fluency',
          grade: 3,
        },
        {
          id: '12',
          name: 'Divides with remainders',
          description: 'Student explains remainders in division',
          grade: 3,
        },
      ],
    },
  ])

  const [expandedUnit, setExpandedUnit] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all')

  const filteredUnits =
    filter === 'all' ? units : units.filter((u) => u.grade === filter)

  return (
    <main className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-ink">
            Curriculum Library
          </h1>
          <div className="flex gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="text-ink border-ink">
                Back
              </Button>
            </Link>
            <Button className="bg-accent text-ink hover:bg-accent/90">
              + New Unit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grade Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-ink text-white' : 'text-ink border-ink'}
            onClick={() => setFilter('all')}
          >
            All Grades
          </Button>
          {[1, 2, 3, 4, 5].map((grade) => (
            <Button
              key={grade}
              variant={filter === grade ? 'default' : 'outline'}
              className={
                filter === grade
                  ? 'bg-ink text-white'
                  : 'text-ink border-ink hover:bg-paper'
              }
              onClick={() => setFilter(grade as 1 | 2 | 3 | 4 | 5)}
            >
              Grade {grade}
            </Button>
          ))}
        </div>

        {/* Units */}
        <div className="space-y-4">
          {filteredUnits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-ink/60 mb-4">No curriculum units found for this filter</p>
              <Button className="bg-accent text-ink hover:bg-accent/90">
                Create First Unit
              </Button>
            </div>
          ) : (
            filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-surface rounded-lg border border-border overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-paper/50 transition-colors"
                  onClick={() =>
                    setExpandedUnit(
                      expandedUnit === unit.id ? null : unit.id
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-xl font-bold text-ink">
                          {unit.name}
                        </h3>
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                          Grade {unit.grade}
                        </span>
                      </div>
                      <p className="text-ink/60 text-sm mb-2">{unit.subject}</p>
                      <p className="text-ink/60 text-sm">
                        {unit.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <div className="text-sm font-mono">
                        <p className="text-ink/60 text-xs">Duration</p>
                        <p className="font-bold text-ink">{unit.weeks} weeks</p>
                      </div>
                      <div className="text-sm font-mono">
                        <p className="text-ink/60 text-xs">Indicators</p>
                        <p className="font-bold text-ink">{unit.indicators.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedUnit === unit.id && (
                  <div className="border-t border-border p-6 bg-paper/50">
                    <h4 className="font-serif font-bold text-ink mb-4">
                      Learning Indicators
                    </h4>
                    <div className="space-y-3">
                      {unit.indicators.map((indicator) => (
                        <div
                          key={indicator.id}
                          className="p-4 bg-surface rounded border border-border"
                        >
                          <p className="font-medium text-ink mb-1">
                            {indicator.name}
                          </p>
                          <p className="text-sm text-ink/60">
                            {indicator.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-ink text-white hover:bg-ink/90"
                      >
                        Edit Unit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-ink border-ink hover:bg-paper"
                      >
                        Duplicate
                      </Button>
                      <ConfirmButton
                        message="Delete this curriculum unit and its indicators? This cannot be undone."
                        className="h-9 border border-below-basic bg-transparent px-3 text-sm text-below-basic hover:bg-below-basic/5"
                      >
                        Delete
                      </ConfirmButton>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-6 bg-surface rounded-lg border border-border">
          <h2 className="font-serif text-2xl font-bold text-ink mb-4">
            Managing the Curriculum Library
          </h2>
          <div className="space-y-4 text-sm text-ink/60">
            <p>
              The Curriculum Library allows you to create and organize learning units
              that schools can apply to their classes. Each unit contains:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-ink">Unit Name & Subject</strong> — Clearly identify
                the unit and its subject area
              </li>
              <li>
                <strong className="text-ink">Grade Level</strong> — Specify which grades
                this unit is appropriate for
              </li>
              <li>
                <strong className="text-ink">Duration</strong> — Estimate the number of
                weeks needed
              </li>
              <li>
                <strong className="text-ink">Learning Indicators</strong> — Define the
                specific skills students should develop
              </li>
              <li>
                <strong className="text-ink">Description</strong> — Provide context and
                learning objectives
              </li>
            </ul>
            <p className="mt-4">
              Schools use these units when creating curricula for their classes. Teachers
              then assess students against the unit&apos;s indicators in the gradebook.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

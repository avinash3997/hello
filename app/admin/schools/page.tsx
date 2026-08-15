'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface School {
  id: string
  name: string
  address: string
  contactPerson: string
  email: string
  phone: string
  status: 'active' | 'pending' | 'inactive'
  classes: number
  teachers: number
  students: number
  joinedDate: string
}

export default function SchoolManagement() {
  const [schools] = useState<School[]>([
    {
      id: '1',
      name: 'Model Secondary School',
      address: 'Kathmandu, Nepal',
      contactPerson: 'Ramesh Kumar',
      email: 'ramesh@modelschool.edu',
      phone: '+977-1-4123456',
      status: 'active',
      classes: 5,
      teachers: 8,
      students: 143,
      joinedDate: '2025-06-15',
    },
    {
      id: '2',
      name: 'Shree Akademi School',
      address: 'Lalitpur, Nepal',
      contactPerson: 'Priya Sharma',
      email: 'priya@akademi.edu',
      phone: '+977-1-5234567',
      status: 'active',
      classes: 4,
      teachers: 6,
      students: 98,
      joinedDate: '2025-07-01',
    },
    {
      id: '3',
      name: 'Wisdom Academy',
      address: 'Bhaktapur, Nepal',
      contactPerson: 'Anil Poudel',
      email: 'anil@wisdom.edu',
      phone: '+977-1-6345678',
      status: 'pending',
      classes: 3,
      teachers: 4,
      students: 67,
      joinedDate: '2025-08-10',
    },
  ])

  const [expandedSchool, setExpandedSchool] = useState<string | null>(null)

  const getStatusColor = (
    status: string
  ): { bg: string; text: string; border: string } => {
    switch (status) {
      case 'active':
        return { bg: 'bg-advanced/10', text: 'text-advanced', border: 'border-advanced' }
      case 'pending':
        return { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent' }
      case 'inactive':
        return {
          bg: 'bg-below-basic/10',
          text: 'text-below-basic',
          border: 'border-below-basic',
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
          <h1 className="font-serif text-2xl font-bold text-ink">
            School Management
          </h1>
          <div className="flex gap-2">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="text-ink border-ink">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Active Schools</p>
            <p className="text-4xl font-serif font-bold text-advanced mt-2">2</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Pending Approval</p>
            <p className="text-4xl font-serif font-bold text-accent mt-2">1</p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Students</p>
            <p className="text-4xl font-serif font-bold text-proficient mt-2">
              308
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-border p-6">
            <p className="text-ink/60 text-sm font-medium">Total Teachers</p>
            <p className="text-4xl font-serif font-bold text-ink mt-2">18</p>
          </div>
        </div>

        {/* Schools List */}
        <div className="space-y-4">
          {schools.map((school) => {
            const colors = getStatusColor(school.status)
            return (
              <div
                key={school.id}
                className="bg-surface rounded-lg border border-border overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-paper/50 transition-colors border-l-4"
                  style={{ borderLeftColor: colors.text }}
                  onClick={() =>
                    setExpandedSchool(
                      expandedSchool === school.id ? null : school.id
                    )
                  }
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {school.name}
                      </h3>
                      <p className="text-ink/60 text-sm">{school.address}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      {school.status.charAt(0).toUpperCase() +
                        school.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <p className="text-ink/50 text-xs">Classes</p>
                      <p className="font-bold text-ink">{school.classes}</p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Teachers</p>
                      <p className="font-bold text-ink">{school.teachers}</p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Students</p>
                      <p className="font-bold text-ink">{school.students}</p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Contact</p>
                      <p className="font-bold text-ink">{school.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Joined</p>
                      <p className="font-bold text-ink">{school.joinedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedSchool === school.id && (
                  <div className="border-t border-border p-6 bg-paper/50">
                    <h4 className="font-serif font-bold text-ink mb-4">
                      School Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-ink/60 text-sm mb-2">Email</p>
                        <p className="font-mono text-ink">{school.email}</p>
                      </div>
                      <div>
                        <p className="text-ink/60 text-sm mb-2">Phone</p>
                        <p className="font-mono text-ink">{school.phone}</p>
                      </div>
                      <div>
                        <p className="text-ink/60 text-sm mb-2">Status</p>
                        <p className="font-medium text-ink capitalize">
                          {school.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-ink/60 text-sm mb-2">Join Date</p>
                        <p className="font-mono text-ink">{school.joinedDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-6">
                      <Button
                        size="sm"
                        className="bg-ink text-white hover:bg-ink/90"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-ink border-ink hover:bg-paper"
                      >
                        Edit School
                      </Button>
                      {school.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-advanced text-white hover:bg-advanced/90"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-below-basic border-below-basic hover:bg-below-basic/5"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>

                    {/* School Statistics */}
                    <div className="pt-6 border-t border-border">
                      <h4 className="font-serif font-bold text-ink mb-4">
                        Performance Metrics
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 bg-advanced/5 rounded border border-advanced/20">
                          <p className="text-ink/60 text-xs mb-1">Avg Performance</p>
                          <p className="font-serif font-bold text-ink text-lg">3.5</p>
                        </div>
                        <div className="p-3 bg-proficient/5 rounded border border-proficient/20">
                          <p className="text-ink/60 text-xs mb-1">Avg Attendance</p>
                          <p className="font-serif font-bold text-ink text-lg">87%</p>
                        </div>
                        <div className="p-3 bg-accent/5 rounded border border-accent/20">
                          <p className="text-ink/60 text-xs mb-1">Active Remedials</p>
                          <p className="font-serif font-bold text-ink text-lg">12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-surface rounded-lg border border-border">
          <h2 className="font-serif text-2xl font-bold text-ink mb-4">
            School Management System
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-ink/60">
            <div>
              <h4 className="font-medium text-ink mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Approve or reject school registrations</li>
                <li>Monitor school performance metrics</li>
                <li>Manage school administrators</li>
                <li>Track student and teacher enrollment</li>
                <li>View curriculum adoption status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-2">Actions:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>View detailed school statistics</li>
                <li>Update school information</li>
                <li>Approve pending registrations</li>
                <li>Deactivate underperforming schools</li>
                <li>Export school reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

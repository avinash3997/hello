'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function StudentProfilePage() {
  const [saved, setSaved] = useState(false)
  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Student record</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-ink">Student Profile & Health Record</h1>
        <p className="mt-2 text-sm leading-6 text-ink/65">Keep the learner record continuous across grades, teachers, and academic years.</p>
        <section className="mt-8 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-bold text-ink">Registration details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['First name', 'Last name', 'Date of birth', 'Admission date', 'Home address', 'Mother tongue / home language', 'Mother’s name and contact', 'Father’s name and contact', 'Local guardian details'].map((label) => <label key={label} className="grid gap-2 text-sm font-medium text-ink">{label}<Input placeholder={label} /></label>)}
          </div>
        </section>
        <section className="mt-6 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-bold text-ink">Health record</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-2 text-sm font-medium text-ink">Date<Input type="date" /></label>
            <label className="grid gap-2 text-sm font-medium text-ink">Weight (kg)<Input type="number" min="0" step="0.1" /></label>
            <label className="grid gap-2 text-sm font-medium text-ink">Height (cm)<Input type="number" min="0" step="0.1" /></label>
            <label className="grid gap-2 text-sm font-medium text-ink">Known disease / disability<Input /></label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-medium text-ink">Health remarks<textarea className="min-h-24 rounded-md border border-border px-3 py-2 text-sm" placeholder="Record observations or follow-up needs" /></label>
          <div className="mt-5 flex items-center gap-3"><Button className="bg-ink text-surface hover:bg-ink/90" onClick={() => setSaved(true)}>Save profile</Button>{saved && <span className="text-sm font-medium text-proficient" role="status">Profile saved for this session.</span>}</div>
        </section>
      </div>
    </main>
  )
}

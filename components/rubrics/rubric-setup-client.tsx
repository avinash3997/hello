'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const seededMethods = [
  'Class Participation',
  'Oral Work',
  'Written Work',
  'Project/Practical Work',
  'Homework',
  'General Knowledge',
  'Regular Test/Practice Check',
  'Skill/Competency',
]

const initialIndicators = [
  { theme: 'Theme 1: Greeting, Introducing and Leave Taking', text: 'Uses appropriate greetings in familiar situations', tool: 'Observation' },
  { theme: 'Theme 1: Greeting, Introducing and Leave Taking', text: 'Introduces self and others clearly', tool: 'Oral Work' },
  { theme: 'Theme 2: Our Community', text: 'Identifies important people and places in the community', tool: 'Written Work' },
]

export default function RubricsSetupPage() {
  const [methods, setMethods] = useState(seededMethods)
  const [indicators, setIndicators] = useState(initialIndicators)
  const [subject, setSubject] = useState('English')
  const [theme, setTheme] = useState('')
  const [indicator, setIndicator] = useState('')
  const [saved, setSaved] = useState(false)

  const themes = useMemo(() => [...new Set(indicators.map((item) => item.theme))], [indicators])

  function addIndicator() {
    if (!theme.trim() || !indicator.trim()) return
    setIndicators((current) => [...current, { theme: theme.trim(), text: indicator.trim(), tool: 'Observation' }])
    setTheme('')
    setIndicator('')
    setSaved(false)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">CDC continuous assessment</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink">िवषय (Subject) & learning outcomes</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">Configure the flat theme and indicator structure teachers use in the Student Learning Achievement Evaluation Record.</p>
        </div>

        <section className="rounded-lg border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="grid gap-2 text-sm font-medium text-ink">िवषय (Subject)
              <select value={subject} onChange={(event) => setSubject(event.target.value)} className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-ink">
                <option>Nepali</option><option>English</option><option>Math</option><option>Social Studies & Human Value Education</option><option>Science & Technology</option><option>Health / Physical / Creative Arts</option><option>Mother Tongue / Local Subject</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">पाठ्यघण्टा / Periods per week
              <Input defaultValue="5" type="number" min="1" max="20" />
            </label>
            <Button className="bg-ink text-surface hover:bg-ink/90" onClick={() => setSaved(true)}>Save subject</Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-xl font-bold text-ink">Add learning outcome indicator</h2>
            <p className="mt-1 text-sm leading-6 text-ink/60">िवधा तथा िवषयवस्तुको क्षेत्र / Theme is a flat list directly under the subject.</p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-ink">Theme
                <Input value={theme} onChange={(event) => setTheme(event.target.value)} placeholder="Theme 3: ..." />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">िसकाइ उपलिब्ध सूचक / Learning Outcome Indicator
                <textarea value={indicator} onChange={(event) => setIndicator(event.target.value)} placeholder="Describe the observable outcome" className="min-h-24 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-accent" />
              </label>
              <Button onClick={addIndicator} className="bg-accent text-ink hover:bg-accent/90">Add indicator</Button>
            </div>
            {saved && <p className="mt-4 text-sm font-medium text-proficient" role="status">Subject configuration saved for this session.</p>}
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <div><h2 className="font-serif text-xl font-bold text-ink">Configured indicators</h2><p className="mt-1 text-sm text-ink/60">{subject} · {indicators.length} learning outcomes</p></div>
              <span className="rounded-full bg-paper px-3 py-1 font-mono text-xs text-ink/70">1–4 rubric</span>
            </div>
            <div className="mt-5 space-y-4">
              {themes.map((themeName) => (
                <div key={themeName} className="rounded-md border border-border">
                  <div className="border-b border-border bg-paper px-4 py-3 font-medium text-ink">{themeName}</div>
                  <div className="divide-y divide-border">
                    {indicators.filter((item) => item.theme === themeName).map((item, index) => <div key={`${item.text}-${index}`} className="flex items-start justify-between gap-4 px-4 py-3 text-sm"><span className="text-ink/80">{item.text}</span><span className="shrink-0 text-xs text-ink/50">{item.tool}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-serif text-xl font-bold text-ink">मूल्याङ्कन विधि / Methods</h2>
          <p className="mt-1 text-sm text-ink/60">Admin-editable evidence sources used across the working sheet.</p>
          <div className="mt-4 flex flex-wrap gap-2">{methods.map((method) => <span key={method} className="rounded-md border border-border px-3 py-2 text-sm text-ink">{method}</span>)}</div>
          <Button variant="outline" className="mt-4 border-ink text-ink" onClick={() => setMethods((current) => [...current, `Custom method ${current.length - 7}`])}>Add custom method</Button>
        </section>
      </div>
  )
}

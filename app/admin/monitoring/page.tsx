import Link from 'next/link'
import { Button } from '@/components/ui/button'

const services = [
  { name: 'Web application', status: 'Operational', latency: '142 ms' },
  { name: 'Assessment processing', status: 'Operational', latency: '238 ms' },
  { name: 'Notifications', status: 'Operational', latency: '96 ms' },
  { name: 'Database', status: 'Operational', latency: '84 ms' },
]

const activity = [
  { event: 'School registration approved', actor: 'Super Admin', time: '12 minutes ago' },
  { event: 'Term 1 assessments submitted', actor: 'Shining Stars Primary School', time: '38 minutes ago' },
  { event: 'Report card generated', actor: 'Parent portal', time: '1 hour ago' },
  { event: 'Remedial task completed', actor: 'Grade 3 teacher', time: '2 hours ago' },
]

export default function MonitoringPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="font-serif text-xl font-bold">System Monitoring</p>
            <p className="text-sm text-ink/60">Super Admin operations overview</p>
          </div>
          <Link href="/admin/dashboard"><Button variant="outline" className="border-ink text-ink">Back to dashboard</Button></Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Uptime', '99.98%', 'Last 30 days'],
            ['Active schools', '12', 'All regions'],
            ['Active users', '248', 'Across all roles'],
            ['Open alerts', '0', 'No action required'],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-lg border border-border bg-surface p-6">
              <p className="text-sm font-medium text-ink/60">{label}</p>
              <p className="mt-2 font-serif text-4xl font-bold">{value}</p>
              <p className="mt-1 text-xs text-ink/60">{detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-2xl font-bold">Service health</h2>
            <div className="mt-5 divide-y divide-border">
              {services.map((service) => (
                <div key={service.name} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-ink/60">Response time {service.latency}</p>
                  </div>
                  <span className="rounded-full bg-advanced/10 px-3 py-1 text-xs font-semibold text-advanced">{service.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-2xl font-bold">Capacity</h2>
            <div className="mt-6 space-y-5">
              {[['Database usage', 42], ['Storage usage', 28], ['Monthly API budget', 61]].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm"><span>{label}</span><span className="font-mono">{value}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-paper"><div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-6">
          <h2 className="font-serif text-2xl font-bold">Recent activity</h2>
          <div className="mt-5 divide-y divide-border">
            {activity.map((item) => (
              <div key={`${item.event}-${item.time}`} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-medium">{item.event}</p><p className="text-sm text-ink/60">{item.actor}</p></div>
                <time className="text-sm text-ink/60">{item.time}</time>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

import { DashboardHeader } from '@/components/dashboard/header'
import RubricsSetupClient from '@/components/rubrics/rubric-setup-client'

export default function RubricsSetupPage() {
  return (
    <main className="min-h-screen bg-paper">
      <DashboardHeader title="Rubrics Setup" schoolName="Shining Stars Primary School" academicYear="2026" />
      <RubricsSetupClient />
    </main>
  )
}

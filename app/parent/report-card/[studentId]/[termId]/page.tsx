import { ReportCard } from '@/components/ReportCard'
import { PrintButton } from '@/components/PrintButton'

export default async function ReportCardPage({ params }: { params: Promise<{ studentId: string; termId: string }> }) {
  await params
  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-8 print:bg-surface print:p-0">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-end gap-3 print:hidden">
          <PrintButton />
        </div>
        <ReportCard
          studentName="Arun Sharma"
          grade="Grade 1-A"
          term="Term 1 · 2026"
          subjects={[
            { subject: 'Nepali', percentage: 82, remark: 'Consistent progress' },
            { subject: 'English', percentage: 88 },
            { subject: 'Mathematics', percentage: 75 },
            { subject: 'Science & Technology', percentage: 79 },
            { subject: 'Social Studies & Moral Education', percentage: 81 },
          ]}
        />
      </div>
    </main>
  )
}

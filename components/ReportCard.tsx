import { calculateGradeAndGPA, calculateOverallGPA } from '@/utils/calculateGradeAndGPA'

type ReportSubject = { subject: string; percentage: number; remark?: string }

export function ReportCard({ studentName, grade, term, subjects }: { studentName: string; grade: string; term: string; subjects: ReportSubject[] }) {
  const results = subjects.map((subject) => ({ ...subject, ...calculateGradeAndGPA(subject.percentage) }))
  const overallGPA = calculateOverallGPA(results.map((result) => result.gpa))

  return (
    <article className="report-card bg-surface border border-border p-8 text-ink">
      <header className="border-b-2 border-ink pb-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">Continuous Assessment Report</p>
        <h1 className="mt-2 font-serif text-3xl font-bold">Shining Stars Primary School</h1>
        <p className="mt-1 text-sm text-ink/60">Nepal CDC 1–4 Rubric</p>
      </header>
      <div className="grid grid-cols-2 gap-4 border-b border-border py-6 text-sm">
        <p><span className="text-ink/60">Student:</span> <strong>{studentName}</strong></p>
        <p><span className="text-ink/60">Grade:</span> <strong>{grade}</strong></p>
        <p><span className="text-ink/60">Term:</span> <strong>{term}</strong></p>
        <p><span className="text-ink/60">Overall GPA:</span> <strong>{overallGPA.toFixed(1)} / 4.0</strong></p>
      </div>
      <table className="mt-6 w-full text-sm">
        <thead><tr className="border-b-2 border-ink text-left"><th className="py-3">Subject</th><th className="py-3">Percentage</th><th className="py-3">Grade</th><th className="py-3">GPA</th></tr></thead>
        <tbody>{results.map((result) => <tr key={result.subject} className="border-b border-border"><td className="py-3 font-medium">{result.subject}</td><td className="py-3">{result.percentage}%</td><td className="py-3 font-bold">{result.letterGrade}</td><td className="py-3">{result.gpa.toFixed(1)}</td></tr>)}</tbody>
      </table>
      <footer className="mt-16 grid grid-cols-2 gap-12 text-center text-sm"><div className="border-t border-ink pt-2">Class Teacher</div><div className="border-t border-ink pt-2">Parent / Guardian</div></footer>
    </article>
  )
}

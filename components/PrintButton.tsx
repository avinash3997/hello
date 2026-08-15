'use client'

export function PrintButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`rounded-md px-4 py-2 text-sm font-medium ${className}`}
    >
      Print to PDF
    </button>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSession, destroySession } from '@/lib/auth'
import { RoleSidebar } from '@/components/dashboard/role-sidebar'

async function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await destroySession()
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-ink text-ink hover:bg-paper h-10 px-4 py-2"
      >
        Logout
      </button>
    </form>
  )
}

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  schoolName?: string
  academicYear?: string
}

export async function DashboardHeader({
  title,
  subtitle,
  schoolName,
  academicYear,
}: DashboardHeaderProps) {
  const session = await getSession()

  if (!session) return null

  return (
    <>
      <RoleSidebar role={session.role} />
      <header className="bg-surface border-b border-border sticky top-0 z-40 lg:ml-64">
      <div className="max-w-7xl mx-auto px-4 py-4 pl-16 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={session.role === 'super_admin' ? '/admin/dashboard' : session.role === 'school_admin' ? '/school/dashboard' : session.role === 'teacher' ? '/teacher/dashboard' : '/parent/dashboard'}>
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center hover:opacity-80">
              <span className="text-white font-serif font-bold text-lg">V</span>
            </div>
          </Link>
          <div>
            <p className="font-serif text-ink font-bold text-lg">{title}</p>
            {schoolName && (
              <p className="text-ink/60 text-xs">
                {schoolName}
                {academicYear && ` • AY ${academicYear}`}
              </p>
            )}
            {subtitle && <p className="text-ink/60 text-xs">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {session && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-medium text-ink">{session.email}</p>
                <p className="text-xs text-ink/60 capitalize">{session.role}</p>
              </div>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
      </header>
    </>
  )
}

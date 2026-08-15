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
        className="inline-flex h-10 items-center justify-center rounded-md border border-ink px-3 py-2 text-sm font-medium text-ink ring-offset-background transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-4"
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 pl-16 sm:px-6 lg:px-8 lg:py-4">
        <div className="flex items-center gap-3">
          <Link href={session.role === 'super_admin' ? '/admin/dashboard' : session.role === 'school_admin' ? '/school/dashboard' : session.role === 'teacher' ? '/teacher/dashboard' : '/parent/dashboard'}>
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center hover:opacity-80">
              <span className="text-white font-serif font-bold text-lg">V</span>
            </div>
          </Link>
          <div className="min-w-0">
            <p className="truncate font-serif text-lg font-bold text-ink">{title}</p>
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
              <div className="hidden text-right sm:block">
                <p className="max-w-48 truncate text-xs font-medium text-ink">{session.email}</p>
                <p className="text-xs capitalize text-ink/60">{session.role.replace('_', ' ')}</p>
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

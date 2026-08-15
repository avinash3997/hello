'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, ClipboardCheck, GraduationCap, LayoutDashboard, Menu, School, Users, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoleSidebarProps {
  role: 'super_admin' | 'school_admin' | 'teacher' | 'parent'
}

const roleLinks = {
  super_admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/requests', label: 'School Requests', icon: School },
    { href: '/admin/curriculum', label: 'Homepage CMS', icon: BookOpen },
    { href: '/admin/monitoring', label: 'System Monitoring', icon: ClipboardCheck },
  ],
  school_admin: [
    { href: '/school/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/school/students', label: 'Students', icon: GraduationCap },
    { href: '/school/teachers', label: 'Teachers', icon: Users },
    { href: '/school/classes', label: 'Classes', icon: School },
    { href: '/school/rubrics', label: 'Rubrics Setup', icon: BookOpen },
  ],
  teacher: [
    { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/teacher/gradebook', label: 'Evaluation Record', icon: ClipboardCheck },
    { href: '/teacher/remedials', label: 'Remedial Support', icon: BookOpen },
  ],
  parent: [
    { href: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Progress Analytics', icon: ClipboardCheck },
  ],
}

export function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = roleLinks[role]

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md border border-border bg-surface p-2 text-ink shadow-sm lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      {mobileOpen && (
        <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-ink/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside data-role-sidebar="true" className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-surface transition-all lg:z-auto',
        collapsed ? 'w-20' : 'w-64',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}>
        <div className="flex h-20 items-center justify-between border-b border-border px-4">
          {!collapsed && <Link href={links[0].href} className="font-serif text-xl font-bold text-ink">Vidyalaya</Link>}
          <button type="button" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} onClick={() => setCollapsed(!collapsed)} className="hidden rounded-md p-2 text-ink/60 hover:bg-paper lg:block">
            {collapsed ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
          </button>
          <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="rounded-md p-2 text-ink/60 hover:bg-paper lg:hidden">
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors', active ? 'bg-ink text-surface' : 'text-ink/70 hover:bg-paper hover:text-ink')}>
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 p-2 backdrop-blur lg:hidden" aria-label="Mobile navigation">
        {links.slice(0, 4).map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={cn('flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1 py-2 text-center text-[11px] font-medium', active ? 'bg-ink text-surface' : 'text-ink/70')}>
              <Icon className="size-4 shrink-0" />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

'use client'

import { Button } from '@/components/ui/button'

export function ConfirmButton({ children, message, className = '' }: { children: React.ReactNode; message: string; className?: string }) {
  return <Button type="button" className={className} onClick={() => window.confirm(message)}>{children}</Button>
}

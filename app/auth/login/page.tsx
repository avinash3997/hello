'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUser } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser(email, password)
      
      if (result.success && result.user) {
        // Session is created in the auth function, redirect based on role
        const dashboardMap: Record<string, string> = {
          super_admin: '/admin/dashboard',
          school_admin: '/school/dashboard',
          teacher: '/teacher/dashboard',
          parent: '/parent/dashboard',
        }
        router.push(dashboardMap[result.user.role] || '/')
        router.refresh()
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-paper min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-md mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">V</span>
            </div>
            <span className="font-serif text-ink font-bold text-xl">Vidyalaya</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-surface rounded-lg border border-border p-8">
            <h1 className="font-serif text-2xl text-ink font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-ink/60 text-sm mb-6">
              Log in to your school or account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-below-basic/10 border border-below-basic/20 rounded text-below-basic text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-ink mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-ink text-white hover:bg-ink/90"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center text-sm text-ink/60">
              <p>
                Your school account created by your admin?
              </p>
              <Link href="/auth/register-school">
                <Button variant="link" className="text-accent">
                  Request school registration
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-xs font-medium text-accent mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs text-ink/60">
              <div className="p-2 bg-paper rounded">
                <p className="font-medium text-ink">Super Admin</p>
                <p className="font-mono">admin@vidyalaya.edu</p>
                <p className="font-mono">AdminPass123</p>
              </div>
              <div className="p-2 bg-paper rounded">
                <p className="font-medium text-ink">School Admin</p>
                <p className="font-mono">schooladmin@shiningstars.edu.np</p>
                <p className="font-mono">SchoolAdmin@123</p>
              </div>
              <div className="p-2 bg-paper rounded">
                <p className="font-medium text-ink">Teacher</p>
                <p className="font-mono">teacher@shiningstars.edu.np</p>
                <p className="font-mono">Teacher@123</p>
              </div>
              <div className="p-2 bg-paper rounded">
                <p className="font-medium text-ink">Parent</p>
                <p className="font-mono">parent@shiningstars.edu.np</p>
                <p className="font-mono">Parent@123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

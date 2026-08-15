import { DashboardHeader } from '@/components/dashboard/header'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function AdminRequestsPage() {
  const session = await getSession()

  if (!session || session.role !== 'super_admin') {
    redirect('/auth/login')
  }

  return (
    <main className="bg-paper min-h-screen">
      <DashboardHeader title="Vidyalaya System Admin" subtitle="School Registration Requests" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-surface rounded-lg border border-border">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-serif text-2xl font-bold text-ink">
              School Registration Requests
            </h2>
            <p className="text-ink/60 text-sm mt-1">
              Review and approve pending school registration requests
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-border rounded-lg hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-ink text-lg">
                        {i === 1 ? 'Sunshine Academy' : i === 2 ? 'Alpine Public School' : 'Green Hill School'}
                      </h3>
                      <p className="text-ink/60 text-sm">
                        {i === 1 ? 'Kathmandu, Nepal' : i === 2 ? 'Pokhara, Nepal' : 'Bhaktapur, Nepal'}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-ink/50 text-xs">Contact Person</p>
                      <p className="text-ink font-medium">
                        {i === 1 ? 'Ramesh Kumar' : i === 2 ? 'Anita Sharma' : 'Bikram Rana'}
                      </p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Phone</p>
                      <p className="text-ink font-medium">+977-{1000000 + i}000</p>
                    </div>
                    <div>
                      <p className="text-ink/50 text-xs">Email</p>
                      <p className="text-ink font-medium text-xs break-all">
                        {i === 1 ? 'admin@sunshine.edu.np' : i === 2 ? 'contact@alpine.edu.np' : 'info@greenhill.edu.np'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-advanced text-white hover:bg-advanced/90"
                    >
                      Approve & Create Account
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-below-basic border-below-basic hover:bg-below-basic/5"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

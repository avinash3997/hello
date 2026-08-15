'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { requestSchoolRegistration } from '@/lib/auth'

export default function RegisterSchoolPage() {
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const result = await requestSchoolRegistration(
        formData.schoolName,
        formData.address,
        formData.contactPerson,
        formData.phone,
        formData.email
      )

      if (result.success) {
        setSuccess(true)
        setFormData({
          schoolName: '',
          address: '',
          contactPerson: '',
          phone: '',
          email: '',
        })
        // Auto-reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(result.error || 'Failed to submit registration request')
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
        <div className="max-w-2xl mx-auto px-4 py-6">
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
        <div className="w-full max-w-2xl">
          <div className="bg-surface rounded-lg border border-border p-8">
            <h1 className="font-serif text-3xl text-ink font-bold mb-2">
              School Registration Request
            </h1>
            <p className="text-ink/60 text-base mb-8">
              Submit your school&apos;s details for review by our administrators. Once approved, your school admin account will be created.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-below-basic/10 border border-below-basic/20 rounded-lg text-below-basic text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-advanced/10 border border-advanced/20 rounded-lg text-advanced text-sm">
                <p className="font-medium mb-1">Registration request submitted!</p>
                <p>
                  Your school registration request has been received. Our administrators will review it shortly and contact you at the provided email.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="schoolName"
                  className="block text-sm font-medium text-ink mb-1"
                >
                  School Name <span className="text-below-basic">*</span>
                </label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="e.g., Kathmandu Primary School"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-ink mb-1"
                >
                  School Address <span className="text-below-basic">*</span>
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Thamel, Kathmandu"
                  required
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contactPerson"
                    className="block text-sm font-medium text-ink mb-1"
                  >
                    Contact Person Name <span className="text-below-basic">*</span>
                  </label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    type="text"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g., Ram Kumar Sharma"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-ink mb-1"
                  >
                    Phone Number <span className="text-below-basic">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g., +977-1-4234567"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink mb-1"
                >
                  Email Address <span className="text-below-basic">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., admin@school.edu"
                  required
                  className="w-full"
                />
                <p className="text-xs text-ink/50 mt-1">
                  We'll send confirmation and admin credentials to this address
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-ink hover:bg-accent/90 mt-6"
              >
                {loading ? 'Submitting...' : 'Submit Registration Request'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-ink/60 mb-4">
                Already have an account?
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="text-ink border-ink hover:bg-paper">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-6 bg-surface rounded-lg border border-border">
            <h3 className="font-serif font-bold text-ink mb-3">What happens next?</h3>
            <ol className="space-y-2 text-sm text-ink/70">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent flex-shrink-0">1.</span>
                <span>Your registration request is reviewed by Vidyalaya administrators</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent flex-shrink-0">2.</span>
                <span>Upon approval, your School Admin account is automatically created</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent flex-shrink-0">3.</span>
                <span>Login credentials are sent to the email above</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-accent flex-shrink-0">4.</span>
                <span>You can then add teachers, students, and set up curriculum</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}

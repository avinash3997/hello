import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LedgerHero from '@/components/ledger-hero'

export default function HomePage() {
  return (
    <main className="bg-paper min-h-screen">
      {/* Navigation */}
      <nav className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">V</span>
            </div>
            <span className="font-serif text-ink font-bold text-xl">Vidyalaya</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="outline"
                className="text-ink border-ink hover:bg-paper"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register-school">
              <Button className="bg-accent text-ink hover:bg-accent/90">
                Request Registration
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-5xl lg:text-6xl text-ink leading-tight font-bold">
                Continuous Assessment System
              </h1>
              <p className="text-2xl text-ink/70 mt-4 font-light">
                for Nepali primary schools
              </p>
            </div>

            <p className="text-lg text-ink/60 leading-relaxed">
              Vidyalaya CAS implements the official CDC assessment rubric, enabling schools to track learning outcomes with precision. Every student, every indicator, every term—tracked with clarity.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-advanced flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-ink">CDC-Aligned Rubric</h3>
                  <p className="text-ink/60 text-sm">
                    1–4 scoring scale matching official standards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-proficient flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-ink">Automatic Remedials</h3>
                  <p className="text-ink/60 text-sm">
                    Trigger interventions when scores drop below threshold
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-basic flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-bold text-ink">Multi-Term Tracking</h3>
                  <p className="text-ink/60 text-sm">
                    Monitor progress across academic terms and years
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-ink text-white hover:bg-ink/90 w-full sm:w-auto"
                >
                  Login to Your School
                </Button>
              </Link>
              <Link href="/auth/register-school">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-ink border-ink hover:bg-paper w-full sm:w-auto"
                >
                  Request School Registration
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Ledger Illustration */}
          <div className="hidden lg:block">
            <LedgerHero />
          </div>
        </div>

        {/* Mobile Ledger */}
        <div className="lg:hidden mt-12">
          <LedgerHero />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface border-y border-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-ink font-bold text-center mb-12">
            Built for Nepali Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-below-basic/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-below-basic font-mono font-bold">1</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-2 text-lg">
                School Admin Setup
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed">
                Create classes, enroll students and teachers, configure curriculum units and learning indicators per the CDC standard.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-proficient/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-proficient font-mono font-bold">3</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-2 text-lg">
                Teacher Grading
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed">
                Score students 1–4 on every learning indicator per term; system auto-flags remedials when thresholds are breached.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors">
              <div className="w-12 h-12 bg-advanced/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-advanced font-mono font-bold">4</span>
              </div>
              <h3 className="font-serif font-bold text-ink mb-2 text-lg">
                Parent Reports
              </h3>
              <p className="text-ink/60 text-sm leading-relaxed">
                Parents view their child's per-subject scores, letter grades, GPA, and remedial status—print-ready reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-paper py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-paper/70">
          <p>
            Vidyalaya CAS — Continuous Assessment System for Nepali Primary Schools
          </p>
          <p className="mt-2">
            Implementing CDC (Curriculum Development Centre, Nepal) standards
          </p>
        </div>
      </footer>
    </main>
  )
}

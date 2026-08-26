import { SelectedWorks } from '@/components/selected-works'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <main className="pt-28 md:pt-32 relative">
      <div className="mx-auto max-w-6xl px-6 mb-4 md:mb-8">
        <Link 
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
      <SelectedWorks />
    </main>
  )
}

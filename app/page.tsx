import { Hero } from '@/components/hero'
import { Capabilities } from '@/components/capabilities'
import { Experience } from '@/components/experience'
import { ProjectsPreview, BadgesPreview, GalleryPreview } from '@/components/previews'
import { HashCleaner } from '@/components/hash-cleaner'

export default function Page() {
  return (
    <main>
      <HashCleaner />
      <Hero />
      <Capabilities />
      <Experience />
      <ProjectsPreview />
      <BadgesPreview />
      <GalleryPreview />
    </main>
  )
}

import { Hero } from '@/components/hero'
import { Capabilities } from '@/components/capabilities'
import { Experience } from '@/components/experience'
import { ProjectsPreview, BadgesPreview, GalleryPreview } from '@/components/previews'

export default function Page() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <Experience />
      <ProjectsPreview />
      <BadgesPreview />
      <GalleryPreview />
    </main>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Tilt3D } from '@/components/tilt-3d'

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const previewProjects = [
  { image: '/adas-system.png', title: 'ADAS Voice Assistant' },
  { image: '/telemetry-console.png', title: 'Telemetry Console' },
]

const previewBadges = [
  { image: '/certificates/grasp-hackathon.png', title: 'GRASP Hackathon 2nd Runner Up' },
  { image: '/certificates/python-joy.png', title: 'The Joy of Computing using Python' },
]

const previewGallery = [
  { image: '/gallery/image4.jpg', baseScale: 'scale-105', hoverScale: 'group-hover:scale-110' },
  { image: '/gallery/image16.jpg', baseScale: 'scale-100', hoverScale: 'group-hover:scale-105' },
]

export function ProjectsPreview() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left side text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-6 text-left order-2 lg:order-1"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Portfolio</p>
          <h2 className="text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-7xl">
            Selected Work
          </h2>
          <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore my latest works, featuring AI-driven solutions, computer vision projects, and modern web applications built for scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/ansonmatt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Explore GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Right side images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[300px] sm:h-[400px] w-full order-1 lg:order-2"
        >
          {previewProjects.map((p, i) => (
            <div
              key={p.title}
              className={`absolute w-[75%] shadow-2xl rounded-2xl overflow-hidden ${i === 0 ? 'top-0 left-0 z-10' : 'bottom-4 sm:bottom-0 right-0 z-20 hover:z-30'
                }`}
            >
              <Tilt3D intensity={15} perspective={1000} scale={1.02} glare>
                <Link href="/projects" className="block relative aspect-[16/10] w-full border border-border/50 rounded-2xl overflow-hidden group">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                    <h3 className="text-white font-serif tracking-tight text-lg sm:text-xl">{p.title}</h3>
                  </div>
                </Link>
              </Tilt3D>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function BadgesPreview() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-12 md:py-20 border-t border-border/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left side certificates stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[300px] sm:h-[400px] w-full"
        >
          {previewBadges.map((p, i) => (
            <div
              key={p.title}
              className={`absolute w-[75%] shadow-2xl rounded-2xl overflow-hidden ${i === 0 ? 'top-0 right-0 z-10' : 'bottom-4 sm:bottom-0 left-0 z-20 hover:z-30'
                }`}
            >
              <Tilt3D intensity={15} perspective={1000} scale={1.02} glare>
                <Link href="/achievements" className="block relative aspect-[4/3] w-full border border-border/50 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm group">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                    <h3 className="text-white font-serif tracking-tight text-lg sm:text-xl">{p.title}</h3>
                  </div>
                </Link>
              </Tilt3D>
            </div>
          ))}
        </motion.div>

        {/* Right side text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-end space-y-6 text-right lg:pl-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Certifications</p>
          <h2 className="text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-7xl">
            Achievements & Certifications
          </h2>
          <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            A showcase of my continuous learning journey, focusing on AI, Cloud, and Software Engineering.
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-4">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.linkedin.com/in/ansonmathewallan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Explore LinkedIn
              <LinkedIn className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function GalleryPreview() {
  return (
    <section id="gallery-preview" className="relative mx-auto max-w-6xl px-6 py-12 md:py-20 border-t border-border/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left side text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-6 text-left order-2 lg:order-1"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Life & Moments</p>
          <h2 className="text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-7xl">
            Gallery
          </h2>
          <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Behind the scenes of my journey, including events, teamwork, and memorable moments.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              View Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right side images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[240px] sm:h-[400px] w-full order-1 lg:order-2"
        >
          {previewGallery.map((p, i) => (
            <div
              key={i}
              className={`absolute w-[75%] shadow-2xl rounded-2xl overflow-hidden ${i === 0 ? 'top-0 left-0 z-10' : 'bottom-0 right-0 z-20 hover:z-30'
                }`}
            >
              <Tilt3D intensity={15} perspective={1000} scale={1.02} glare>
                <Link href="/gallery" className="block relative aspect-[16/10] w-full border border-border/50 rounded-2xl overflow-hidden group">
                  <Image
                    src={p.image}
                    alt="Gallery image preview"
                    fill
                    className={`object-cover transition-transform duration-700 ${p.baseScale || 'scale-100'} ${p.hoverScale || 'group-hover:scale-105'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
              </Tilt3D>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

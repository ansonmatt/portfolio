'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Code2, Palette, Users } from 'lucide-react'
import { Tilt3D } from '@/components/tilt-3d'



const capabilities = [
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence & ML',
    body: 'Developing custom AI models and computer vision pipelines, focusing on real-time tracking, object detection, and boundary monitoring.',
    level: 'Expert',
    tags: ['Computer Vision', 'YOLOv8', 'OpenCV', 'Generative AI'],
  },
  {
    icon: Code2,
    title: 'Software Development',
    body: 'Full-stack development experience, integrating complex AI models into responsive web applications for real-time monitoring.',
    level: 'Advanced',
    tags: ['Python', 'React', 'Angular', 'Supabase'],
  },
  {
    icon: Palette,
    title: 'Human-Centered Design',
    body: 'Bridging human-centered design with technology, combining UI/UX principles, graphic design, and aesthetic judgment.',
    level: 'Professional',
    tags: ['UI/UX', 'Graphic Design', 'Canva', 'Video Production',],
  },
  {
    icon: Users,
    title: 'Leadership & Community',
    body: 'Multiple leadership roles and ambassadorships ensuring a connection between the platform and students.',
    level: 'Advanced',
    tags: ['Google Student Ambassador', 'Campus Mantri', 'Head of Media'],
  },
]

export function Capabilities() {
  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Expertise</p>
        <h2 className="mt-4 text-balance font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Bridging AI and Design
        </h2>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Blending deep technical knowledge in AI and Machine Learning with a strong creative background in human-centered design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <Tilt3D key={cap.title} intensity={6} perspective={1000} scale={1.01} glare>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass glass-hover group relative overflow-hidden rounded-3xl p-5 sm:p-7"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="glass flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <div className="flex items-center">
                    <span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand">
                      {cap.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-semibold tracking-tight sm:text-lg">{cap.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{cap.body}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Tilt3D>
          )
        })}
      </div>
    </section>
  )
}

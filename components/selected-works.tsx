'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import { Tilt3D } from '@/components/tilt-3d'

type Project = {
  name: string
  year: string
  image: string
  titleClass?: string
  role: string
  outcome: React.ReactNode
  stack: string[]
  imgCol: string
  metaCol: string
  titleSide: 'left' | 'right'
  url?: string
}

const projects: Project[] = [
  {
    name: 'Advanced Driving Assistance System',
    year: '2026',
    image: '/adas-system.png',
    url: 'https://github.com/ansonmatt/advanced-driving-assistant',
    titleClass: 'text-balance md:whitespace-nowrap text-4xl sm:text-5xl md:-bottom-6 md:text-[3.2rem] lg:text-[4.2rem] xl:text-[5.2rem]',
    role: 'Creator / Developer',
    outcome: 'An Advanced Driver Assistance System (ADAS) featuring a real-time AI Voice Assistant. It runs natively on dashcam or smartphone feeds to provide YOLO-based object detection, dynamic lane tracking, collision warnings, and conversational audio feedback via a Flask-served HUD.',
    stack: ['YOLO', 'Flask', 'Computer Vision', 'Voice AI'],
    imgCol: 'md:col-start-1 md:col-end-9',
    metaCol: 'md:col-start-9 md:col-end-13',
    titleSide: 'left',
  },
  {
    name: 'Driving Telemetry Console',
    year: '2026',
    image: '/telemetry-console.png',
    url: 'https://github.com/ansonmatt/adas-dashboard',
    titleClass: 'text-balance md:whitespace-nowrap text-5xl sm:text-6xl md:-bottom-6 md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem]',
    role: 'Creator / Developer',
    outcome: 'Real-time driver-assistance dashboard that turns any dashcam video into a full instrument cluster with lane detection and collision warnings.',
    stack: ['Computer Vision', 'YOLO', 'ByteTrack', 'Python'],
    imgCol: 'md:col-start-5 md:col-end-13',
    metaCol: 'md:col-start-1 md:col-end-5 md:text-right md:items-end',
    titleSide: 'right',
  },
  {
    name: 'AI Medication Manager',
    year: '2026',
    image: '/medication-adherence-dark.png',
    url: 'https://github.com/alv1n25/Grassroots-Hackathon-Dr.Nudge',
    titleClass: 'text-balance md:whitespace-nowrap text-5xl sm:text-6xl md:-bottom-6 md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem]',
    role: 'Hackathon 2nd Runner-Up',
    outcome: 'AI-driven medication adherence platform with GPT-4 Vision for prescription OCR and behavioral "nudge" reminders.',
    stack: ['GPT-4 Vision', 'React', 'Supabase', 'AI'],
    imgCol: 'md:col-start-1 md:col-end-9',
    metaCol: 'md:col-start-9 md:col-end-13',
    titleSide: 'left',
  },
  {
    name: 'AI Intrusion Detection System',
    year: '2026',
    image: '/intrusion-detection.jpg',
    url: 'https://github.com/ansonmatt/AI-Intrusion-Detection-System',
    titleClass: 'text-balance md:whitespace-nowrap text-5xl sm:text-6xl md:-bottom-6 md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem]',
    role: 'AI Intern (BEL)',
    outcome: 'An AI-powered object detection and boundary monitoring system using YOLOv8 for real-time detection of persons crossing alarm zones.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision'],
    imgCol: 'md:col-start-5 md:col-end-13',
    metaCol: 'md:col-start-1 md:col-end-5 md:text-right md:items-end',
    titleSide: 'right',
  },
]

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Track scroll position relative to this card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'] // from when top enters bottom of screen to bottom leaves top
  })

  // Smoothly zoom the image from 0.9 to 1.1 as you scroll past
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.15])

  // Parallax the giant title slightly on desktop, disable on mobile for accurate placement
  const desktopTitleY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const mobileTitleY = useTransform(scrollYProgress, [0, 1], [0, 0])
  const titleY = isMobile ? mobileTitleY : desktopTitleY

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 relative"
    >
      {/* Image + overlapping title — pinned to row 1 */}
      <div className={`relative md:row-start-1 ${p.imgCol}`}>
        <button
          onClick={(e) => { e.preventDefault(); setIsOpen(true) }}
          className="block relative w-full h-full group cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-[1.5rem]"
        >
          <Tilt3D intensity={5} perspective={1200} scale={1.01} glare>
            <div className="relative overflow-hidden rounded-[1.5rem] aspect-[16/10]">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#004cc2_0%,transparent_70%)] opacity-40 blur-2xl" />
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0 h-full w-full origin-center"
              >
                <Image
                  src={p.image || '/placeholder.svg'}
                  alt={`${p.name} case study preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </Tilt3D>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-7xl max-h-[90vh] w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black/20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Giant title overlapping the image via mix-blend-difference */}
        <motion.h3
          style={{ y: titleY }}
          className={`pointer-events-none absolute bottom-2 px-4 md:px-0 z-10 font-serif leading-[0.85] tracking-tight text-foreground ${(p as any).titleClass || 'text-5xl sm:text-6xl md:-bottom-10 md:text-8xl lg:text-9xl'} ${p.titleSide === 'right'
            ? 'right-0 text-right md:-right-4'
            : 'left-0 text-left md:-left-4'
            }`}
        >
          {p.name}
        </motion.h3>

        {/* index marker */}
        <span
          className={`pointer-events-none absolute top-5 z-10 font-mono text-[10px] sm:text-xs tracking-wider text-foreground ${p.titleSide === 'right' ? 'left-5' : 'right-5'
            }`}
        >
          {String(index + 1).padStart(2, '0')} / {p.year}
        </span>
      </div>

      {/* Meta — also pinned to row 1 so it sits beside the image */}
      <div className={`flex flex-col justify-center md:row-start-1 ${p.metaCol}`}>
        <span className="w-fit rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground">
          {p.role}
        </span>

        <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {p.outcome}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <a
          href={p.url || `https://github.com/ansonmatt/${p.name.toLowerCase().replace(/ /g, '-')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors w-fit group/link"
        >
          View on GitHub
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  )
}

export function SelectedWorks() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-12 md:py-24 lg:py-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 md:mb-20"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Selected work</p>
        <div className="mt-4 flex items-end justify-between">
          <h2 className="text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
            Projects
          </h2>
          <span className="font-mono text-sm text-muted-foreground">
            {projects.length} projects — 2025/26
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-32 lg:gap-24">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}

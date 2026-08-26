'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowUpRight } from 'lucide-react'
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
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const Mail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const socials = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/ansonmatt' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/ansonmathewallan/' },
  { label: 'Email', icon: Mail, href: 'mailto:ansonmathewalan@gmail.com' },
]

function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode
  className?: string
  href: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setPos({ x: x * 0.25, y: y * 0.25 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export function ContactFooter() {
  return (
    <footer id="contact" className="relative mx-auto max-w-6xl px-6 pb-10 pt-8 lg:pt-8 lg:pb-16">
      <Tilt3D intensity={4} perspective={1400} scale={1.005} glare>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center md:px-16 md:py-24"
        >
          {/* interior glow */}
          <div className="pointer-events-none absolute -top-1/2 left-1/2 h-[120%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#004cc2_0%,transparent_65%)] opacity-40 blur-3xl" />

          <div className="relative">

            <h2 className="mx-auto max-w-2xl text-balance font-serif text-3xl leading-[1.05] tracking-tight md:text-4xl lg:text-6xl">
              Let&apos;s build something{' '}
              <span className="text-gradient italic">worth remembering.</span>
            </h2>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-[0_12px_36px_-10px_rgba(0,76,194,0.9)] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <Download className="h-4 w-4" />
                Download resume
              </MagneticButton>
              <MagneticButton
                href="mailto:ansonmathewalan@gmail.com"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </Tilt3D>

      {/* bottom bar */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} ansonmatt
        </p>
        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
              >
                <Icon />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

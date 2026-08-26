'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { CommandMenu } from './command-menu'

const links = [
  { label: 'Expertise', href: '/#expertise', hideOnMobile: true },
  { label: 'Projects', href: '/projects', hideOnMobile: false },
  { label: 'Achievements', href: '/achievements', hideOnMobile: false },
]

export function NavBar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('hero')
  const [commandMenuOpen, setCommandMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  // Fade in the darker background when we reach the 400px "begin point"
  const bgOpacity = useTransform(scrollY, [350, 400], [0, 1])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    const sections = document.querySelectorAll('section[id], footer[id]')
    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      // Check if we have scrolled to the absolute bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact')
      }
    }
    window.addEventListener('scroll', handleScroll)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandMenuOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <CommandMenu isOpen={commandMenuOpen} setIsOpen={setCommandMenuOpen} />
      <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-3xl items-center justify-between rounded-full px-1.5 py-1.5 sm:px-2 sm:py-2"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 -z-10 rounded-full bg-background/80 backdrop-blur-lg border border-border/50 shadow-sm"
      />
      <Link
        href="/#hero"
        className={`relative flex items-center gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 font-serif text-sm sm:text-lg tracking-tight rounded-full transition-colors ${pathname === '/' && activeSection === 'hero' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
      >
        {pathname === '/' && activeSection === 'hero' && (
          <motion.div
            layoutId="active-nav-pill"
            className="absolute inset-0 -z-10 rounded-full bg-secondary/50"
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          />
        )}
        <span className="relative z-10 sm:hidden">Anson</span>
        <span className="relative z-10 hidden sm:inline">Anson Mathew Allan</span>
      </Link>
      <nav className="flex items-center gap-0.5 sm:gap-1">
        {links.map((l) => {
          const isActive = pathname === l.href || (l.href.startsWith('/#') && activeSection === l.href.slice(2))
          return (
            <Link
              key={l.label}
              href={l.href}
              className={`relative rounded-full px-2.5 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm transition-colors ${
                l.hideOnMobile ? 'hidden sm:block ' : ''
              }${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary/50"
                  transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </Link>
          )
        })}
        <button
          onClick={() => setCommandMenuOpen(true)}
          className="relative ml-1 flex items-center gap-1.5 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Go To...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/50 bg-background/50 px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        <a
          href="#contact"
          className="relative ml-0.5 sm:ml-1 inline-flex overflow-hidden rounded-full bg-foreground px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
        >
          <motion.div
            initial={false}
            animate={{ opacity: activeSection === 'contact' ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-[linear-gradient(120deg,#ffffff_20%,#3B82F6_60%,#004cc2_100%)] shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          />
          <span
            className={`relative z-10 transition-colors duration-500 ${activeSection === 'contact' ? 'text-slate-900' : 'text-background'
              }`}
          >
            Contact
          </span>
        </a>
      </nav>
    </motion.header>
    </>
  )
}


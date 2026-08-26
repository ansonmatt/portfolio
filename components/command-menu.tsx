'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, X, Briefcase, GraduationCap, Code, Medal, ArrowUpRight, Image as ImageIcon, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CommandMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const navItems = [
  { label: 'Expertise', href: '/#expertise', icon: <Code className="w-4 h-4" /> },
  { label: 'Experience', href: '/#experience', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Projects', href: '/projects', icon: <Code className="w-4 h-4" /> },
  { label: 'Achievements', href: '/achievements', icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Gallery', href: '/gallery', icon: <ImageIcon className="w-4 h-4" /> },
  { label: 'Resume', href: '/resume.pdf', icon: <FileText className="w-4 h-4" /> },
  { label: 'Contact', href: '/#contact', icon: <ArrowUpRight className="w-4 h-4" /> },
]

export function CommandMenu({ isOpen, setIsOpen }: CommandMenuProps) {
  const [search, setSearch] = useState('')
  const router = useRouter()

  // Lock body scroll when modal is open to prevent background scrolling on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape to close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen, setIsOpen])

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (href: string) => {
    setIsOpen(false)
    if (href.endsWith('.pdf') || href.startsWith('http')) {
      window.open(href, '_blank')
    } else if (href.startsWith('/#') && window.location.pathname === '/') {
      const id = href.replace('/#', '')
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      router.replace('/', { scroll: false })
    } else {
      router.push(href)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-[20vh] pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-xl bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border/20">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Go to..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg font-medium"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-[75vh] sm:max-h-[60vh] overflow-y-auto overscroll-contain touch-pan-y py-1.5 sm:py-2 px-2 scrollbar-hide">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    No matching results found.
                  </div>
                ) : (
                  <div className="space-y-0.5 sm:space-y-1">
                    {filteredItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center justify-between px-3 py-2 sm:py-3 rounded-xl hover:bg-secondary/50 text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1 sm:p-1.5 rounded-md bg-secondary/40 text-muted-foreground group-hover:text-brand transition-colors">
                            {item.icon}
                          </div>
                          <span className="text-sm sm:text-base text-foreground/90 font-medium group-hover:text-foreground">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border/20 bg-secondary/10 flex items-center justify-between text-xs text-muted-foreground">
                <span>Quick Navigation</span>
                <div className="flex items-center gap-2">
                  <span>esc to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useState, MouseEvent, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, HeartHandshake } from 'lucide-react'

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group/spotlight relative overflow-hidden bg-white/5 backdrop-blur-md border border-border/20 hover:border-border/50 rounded-3xl p-6 sm:p-8 transition-all duration-500 shadow-sm hover:shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover/spotlight:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

const experienceData = [
  {
    category: "Professional Experience",
    filter: "Work",
    icon: <Briefcase className="w-5 h-5 text-brand" />,
    items: [
      {
        title: "Machine Learning Intern",
        organization: "Bharat Electronics Limited (BEL)",
        bullets: [
          "Designed and built an end-to-end real-time intrusion-detection and alert system (YOLOv8 + ByteTrack) for CCTV footage.",
          "Trained a custom YOLOv8 Nano model on a 6,300-image CCTV dataset, achieving 92.8% mAP50, 91.8% precision, and 85.6% recall at 640x640 resolution on cloud GPU; optimized inference to 8.73 FPS on CPU-only hardware for real-time edge deployment.",
          "Benchmarked against a custom-trained RT-DETR Large (transformer) model (86.3% mAP50, 0.70 FPS locally), analyzing the speed/accuracy trade-off to justify the deployment model choice",
          "Engineered zone-based intrusion analytics with zero double-counting and exclusion-zone masking to eliminate false positives from static infrastructure."
        ],
        details: "Researched and applied modern deep learning frameworks, utilizing custom datasets to train object detection models capable of functioning in low-quality CCTV environments. Working on this project strengthened my understanding of AI model optimization, spatial tracking algorithms, and the integration of these tools into functional software architectures. The experience offered valuable insights into how enterprise-grade monitoring systems are designed and deployed. The technical mentorship and exposure to practical problem-solving such as handling hardware constraints and mitigating false positives helped bridge the gap between academic knowledge and real-world engineering."
      }
    ]
  },
  {
    category: "Ambassadorships",
    filter: "Ambassadorship",
    icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
    items: [
      {
        title: "Google Student Ambassador",
        organization: "Christ University (Kengeri Campus)",
        bullets: [
          "Selected as part of an exclusive nationwide cohort to represent Google's AI ecosystem and emerging technologies",
          "Serve as primary technical liaison between Google and the student body, driving education and adoption of AI and developer tools"
        ]
      },
      {
        title: "Campus Mantri",
        organization: "GeeksforGeeks",
        bullets: [
          "Official Campus Mantri, serving as primary liaison between GeeksforGeeks and the student community",
          "Organize and execute campus-level technical events, workshops, and coding activities and upskilling programs"
        ]
      }
    ]
  },
  {
    category: "Volunteering",
    filter: "Volunteering",
    icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
    items: [
      {
        title: "Head of Media",
        organization: "Department of AI & Data Science Engineering",
        bullets: [
          "Head of Media for Department of AI and Data Science Engineering (2025-2027)",
          "Specialized Graphic Designer for: 2026 IEEE International Conference on Contemporary Computing and Communications (InC4 2026)"
        ]
      },
      {
        title: "Graphic Designer",
        organization: "Christites Association of Sciences and Humanities (C.A.S.H)",
        bullets: [
          "Graphic Designer for Christites Association of Sciences and Humanities (2024-2025)",
          "Specialized Graphic Designer for: 39th Annual Conference of Ramanujan Mathematical Society (2024)"
        ]
      }
    ]
  }
]

// Base filters defined dynamically based on screen size in component

export function Experience() {
  const [activeFilter, setActiveFilter] = useState("All")
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  })

  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filters = isMobile ? ["All", "Work", "Other"] : ["All", "Work", "Ambassadorship", "Volunteering"]

  useEffect(() => {
    if (isMobile && (activeFilter === "Ambassadorship" || activeFilter === "Volunteering")) {
      setActiveFilter("Other")
    } else if (!isMobile && activeFilter === "Other") {
      setActiveFilter("All")
    }
  }, [isMobile, activeFilter])

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const filteredData = experienceData.filter((section) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Other") return section.filter === "Ambassadorship" || section.filter === "Volunteering"
    return section.filter === activeFilter
  })

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-12 md:py-20 border-t border-border/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Experience</p>
        <h2 className="mt-4 text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-7xl">
          My Journey
        </h2>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Professional roles, leadership, and volunteering that shaped my expertise and perspective.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="mb-16 flex items-center justify-start md:justify-start gap-2 overflow-x-auto pb-4 scrollbar-hide">
        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-secondary/40 backdrop-blur-md border border-border/40 shadow-inner">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div ref={containerRef} className="relative space-y-24">
        {/* Aceternity-style animated scroll timeline line */}
        <div className="absolute left-[27px] sm:left-[31px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-border/20 to-transparent z-0">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-brand/80 via-brand to-transparent shadow-[0_0_15px_rgba(59,130,246,0.6)]"
          />
        </div>

        <AnimatePresence mode="popLayout">
          {filteredData.map((section, sIndex) => (
            <motion.div 
              layout
              key={section.category}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <motion.div
                layout
                className="flex items-center gap-4 sm:gap-6 mb-12"
              >
                <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-background border border-border/50 shadow-sm">
                  {section.icon}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                  {section.category}
                </h3>
              </motion.div>

              <div className="space-y-12 sm:space-y-16">
                <AnimatePresence mode="popLayout">
                  {section.items.map((item, iIndex) => (
                    <motion.div
                      layout
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-start gap-4 sm:gap-6 group"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-6 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center">
                        <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-background border-2 border-border/50 group-hover:border-brand transition-colors duration-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:scale-110">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors duration-500" />
                        </div>
                      </div>
                      
                      {/* Sleek Interactive Spotlight Card */}
                      <div className="flex-1 min-w-0">
                        <SpotlightCard>
                          {/* Subtle gradient glow in background */}
                          <div className="absolute -inset-2 bg-gradient-to-tr from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
                          
                          <div className="flex flex-col gap-2 mb-6">
                            <h4 className="text-2xl md:text-3xl font-serif text-foreground tracking-tight group-hover:text-brand transition-colors duration-500">
                              {item.title}
                            </h4>
                            <span className="text-sm md:text-base font-medium font-sans text-brand/80 group-hover:text-brand transition-colors duration-500">
                              {item.organization}
                            </span>
                          </div>

                          {item.description && (
                            <p className="text-sm md:text-base font-sans text-muted-foreground/90 leading-relaxed mb-6">
                              {item.description}
                            </p>
                          )}

                          {item.bullets && item.bullets.length > 0 && (
                            <ul className="space-y-4 mb-6">
                              {item.bullets.map((bullet, bIndex) => (
                                <li key={bIndex} className="flex gap-4 font-sans text-sm md:text-base text-muted-foreground/80 leading-relaxed group/bullet hover:text-foreground transition-colors duration-300">
                                  <span className="text-brand/40 mt-1 shrink-0 transition-colors duration-300 group-hover/bullet:text-brand text-lg leading-none">✦</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {'details' in item && item.details && (
                            <div className="mt-6 pt-6 border-t border-border/10">
                              <p className="text-sm md:text-base font-sans text-muted-foreground/70 leading-relaxed group-hover:text-muted-foreground transition-colors duration-500">
                                {item.details}
                              </p>
                            </div>
                          )}
                        </SpotlightCard>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}


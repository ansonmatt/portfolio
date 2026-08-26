'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mouse } from 'lucide-react'
import { Tilt3D } from '@/components/tilt-3d'
import ColorBends from '@/components/ColorBends'

export function Hero() {
  const { scrollY } = useScroll()
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Text fades in and slides up over the first 400px of scroll (desktop only)
  const textOpacityDesktop = useTransform(scrollY, [0, 400], [0, 1])
  const textOpacityMobile = useTransform(scrollY, [0, 400], [1, 1])
  const textOpacity = isDesktop ? textOpacityDesktop : textOpacityMobile
  const textYDesktop = useTransform(scrollY, [0, 400], [80, 0])
  const textYMobile = useTransform(scrollY, [0, 400], [0, 0])
  const textY = isDesktop ? textYDesktop : textYMobile

  // Dynamic scaling for mobile vs desktop
  const scaleImageDesktop = useTransform(scrollY, [0, 400], [0.8, 1])
  const scaleImageMobile = useTransform(scrollY, [0, 400], [0.95, 1])
  const scaleImage = isDesktop ? scaleImageDesktop : scaleImageMobile

  // On desktop, image starts in center-left (-30rem) so the full ID card is perfectly centered. Moves right on scroll.
  const xImageDesktop = useTransform(scrollY, [0, 400], ["-30rem", "0rem"])
  const xImageMobile = useTransform(scrollY, [0, 400], ["0vw", "0vw"])
  const xImage = isDesktop ? xImageDesktop : xImageMobile

  // Zoom into the portrait slightly more when in ID card mode, returning to standard 1.2 scale in hero mode
  const imageInnerScaleDesktop = useTransform(scrollY, [0, 400], [1.7, 1.2])
  const imageInnerScaleMobile = useTransform(scrollY, [0, 400], [1.7, 1.7])
  const imageInnerScale = isDesktop ? imageInnerScaleDesktop : imageInnerScaleMobile

  // Barcode widths to avoid hydration mismatch from Math.random()
  const barcodeWidths = [2, 4, 1, 3, 2, 1, 5, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 5, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 5, 2, 1, 4, 2, 3, 1, 2];

  // Card text and extended background fade out (desktop only)
  const cardOpacityDesktop = useTransform(scrollY, [0, 400], [1, 0])
  const cardOpacityMobile = useTransform(scrollY, [0, 400], [1, 1])
  const cardOpacity = isDesktop ? cardOpacityDesktop : cardOpacityMobile

  return (
    <section id="hero" className="relative lg:h-[200vh] overflow-x-clip">
      <div className="lg:sticky lg:top-0 flex flex-col justify-center pt-32 pb-20 lg:pt-0 lg:pb-0 lg:h-screen min-h-[100svh]">

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: cardOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground pointer-events-none z-50 hidden lg:flex"
        >
          <div className="font-mono text-[9px] tracking-widest uppercase">Scroll to explore</div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Mouse className="h-4 w-4 opacity-50" />
          </motion.div>
        </motion.div>

        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-12 sm:gap-24 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-center relative">

            {/* Left Column: Portfolio Text */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex flex-col justify-center order-last lg:order-first z-20 pointer-events-auto"
            >
              <h1 className="text-balance font-serif text-3xl leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]">
                Engineering digital experiences with{' '}
                <span className="text-gradient italic px-1 pb-2">precision.</span>
              </h1>

              <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                I&apos;m Anson Mathew Allan, a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. Bridging tech and human-centered design.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,76,194,0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/projects"
                  className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium sm:px-6 sm:py-3 sm:text-sm"
                >
                  View selected work
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 font-mono text-[10px] text-muted-foreground sm:gap-8 sm:text-xs">
                <div>
                  <div className="text-xl font-semibold text-foreground sm:text-2xl">30+</div>
                  <div className="mt-1">Certifications</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xl font-semibold text-foreground sm:text-2xl">1000+</div>
                  <div className="mt-1">Connections</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xl font-semibold text-foreground sm:text-2xl">2+</div>
                  <div className="mt-1">Years Exp.</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: ID Card & Portrait */}
            <motion.div
              style={{ x: xImage, scale: scaleImage }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:w-[400px] lg:max-w-none order-first lg:order-last z-10 lg:mt-8"
            >
              {/* ColorBends background behind portrait */}
              <div
                className="absolute top-1/2 left-[calc(50%+100px)] lg:left-[calc(50%+200px)] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-60"
                style={{
                  width: '1800px',
                  height: '1800px',
                  position: 'absolute',
                  WebkitMaskImage: 'radial-gradient(circle closest-side, black 20%, transparent 90%)',
                  maskImage: 'radial-gradient(circle closest-side, black 20%, transparent 90%)'
                }}
              >
                <ColorBends
                  rotation={0}
                  speed={0.05}
                  colors={["#3B82F6", "#004cc2", "#08003a"]}
                  transparent
                  autoRotate={0.5}
                  scale={1.8}
                  frequency={1.6}
                  warpStrength={1}
                  mouseInfluence={3}
                  parallax={0.8}
                  noise={0.1}
                  iterations={5}
                  intensity={1.5}
                  bandWidth={2.5}
                />
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                className="relative flex flex-col items-center lg:block"
              >
                {/* ID Card Glass Background */}
                {/* Scaled to a proportionate rectangle ID card (approx golden ratio) */}
                {/* Perfect symmetrical padding: 32px (-inset-8) on top/bottom/left, and right edge extends to 432px. */}
                <motion.div
                  style={{ opacity: cardOpacity }}
                  className="glass absolute -inset-x-6 -inset-y-8 lg:-inset-8 lg:-right-[432px] rounded-[2.5rem] lg:rounded-[3rem] z-0 pointer-events-none"
                />

                <Tilt3D intensity={10} perspective={900} glare>
                  <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] md:max-w-full">
                    {/* Permanent glass background for the final portrait frame */}
                    <div className="glass absolute inset-0 rounded-[2.5rem] z-0 pointer-events-none" />

                    {/* Portrait Image */}
                    <div className="relative z-10 p-3 lg:p-2">
                      <div className="relative overflow-hidden rounded-[2rem] aspect-square pointer-events-none">
                        <motion.div style={{ scale: imageInnerScale }} className="w-full h-full origin-[50%_38%]">
                          <Image
                            src="/portrait.png"
                            alt="Portrait of Anson Mathew Allan"
                            width={640}
                            height={640}
                            priority
                            className="h-full w-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </Tilt3D>

                {/* Fading ID Card content */}
                {/* Fits perfectly in the proportionate rectangle */}
                {/* Anchored to top/bottom with inset-y-2 to match photo height perfectly. justify-between spreads the content. */}
                <motion.div
                  style={{ opacity: cardOpacity }}
                  className="relative mt-8 w-full px-2 sm:w-[85vw] max-w-sm lg:absolute lg:mt-0 lg:left-auto lg:inset-y-4 lg:-translate-y-0 lg:-right-[400px] lg:w-[360px] lg:px-0 z-10 flex flex-col gap-6 lg:gap-0 justify-between pointer-events-none py-2 lg:py-1"
                >
                  {/* ID Header (Anchored High) */}
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 lg:pb-5">
                    <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-primary uppercase">
                      Identity Card
                    </div>
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">
                      ID: 03-001
                    </div>
                  </div>

                  {/* Main Name (Centered in middle) */}
                  <div className="py-1 lg:py-2">
                    <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1">Name</div>
                    <h3 className="font-serif text-[1.65rem] sm:text-[2.25rem] lg:text-[2.65rem] sm:whitespace-nowrap leading-[1.05] font-medium tracking-tight text-foreground py-1">
                      Anson Mathew Allan
                    </h3>
                  </div>

                  {/* Details Grid (Anchored Low) */}
                  <div className="grid grid-cols-2 gap-y-6 lg:gap-y-10 gap-x-2 sm:gap-x-4">
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2">Focus</div>
                      <div className="font-medium text-[13px] sm:text-sm lg:text-base truncate">AI & ML Engineer</div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2">Base</div>
                      <div className="font-medium text-[13px] sm:text-sm lg:text-base text-primary truncate">Bengaluru, IN</div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2">Status</div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                          <span className="relative inline-flex h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        <span className="font-medium text-[13px] sm:text-sm lg:text-base text-emerald-500 truncate">Student</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1 sm:mb-2">Projects</div>
                      <div className="font-medium text-[13px] sm:text-sm lg:text-base font-mono truncate">5+ AI Projects</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* floating spec chip */}
              <motion.div style={{ opacity: textOpacity }} className="hidden lg:block glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 z-20 pointer-events-none">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Based in
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-sm font-medium">Bengaluru, Karnataka, IN</span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

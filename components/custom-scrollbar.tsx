'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll()
  
  // Add a slight spring for smooth, modern feel
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Soft trailing edge using mask-image instead of a hard clip-path.
  // We offset the percentages so that at progress=1, the entire bar is fully revealed.
  const maskImage = useTransform(progress, (val) => {
    const head = val * 115;
    const tail = head - 15;
    return `linear-gradient(to right, black ${tail}%, transparent ${head}%)`
  })

  return (
    <div className="fixed left-0 right-0 top-0 h-[2px] z-[100] pointer-events-none opacity-80 mix-blend-screen">
      {/* Ultra-subtle background dashes */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-border) 0, var(--color-border) 3px, transparent 3px, transparent 24px)'
        }} 
      />
      
      {/* Glowing animated progress dashes */}
      <motion.div
        className="absolute inset-0 text-primary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ 
          backgroundImage: 'linear-gradient(to right, currentColor 0, currentColor 3px, transparent 3px, transparent 24px)',
          filter: 'drop-shadow(0 0 6px currentColor)',
          maskImage,
          WebkitMaskImage: maskImage
        }}
      />
    </div>
  )
}

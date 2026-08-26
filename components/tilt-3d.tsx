'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees — lower = subtler */
  intensity?: number
  /** Perspective distance in px — lower = more dramatic */
  perspective?: number
  /** Scale on hover */
  scale?: number
  /** Whether to show a glare/light reflection */
  glare?: boolean
}

function useSmooth(value: number, config = { stiffness: 150, damping: 20, mass: 0.5 }) {
  const mv = useSpring(value, config)
  // Update spring target whenever value changes
  mv.set(value)
  return mv
}

export function Tilt3D({
  children,
  className = '',
  intensity = 8,
  perspective = 800,
  scale = 1.02,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const rotX = useSmooth(hover ? rot.x : 0)
  const rotY = useSmooth(hover ? rot.y : 0)
  const s = useSmooth(hover ? scale : 1)

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // normalise to -1 … 1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      // rotateX is driven by vertical position (inverted), rotateY by horizontal
      setRot({ x: -ny * intensity, y: nx * intensity })
      // glare position as percentage
      setGlarePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    },
    [intensity]
  )

  return (
    <div style={{ perspective }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          scale: s,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{
              opacity: hover ? 0.15 : 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.35) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

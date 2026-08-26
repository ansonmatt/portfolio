'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── Cursor-following ambient light ─── */
function CursorLight() {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}% ${pos.y}%, rgba(124,92,255,0.18) 0%, transparent 55%)`,
      }}
    />
  )
}

/* ─── Canvas star field with twinkling ─── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: { x: number; y: number; r: number; phase: number; speed: number; brightness: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.002,
        brightness: Math.random() * 0.5 + 0.2,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const alpha = s.brightness * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 190, 255, ${alpha})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
}

/* ─── Animated floating particles ─── */
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const colors = ['#7c5cff', '#a78bfa', '#c084fc', '#6366f1', '#818cf8']

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 35000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw faint connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(124, 92, 255, 0.06)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    animId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
}

/* ─── Main background composition ─── */
import { useScroll, useTransform, motion } from 'framer-motion'

export function MeshBackground() {
  const { scrollY } = useScroll()
  // Fade out background between 0 and 1000px scroll depth
  const opacity = useTransform(scrollY, [0, 1000], [1, 0])
  const yOffset = useTransform(scrollY, [0, 1000], [0, 200])

  return (
    <motion.div 
      style={{ opacity, y: yOffset }}
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* deep base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_0%,#14173a_0%,#0a0c22_45%,#05060f_100%)]" />

      {/* morphing color orbs */}
      <div
        className="absolute -top-1/4 left-[-10%] h-[75vw] w-[75vw] rounded-full opacity-80 blur-[90px]"
        style={{
          background: 'radial-gradient(circle at center, #4a3bb0 0%, transparent 68%)',
          animation: 'mesh-drift-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[10%] right-[-15%] h-[70vw] w-[70vw] rounded-full opacity-70 blur-[100px]"
        style={{
          background: 'radial-gradient(circle at center, #7c5cff 0%, transparent 68%)',
          animation: 'mesh-drift-b 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-15%] left-1/4 h-[65vw] w-[65vw] rounded-full opacity-60 blur-[110px]"
        style={{
          background: 'radial-gradient(circle at center, #2a72e0 0%, transparent 68%)',
          animation: 'mesh-drift-c 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-[45vw] w-[45vw] rounded-full opacity-45 blur-[90px]"
        style={{
          background: 'radial-gradient(circle at center, #c084fc 0%, transparent 68%)',
          animation: 'mesh-drift-a 34s ease-in-out infinite reverse',
        }}
      />

      {/* Aurora / light streaks */}
      <div
        className="absolute top-0 left-1/4 h-[60vh] w-[1px] opacity-20"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #7c5cff 30%, #a78bfa 50%, transparent 100%)',
          animation: 'aurora-drift 18s ease-in-out infinite',
          filter: 'blur(30px)',
          width: '200px',
        }}
      />
      <div
        className="absolute top-[20%] right-1/3 h-[50vh] w-[1px] opacity-15"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #6366f1 40%, #c084fc 60%, transparent 100%)',
          animation: 'aurora-drift 24s ease-in-out infinite reverse',
          filter: 'blur(40px)',
          width: '180px',
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas layers */}
      <StarField />
      <FloatingParticles />

      {/* Cursor-following ambient light */}
      <CursorLight />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#05060f_100%)] opacity-60" />

      {/* fine grain to kill banding */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </motion.div>
  )
}

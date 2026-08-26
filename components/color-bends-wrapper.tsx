'use client'

import dynamic from 'next/dynamic'

// Dynamically import ColorBends with ssr: false to prevent Next.js from rendering WebGL on the server
// and to keep the initial client bundle lightweight.
const ColorBends = dynamic(() => import('@/components/ColorBends'), { ssr: false })

export function ColorBendsWrapper() {
  return (
    <ColorBends
      rotation={0}
      speed={0.15}
      colors={["#262dda", "#217f92", "#08003a"]}
      transparent
      autoRotate={0.2}
      scale={1.1}
      frequency={1.3}
      warpStrength={0.96}
      mouseInfluence={1}
      parallax={1.2}
      noise={0.15}
      iterations={5}
      intensity={1.5}
      bandWidth={3}
    />
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Array shuffled with image16 at the front, titles removed
const images = [
  { src: '/gallery/image16.jpg', width: 1200, height: 800 },
  { src: '/gallery/image7.png', width: 1200, height: 800 },
  { src: '/gallery/image2.jpg', width: 800, height: 1200 },
  { src: '/gallery/image10.png', width: 1200, height: 800 },
  { src: '/gallery/image5.jpg', width: 800, height: 1000 },
  { src: '/gallery/image13.png', width: 1200, height: 800 },
  { src: '/gallery/image1.png', width: 800, height: 1200 },
  { src: '/gallery/image11.jpg', width: 1200, height: 800 },
  { src: '/gallery/image8.png', width: 800, height: 1200 },
  { src: '/gallery/image4.jpg', width: 1200, height: 800 },
  { src: '/gallery/image12.jpg', width: 800, height: 1200 },
  { src: '/gallery/image14.jpg', width: 1200, height: 800 },
  { src: '/gallery/image3.png', width: 800, height: 1200 },
  { src: '/gallery/image6.jpg', width: 800, height: 1200 },
  { src: '/gallery/image9.jpg', width: 800, height: 1000 },
]

export function Gallery() {
  const [selectedImg, setSelectedImg] = useState<{src: string} | null>(null)

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImg])

  // Handle escape to close
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImg) {
        setSelectedImg(null)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [selectedImg])

  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-6 pb-12 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-20"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand text-center md:text-left">Life & Moments</p>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
          <h2 className="text-balance font-serif text-4xl tracking-tight md:text-5xl lg:text-7xl">
            Gallery
          </h2>
          <span className="font-mono text-sm text-muted-foreground hidden md:block">
            Behind the scenes
          </span>
        </div>
      </motion.div>

      {/* Masonry Layout: Prevents cropping and perfectly fits varying aspect ratios */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative break-inside-avoid rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-lg border border-border/10 cursor-zoom-in"
            onClick={() => setSelectedImg(img)}
          >
            <div className="absolute inset-0 bg-secondary/20 -z-10" />
            <img
              src={img.src}
              alt=""
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Pop-out View */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full h-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black/20 flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <img
                src={selectedImg.src}
                alt=""
                className="w-full h-full object-contain p-2 sm:p-4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

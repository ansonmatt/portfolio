'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tilt3D } from '@/components/tilt-3d'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'

const badges = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Expires Aug 2029',
    image: 'https://images.credly.com/images/4d4693bb-530e-4bca-9327-de07f3aa2348/linkedin_thumb_image.png',
  },
  {
    title: 'MongoDB Overview: Core Concepts and Architecture',
    issuer: 'MongoDB',
    date: 'Issued Jul 2026',
    image: 'https://images.credly.com/images/0b4c54ef-b1d8-4aa7-a658-230b74dec7f6/linkedin_thumb_blob',
  },
  {
    title: 'Prompt Design in Vertex AI Skill Badge',
    issuer: 'Google Cloud',
    date: 'Issued Jun 2026',
    image: 'https://images.credly.com/images/cef82b2e-970a-4318-8e59-c3e26b7f5c19/linkedin_thumb_image.png',
  },
  {
    title: 'Google AI Essentials V1',
    issuer: 'Coursera',
    date: 'Issued Jun 2026',
    image: 'https://images.credly.com/images/ea3eec65-ddad-4242-9c59-1defac0fa2d9/linkedin_thumb_image.png',
  },
  {
    title: 'Google Prompting Essentials',
    issuer: 'Coursera',
    date: 'Issued Jun 2026',
    image: 'https://images.credly.com/images/e5d0c55b-6904-4764-973a-25bd210ccd1a/linkedin_thumb_blob',
  },
  {
    title: 'Create Your First Gemini Enterprise Application',
    issuer: 'Google Cloud',
    date: 'Issued Jun 2026',
    image: 'https://images.credly.com/images/3c923d13-42da-4765-995d-59f3030e042a/linkedin_thumb_blob',
  },
  {
    title: 'AI Fundamentals with IBM SkillsBuild',
    issuer: 'Cisco',
    date: 'Issued Jul 2025',
    image: 'https://images.credly.com/images/26c21273-c0ab-485b-98a7-f1212dcb82b8/linkedin_thumb_image.png',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Issued Jul 2025',
    image: 'https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/linkedin_thumb_image.png',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: 'Issued Jul 2025',
    image: 'https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png',
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    date: 'Issued Jul 2025',
    image: 'https://images.credly.com/images/b38a42e0-dc58-4ce2-b6c0-28d978e8aaad/linkedin_thumb_image.png',
  },
  {
    title: 'Introduction to Modern AI',
    issuer: 'Cisco',
    date: 'Issued Jul 2025',
    image: 'https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/linkedin_thumb_blob',
  },
]

const achievements = [
  {
    title: 'GRASP Hackathon 2026 - 2nd Runner Up',
    issuer: 'KRUU & ASME',
    image: '/certificates/grasp-hackathon.png',
    description: 'Secured 2nd runner up in the GRASP Hackathon 2026, an event organized by KRUU and powered by ASME (The American Society of Mechanical Engineers).',
    aspect: 'aspect-[1.414/1]' // A4 landscape ratio
  },
  {
    title: 'The Joy of Computing using Python',
    issuer: 'NPTEL & IIT Ropar',
    image: '/certificates/python-joy.png',
    description: 'Elite + Gold certification (90%). 12-week course focusing on computational thinking, algorithmic problem-solving, and logical reasoning using Python. Proctored exam tested pure logic and pattern recognition. Top certification tier among 21,919 certified candidates.',
    aspect: 'aspect-[1.414/1]'
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    image: '/certificates/aws-ai.png',
    description: 'Earned the AWS Certified AI Practitioner certification, demonstrating expertise in artificial intelligence, machine learning, and generative AI concepts on the AWS cloud.',
    aspect: 'aspect-[1.3/1]'
  },
  {
    title: 'Foundation Course on AI Readiness',
    issuer: 'IICT, Google & YouTube',
    image: '/certificates/ai-readiness.png',
    description: 'Offered by the Indian Institute of Creative Technologies (IICT) and AI Skills House, in partnership with Google and YouTube, under the Ministry of Information & Broadcasting, Government of India.',
    aspect: 'aspect-[1.414/1]'
  },
  {
    title: '5-Day AI Agents Intensive Course',
    issuer: 'Kaggle & Google',
    image: '/certificates/google-ai-agents.png',
    description: 'Successfully completed the intensive 5-day AI Agents course hosted by Kaggle in collaboration with Google.',
    aspect: 'aspect-[1.6/1]'
  }
]

export function Achievements() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-12 md:py-24 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Highlights</p>
        <h2 className="mt-4 text-balance font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Achievements & Certifications
        </h2>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Major milestones, hackathon wins, and comprehensive certifications from leading institutions.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12 sm:gap-16">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 md:gap-12 relative items-center"
          >
            {/* Image Side */}
            <div className={`relative ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <button 
                onClick={() => setSelectedImage(item.image)}
                className="block relative w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-[1.5rem] cursor-zoom-in"
              >
                <Tilt3D intensity={5} perspective={1200} scale={1.01} glare>
                  <div className={`relative overflow-hidden rounded-[1.5rem] aspect-[4/3] border border-border/50 bg-white/5`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </Tilt3D>
              </button>
            </div>

            {/* Text Side */}
            <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <span className="w-fit rounded-full border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground">
                {item.issuer}
              </span>
              <h3 className="mt-4 font-serif text-2xl sm:text-3xl tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Image
                src={selectedImage}
                alt="Certificate Full View"
                fill
                className="object-contain p-2 sm:p-8"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Badges() {
  return (
    <section id="badges" className="relative mx-auto max-w-6xl px-6 py-12 md:py-24 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Certifications</p>
        <h2 className="mt-4 text-balance font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Badges & Credentials
        </h2>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          A showcase of my continuous learning journey, focusing on AI, Cloud, and Software Engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {badges.map((badge, i) => (
          <Tilt3D key={badge.title} intensity={10} perspective={1000} scale={1.02} glare className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-hover group flex h-full flex-col items-center justify-between rounded-3xl p-5 text-center sm:p-6"
            >
              <div className="relative mb-5 aspect-square w-full max-w-[160px]">
                <Image
                  src={badge.image}
                  alt={badge.title}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {badge.title}
                </h3>
                <p className="mt-1.5 text-[11px] text-muted-foreground sm:text-xs">{badge.issuer}</p>
                <p className="mt-1 font-mono text-[10px] uppercase text-brand/80 sm:text-[11px]">{badge.date}</p>
              </div>
            </motion.div>
          </Tilt3D>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <Link 
          href="/#achievements"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-2.5 font-mono text-xs text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>
        <a 
          href="https://www.credly.com/users/anson-mathew-allan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] px-6 py-2.5 font-mono text-xs font-bold transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
        >
          View on Credly ↗
        </a>
      </motion.div>
    </section>
  )
}

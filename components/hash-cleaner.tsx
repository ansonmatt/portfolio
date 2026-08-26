'use client'

import { useEffect } from 'react'

export function HashCleaner() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      // Slight delay to ensure Next.js has completed its initial scroll logic
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          window.history.replaceState(null, '', window.location.pathname)
        }
      }, 100)
    }
  }, [])

  return null
}

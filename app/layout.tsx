import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: "Anson's Portfoio",
  description:
    'Portfolio of Anson Mathew Allan, Computer Science Engineering and Artificial Intelligence',
  generator: 'ansonmatt',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05060f',
}

import ColorBends from '@/components/ColorBends'
import { NavBar } from '@/components/nav-bar'
import { ContactFooter } from '@/components/contact-footer'
import { PageTransition } from '@/components/page-transition'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased text-foreground isolate relative min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 -z-10 bg-background pointer-events-none">
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
        </div>
        <NavBar />
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
          <ContactFooter />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SmoothScroll>
      </body>
    </html>
  )
}

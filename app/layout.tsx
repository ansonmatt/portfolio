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

import { ColorBendsWrapper } from '@/components/color-bends-wrapper'
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
          <ColorBendsWrapper />
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

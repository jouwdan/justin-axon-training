import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import '../globals.css'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Justin Axon Training & Consultancy Ltd',
  description:
    'Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families. Training and consultancy that helps teams build confidence, understanding and emotionally safe practice.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

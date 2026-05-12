import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/next'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageByPath } from '@/lib/pages'
import { PayloadPageRenderer } from '@/components/payload-page-renderer'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath('/')

  if (!page) {
    return {
      title: 'Justin Axon Training & Consultancy Ltd',
    }
  }

  return {
    title: page.meta?.title || page.title || 'Justin Axon Training & Consultancy Ltd',
    description: page.meta?.description || undefined,
  }
}

export default async function HomePage() {
  const page = await getPageByPath('/')

  if (!page) {
    notFound()
  }

  return <PayloadPageRenderer page={page} />
}

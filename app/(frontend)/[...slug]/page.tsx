import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageByPath } from '@/lib/pages'
import { PayloadPageRenderer } from '@/components/payload-page-renderer'

export const dynamic = 'force-dynamic'

interface RouteProps {
  params: Promise<{ slug: string[] }>
}

const pathFromParams = async (paramsPromise: RouteProps['params']) => {
  const params = await paramsPromise
  return `/${params.slug.join('/')}`
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const path = await pathFromParams(params)
  const page = await getPageByPath(path)

  if (!page) {
    return {
      title: 'Page Not Found | Justin Axon Training & Consultancy',
    }
  }

  return {
    title: page.meta?.title || `${page.title} | Justin Axon Training & Consultancy`,
    description: page.meta?.description || undefined,
  }
}

export default async function DynamicPayloadPage({ params }: RouteProps) {
  const path = await pathFromParams(params)
  const page = await getPageByPath(path)

  if (!page) {
    notFound()
  }

  return <PayloadPageRenderer page={page} />
}

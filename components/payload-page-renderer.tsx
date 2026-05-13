import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteData } from '@/lib/site-data'
import { PageBlocksRenderer } from '@/components/page-blocks-renderer'

type LayoutBlock = {
  blockType?: string
  [key: string]: unknown
}

export async function PayloadPageRenderer({ page }: { page: { layout?: LayoutBlock[] } }) {
  const siteData = await getSiteData()
  const layout = Array.isArray(page?.layout) ? page.layout : []

  const needsTrainingAreas = layout.some((block) => block.blockType === 'trainingAreas')
  const needsTestimonials = layout.some((block) => block.blockType === 'testimonialsFeed')

  let trainingAreas: Array<{ id: string; slug: string; title: string; category: string; audience?: string }> = []
  let testimonials: Array<{ id: string; quote: string; author: string; role: string; featured?: boolean }> = []

  if (needsTrainingAreas || needsTestimonials) {
    const payload = await getPayload({ config })
    const queries: Promise<unknown>[] = []

    if (needsTrainingAreas) {
      queries.push(
        payload.find({
          collection: 'training-areas',
          sort: 'order',
          limit: 200,
        }),
      )
    } else {
      queries.push(Promise.resolve({ docs: [] }))
    }

    if (needsTestimonials) {
      queries.push(
        payload.find({
          collection: 'testimonials',
          sort: 'order',
          limit: 200,
        }),
      )
    } else {
      queries.push(Promise.resolve({ docs: [] }))
    }

    const [trainingResult, testimonialsResult] = (await Promise.all(queries)) as Array<{
      docs: unknown[]
    }>

    trainingAreas = trainingResult.docs as typeof trainingAreas
    testimonials = testimonialsResult.docs as typeof testimonials
  }

  return (
    <PageBlocksRenderer
      initialPage={page}
      siteData={siteData}
      trainingAreas={trainingAreas}
      testimonials={testimonials}
    />
  )
}

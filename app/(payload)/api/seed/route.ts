import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import {
  seedTrainingAreas,
  seedTestimonials,
  seedPages,
  seedNavigation,
  seedSiteSettings,
} from '@/lib/seed-data'

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')

  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Seed training areas
    const existing = await payload.find({ collection: 'training-areas', limit: 1 })
    if (existing.totalDocs === 0) {
      for (const area of seedTrainingAreas) {
        await payload.create({ collection: 'training-areas', data: area as any })
      }
      payload.logger.info(`Seeded ${seedTrainingAreas.length} training areas`)
    }

    // Seed testimonials
    const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
    if (existingTestimonials.totalDocs === 0) {
      for (const testimonial of seedTestimonials) {
        await payload.create({ collection: 'testimonials', data: testimonial as any })
      }
      payload.logger.info(`Seeded ${seedTestimonials.length} testimonials`)
    }

    // Seed site globals
    await payload.updateGlobal({ slug: 'site-settings', data: seedSiteSettings })

    // Seed pages (upsert by path)
    const pageIdByPath: Record<string, number | string> = {}
    for (const page of seedPages) {
      const existingPage = await payload.find({
        collection: 'pages',
        where: { path: { equals: page.path } },
        limit: 1,
      })

      if (existingPage.docs[0]) {
        const updated = await payload.update({
          collection: 'pages',
          id: existingPage.docs[0].id,
          data: page as any,
        })
        pageIdByPath[page.path] = updated.id
      } else {
        const created = await payload.create({
          collection: 'pages',
          data: page as any,
        })
        pageIdByPath[page.path] = created.id
      }
    }

    const resolveNavigationItems = (
      items: Array<Record<string, unknown>>,
      nestedFieldNames: string[],
      level = 0,
    ): Array<Record<string, unknown>> =>
      items.map((item: Record<string, unknown>) => {
        const pagePath = typeof item.pagePath === 'string' ? item.pagePath : undefined
        const pageId = pagePath ? pageIdByPath[pagePath] : undefined
        const nestedKey = nestedFieldNames[level]
        const nestedItems =
          nestedKey && Array.isArray(item.children)
            ? resolveNavigationItems(
                item.children as Array<Record<string, unknown>>,
                nestedFieldNames,
                level + 1,
              )
            : undefined

        return {
          label: typeof item.label === 'string' ? item.label : '',
          linkType: (pageId ? 'page' : 'custom') as 'page' | 'custom',
          page: pageId,
          url:
            pageId
              ? undefined
              : typeof item.url === 'string'
                ? item.url
                : pagePath || '/',
          openInNewTab: Boolean(item.openInNewTab),
          ...(nestedKey && nestedItems?.length ? { [nestedKey]: nestedItems } : {}),
        }
      })

    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        headerMenu: resolveNavigationItems(seedNavigation.headerMenu as Array<Record<string, unknown>>, ['childItems', 'subItems']),
        footerColumns: seedNavigation.footerColumns.map((column) => ({
          title: column.title,
          items: resolveNavigationItems(column.items as Array<Record<string, unknown>>, ['childItems']),
        })),
      } as any,
    })

    return NextResponse.json({ success: true, message: 'Seed complete' })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

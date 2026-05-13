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
    const results: Record<string, string> = {}

    // Seed training areas — create only, never overwrite
    const existingAreas = await payload.find({ collection: 'training-areas', limit: 1 })
    if (existingAreas.totalDocs === 0) {
      for (const area of seedTrainingAreas) {
        await payload.create({ collection: 'training-areas', data: area as any })
      }
      results.trainingAreas = `Created ${seedTrainingAreas.length}`
    } else {
      results.trainingAreas = 'Skipped (already exists)'
    }

    // Seed testimonials — create only, never overwrite
    const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
    if (existingTestimonials.totalDocs === 0) {
      for (const testimonial of seedTestimonials) {
        await payload.create({ collection: 'testimonials', data: testimonial as any })
      }
      results.testimonials = `Created ${seedTestimonials.length}`
    } else {
      results.testimonials = 'Skipped (already exists)'
    }

    // Seed contact form FIRST so we can reference its ID when seeding pages
    let contactFormId: string | number | null = null
    const existingForms = await payload.find({ collection: 'forms', limit: 1 })
    if (existingForms.totalDocs === 0) {
      const createdForm = await payload.create({
        collection: 'forms',
        data: {
          title: 'Contact Enquiry Form',
          fields: [
            { blockType: 'text', name: 'name', label: 'Name', required: true, width: 50 },
            { blockType: 'text', name: 'organisation', label: 'Organisation / Role', width: 50 },
            { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
            { blockType: 'text', name: 'phone', label: 'Phone', width: 50 },
            {
              blockType: 'select',
              name: 'service',
              label: 'Service interested in',
              width: 50,
              options: [
                { label: 'Training', value: 'training' },
                { label: 'Consultancy', value: 'consultancy' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              blockType: 'select',
              name: 'sector',
              label: 'Sector',
              width: 50,
              options: [
                { label: 'Early Years', value: 'early-years' },
                { label: 'Primary Schools', value: 'primary' },
                { label: 'Secondary Schools', value: 'secondary' },
                { label: 'Special Schools', value: 'special-schools' },
                { label: 'Post-16', value: 'post-16' },
                { label: 'Alternative Provision', value: 'alternative-provision' },
                { label: 'Local Authority Services', value: 'local-authority' },
                { label: 'Health & Clinical Services', value: 'health-clinical' },
                { label: 'Social Care, Residential & Fostering', value: 'social-care' },
                { label: 'Activity Providers', value: 'activity-providers' },
                { label: 'Family & Community Hubs', value: 'family-community' },
                { label: 'Emergency & Frontline Services', value: 'emergency-services' },
                { label: 'Customer Experience & Public-Facing', value: 'customer-experience' },
                { label: 'Parents & Carers', value: 'parents-carers' },
                { label: 'Corporate & Business', value: 'corporate-business' },
                { label: 'Supply, Staffing & Workforce Agencies', value: 'workforce-agencies' },
                { label: 'Other', value: 'other' },
              ],
            },
            { blockType: 'textarea', name: 'message', label: 'Brief description of your needs', required: true },
            { blockType: 'text', name: 'preferredContact', label: 'Preferred contact times' },
          ],
          submitButtonLabel: 'Send Message',
          confirmationType: 'message',
          confirmationMessage: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      text: 'Thank you! Your message has been received. I aim to respond to enquiries within 48 hours.',
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          emails: [],
        } as any,
      })
      contactFormId = createdForm.id
      results.contactForm = 'Created'
    } else {
      contactFormId = existingForms.docs[0].id
      results.contactForm = 'Skipped (already exists)'
    }

    // Seed site settings — only if not yet configured (check for an email address)
    const existingSettings = await payload.findGlobal({ slug: 'site-settings' })
    if (!existingSettings.email) {
      await payload.updateGlobal({ slug: 'site-settings', data: seedSiteSettings })
      results.siteSettings = 'Created'
    } else {
      results.siteSettings = 'Skipped (already configured)'
    }

    // Seed pages — create only, skip if page already exists by path
    const pageIdByPath: Record<string, number | string> = {}
    let pagesCreated = 0
    let pagesSkipped = 0

    for (const page of seedPages) {
      const existingPage = await payload.find({
        collection: 'pages',
        where: { path: { equals: page.path } },
        limit: 1,
      })

      if (existingPage.docs[0]) {
        pageIdByPath[page.path] = existingPage.docs[0].id
        pagesSkipped++
      } else {
        // Inject the contact form ID into any contactSection blocks
        const pageData = contactFormId
          ? {
              ...page,
              layout: (page.layout as any[])?.map((block: any) =>
                block.blockType === 'contactSection' ? { ...block, form: contactFormId } : block
              ),
            }
          : page

        const created = await payload.create({
          collection: 'pages',
          data: pageData as any,
        })
        pageIdByPath[page.path] = created.id
        pagesCreated++
      }
    }
    results.pages = pagesCreated > 0
      ? `Created ${pagesCreated}, skipped ${pagesSkipped}`
      : `Skipped all ${pagesSkipped} (already exist)`

    // Seed navigation — only if not yet configured
    const existingNav = await payload.findGlobal({ slug: 'navigation' })
    const hasNav = Array.isArray((existingNav as any).headerMenu) && (existingNav as any).headerMenu.length > 0

    if (!hasNav) {
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
      results.navigation = 'Created'
    } else {
      results.navigation = 'Skipped (already configured)'
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

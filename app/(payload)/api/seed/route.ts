import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import {
  seedTrainingAreas,
  seedTestimonials,
  seedHomePage,
  seedAboutPage,
  seedConsultancyPage,
  seedPricingPage,
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
        await payload.create({ collection: 'training-areas', data: area })
      }
      payload.logger.info(`Seeded ${seedTrainingAreas.length} training areas`)
    }

    // Seed testimonials
    const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
    if (existingTestimonials.totalDocs === 0) {
      for (const testimonial of seedTestimonials) {
        await payload.create({ collection: 'testimonials', data: testimonial })
      }
      payload.logger.info(`Seeded ${seedTestimonials.length} testimonials`)
    }

    // Seed globals
    await payload.updateGlobal({ slug: 'site-settings', data: seedSiteSettings })
    await payload.updateGlobal({ slug: 'home-page', data: seedHomePage })
    await payload.updateGlobal({ slug: 'about-page', data: seedAboutPage })
    await payload.updateGlobal({ slug: 'consultancy-page', data: seedConsultancyPage })
    await payload.updateGlobal({ slug: 'pricing-page', data: seedPricingPage })

    return NextResponse.json({ success: true, message: 'Seed complete' })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

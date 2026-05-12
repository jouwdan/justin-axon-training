import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getSiteData } from '@/lib/site-data'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'training-areas',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const area = docs[0]

  if (!area) {
    return { title: 'Training Not Found | Justin Axon Training & Consultancy' }
  }

  return {
    title: `${area.title} Training | Justin Axon Training & Consultancy`,
    description: area.description,
  }
}

export default async function TrainingAreaPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const siteData = await getSiteData()
  const { docs } = await payload.find({
    collection: 'training-areas',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const area = docs[0]

  if (!area) {
    notFound()
  }

  const heroImageUrl = siteData.settings.defaultHeroImageUrl?.trim() || ''
  const helpItems = (area.helpItems as Array<{ text: string }> | null) || []

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col">
        {heroImageUrl ? (
          <Image src={heroImageUrl} alt="" fill className="object-cover" unoptimized priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#144a73] to-[#0a2540]" />
        )}
        <Header
          variant="transparent"
          menuItems={siteData.headerMenu}
          logoUrl={siteData.settings.logoUrl}
          logoAlt="Justin Axon Training & Consultancy Ltd"
        />
        <div className="h-20" />
        <div className="relative flex-1 flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl text-white">
              <Link href="/training" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
                &larr; Back to Training
              </Link>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">{area.title}</h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">{area.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 max-w-3xl">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This training is designed for</p>
              <p className="text-foreground font-medium">{area.audience}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Training Helps You Do */}
      {helpItems.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                What This Training Helps You Do
              </h2>
              <ul className="space-y-4">
                {helpItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Book This Training?
            </h2>
            <p className="text-muted-foreground mb-8">
              I&apos;m happy to have a short, no-pressure conversation to explore what would help your team most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

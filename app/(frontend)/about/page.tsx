import { Metadata } from 'next'
import Image from 'next/image'
import { Eye, Brain, Heart, Lightbulb, MessageCircle, Users, Shield } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LucideIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

const ICON_MAP: Record<string, LucideIcon> = { Eye, Brain, Heart, Lightbulb, MessageCircle, Users, Shield }

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'about-page' }) as any
  return {
    title: `${page?.heroTitle || 'About Me'} | Justin Axon Training & Consultancy`,
    description: page?.heroSubtitle || 'Learn about Justin Axon, a trainer and consultant with twenty years of hands-on experience.',
  }
}

export default async function AboutPageRoute() {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'about-page' }) as any

  const heroTitle = page?.heroTitle || 'About Me'
  const heroSubtitle = page?.heroSubtitle || 'Relational, strengths-based and neurodivergent-affirming training and consultancy.'
  const photoUrl = page?.photoUrl || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/justin-axon-5K7bLM5b07PkbEeqIFxp8FONZLEyna.png'
  const bio1 = page?.bio1 || "I'm Justin Axon — a trainer, consultant and Senior Leader with twenty years' hands-on experience supporting children and young people with SEND and their families."
  const bio2 = page?.bio2 || ''
  const bio3 = page?.bio3 || ''
  const valuesTitle = page?.valuesTitle || 'Values & Ethos'
  const valuesText = page?.valuesText || ''
  const guidingPrinciplesTitle = page?.guidingPrinciplesTitle || 'What Guides My Work'
  const guidingPrinciples = (page?.guidingPrinciples || []) as Array<{ title: string; description: string; icon: string }>
  const guidingPrinciplesNote = page?.guidingPrinciplesNote || ''
  const howIWorkTitle = page?.howIWorkTitle || 'How I Work'
  const howIWork1 = page?.howIWork1 || ''
  const howIWork2 = page?.howIWork2 || ''
  const howIWork3 = page?.howIWork3 || ''
  const howIWorkQuote = page?.howIWorkQuote || ''
  const fullBioTitle = page?.fullBioTitle || 'Full Bio'
  const fullBio1 = page?.fullBio1 || ''
  const fullBio2 = page?.fullBio2 || ''
  const fullBio3 = page?.fullBio3 || ''

  return (
    <div className="flex flex-col">
      <PageHeader title={heroTitle} subtitle={heroSubtitle} />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-12">
            <div className="w-full md:w-[30%] flex-shrink-0">
              <div className="relative aspect-square w-full max-w-xs mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={photoUrl}
                  alt="Justin Axon - Trainer and Consultant"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-[70%]">
              <div className="prose prose-lg max-w-none">
                {bio1 && <p className="text-lg text-foreground leading-relaxed mb-6">{bio1}</p>}
                {bio2 && <p className="text-foreground leading-relaxed mb-6">{bio2}</p>}
                {bio3 && <p className="text-foreground leading-relaxed">{bio3}</p>}
              </div>
            </div>
          </div>

          {(valuesTitle || valuesText) && (
            <div className="bg-card rounded-2xl border border-border p-8">
              {valuesTitle && <h3 className="text-xl font-bold text-foreground mb-4">{valuesTitle}</h3>}
              {valuesText && <p className="text-muted-foreground leading-relaxed max-w-4xl">{valuesText}</p>}
            </div>
          )}
        </div>
      </section>

      {guidingPrinciples.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {guidingPrinciplesTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guidingPrinciples.map((principle) => {
                const Icon = ICON_MAP[principle.icon] || Users
                return (
                  <div key={principle.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                    <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                )
              })}
            </div>
            {guidingPrinciplesNote && (
              <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
                {guidingPrinciplesNote}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              {howIWorkTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-foreground">
              {howIWork1 && <p className="leading-relaxed mb-6">{howIWork1}</p>}
              {howIWork2 && <p className="leading-relaxed mb-6">{howIWork2}</p>}
              {howIWork3 && <p className="leading-relaxed">{howIWork3}</p>}
            </div>
            {howIWorkQuote && (
              <div className="mt-12 bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                <blockquote className="text-xl md:text-2xl italic leading-relaxed text-center">
                  &ldquo;{howIWorkQuote}&rdquo;
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </section>

      {(fullBio1 || fullBio2 || fullBio3) && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">{fullBioTitle}</h2>
              <div className="prose prose-lg max-w-none text-foreground">
                {fullBio1 && <p className="leading-relaxed mb-6">{fullBio1}</p>}
                {fullBio2 && <p className="leading-relaxed mb-6">{fullBio2}</p>}
                {fullBio3 && <p className="leading-relaxed">{fullBio3}</p>}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

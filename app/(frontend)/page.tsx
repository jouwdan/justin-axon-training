import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, GraduationCap, Building2, Heart, Users, Shield, Briefcase, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LucideIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  Heart,
  Users,
  Shield,
  Briefcase,
  Home,
}

const FALLBACK_SECTORS = [
  { title: 'Education', description: 'Early Years, Primary, Secondary, Special Schools, Post-16 and Alternative Provision', href: '/training/primary', icon: 'GraduationCap' },
  { title: 'Public Sector & Health', description: 'Local Authority services, health teams and social care', href: '/training/local-authority', icon: 'Building2' },
  { title: 'Residential & Fostering', description: 'Residential settings and fostering services', href: '/training/social-care', icon: 'Heart' },
  { title: 'Youth & Community', description: 'Youth, activity and community providers', href: '/training/activity-providers', icon: 'Users' },
  { title: 'Emergency Services', description: 'Police, fire, ambulance and frontline services', href: '/training/emergency-services', icon: 'Shield' },
  { title: 'Corporate & Business', description: 'Retail, hospitality, transport and customer-facing teams', href: '/training/corporate-business', icon: 'Briefcase' },
]

const FALLBACK_WHY = [
  'Tailored to your setting — no generic slides, no off-the-shelf packages',
  'Real-life experience, not theory alone',
  'Warm, human, strengths-based approach',
  'Practical tools you can use tomorrow',
  'Designed for mixed-experience groups',
  'Emotionally safe, inclusive and accessible',
]

export default async function Page() {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'home-page' }) as any

  const heroTitle = page?.heroTitle || 'Creating emotionally safe, inclusive experiences'
  const heroSubtitle = page?.heroSubtitle || 'Training and consultancy that helps teams build confidence, understanding and emotionally safe practice — tailored to your people, your setting and your challenges.'
  const heroImageUrl = page?.heroImageUrl || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-only-MZLwnURIyegWpg5czkYni9Jgohgor4.png'
  const whatIDoTitle = page?.whatIDoTitle || 'What I Do'
  const whatIDoParagraph1 = page?.whatIDoParagraph1 || 'Every day, people with SEND and SEMH needs interact with education settings, public services, community organisations, emergency services, customer-facing environments and workplaces.'
  const whatIDoParagraph2 = page?.whatIDoParagraph2 || 'When teams feel confident, informed and supported, those interactions become safer, calmer and more meaningful for everyone involved.'
  const whatIDoCardText = page?.whatIDoCardText || 'I provide practical, strengths-based training and consultancy that helps teams to understand behaviour, communication and emotional safety through a neurodivergent-affirming lens.'
  const whoIWorkWithTitle = page?.whoIWorkWithTitle || 'Who I Work With'
  const whoIWorkWithSubtitle = page?.whoIWorkWithSubtitle || 'My training supports and compliments teams across a wide range of sectors'
  const sectors = (page?.sectors?.length ? page.sectors : FALLBACK_SECTORS) as Array<{ title: string; description: string; href: string; icon: string }>
  const whoIWorkWithNote = page?.whoIWorkWithNote || 'Plus: Parents & Carers, Recruitment & Workforce Agencies'
  const whyChooseMeTitle = page?.whyChooseMeTitle || 'Why Choose Me'
  const whyChooseItems = (page?.whyChooseItems?.length ? page.whyChooseItems.map((i: any) => i.text) : FALLBACK_WHY) as string[]
  const whyChooseMeQuote = page?.whyChooseMeQuote || 'I help teams feel confident so everyday interactions become safer, calmer and more meaningful.'
  const whyChooseMeQuoteAuthor = page?.whyChooseMeQuoteAuthor || '— Justin Axon'
  const ctaTitle = page?.ctaTitle || "Ready to Transform Your Team's Practice?"
  const ctaSubtitle = page?.ctaSubtitle || "I'm happy to have a short, no-pressure conversation to explore what would help your team most."

  return (
    <div className="flex flex-col">
      {/* Hero Section with Header */}
      <section className="relative min-h-[85vh] flex flex-col">
        <Image
          src={heroImageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <Header variant="transparent" />
        <div className="h-20" />
        <div className="relative flex-1 flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-[#0a2540] hover:bg-white/90 font-medium rounded-md shadow-lg">
                  <Link href="/training">
                    Explore Training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {whatIDoTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {whatIDoParagraph1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                {whatIDoParagraph2}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {whatIDoCardText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who I Work With Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {whoIWorkWithTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {whoIWorkWithSubtitle}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => {
              const Icon = ICON_MAP[sector.icon] || Users
              return (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {sector.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{sector.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">{whoIWorkWithNote}</p>
            <Button asChild variant="outline">
              <Link href="/training">
                View All Training Areas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {whyChooseMeTitle}
              </h2>
              <ul className="space-y-4">
                {whyChooseItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
              <blockquote className="text-xl md:text-2xl italic leading-relaxed">
                &ldquo;{whyChooseMeQuote}&rdquo;
              </blockquote>
              <p className="mt-6 text-white/80">{whyChooseMeQuoteAuthor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0a2540] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {ctaTitle}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[#0a2540] hover:bg-white/90">
              <Link href="/contact">
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 font-medium">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

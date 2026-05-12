import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ClipboardCheck, Users, FileText, Target, BarChart3, Briefcase, MessageCircle, Calendar, Video, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LucideIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  audits: ClipboardCheck,
  coaching: Users,
  policy: FileText,
  'action-planning': Target,
  monitoring: BarChart3,
  'project-work': Briefcase,
}

const HOW_IT_WORKS_ICONS: LucideIcon[] = [MessageCircle, FileText, Calendar, Target]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Consultancy | Justin Axon Training & Consultancy',
    description: 'Supporting leaders, teams and organisations to embed inclusive practice, strengthen culture and create sustainable change.',
  }
}

export default async function ConsultancyPageRoute() {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'consultancy-page' }) as any

  const heroTitle = page?.heroTitle || 'Consultancy'
  const heroSubtitle = page?.heroSubtitle || 'Supporting leaders, teams and organisations to embed inclusive practice, strengthen culture and create sustainable change.'
  const introText = page?.introText || ''
  const services = (page?.services || []) as Array<{
    id: string
    title: string
    description: string
    includes: Array<{ text: string }>
    outcome: string
  }>
  const howItWorks = (page?.howItWorks || []) as Array<{ title: string; description: string }>
  const ctaTitle = page?.ctaTitle || "Let's Have a Conversation"
  const ctaSubtitle = page?.ctaSubtitle || 'I am always happy to have a short, no-pressure conversation. Get in touch via the contact page or email directly.'

  return (
    <div className="flex flex-col">
      <PageHeader title={heroTitle} subtitle={heroSubtitle} />

      {introText && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed">{introText}</p>
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Consultancy Services
            </h2>
            <div className="space-y-12">
              {services.map((service) => {
                const Icon = SERVICE_ICONS[service.id] || Briefcase
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className="bg-card rounded-2xl border border-border p-8 md:p-10 scroll-mt-24"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{service.title}</h3>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed mb-6">{service.description}</p>
                    {service.includes?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">This can include:</p>
                        <ul className="grid gap-2 md:grid-cols-2">
                          {service.includes.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm">
                        <span className="font-semibold text-primary">Outcome:</span>{' '}
                        <span className="text-foreground">{service.outcome}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {howItWorks.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              How Consultancy Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => {
                const Icon = HOW_IT_WORKS_ICONS[index] || MessageCircle
                return (
                  <div key={step.title} className="text-center">
                    <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">Step {index + 1}</div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Flexible Delivery Options</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: MapPin, title: 'In-Person', desc: 'On-site at your location' },
                { icon: Video, title: 'Remote', desc: 'Video conferencing' },
                { icon: Calendar, title: 'Blended', desc: 'Mix of both approaches' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card rounded-xl border border-border p-6 text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a2540] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[#0a2540] hover:bg-white/90">
              <Link href="/contact">
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <a href="mailto:Justin.Axon@outlook.com">Justin.Axon@outlook.com</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

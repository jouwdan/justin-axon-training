import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Users, FileText, Briefcase, Car, Calendar, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LucideIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Training: Users,
  Consultancy: Clock,
  Audits: FileText,
  'Project Work': Briefcase,
}

const ADDITIONAL_COST_ICONS: LucideIcon[] = [Car, Calendar, Clock, FileText, Briefcase, Users]

export const metadata: Metadata = {
  title: 'Pricing | Justin Axon Training & Consultancy',
  description: 'Simple, transparent pricing for training, consultancy and audit services.',
}

export default async function PricingPageRoute() {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'pricing-page' }) as any

  const heroTitle = page?.heroTitle || 'Pricing'
  const heroSubtitle = page?.heroSubtitle || 'I keep pricing simple and transparent so you can see exactly what you need at a glance.'
  const pricingCategories = (page?.pricingCategories || []) as Array<{
    category: string
    items: Array<{ name: string; price: string; note?: string }>
  }>
  const additionalCosts = (page?.additionalCosts || []) as Array<{ text: string }>
  const ctaTitle = page?.ctaTitle || 'Request a Quote'
  const ctaSubtitle = page?.ctaSubtitle || 'Share a little about the support you are looking for.'

  return (
    <div className="flex flex-col">
      <PageHeader title={heroTitle} subtitle={heroSubtitle} />

      {pricingCategories.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {pricingCategories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.category] || Briefcase
                return (
                  <div key={cat.category} className="bg-card rounded-2xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">{cat.category}</h2>
                    </div>
                    <div className="space-y-4">
                      {cat.items.map((item) => (
                        <div key={item.name} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                          <div className="flex items-baseline justify-between gap-4 mb-1">
                            <h3 className="font-medium text-foreground">{item.name}</h3>
                            <span className="text-2xl font-bold text-primary whitespace-nowrap">{item.price}</span>
                          </div>
                          {item.note && <p className="text-sm text-muted-foreground">{item.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {additionalCosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Additional Costs</h2>
              <p className="text-muted-foreground text-center mb-8">To keep everything clear:</p>
              <div className="grid gap-4 md:grid-cols-2">
                {additionalCosts.map((item, index) => {
                  const Icon = ADDITIONAL_COST_ICONS[index % ADDITIONAL_COST_ICONS.length]
                  return (
                    <div key={index} className="flex items-start gap-3 bg-card rounded-lg border border-border p-4">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

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
              <a href="mailto:Justin.Axon@outlook.com">
                <Mail className="mr-2 h-5 w-5" />
                Justin.Axon@outlook.com
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

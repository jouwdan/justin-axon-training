import { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, Building2, Users, Shield, Briefcase, Heart, Home, Truck } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LucideIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Training | Justin Axon Training & Consultancy',
  description: 'Choose the area that best reflects your setting to explore tailored training designed for your world, your challenges and your people.',
}

type CategoryConfig = {
  title: string
  description: string
  icon: LucideIcon
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  education: {
    title: 'Education',
    description: 'Supporting learners across all educational settings',
    icon: GraduationCap,
  },
  'public-sector-health': {
    title: 'Public Sector, Health & Social Care',
    description: 'Supporting services across health, social care and local authority teams',
    icon: Building2,
  },
  'activity-youth-community': {
    title: 'Activity, Youth & Community',
    description: 'Supporting community-based providers and organisations',
    icon: Users,
  },
  'emergency-frontline': {
    title: 'Emergency & Frontline Services',
    description: 'Supporting emergency and frontline professionals',
    icon: Shield,
  },
  'customer-experience': {
    title: 'Customer Experience & Public-Facing Teams',
    description: 'Supporting customer-facing and public-facing teams',
    icon: Briefcase,
  },
  'parents-carers': {
    title: 'Parents & Carers',
    description: 'Practical strategies for families supporting neurodivergent young people',
    icon: Home,
  },
  'corporate-business': {
    title: 'Corporate & Business',
    description: 'Building inclusive, neurodivergent-affirming workplaces',
    icon: Heart,
  },
  'workforce-agencies': {
    title: 'Supply, Staffing & Workforce Agencies',
    description: 'Supporting agency and supply workforces in diverse settings',
    icon: Truck,
  },
}

const CATEGORY_ORDER = [
  'education',
  'public-sector-health',
  'activity-youth-community',
  'emergency-frontline',
  'customer-experience',
  'parents-carers',
  'corporate-business',
  'workforce-agencies',
]

export default async function TrainingPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'training-areas',
    sort: 'order',
    limit: 100,
  })

  // Group by category
  const grouped = docs.reduce((acc, area) => {
    const cat = area.category as string
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(area)
    return acc
  }, {} as Record<string, typeof docs>)

  const orderedCategories = CATEGORY_ORDER.filter((cat) => grouped[cat]?.length)

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Training"
        subtitle="Teams across education, public services, community settings, emergency services, customer-facing environments and workplaces all interact with neurodivergent people and people with SEND/SEMH needs."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {orderedCategories.map((categoryKey) => {
            const categoryConfig = CATEGORY_CONFIG[categoryKey]
            if (!categoryConfig) return null
            const { icon: Icon, title, description } = categoryConfig
            const areas = grouped[categoryKey]

            return (
              <div key={categoryKey} className="mb-16 last:mb-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {areas.map((area) => (
                    <Link
                      key={area.id}
                      href={`/training/${area.slug}`}
                      className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{area.audience}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

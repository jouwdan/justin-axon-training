import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Linkedin,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Shield,
  Target,
  Users,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/contact-form'
import { Header } from '@/components/header'
import { getSiteData } from '@/lib/site-data'
import { getPayload } from 'payload'
import config from '@payload-config'

type ButtonItem = {
  label?: string
  url?: string
  variant?: 'primary' | 'outline' | 'ghost'
  openInNewTab?: boolean
}

type LayoutBlock = {
  blockType?: string
  [key: string]: unknown
}

type TrainingAreaDoc = {
  id: string
  slug: string
  title: string
  category: string
  audience?: string
}

type TestimonialDoc = {
  id: string
  quote: string
  author: string
  role: string
}

const ICON_MAP: Record<string, LucideIcon> = {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Shield,
  Target,
  Users,
  Video,
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

const CATEGORY_DEFAULTS: Record<string, { title: string; description: string; icon: string }> = {
  education: {
    title: 'Education',
    description: 'Supporting learners across all educational settings.',
    icon: 'GraduationCap',
  },
  'public-sector-health': {
    title: 'Public Sector, Health & Social Care',
    description: 'Supporting services across health, social care and local authority teams.',
    icon: 'Building2',
  },
  'activity-youth-community': {
    title: 'Activity, Youth & Community',
    description: 'Supporting community-based providers and organisations.',
    icon: 'Users',
  },
  'emergency-frontline': {
    title: 'Emergency & Frontline Services',
    description: 'Supporting emergency and frontline professionals.',
    icon: 'Shield',
  },
  'customer-experience': {
    title: 'Customer Experience & Public-Facing Teams',
    description: 'Supporting customer-facing and public-facing teams.',
    icon: 'Briefcase',
  },
  'parents-carers': {
    title: 'Parents & Carers',
    description: 'Practical strategies for families supporting neurodivergent young people.',
    icon: 'Home',
  },
  'corporate-business': {
    title: 'Corporate & Business',
    description: 'Building inclusive, neurodivergent-affirming workplaces.',
    icon: 'Heart',
  },
  'workforce-agencies': {
    title: 'Supply, Staffing & Workforce Agencies',
    description: 'Supporting agency and supply workforces in diverse settings.',
    icon: 'Briefcase',
  },
}

const ADDITIONAL_COST_ICONS: LucideIcon[] = [MapPin, Calendar, Clock, FileText, Briefcase, Users]
const PRICING_CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Training: Users,
  Consultancy: Clock,
  Audits: FileText,
  'Project Work': Briefcase,
}

const backgroundClassMap: Record<string, string> = {
  background: 'bg-background',
  muted: 'bg-muted/30',
  brand: 'bg-[#0a2540] text-white',
}

const textMutedClassByBackground: Record<string, string> = {
  brand: 'text-white/80',
  muted: 'text-muted-foreground',
  background: 'text-muted-foreground',
}

const contentMaxWidthMap: Record<string, string> = {
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
  none: '',
}

const columnsClassMap: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

const heroHeightClassMap: Record<string, string> = {
  hero: 'min-h-[72vh]',
  page: 'min-h-[50vh]',
  compact: 'min-h-[38vh]',
}

const buttonVariant = (variant: ButtonItem['variant']): 'default' | 'outline' | 'ghost' => {
  if (variant === 'outline') return 'outline'
  if (variant === 'ghost') return 'ghost'
  return 'default'
}

const getIcon = (name: unknown): LucideIcon => {
  if (typeof name !== 'string') return Users
  return ICON_MAP[name] ?? Users
}

const resolveMediaUrl = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    const url = (value as { url?: unknown }).url
    if (typeof url === 'string') return url
  }
  return null
}

const normalizeButtons = (value: unknown): ButtonItem[] => {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => item as ButtonItem)
    .filter((item) => typeof item?.label === 'string' && typeof item?.url === 'string')
}

const renderButtons = (buttons: ButtonItem[], options?: { hero?: boolean }) => {
  if (!buttons.length) return null

  return (
    <div className="flex flex-wrap gap-4">
      {buttons.map((button) => {
        const href = button.url as string
        const label = button.label as string
        const openInNewTab = Boolean(button.openInNewTab)
        const target = openInNewTab ? '_blank' : undefined
        const rel = openInNewTab ? 'noopener noreferrer' : undefined

        if (options?.hero) {
          const heroClass =
            button.variant === 'outline'
              ? 'border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 font-medium'
              : 'bg-white text-[#0a2540] hover:bg-white/90'

          return (
            <Button key={`${label}-${href}`} asChild size="lg" className={heroClass}>
              <Link href={href} target={target} rel={rel}>
                {label}
              </Link>
            </Button>
          )
        }

        return (
          <Button key={`${label}-${href}`} asChild variant={buttonVariant(button.variant)}>
            <Link href={href} target={target} rel={rel}>
              {label}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

export async function PayloadPageRenderer({ page }: { page: { layout?: LayoutBlock[] } }) {
  const siteData = await getSiteData()
  const layout = Array.isArray(page?.layout) ? page.layout : []

  const needsTrainingAreas = layout.some((block) => block.blockType === 'trainingAreas')
  const needsTestimonials = layout.some((block) => block.blockType === 'testimonialsFeed')

  let trainingAreas: TrainingAreaDoc[] = []
  let testimonials: TestimonialDoc[] = []

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

    trainingAreas = trainingResult.docs as TrainingAreaDoc[]
    testimonials = testimonialsResult.docs as TestimonialDoc[]
  }

  const startsWithHero = layout[0]?.blockType === 'hero'

  return (
    <div className="flex flex-col">
      {!startsWithHero && (
        <>
          <Header
            variant="solid"
            menuItems={siteData.headerMenu}
            logoUrl={siteData.settings.logoUrl}
            logoAlt="Justin Axon Training & Consultancy Ltd"
          />
          <div className="h-20" />
        </>
      )}

      {layout.map((block, index) => {
        if (block.blockType === 'hero') {
          const heading =
            typeof block.heading === 'string' ? block.heading : 'Creating emotionally safe, inclusive experiences'
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const backgroundImageUrlRaw =
            resolveMediaUrl(block.backgroundImage) ||
            (typeof block.backgroundImageUrl === 'string' ? block.backgroundImageUrl : null) ||
            siteData.settings.defaultHeroImageUrl
          const backgroundImageUrl = backgroundImageUrlRaw?.trim() || ''
          const height = typeof block.height === 'string' ? block.height : 'page'
          const buttons = normalizeButtons(block.buttons)
          const headerVariant =
            block.headerVariant === 'solid' || block.headerVariant === 'transparent'
              ? block.headerVariant
              : 'transparent'

          return (
            <section key={index} className={`relative flex flex-col ${heroHeightClassMap[height] ?? heroHeightClassMap.page}`}>
              {backgroundImageUrl ? (
                <Image
                  src={backgroundImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540] via-[#144a73] to-[#0a2540]" />
              )}
              <Header
                variant={headerVariant}
                menuItems={siteData.headerMenu}
                logoUrl={siteData.settings.logoUrl}
                logoAlt="Justin Axon Training & Consultancy Ltd"
              />
              <div className="h-20" />
              <div className="relative flex flex-1 items-center">
                <div className="container mx-auto px-4 py-10 md:py-12">
                  <div className="max-w-3xl text-white">
                    <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                      {heading}
                    </h1>
                    {subheading && (
                      <p className="mb-6 text-lg leading-relaxed text-white/80 md:text-xl">{subheading}</p>
                    )}
                    {renderButtons(buttons, { hero: true })}
                  </div>
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'profileIntro') {
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const imageAlt = typeof block.imageAlt === 'string' ? block.imageAlt : 'Profile image'
          const imageUrl =
            resolveMediaUrl(block.image) ||
            (typeof block.imageUrl === 'string' ? block.imageUrl : null) ||
            ''
          const paragraphs =
            Array.isArray(block.paragraphs)
              ? block.paragraphs
                  .map((p) => (p as { text?: unknown }).text)
                  .filter((text): text is string => typeof text === 'string')
              : []

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
                  {imageUrl && (
                    <div className="w-full shrink-0 md:w-[30%]">
                      <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-lg md:mx-0">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" unoptimized />
                      </div>
                    </div>
                  )}
                  <div className={imageUrl ? 'w-full md:w-[70%]' : 'w-full'}>
                    <div className="prose prose-lg max-w-none">
                      {paragraphs.map((text) => (
                        <p key={text.slice(0, 30)} className="mb-6 leading-relaxed text-foreground last:mb-0">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'content') {
          const heading = typeof block.heading === 'string' ? block.heading : ''
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const centered = Boolean(block.centered)
          const style = block.style === 'card' ? 'card' : 'plain'
          const maxWidthKey = typeof block.maxWidth === 'string' ? block.maxWidth : '5xl'
          const maxWidthClass = contentMaxWidthMap[maxWidthKey] ?? contentMaxWidthMap['5xl']
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const mutedText = textMutedClassByBackground[background] ?? textMutedClassByBackground.background
          const paragraphs =
            Array.isArray(block.paragraphs)
              ? block.paragraphs
                  .map((p) => (p as { text?: unknown }).text)
                  .filter((text): text is string => typeof text === 'string')
              : []

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                <div
                  className={`${maxWidthClass} ${centered ? 'mx-auto text-center' : ''} ${
                    style === 'card' ? 'rounded-2xl border border-border bg-card p-8 shadow-sm' : ''
                  }`}
                >
                  {heading && (
                    <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${background === 'brand' ? 'text-white' : 'text-foreground'}`}>
                      {heading}
                    </h2>
                  )}
                  {subheading && <p className={`mb-6 text-lg leading-relaxed ${mutedText}`}>{subheading}</p>}
                  {paragraphs.map((text) => (
                    <p key={text.slice(0, 30)} className={`mb-4 leading-relaxed last:mb-0 ${mutedText}`}>
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'cardGrid') {
          const heading = typeof block.heading === 'string' ? block.heading : ''
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const bottomNote = typeof block.bottomNote === 'string' ? block.bottomNote : ''
          const ctaLabel = typeof block.ctaLabel === 'string' ? block.ctaLabel : ''
          const ctaUrl = typeof block.ctaUrl === 'string' ? block.ctaUrl : ''
          const columns = typeof block.columns === 'string' ? block.columns : '3'
          const gridColumns = columnsClassMap[columns] ?? columnsClassMap['3']
          const cards = Array.isArray(block.cards) ? block.cards : []
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const mutedText = textMutedClassByBackground[background] ?? textMutedClassByBackground.background

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                {(heading || subheading) && (
                  <div className="mb-12 text-center">
                    {heading && (
                      <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${background === 'brand' ? 'text-white' : 'text-foreground'}`}>
                        {heading}
                      </h2>
                    )}
                    {subheading && <p className={`mx-auto max-w-3xl text-lg ${mutedText}`}>{subheading}</p>}
                  </div>
                )}

                <div className={`grid gap-6 ${gridColumns}`}>
                  {cards.map((card, cardIndex) => {
                    const item = card as {
                      anchorId?: string
                      title?: string
                      description?: string
                      icon?: string
                      href?: string
                      linkLabel?: string
                      bullets?: Array<{ text?: string }>
                      outcome?: string
                    }
                    const title = item.title ?? ''
                    const description = item.description ?? ''
                    const Icon = getIcon(item.icon)
                    const bullets = Array.isArray(item.bullets)
                      ? item.bullets
                          .map((bullet) => bullet?.text)
                          .filter((text): text is string => typeof text === 'string')
                      : []

                    return (
                      <div
                        key={`${title}-${cardIndex}`}
                        id={typeof item.anchorId === 'string' ? item.anchorId : undefined}
                        className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="mb-4 flex items-start gap-3">
                          <div className="rounded-lg bg-primary/10 p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                        </div>
                        {description && <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>}
                        {bullets.length > 0 && (
                          <ul className="mb-4 space-y-2">
                            {bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2 text-sm text-foreground">
                                <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.outcome && (
                          <div className="mb-4 rounded-lg bg-primary/5 p-3 text-sm text-foreground">
                            <span className="font-semibold text-primary">Outcome:</span> {item.outcome}
                          </div>
                        )}
                        {item.href && (
                          <Button asChild variant="link" className="h-auto p-0 text-primary">
                            <Link href={item.href}>
                              {item.linkLabel || 'Learn more'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>

                {(bottomNote || (ctaLabel && ctaUrl)) && (
                  <div className="mt-8 text-center">
                    {bottomNote && <p className={`mb-4 ${mutedText}`}>{bottomNote}</p>}
                    {ctaLabel && ctaUrl && (
                      <Button asChild variant="outline">
                        <Link href={ctaUrl}>
                          {ctaLabel}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </section>
          )
        }

        if (block.blockType === 'bulletList') {
          const heading = typeof block.heading === 'string' ? block.heading : ''
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const Icon = getIcon(block.icon)
          const quote = typeof block.quote === 'string' ? block.quote : ''
          const quoteAuthor = typeof block.quoteAuthor === 'string' ? block.quoteAuthor : ''
          const quoteBackground =
            typeof block.quoteBackground === 'string' ? block.quoteBackground : 'gradient'
          const items =
            Array.isArray(block.items)
              ? block.items
                  .map((item) => (item as { text?: unknown }).text)
                  .filter((text): text is string => typeof text === 'string')
              : []
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const headingClass = background === 'brand' ? 'text-white' : 'text-foreground'
          const itemClass = background === 'brand' ? 'text-white/90' : 'text-foreground'

          const quoteClassByBackground: Record<string, string> = {
            gradient: 'bg-gradient-to-br from-primary to-secondary text-white',
            brand: 'bg-[#0a2540] text-white',
            muted: 'bg-muted/30 text-foreground',
            background: 'bg-background text-foreground border border-border',
          }

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                <div className={quote ? 'grid gap-12 lg:grid-cols-2 items-center' : 'mx-auto max-w-3xl'}>
                  <div>
                    {heading && <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>}
                    {subheading && (
                      <p className={`mb-8 ${background === 'brand' ? 'text-white/80' : 'text-muted-foreground'}`}>{subheading}</p>
                    )}
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <li key={item} className={`flex items-start gap-3 ${itemClass}`}>
                          <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {quote && (
                    <div
                      className={`rounded-2xl p-8 md:p-12 ${quoteClassByBackground[quoteBackground] ?? quoteClassByBackground.gradient}`}
                    >
                      <blockquote className="text-xl md:text-2xl italic leading-relaxed">
                        &ldquo;{quote}&rdquo;
                      </blockquote>
                      {quoteAuthor && (
                        <p className={`mt-6 ${quoteBackground === 'muted' || quoteBackground === 'background' ? 'text-muted-foreground' : 'text-white/80'}`}>
                          {quoteAuthor}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'quote') {
          const quote = typeof block.quote === 'string' ? block.quote : ''
          if (!quote) return null
          const author = typeof block.author === 'string' ? block.author : ''
          const background = typeof block.background === 'string' ? block.background : 'gradient'
          const classNameByBackground: Record<string, string> = {
            gradient: 'bg-gradient-to-br from-primary to-secondary text-white',
            brand: 'bg-[#0a2540] text-white',
            muted: 'bg-muted/30 text-foreground',
            background: 'bg-background text-foreground',
          }

          return (
            <section key={index} className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <div className={`mx-auto max-w-4xl rounded-2xl p-8 md:p-12 ${classNameByBackground[background] ?? classNameByBackground.gradient}`}>
                  <blockquote className="text-xl italic leading-relaxed md:text-2xl">&ldquo;{quote}&rdquo;</blockquote>
                  {author && (
                    <p className={`mt-6 ${background === 'muted' || background === 'background' ? 'text-muted-foreground' : 'text-white/80'}`}>
                      {author}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'cta') {
          const heading = typeof block.heading === 'string' ? block.heading : ''
          if (!heading) return null
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const background = typeof block.background === 'string' ? block.background : 'brand'
          const isBrandBackground = background === 'brand'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.brand
          const headingClass = isBrandBackground ? 'text-white' : 'text-foreground'
          const subheadingClass = isBrandBackground ? 'text-white/80' : 'text-muted-foreground'
          const buttons = normalizeButtons(block.buttons)

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4 text-center">
                <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>
                {subheading && <p className={`mx-auto mb-8 max-w-3xl text-lg ${subheadingClass}`}>{subheading}</p>}
                <div className="flex flex-wrap justify-center gap-4">
                  {renderButtons(buttons, isBrandBackground ? { hero: true } : undefined)}
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'trainingAreas') {
          const heading = typeof block.heading === 'string' ? block.heading : 'Training'
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const showAudience = Boolean(block.showAudience)
          const showCategoryDescriptions = block.showCategoryDescriptions !== false
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const headingClass = background === 'brand' ? 'text-white' : 'text-foreground'
          const subheadingClass = background === 'brand' ? 'text-white/80' : 'text-muted-foreground'
          const ctaLabel = typeof block.ctaLabel === 'string' ? block.ctaLabel : ''
          const ctaUrl = typeof block.ctaUrl === 'string' ? block.ctaUrl : ''
          const bottomNote = typeof block.bottomNote === 'string' ? block.bottomNote : ''

          const grouped = trainingAreas.reduce(
            (acc, area) => {
              if (!acc[area.category]) acc[area.category] = []
              acc[area.category].push(area)
              return acc
            },
            {} as Record<string, TrainingAreaDoc[]>,
          )

          const overrides = Array.isArray(block.categoryOverrides)
            ? block.categoryOverrides.reduce(
                (acc, entry) => {
                  const override = entry as {
                    key?: string
                    title?: string
                    description?: string
                    icon?: string
                  }
                  if (!override.key) return acc
                  acc[override.key] = {
                    title: override.title || CATEGORY_DEFAULTS[override.key]?.title || override.key,
                    description:
                      override.description ||
                      CATEGORY_DEFAULTS[override.key]?.description ||
                      '',
                    icon: override.icon || CATEGORY_DEFAULTS[override.key]?.icon || 'Users',
                  }
                  return acc
                },
                {} as Record<string, { title: string; description: string; icon: string }>,
              )
            : {}

          const orderedCategories = CATEGORY_ORDER.filter((category) => grouped[category]?.length)

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>
                  {subheading && <p className={`mx-auto max-w-3xl text-lg ${subheadingClass}`}>{subheading}</p>}
                </div>

                {orderedCategories.map((categoryKey) => {
                  const defaults = CATEGORY_DEFAULTS[categoryKey]
                  const category = overrides[categoryKey] ?? defaults
                  if (!category) return null

                  const Icon = getIcon(category.icon)
                  return (
                    <div key={categoryKey} className="mb-16 last:mb-0">
                      <div className="mb-8 flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold md:text-3xl ${headingClass}`}>{category.title}</h3>
                          {showCategoryDescriptions && (
                            <p className={subheadingClass}>{category.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {grouped[categoryKey].map((area) => (
                          <Link
                            key={area.id}
                            href={`/training/${area.slug}`}
                            className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                          >
                            <h4 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                              {area.title}
                            </h4>
                            {showAudience && area.audience && (
                              <p className="text-sm text-muted-foreground">{area.audience}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {(bottomNote || (ctaLabel && ctaUrl)) && (
                  <div className="mt-10 text-center">
                    {bottomNote && <p className={`mb-4 ${subheadingClass}`}>{bottomNote}</p>}
                    {ctaLabel && ctaUrl && (
                      <Button asChild variant="outline">
                        <Link href={ctaUrl}>
                          {ctaLabel}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </section>
          )
        }

        if (block.blockType === 'testimonialsFeed') {
          const heading = typeof block.heading === 'string' ? block.heading : 'Testimonials'
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const limit = typeof block.limit === 'number' ? block.limit : 50
          const showFeedbackCta = block.showFeedbackCta !== false
          const feedbackTitle =
            typeof block.feedbackTitle === 'string' ? block.feedbackTitle : 'Share Your Feedback'
          const feedbackText =
            typeof block.feedbackText === 'string'
              ? block.feedbackText
              : "If you'd like to share feedback about your experience working with me, I'd love to hear from you."
          const feedbackButtonLabel =
            typeof block.feedbackButtonLabel === 'string' ? block.feedbackButtonLabel : 'Submit Feedback'
          const showBottomCta = Boolean(block.showBottomCta)
          const bottomCtaHeading = typeof block.bottomCtaHeading === 'string' ? block.bottomCtaHeading : ''
          const bottomCtaText = typeof block.bottomCtaText === 'string' ? block.bottomCtaText : ''
          const bottomCtaButtons = normalizeButtons(block.bottomCtaButtons)
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const headingClass = background === 'brand' ? 'text-white' : 'text-foreground'
          const subheadingClass = background === 'brand' ? 'text-white/80' : 'text-muted-foreground'
          const visibleTestimonials = testimonials.slice(0, Math.max(0, limit))

          return (
            <section key={index} className={sectionBg}>
              <div className="container mx-auto px-4 py-16">
                {(heading || subheading) && (
                  <div className="mb-10 text-center">
                    {heading && <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>}
                    {subheading && <p className={`mx-auto max-w-3xl text-lg ${subheadingClass}`}>{subheading}</p>}
                  </div>
                )}

                <div className="mx-auto max-w-4xl space-y-8">
                  {visibleTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="relative rounded-2xl border border-border bg-card p-8 md:p-10">
                      <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />
                      <blockquote className="relative">
                        <p className="whitespace-pre-line leading-relaxed text-foreground">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <footer className="mt-6 border-t border-border pt-6">
                          <cite className="not-italic">
                            <span className="font-semibold text-foreground">{testimonial.author}</span>
                            <span className="text-muted-foreground"> — {testimonial.role}</span>
                          </cite>
                        </footer>
                      </blockquote>
                    </div>
                  ))}
                </div>

                {showFeedbackCta && (
                  <div className="mt-16 rounded-2xl bg-muted/30 p-10 text-center">
                    <h3 className="mb-4 text-2xl font-bold text-foreground">{feedbackTitle}</h3>
                    <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">{feedbackText}</p>
                    <Button asChild>
                      <a href={siteData.settings.feedbackFormUrl} target="_blank" rel="noopener noreferrer">
                        {feedbackButtonLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}

                {showBottomCta && (
                  <div className="mt-16 rounded-2xl bg-[#0a2540] p-10 text-center text-white">
                    {bottomCtaHeading && <h3 className="mb-4 text-3xl font-bold">{bottomCtaHeading}</h3>}
                    {bottomCtaText && <p className="mx-auto mb-8 max-w-2xl text-white/80">{bottomCtaText}</p>}
                    <div className="flex flex-wrap justify-center gap-4">{renderButtons(bottomCtaButtons, { hero: true })}</div>
                  </div>
                )}
              </div>
            </section>
          )
        }

        if (block.blockType === 'pricingTable') {
          const heading = typeof block.heading === 'string' ? block.heading : 'Pricing'
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const categories = Array.isArray(block.categories) ? block.categories : []
          const additionalCostsHeading =
            typeof block.additionalCostsHeading === 'string'
              ? block.additionalCostsHeading
              : 'Additional Costs'
          const additionalCosts = Array.isArray(block.additionalCosts) ? block.additionalCosts : []
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const headingClass = background === 'brand' ? 'text-white' : 'text-foreground'
          const subheadingClass = background === 'brand' ? 'text-white/80' : 'text-muted-foreground'

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                  <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>
                  {subheading && <p className={`mx-auto max-w-3xl text-lg ${subheadingClass}`}>{subheading}</p>}
                </div>

                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                  {categories.map((category, categoryIndex) => {
                    const item = category as {
                      category?: string
                      items?: Array<{ name?: string; price?: string; note?: string }>
                    }
                    const categoryName = item.category ?? 'Category'
                    const Icon = PRICING_CATEGORY_ICON_MAP[categoryName] ?? Briefcase
                    const rows = Array.isArray(item.items) ? item.items : []

                    return (
                      <div key={`${categoryName}-${categoryIndex}`} className="rounded-2xl border border-border bg-card p-8">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">{categoryName}</h3>
                        </div>
                        <div className="space-y-4">
                          {rows.map((row, rowIndex) => (
                            <div
                              key={`${row.name || 'item'}-${rowIndex}`}
                              className="border-t border-border pt-4 first:border-t-0 first:pt-0"
                            >
                              <div className="mb-1 flex items-baseline justify-between gap-4">
                                <h4 className="font-medium text-foreground">{row.name}</h4>
                                <span className="whitespace-nowrap text-2xl font-bold text-primary">{row.price}</span>
                              </div>
                              {row.note && <p className="text-sm text-muted-foreground">{row.note}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {additionalCosts.length > 0 && (
                  <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-muted/30 p-8">
                    <h3 className="mb-6 text-center text-2xl font-bold text-foreground">{additionalCostsHeading}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {additionalCosts.map((cost, costIndex) => {
                        const text = (cost as { text?: string }).text
                        if (!text) return null
                        const Icon = ADDITIONAL_COST_ICONS[costIndex % ADDITIONAL_COST_ICONS.length]
                        return (
                          <div key={text} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="text-sm text-foreground">{text}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )
        }

        if (block.blockType === 'contactSection') {
          const heading = typeof block.heading === 'string' ? block.heading : 'Get in Touch'
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const showContactInfo = block.showContactInfo !== false
          const showForm = block.showForm !== false
          const contactInfoTitle =
            typeof block.contactInfoTitle === 'string' ? block.contactInfoTitle : 'Contact Information'
          const availabilityHeading =
            typeof block.availabilityHeading === 'string' ? block.availabilityHeading : 'Availability'
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                {(heading || subheading) && (
                  <div className="mb-10 text-center">
                    <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${background === 'brand' ? 'text-white' : 'text-foreground'}`}>
                      {heading}
                    </h2>
                    {subheading && (
                      <p className={`mx-auto max-w-2xl text-lg ${background === 'brand' ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {subheading}
                      </p>
                    )}
                  </div>
                )}

                <div className={`grid gap-12 ${showContactInfo && showForm ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
                  {showContactInfo && (
                    <div className={showForm ? 'lg:col-span-1' : 'lg:col-span-1'}>
                      <div className="sticky top-24 rounded-2xl border border-border bg-card p-8">
                        <h3 className="mb-6 text-xl font-bold text-foreground">{contactInfoTitle}</h3>
                        <div className="space-y-4">
                          <a
                            href={`mailto:${siteData.settings.email}`}
                            className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                          >
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <span>{siteData.settings.email}</span>
                          </a>
                          <a
                            href={`tel:${siteData.settings.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                          >
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <span>{siteData.settings.phone}</span>
                          </a>
                          <a
                            href={siteData.settings.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                          >
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Linkedin className="h-5 w-5 text-primary" />
                            </div>
                            <span>LinkedIn</span>
                          </a>
                        </div>
                        <div className="mt-8 border-t border-border pt-8">
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="mb-1 font-medium text-foreground">{availabilityHeading}</h4>
                              <p className="text-sm text-muted-foreground">{siteData.settings.availabilityText}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showForm && (
                    <div className={showContactInfo ? 'lg:col-span-2' : 'mx-auto max-w-4xl'}>
                      <ContactForm />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        }

        if (block.blockType === 'steps') {
          const heading = typeof block.heading === 'string' ? block.heading : ''
          const subheading = typeof block.subheading === 'string' ? block.subheading : ''
          const columns = typeof block.columns === 'string' ? block.columns : '4'
          const gridColumns = columnsClassMap[columns] ?? columnsClassMap['4']
          const steps = Array.isArray(block.steps) ? block.steps : []
          const background = typeof block.background === 'string' ? block.background : 'background'
          const sectionBg = backgroundClassMap[background] ?? backgroundClassMap.background
          const headingClass = background === 'brand' ? 'text-white' : 'text-foreground'
          const subheadingClass = background === 'brand' ? 'text-white/80' : 'text-muted-foreground'

          return (
            <section key={index} className={`py-16 ${sectionBg}`}>
              <div className="container mx-auto px-4">
                {(heading || subheading) && (
                  <div className="mb-12 text-center">
                    {heading && <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${headingClass}`}>{heading}</h2>}
                    {subheading && <p className={`mx-auto max-w-3xl text-lg ${subheadingClass}`}>{subheading}</p>}
                  </div>
                )}

                <div className={`mx-auto grid max-w-5xl gap-6 ${gridColumns}`}>
                  {steps.map((step, stepIndex) => {
                    const item = step as { title?: string; description?: string; icon?: string }
                    const Icon = getIcon(item.icon)

                    return (
                      <div key={`${item.title || 'step'}-${stepIndex}`} className="text-center">
                        <div className="mx-auto mb-4 w-fit rounded-full bg-primary/10 p-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="mb-1 text-sm text-muted-foreground">Step {stepIndex + 1}</div>
                        <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        }

        return null
      })}
    </div>
  )
}

import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

type RawMenuItem = {
  label?: string | null
  linkType?: 'page' | 'custom' | null
  page?: unknown
  url?: string | null
  openInNewTab?: boolean | null
  children?: RawMenuItem[] | null
  childItems?: RawMenuItem[] | null
  subItems?: RawMenuItem[] | null
}

type RawFooterColumn = {
  title?: string | null
  items?: RawMenuItem[] | null
}

export type ResolvedMenuItem = {
  label: string
  href: string
  openInNewTab?: boolean
  children?: ResolvedMenuItem[]
}

export type FooterMenuColumn = {
  title: string
  items: ResolvedMenuItem[]
}

export type SiteSettingsData = {
  logoUrl: string
  defaultHeroImageUrl: string
  footerDescription: string
  email: string
  phone: string
  linkedinUrl: string
  availabilityText: string
  feedbackFormUrl: string
}

export type SiteData = {
  settings: SiteSettingsData
  headerMenu: ResolvedMenuItem[]
  footerColumns: FooterMenuColumn[]
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  logoUrl: '/icon.png',
  defaultHeroImageUrl: '',
  footerDescription:
    'Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families.',
  email: 'Justin.Axon@outlook.com',
  phone: '07534 845 636',
  linkedinUrl: 'https://www.linkedin.com/in/justinaxon/',
  availabilityText:
    'I offer weekday sessions and limited weekend availability for community providers. I aim to respond to enquiries within 48 hours.',
  feedbackFormUrl: 'https://forms.office.com/r/8r4t69HCeN',
}

const DEFAULT_HEADER_MENU: ResolvedMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  {
    label: 'Training',
    href: '/training',
    children: [
      {
        label: 'Education',
        href: '/training',
        children: [
          { label: 'Early Years', href: '/training/early-years' },
          { label: 'Primary', href: '/training/primary' },
          { label: 'Secondary', href: '/training/secondary' },
          { label: 'Special Schools', href: '/training/special-schools' },
          { label: 'Post-16', href: '/training/post-16' },
          { label: 'Alternative Provision', href: '/training/alternative-provision' },
        ],
      },
      {
        label: 'Public Sector, Health & Social Care',
        href: '/training',
        children: [
          { label: 'Local Authority Services', href: '/training/local-authority' },
          { label: 'Health & Clinical Services', href: '/training/health-clinical' },
          { label: 'Social Care, Residential & Fostering', href: '/training/social-care' },
        ],
      },
      {
        label: 'Activity, Youth & Community',
        href: '/training',
        children: [
          { label: 'Out-of-School Activity Providers', href: '/training/activity-providers' },
          { label: 'Family & Community Hubs', href: '/training/family-community' },
        ],
      },
      { label: 'Emergency & Frontline Services', href: '/training/emergency-services' },
      { label: 'Customer Experience & Public-Facing Teams', href: '/training/customer-experience' },
      { label: 'Parents & Carers', href: '/training/parents-carers' },
      { label: 'Corporate & Business', href: '/training/corporate-business' },
      { label: 'Supply, Staffing & Workforce Agencies', href: '/training/workforce-agencies' },
    ],
  },
  {
    label: 'Consultancy',
    href: '/consultancy',
    children: [
      { label: 'Audits & Reviews', href: '/consultancy#audits' },
      { label: 'Coaching & Culture Development', href: '/consultancy#coaching' },
      { label: 'Policy Development', href: '/consultancy#policy' },
      { label: 'Action Planning', href: '/consultancy#action-planning' },
      { label: 'Monitoring & Evaluation', href: '/consultancy#monitoring' },
      { label: 'Project Work', href: '/consultancy#project-work' },
    ],
  },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

const DEFAULT_FOOTER_COLUMNS: FooterMenuColumn[] = [
  {
    title: 'Quick Links',
    items: [
      { label: 'About Me', href: '/about' },
      { label: 'Training', href: '/training' },
      { label: 'Consultancy', href: '/consultancy' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Training Areas',
    items: [
      { label: 'Early Years', href: '/training/early-years' },
      { label: 'Primary Schools', href: '/training/primary' },
      { label: 'Secondary Schools', href: '/training/secondary' },
      { label: 'Health & Clinical', href: '/training/health-clinical' },
      { label: 'Corporate & Business', href: '/training/corporate-business' },
    ],
  },
]

const getPathFromRelation = (relation: unknown): string | null => {
  if (!relation || typeof relation !== 'object') return null
  const pathValue = (relation as { path?: unknown }).path
  return typeof pathValue === 'string' ? pathValue : null
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

const resolveMenuItem = (item: RawMenuItem): ResolvedMenuItem | null => {
  if (!item.label) return null

  const relatedPath = getPathFromRelation(item.page)
  const url = typeof item.url === 'string' ? item.url : null
  const href = item.linkType === 'page' ? relatedPath ?? url : url ?? relatedPath

  if (!href) return null

  const nestedRawItems = item.childItems ?? item.children ?? item.subItems ?? []
  const children =
    nestedRawItems
      ?.map(resolveMenuItem)
      .filter((child): child is ResolvedMenuItem => Boolean(child)) ?? []

  return {
    label: item.label,
    href,
    openInNewTab: Boolean(item.openInNewTab),
    children: children.length ? children : undefined,
  }
}

const toFooterColumns = (columns: RawFooterColumn[] | null | undefined): FooterMenuColumn[] => {
  if (!columns?.length) return DEFAULT_FOOTER_COLUMNS

  const resolved = columns
    .map((column) => {
      const items =
        column.items
          ?.map(resolveMenuItem)
          .filter((item): item is ResolvedMenuItem => Boolean(item)) ?? []

      if (!column.title || !items.length) return null

      return {
        title: column.title,
        items,
      }
    })
    .filter((column): column is FooterMenuColumn => Boolean(column))

  return resolved.length ? resolved : DEFAULT_FOOTER_COLUMNS
}

export const getSiteData = cache(async (): Promise<SiteData> => {
  try {
    const payload = await getPayload({ config })
    const [settingsRaw, navigationRaw] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'navigation', depth: 10 }),
    ])

    const settings: SiteSettingsData = {
      logoUrl: resolveMediaUrl((settingsRaw as { logo?: unknown })?.logo) || DEFAULT_SETTINGS.logoUrl,
      defaultHeroImageUrl:
        resolveMediaUrl((settingsRaw as { defaultHeroImage?: unknown })?.defaultHeroImage) ||
        DEFAULT_SETTINGS.defaultHeroImageUrl,
      footerDescription:
        typeof (settingsRaw as { footerDescription?: unknown })?.footerDescription === 'string'
          ? ((settingsRaw as { footerDescription?: string }).footerDescription as string)
          : DEFAULT_SETTINGS.footerDescription,
      email:
        typeof (settingsRaw as { email?: unknown })?.email === 'string'
          ? ((settingsRaw as { email?: string }).email as string)
          : DEFAULT_SETTINGS.email,
      phone:
        typeof (settingsRaw as { phone?: unknown })?.phone === 'string'
          ? ((settingsRaw as { phone?: string }).phone as string)
          : DEFAULT_SETTINGS.phone,
      linkedinUrl:
        typeof (settingsRaw as { linkedinUrl?: unknown })?.linkedinUrl === 'string'
          ? ((settingsRaw as { linkedinUrl?: string }).linkedinUrl as string)
          : DEFAULT_SETTINGS.linkedinUrl,
      availabilityText:
        typeof (settingsRaw as { availabilityText?: unknown })?.availabilityText === 'string'
          ? ((settingsRaw as { availabilityText?: string }).availabilityText as string)
          : DEFAULT_SETTINGS.availabilityText,
      feedbackFormUrl:
        typeof (settingsRaw as { feedbackFormUrl?: unknown })?.feedbackFormUrl === 'string'
          ? ((settingsRaw as { feedbackFormUrl?: string }).feedbackFormUrl as string)
          : DEFAULT_SETTINGS.feedbackFormUrl,
    }

    const headerMenu =
      (navigationRaw as { headerMenu?: RawMenuItem[] | null })?.headerMenu
        ?.map(resolveMenuItem)
        .filter((item): item is ResolvedMenuItem => Boolean(item)) ?? []

    return {
      settings,
      headerMenu: headerMenu.length ? headerMenu : DEFAULT_HEADER_MENU,
      footerColumns: toFooterColumns(
        (navigationRaw as { footerColumns?: RawFooterColumn[] | null })?.footerColumns,
      ),
    }
  } catch {
    return {
      settings: DEFAULT_SETTINGS,
      headerMenu: DEFAULT_HEADER_MENU,
      footerColumns: DEFAULT_FOOTER_COLUMNS,
    }
  }
})

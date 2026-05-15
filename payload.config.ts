import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionAfterChangeHook } from 'payload'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { TrainingAreas } from './collections/TrainingAreas'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SECTOR_LABELS: Record<string, string> = {
  'early-years': 'Early Years',
  primary: 'Primary Schools',
  secondary: 'Secondary Schools',
  'special-schools': 'Special Schools',
  'post-16': 'Post-16',
  'alternative-provision': 'Alternative Provision',
  'local-authority': 'Local Authority Services',
  'health-clinical': 'Health & Clinical Services',
  'social-care': 'Social Care, Residential & Fostering',
  'activity-providers': 'Activity Providers',
  'family-community': 'Family & Community Hubs',
  'emergency-services': 'Emergency & Frontline Services',
  'customer-experience': 'Customer Experience & Public-Facing',
  'parents-carers': 'Parents & Carers',
  'corporate-business': 'Corporate & Business',
  'workforce-agencies': 'Supply, Staffing & Workforce Agencies',
  other: 'Other',
}

const contactNotificationHook: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return

  const submissionData = (doc.submissionData || []) as Array<{ field: string; value: string }>
  const get = (field: string) => submissionData.find((d) => d.field === field)?.value || ''

  const name = get('name') || 'Unknown'
  const organisation = get('organisation')
  const email = get('email')
  const phone = get('phone')
  const service = get('service')
  const sector = get('sector')
  const message = get('message')
  const preferredContact = get('preferredContact')

  const sectorLabel = SECTOR_LABELS[sector] || sector || '—'
  const serviceLabel = service ? service.charAt(0).toUpperCase() + service.slice(1) : '—'

  const notifyAddress = process.env.CONTACT_NOTIFY_EMAIL || 'Justin.Axon@outlook.com'

  try {
    await req.payload.sendEmail({
      to: notifyAddress,
      subject: `New enquiry from ${name}`,
      html: `
        <h2>New enquiry via justinaxontraining.co.uk</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          ${organisation ? `<tr><td><strong>Organisation</strong></td><td>${organisation}</td></tr>` : ''}
          <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          <tr><td><strong>Service</strong></td><td>${serviceLabel}</td></tr>
          <tr><td><strong>Sector</strong></td><td>${sectorLabel}</td></tr>
          ${preferredContact ? `<tr><td><strong>Preferred contact times</strong></td><td>${preferredContact}</td></tr>` : ''}
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
        <p style="margin-top:16px;font-size:12px;color:#666">
          View all submissions in the
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/form-submissions">Payload admin</a>.
        </p>
      `,
    })
  } catch (e) {
    req.payload.logger.error(`Failed to send contact notification email: ${e}`)
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  collections: [Users, Media, Pages, TrainingAreas, Testimonials],
  globals: [SiteSettings, Navigation],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        number: false,
        checkbox: false,
        message: false,
        payment: false,
      },
      formOverrides: {
        access: {
          read: () => true,
        },
      },
      formSubmissionOverrides: {
        admin: {
          useAsTitle: 'createdAt',
          defaultColumns: ['createdAt', 'form'],
          description: 'Form submissions from the website contact form.',
        },
        access: {
          create: () => true,
          read: ({ req }) => !!req.user,
          update: ({ req }) => !!req.user,
          delete: ({ req }) => !!req.user,
        },
        hooks: {
          afterChange: [contactNotificationHook],
        },
      },
    }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        const title = (doc as { title?: string }).title
        return title ? `${title} | Justin Axon Training & Consultancy` : 'Justin Axon Training & Consultancy'
      },
      generateDescription: ({ doc }) => {
        return (doc as { meta?: { description?: string } }).meta?.description || ''
      },
      generateURL: ({ doc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://justinaxontraining.co.uk'
        const docPath = (doc as { path?: string }).path || '/'
        return `${baseUrl}${docPath}`
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'noreply@justinaxontraining.co.uk',
    defaultFromName: 'Justin Axon Training',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

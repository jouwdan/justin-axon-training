import { Metadata } from 'next'
import { Mail, Phone, Linkedin, Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/contact-form'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Get in Touch | Justin Axon Training & Consultancy',
  description: "I'm happy to have a short, no-pressure conversation to explore what would help your team most.",
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' }) as any

  const email = settings?.email || 'Justin.Axon@outlook.com'
  const phone = settings?.phone || '07534 845 636'
  const linkedinUrl = settings?.linkedinUrl || 'https://www.linkedin.com/in/justinaxon/'
  const availabilityText = settings?.availabilityText || 'I offer weekday sessions and limited weekend availability for community providers. I aim to respond to enquiries within 48 hours.'

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Get in Touch"
        subtitle="I'm happy to have a short, no-pressure conversation to explore what would help your team most."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-8 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span>{email}</span>
                  </a>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span>{phone}</span>
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Availability</h3>
                      <p className="text-sm text-muted-foreground">{availabilityText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

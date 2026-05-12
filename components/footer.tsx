import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Linkedin } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function Footer() {
  let email = 'Justin.Axon@outlook.com'
  let phone = '07534 845 636'
  let linkedinUrl = 'https://www.linkedin.com/in/justinaxon/'

  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' }) as any
    if (settings?.email) email = settings.email
    if (settings?.phone) phone = settings.phone
    if (settings?.linkedinUrl) linkedinUrl = settings.linkedinUrl
  } catch {
    // use fallback values above if Payload not yet configured
  }

  return (
    <footer className="bg-[#0a2540] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/text-white%404x-CvcgH0Z7vYRujMzrsCLu0YGd0YepAG.png"
              alt="Justin Axon Training & Consultancy Ltd"
              width={200}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Me' },
                { href: '/training', label: 'Training' },
                { href: '/consultancy', label: 'Consultancy' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/pricing', label: 'Pricing' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Areas */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Training Areas</h3>
            <ul className="space-y-2">
              {[
                { href: '/training/early-years', label: 'Early Years' },
                { href: '/training/primary', label: 'Primary Schools' },
                { href: '/training/secondary', label: 'Secondary Schools' },
                { href: '/training/health-clinical', label: 'Health & Clinical' },
                { href: '/training/corporate-business', label: 'Corporate & Business' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Justin Axon Training & Consultancy Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

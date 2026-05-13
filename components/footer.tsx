import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Linkedin } from 'lucide-react'
import type { FooterMenuColumn, SiteSettingsData } from '@/lib/site-data'

interface FooterProps {
  settings: SiteSettingsData
  footerColumns: FooterMenuColumn[]
}

export function Footer({ settings, footerColumns }: FooterProps) {
  return (
    <footer className="bg-[#0a2540] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src={settings.logoUrl}
              alt="Justin Axon Training & Consultancy Ltd"
              width={200}
              height={60}
              className="mb-4 h-12 w-auto"
              unoptimized
            />
            <p className="text-sm leading-relaxed text-white/70">{settings.footerDescription}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? '_blank' : undefined}
                      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Justin Axon Training & Consultancy Ltd. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-white/30">
            Built with ❤️ by{' '}
            <a
              href="https://jouwdan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/60"
            >
              Jordan Harrison
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

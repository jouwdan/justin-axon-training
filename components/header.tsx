"use client"

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResolvedMenuItem } from '@/lib/site-data'

const FALLBACK_MENU: ResolvedMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Me', href: '/about' },
  { label: 'Training', href: '/training' },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

interface HeaderProps {
  variant?: 'transparent' | 'solid'
  menuItems?: ResolvedMenuItem[]
  logoUrl?: string
  logoAlt?: string
}

export function Header({
  variant = 'transparent',
  menuItems,
  logoUrl = '/icon.png',
  logoAlt = 'Justin Axon Training & Consultancy Ltd',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)
  const [scrolled, setScrolled] = React.useState(false)
  const items = menuItems?.length ? menuItems : FALLBACK_MENU
  const isTransparent = variant === 'transparent'

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const useDarkStyle = isTransparent || scrolled

  return (
    <header
      className={cn(
        'left-0 right-0 top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'fixed bg-[#0a2540]/85 backdrop-blur-md shadow-lg'
          : isTransparent
            ? 'absolute bg-transparent'
            : 'fixed border-b border-border bg-background',
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={200}
            height={50}
            className="h-10 w-auto"
            unoptimized
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item, index) => {
            const isCtaItem = index === items.length - 1 && !item.children?.length
            return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children?.length && setOpenDropdown(item.label)}
              onMouseLeave={() => {
                setOpenDropdown(null)
                setOpenSubmenu(null)
              }}
            >
              <Link
                href={item.href}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center gap-1 rounded-lg text-sm font-medium transition-colors',
                  isCtaItem
                    ? cn('px-5 py-2.5', useDarkStyle
                        ? 'bg-white text-[#0a2540] hover:bg-white/90'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90')
                    : cn('px-4 py-2', useDarkStyle
                        ? 'text-white hover:text-white/80'
                        : 'text-foreground/80 hover:text-primary'),
                  !isCtaItem && openDropdown === item.label && (useDarkStyle ? 'text-white/80' : 'text-primary'),
                )}
              >
                {item.label}
                {item.children?.length ? <ChevronDown className="h-4 w-4" /> : null}
              </Link>

              {item.children?.length && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[280px] rounded-lg border border-border bg-card p-2 shadow-lg">
                    {item.children.map((child) => (
                      <div
                        key={child.label}
                        className="relative"
                        onMouseEnter={() => child.children?.length && setOpenSubmenu(child.label)}
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        <Link
                          href={child.href}
                          target={child.openInNewTab ? '_blank' : undefined}
                          rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                        >
                          <span>{child.label}</span>
                          {child.children?.length ? <ChevronDown className="h-4 w-4 -rotate-90" /> : null}
                        </Link>

                        {child.children?.length && openSubmenu === child.label && (
                          <div className="absolute left-full top-0 ml-2">
                            <div className="min-w-[220px] rounded-lg border border-border bg-card p-2 shadow-lg">
                              {child.children.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  target={subItem.openInNewTab ? '_blank' : undefined}
                                  rel={subItem.openInNewTab ? 'noopener noreferrer' : undefined}
                                  className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )})}
        </nav>

        <button
          className={cn('p-2 lg:hidden', useDarkStyle ? 'text-white' : 'text-foreground')}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/20 bg-[#0a2540]/95 backdrop-blur lg:hidden">
          <nav className="container mx-auto px-4 py-4">
            {items.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onClose={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function MobileNavItem({ item, onClose }: { item: ResolvedMenuItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        target={item.openInNewTab ? '_blank' : undefined}
        rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
        className="block border-b border-white/10 py-3 text-white/90 hover:text-white"
        onClick={onClose}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-white/10">
      <button
        className="flex w-full items-center justify-between py-3 text-white/90 hover:text-white"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{item.label}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="pb-3 pl-4">
          {item.children.map((child) => (
            <div key={child.label}>
              {child.children?.length ? (
                <>
                  <button
                    className="flex w-full items-center justify-between py-2 text-sm text-white/70 hover:text-white"
                    onClick={() => setOpenSubmenu(openSubmenu === child.label ? null : child.label)}
                  >
                    <span>{child.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform',
                        openSubmenu === child.label && 'rotate-180',
                      )}
                    />
                  </button>
                  {openSubmenu === child.label && (
                    <div className="pl-4">
                      {child.children.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          target={subItem.openInNewTab ? '_blank' : undefined}
                          rel={subItem.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="block py-2 text-sm text-white/60 hover:text-white"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={child.href}
                  target={child.openInNewTab ? '_blank' : undefined}
                  rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block py-2 text-sm text-white/70 hover:text-white"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

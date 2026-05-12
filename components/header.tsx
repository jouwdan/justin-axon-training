"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const trainingDropdownItems = [
  {
    label: "Education",
    href: "#",
    children: [
      { label: "Early Years", href: "/training/early-years" },
      { label: "Primary", href: "/training/primary" },
      { label: "Secondary", href: "/training/secondary" },
      { label: "Special Schools", href: "/training/special-schools" },
      { label: "Post-16", href: "/training/post-16" },
      { label: "Alternative Provision", href: "/training/alternative-provision" },
    ],
  },
  {
    label: "Public Sector, Health & Social Care",
    href: "#",
    children: [
      { label: "Local Authority Services", href: "/training/local-authority" },
      { label: "Health & Clinical Services", href: "/training/health-clinical" },
      { label: "Social Care, Residential & Fostering", href: "/training/social-care" },
    ],
  },
  {
    label: "Activity, Youth & Community",
    href: "#",
    children: [
      { label: "Out-of-School Activity Providers", href: "/training/activity-providers" },
      { label: "Family & Community Hubs", href: "/training/family-community" },
    ],
  },
  { label: "Emergency & Frontline Services", href: "/training/emergency-services" },
  { label: "Customer Experience & Public-Facing Teams", href: "/training/customer-experience" },
  { label: "Parents & Carers", href: "/training/parents-carers" },
  { label: "Corporate & Business", href: "/training/corporate-business" },
  { label: "Supply, Staffing & Workforce Agencies", href: "/training/workforce-agencies" },
]

const consultancyDropdownItems = [
  { label: "Overview", href: "/consultancy" },
  { label: "Audits & Reviews", href: "/consultancy#audits" },
  { label: "Coaching & Supervision", href: "/consultancy#coaching" },
  { label: "Policy Development", href: "/consultancy#policy" },
  { label: "Action Planning", href: "/consultancy#action-planning" },
  { label: "Monitoring & Evaluation", href: "/consultancy#monitoring" },
  { label: "Project Work", href: "/consultancy#projects" },
]

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Training", href: "/training", dropdown: trainingDropdownItems },
  { label: "Consultancy", href: "/consultancy", dropdown: consultancyDropdownItems },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]

interface HeaderProps {
  variant?: "transparent" | "solid"
}

export function Header({ variant = "transparent" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

  const isTransparent = variant === "transparent"

  return (
    <header className={cn(
      "absolute top-0 left-0 right-0 z-50 w-full",
      isTransparent ? "bg-transparent" : "bg-background border-b border-border"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/text-white%404x-CvcgH0Z7vYRujMzrsCLu0YGd0YepAG.png"
            alt="Justin Axon Training & Consultancy Ltd"
            width={200}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => {
                setOpenDropdown(null)
                setOpenSubmenu(null)
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors",
                  isTransparent 
                    ? "text-white hover:text-white/80" 
                    : "text-foreground/80 hover:text-primary",
                  openDropdown === item.label && (isTransparent ? "text-white/80" : "text-primary")
                )}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="h-4 w-4" />}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[280px] rounded-lg border border-border bg-card p-2 shadow-lg">
                    {item.dropdown.map((dropItem) => (
                      <div
                        key={dropItem.label}
                        className="relative"
                        onMouseEnter={() =>
                          "children" in dropItem && setOpenSubmenu(dropItem.label)
                        }
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        {"children" in dropItem ? (
                          <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary cursor-default">
                            <span>{dropItem.label}</span>
                            <ChevronDown className="h-4 w-4 -rotate-90" />
                          </div>
                        ) : (
                          <Link
                            href={dropItem.href}
                            className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                          >
                            {dropItem.label}
                          </Link>
                        )}

                        {/* Submenu */}
                        {"children" in dropItem && openSubmenu === dropItem.label && (
                          <div className="absolute left-full top-0 ml-2">
                            <div className="min-w-[220px] rounded-lg border border-border bg-card p-2 shadow-lg">
                              {dropItem.children.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
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
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2",
            isTransparent ? "text-white" : "text-foreground"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-[#0a2540]/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
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

interface NavItem {
  label: string
  href: string
  dropdown?: Array<{
    label: string
    href: string
    children?: Array<{ label: string; href: string }>
  }>
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

  if (!item.dropdown) {
    return (
      <Link
        href={item.href}
        className="block py-3 text-white/90 hover:text-white border-b border-white/10"
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
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pb-3 pl-4">
          {item.dropdown.map((dropItem) => (
            <div key={dropItem.label}>
              {"children" in dropItem && dropItem.children ? (
                <>
                  <button
                    className="flex w-full items-center justify-between py-2 text-sm text-white/70 hover:text-white"
                    onClick={() => setOpenSubmenu(openSubmenu === dropItem.label ? null : dropItem.label)}
                  >
                    <span>{dropItem.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform",
                        openSubmenu === dropItem.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openSubmenu === dropItem.label && (
                    <div className="pl-4">
                      {dropItem.children.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
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
                  href={dropItem.href}
                  className="block py-2 text-sm text-white/70 hover:text-white"
                  onClick={onClose}
                >
                  {dropItem.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

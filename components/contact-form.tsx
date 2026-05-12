"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const serviceOptions = [
  { value: 'training', label: 'Training' },
  { value: 'consultancy', label: 'Consultancy' },
  { value: 'other', label: 'Other' },
]

const sectorOptions = [
  { value: 'early-years', label: 'Early Years' },
  { value: 'primary', label: 'Primary Schools' },
  { value: 'secondary', label: 'Secondary Schools' },
  { value: 'special-schools', label: 'Special Schools' },
  { value: 'post-16', label: 'Post-16' },
  { value: 'alternative-provision', label: 'Alternative Provision' },
  { value: 'local-authority', label: 'Local Authority Services' },
  { value: 'health-clinical', label: 'Health & Clinical Services' },
  { value: 'social-care', label: 'Social Care, Residential & Fostering' },
  { value: 'activity-providers', label: 'Activity Providers' },
  { value: 'family-community', label: 'Family & Community Hubs' },
  { value: 'emergency-services', label: 'Emergency & Frontline Services' },
  { value: 'customer-experience', label: 'Customer Experience & Public-Facing' },
  { value: 'parents-carers', label: 'Parents & Carers' },
  { value: 'corporate-business', label: 'Corporate & Business' },
  { value: 'workforce-agencies', label: 'Supply, Staffing & Workforce Agencies' },
  { value: 'other', label: 'Other' },
]

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    service: '',
    sector: '',
    message: '',
    preferredContact: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again or email directly.')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Thank You!</h2>
        <p className="text-muted-foreground mb-8">
          Your message has been received. I aim to respond to enquiries within 48 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/training">Explore Training</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/consultancy">View Consultancy</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            required
            value={formState.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organisation">Organisation / Role</Label>
          <Input
            id="organisation"
            value={formState.organisation}
            onChange={(e) => handleChange('organisation', e.target.value)}
            placeholder="Your organisation or role"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formState.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="service">Which service are you interested in?</Label>
          <Select value={formState.service} onValueChange={(value) => handleChange('service', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sector">Which sector?</Label>
          <Select value={formState.sector} onValueChange={(value) => handleChange('sector', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your sector" />
            </SelectTrigger>
            <SelectContent>
              {sectorOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Brief description of your needs *</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={formState.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Tell me a little about what you're looking for, including any specific focus areas or preferred dates..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredContact">Preferred contact times</Label>
        <Input
          id="preferredContact"
          value={formState.preferredContact}
          onChange={(e) => handleChange('preferredContact', e.target.value)}
          placeholder="e.g., Mornings, After 3pm, Anytime"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Sending...' : (
          <>
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  )
}

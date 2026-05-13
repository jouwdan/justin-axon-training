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

type FieldOption = { label: string; value: string; id?: string }

type FormField =
  | { blockType: 'text'; id?: string; name: string; label?: string; required?: boolean; width?: number; defaultValue?: string }
  | { blockType: 'email'; id?: string; name: string; label?: string; required?: boolean; width?: number }
  | { blockType: 'textarea'; id?: string; name: string; label?: string; required?: boolean; width?: number; rows?: number }
  | { blockType: 'select'; id?: string; name: string; label?: string; required?: boolean; width?: number; defaultValue?: string; options?: FieldOption[] }

export type FormDefinition = {
  id: string
  fields?: FormField[]
  submitButtonLabel?: string
}

interface ContactFormProps {
  form: FormDefinition
}

export function ContactForm({ form }: ContactFormProps) {
  const fields = (form.fields ?? []) as FormField[]

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [f.name, ('defaultValue' in f && f.defaultValue) ? f.defaultValue : ''])
    )
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submissionData = Object.entries(values)
        .filter(([, v]) => v.trim())
        .map(([field, value]) => ({ field, value }))

      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })

      if (!res.ok) throw new Error('Failed to submit. Please try again or email directly.')
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Thank You!</h2>
        <p className="mb-8 text-muted-foreground">
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

  // Group consecutive half-width fields into pairs for two-column layout
  const rows: FormField[][] = []
  let pair: FormField[] = []
  for (const field of fields) {
    const isHalf = (field.width ?? 100) <= 50
    if (isHalf) {
      pair.push(field)
      if (pair.length === 2) { rows.push([...pair]); pair = [] }
    } else {
      if (pair.length) { rows.push([...pair]); pair = [] }
      rows.push([field])
    }
  }
  if (pair.length) rows.push([...pair])

  const renderField = (field: FormField) => {
    const id = `field-${field.name}`
    const label = field.label || field.name
    const value = values[field.name] ?? ''

    if (field.blockType === 'select') {
      return (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={id}>{label}{field.required && ' *'}</Label>
          <Select value={value} onValueChange={(v) => handleChange(field.name, v)}>
            <SelectTrigger id={id}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (field.blockType === 'textarea') {
      return (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={id}>{label}{field.required && ' *'}</Label>
          <Textarea
            id={id}
            required={field.required}
            rows={field.rows ?? 5}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        </div>
      )
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={id}>{label}{field.required && ' *'}</Label>
        <Input
          id={id}
          type={field.blockType === 'email' ? 'email' : 'text'}
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {rows.map((row, i) => (
        <div key={i} className={row.length === 2 ? 'grid gap-6 md:grid-cols-2' : undefined}>
          {row.map((field) => renderField(field))}
        </div>
      ))}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Sending…' : (
          <>{form.submitButtonLabel || 'Send Message'}<Send className="ml-2 h-5 w-5" /></>
        )}
      </Button>
    </form>
  )
}

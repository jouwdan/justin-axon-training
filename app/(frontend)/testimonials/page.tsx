import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Testimonials | Justin Axon Training & Consultancy',
  description: "Real change is best shown by the people who experience it. Read testimonials from teams and leaders I've worked with.",
}

export default async function TestimonialsPage() {
  const payload = await getPayload({ config })
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    sort: 'order',
    limit: 50,
  })

  const settings = await payload.findGlobal({ slug: 'site-settings' }) as any
  const feedbackFormUrl = settings?.feedbackFormUrl || 'https://forms.office.com/r/8r4t69HCeN'

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Testimonials"
        subtitle="Real change is best shown by the people who experience it. Below are short extracts from the teams and leaders I've worked with."
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-2xl border border-border p-8 md:p-10 relative"
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                <blockquote className="relative">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-6 pt-6 border-t border-border">
                    <cite className="not-italic">
                      <span className="font-semibold text-foreground">{testimonial.author}</span>
                      <span className="text-muted-foreground"> — {testimonial.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Share Your Feedback</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you&apos;d like to share feedback about your experience working with me, I&apos;d love to hear from you.
          </p>
          <Button asChild>
            <a href={feedbackFormUrl} target="_blank" rel="noopener noreferrer">
              Submit Feedback
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-[#0a2540] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join the many teams who have transformed their practice with tailored training and consultancy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[#0a2540] hover:bg-white/90">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/training">Explore Training</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

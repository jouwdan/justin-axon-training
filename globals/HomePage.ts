import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    // Hero
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Creating emotionally safe, inclusive experiences',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'Training and consultancy that helps teams build confidence, understanding and emotionally safe practice — tailored to your people, your setting and your challenges.',
    },
    {
      name: 'heroImageUrl',
      type: 'text',
      defaultValue:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-only-MZLwnURIyegWpg5czkYni9Jgohgor4.png',
    },
    // What I Do
    {
      name: 'whatIDoTitle',
      type: 'text',
      defaultValue: 'What I Do',
    },
    {
      name: 'whatIDoParagraph1',
      type: 'textarea',
      defaultValue:
        'Every day, people with SEND and SEMH needs interact with education settings, public services, community organisations, emergency services, customer-facing environments and workplaces.',
    },
    {
      name: 'whatIDoParagraph2',
      type: 'textarea',
      defaultValue:
        'When teams feel confident, informed and supported, those interactions become safer, calmer and more meaningful for everyone involved.',
    },
    {
      name: 'whatIDoCardText',
      type: 'textarea',
      defaultValue:
        'I provide practical, strengths-based training and consultancy that helps teams to understand behaviour, communication and emotional safety through a neurodivergent-affirming lens. Everything is grounded in real-world practice and designed for busy professionals who need strategies they can use straight away.',
    },
    // Who I Work With
    {
      name: 'whoIWorkWithTitle',
      type: 'text',
      defaultValue: 'Who I Work With',
    },
    {
      name: 'whoIWorkWithSubtitle',
      type: 'text',
      defaultValue: 'My training supports and compliments teams across a wide range of sectors',
    },
    {
      name: 'sectors',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Graduation Cap', value: 'GraduationCap' },
            { label: 'Building', value: 'Building2' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Users', value: 'Users' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Briefcase', value: 'Briefcase' },
            { label: 'Home', value: 'Home' },
          ],
        },
      ],
    },
    {
      name: 'whoIWorkWithNote',
      type: 'text',
      defaultValue: 'Plus: Parents & Carers, Recruitment & Workforce Agencies',
    },
    // Why Choose Me
    {
      name: 'whyChooseMeTitle',
      type: 'text',
      defaultValue: 'Why Choose Me',
    },
    {
      name: 'whyChooseItems',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'whyChooseMeQuote',
      type: 'textarea',
      defaultValue:
        'I help teams feel confident so everyday interactions become safer, calmer and more meaningful.',
    },
    {
      name: 'whyChooseMeQuoteAuthor',
      type: 'text',
      defaultValue: '— Justin Axon',
    },
    // CTA
    {
      name: 'ctaTitle',
      type: 'text',
      defaultValue: "Ready to Transform Your Team's Practice?",
    },
    {
      name: 'ctaSubtitle',
      type: 'textarea',
      defaultValue:
        "I'm happy to have a short, no-pressure conversation to explore what would help your team most.",
    },
  ],
}

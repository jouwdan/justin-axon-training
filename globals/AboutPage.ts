import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    { name: 'heroTitle', type: 'text', defaultValue: 'About Me' },
    {
      name: 'heroSubtitle',
      type: 'text',
      defaultValue:
        'Relational, strengths-based and neurodivergent-affirming training and consultancy.',
    },
    {
      name: 'photoUrl',
      type: 'text',
      defaultValue:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/justin-axon-5K7bLM5b07PkbEeqIFxp8FONZLEyna.png',
    },
    {
      name: 'bio1',
      type: 'textarea',
      defaultValue:
        "I'm Justin Axon — a trainer, consultant and Senior Leader with twenty years' hands-on experience supporting children and young people with SEND and their families.",
    },
    {
      name: 'bio2',
      type: 'textarea',
      defaultValue:
        "My career began in early years and out-of-school provision and has taken me through schools, post-16 settings and local authority teams, including Rochdale's Early Help and Children with Disabilities services. I combine frontline practice with senior leadership at Redwood School and independent consultancy through Justin Axon Training & Consultancy Ltd.",
    },
    {
      name: 'bio3',
      type: 'textarea',
      defaultValue:
        'I also serve as a Trustee at YourTrust Rochdale, helping shape community services that promote wellbeing and opportunity.',
    },
    { name: 'valuesTitle', type: 'text', defaultValue: 'Values & Ethos' },
    {
      name: 'valuesText',
      type: 'textarea',
      defaultValue:
        'Relational, strengths-based and neurodivergent-affirming. I prioritise emotional safety, collaboration and practical solutions that respect identity, autonomy and lived experience rather than box-ticking.',
    },
    { name: 'guidingPrinciplesTitle', type: 'text', defaultValue: 'What Guides My Work' },
    {
      name: 'guidingPrinciples',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Eye', value: 'Eye' },
            { label: 'Brain', value: 'Brain' },
            { label: 'Heart', value: 'Heart' },
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'Message Circle', value: 'MessageCircle' },
            { label: 'Users', value: 'Users' },
            { label: 'Shield', value: 'Shield' },
          ],
        },
      ],
    },
    {
      name: 'guidingPrinciplesNote',
      type: 'textarea',
      defaultValue:
        'Wherever people interact — in classrooms, homes, workplaces, public spaces or high-pressure environments — I help teams build confidence, understanding and emotionally safe practice.',
    },
    { name: 'howIWorkTitle', type: 'text', defaultValue: 'How I Work' },
    {
      name: 'howIWork1',
      type: 'textarea',
      defaultValue:
        'Everything I deliver is tailored to your sector, your challenges and your people. Sessions are interactive and accessible, designed for mixed-experience groups and focused on practical approaches staff can use straight away.',
    },
    {
      name: 'howIWork2',
      type: 'textarea',
      defaultValue:
        'Consultancy and leadership support help organisations embed long-term, sustainable change rather than offering one-off fixes.',
    },
    {
      name: 'howIWork3',
      type: 'textarea',
      defaultValue:
        'My style is warm and collaborative: I listen first, build on strengths, and co-produce solutions with teams and families.',
    },
    {
      name: 'howIWorkQuote',
      type: 'textarea',
      defaultValue:
        'I help teams feel confident so everyday interactions become safer, calmer and more meaningful.',
    },
    { name: 'fullBioTitle', type: 'text', defaultValue: 'Full Bio' },
    {
      name: 'fullBio1',
      type: 'textarea',
      defaultValue:
        "I started my career on the floor of early years settings and in community activity provision, learning how small changes in adult responses can transform a child's day. Over two decades I've worked in nurseries, schools, post-16 settings and within local authority teams, gaining a practical understanding of how systems, teams and families intersect.",
    },
    {
      name: 'fullBio2',
      type: 'textarea',
      defaultValue:
        'As a Senior Leader at Redwood School I lead multi-site teams, develop inclusive practice and build community partnerships. Through my consultancy I bring that experience into schools, public services and organisations, delivering training and support that is realistic for busy professionals.',
    },
    {
      name: 'fullBio3',
      type: 'textarea',
      defaultValue:
        'I value collaboration, accessibility and emotional safety, and I refuse to deliver one-size-fits-all solutions.',
    },
  ],
}

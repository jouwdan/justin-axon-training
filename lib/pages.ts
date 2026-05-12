import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedPages } from '@/lib/seed-data'

export const normalizePath = (rawPath: string): string => {
  if (!rawPath) return '/'
  if (rawPath === '/') return '/'

  const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash
}

export const getPageByPath = cache(async (path: string) => {
  const normalizedPath = normalizePath(path)

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: {
        and: [{ path: { equals: normalizedPath } }, { published: { equals: true } }],
      },
      depth: 2,
      limit: 1,
    })

    if (docs[0]) return docs[0]
  } catch {
    // fall through to seed fallback below
  }

  const fallback = seedPages.find((page) => normalizePath(page.path) === normalizedPath)
  if (!fallback) return null

  return {
    ...fallback,
    published: true,
  }
})

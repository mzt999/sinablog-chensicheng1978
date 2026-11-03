import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod' // or 'zod/v3' if your setup exposes this subpath

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        slug: z.string(),
        tags: z.array(z.string()).default([]),
        categories: z.array(z.string()).default([]),
      }),
    }),
  },
})

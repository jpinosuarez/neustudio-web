import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolioCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      client: z.string().min(1),
      shortDescription: z.string().min(1).max(200),
      description: z.string().min(1),
      category: z.enum([
        'Ecommerce',
        'Lead Gen',
        'Landing Page',
        'Corporate Site',
        'Booking / SaaS',
        'Multi-language Platform',
      ]),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
            description: z.string(),
          })
        )
        .min(1)
        .max(4),
      image: image(),
      imageAlt: z.string().min(1),
      lang: z.enum(['es', 'en', 'de']),
      tags: z.array(z.string()).default([]),
      publishedDate: z.date().optional(),
      url: z.string().url().optional(),
      featured: z.boolean().default(false),
      seoDescription: z.string().max(160).optional(),
    }),
});

export const collections = { portfolio: portfolioCollection };
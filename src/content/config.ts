import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    type: z.enum(['خبر', 'تحليل']),
    sensitivity: z.enum(['عادي', 'حساس_قيد_المراجعة']).default('عادي'),
    sources: z.array(z.string()).min(1),
    unverifiedSingleSource: z.boolean().default(false),
    relatedRegion: z.string().optional(),
    reviewedBy: z.string(), // مراجع بشري واحد فقط لهذا الموقع (D — مؤكَّد)
    reviewedAt: z.date().optional(),
    aiGenerated: z.boolean().default(false),
    excerpt: z.string().max(160),
  }),
});

export const collections = { posts };

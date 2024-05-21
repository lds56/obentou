// src/posts/config.ts
import { defineCollection } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: {
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
      publishDate: { type: 'date', required: true },
    },
  }),
};
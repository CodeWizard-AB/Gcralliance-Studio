import {defineField} from 'sanity'

// * Slug field — auto-generated from a source field
export const slugField = (source: string = 'title') =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source,
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (R) => R.required(),
    description: `Auto-generated from ${source}. Click Generate. Do not change after publishing.`,
  })

// * Published at field
export const publishedAtField = defineField({
  name: 'publishedAt',
  title: 'Published Date',
  type: 'datetime',
  description: 'Set to today to publish immediately.',
})

// * SEO field group
export const seoField = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
})

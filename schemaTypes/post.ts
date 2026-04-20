import {defineField, defineType} from 'sanity'
import {publishedAtField, slugField} from './shared'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: () => '✍️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    slugField('title'),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),
    publishedAtField,
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown in card views. Max 200 characters.',
      validation: (R) => R.max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
        // {type: 'calloutBlock'},
      ],
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Leave blank to auto-calculate from body word count.',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'featuredImage', status: 'status', author: 'author.name'},
    prepare({title, media, status, author}) {
      return {
        title,
        subtitle: `${status === 'published' ? '✅' : '📝'} ${author ?? 'No author'}`,
        media,
      }
    },
  },
})

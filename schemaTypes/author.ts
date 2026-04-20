import {defineField, defineType} from 'sanity'
import {slugField} from './shared'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: () => '🖊️',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    slugField('name'),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'title',
      title: 'Title & Institution',
      type: 'string',
      placeholder: 'e.g. Senior Epidemiologist, LSHTM',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Max 100 words. Shown below blog posts.',
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'twitter', title: 'Twitter/X URL', type: 'url'}),
  ],
  preview: {
    select: {name: 'name', title: 'title', media: 'photo'},
    prepare({name, title, media}) {
      return {title: name, subtitle: title, media}
    },
  },
})

import {defineField, defineType} from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Leadership', value: 'leadership'},
          {title: 'Research', value: 'research'},
          {title: 'Programmes', value: 'programmes'},
          {title: 'Operations', value: 'operations'},
          {title: 'Communications', value: 'communications'},
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'Displayed on About page. Max 200 words.',
    }),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      validation: (R) => R.required(),
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. London, UK',
    }),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 100}),
    defineField({
      name: 'isVisible',
      title: 'Visible on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      title: 'title',
      department: 'department',
      media: 'photo',
      isVisible: 'isVisible',
    },
    prepare({name, title, department, media, isVisible}) {
      return {
        title: name,
        subtitle: `${isVisible ? '' : '🔴 Hidden · '}${title} · ${department ?? ''}`,
        media,
      }
    },
  },
  orderings: [
    {title: 'Display Order', name: 'displayOrder', by: [{field: 'displayOrder', direction: 'asc'}]},
  ],
})

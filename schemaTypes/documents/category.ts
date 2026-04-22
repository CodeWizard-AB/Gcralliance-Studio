import {defineField, defineType} from 'sanity'
import {slugField} from '../shared/shared'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({name: 'name', title: 'Title', type: 'string', validation: (R) => R.required()}),
    slugField('name'),
    defineField({
      name: 'type',
      title: 'Applies To',
      type: 'string',
      options: {
        list: [
          {title: 'Blog Posts', value: 'posts'},
          {title: 'Research', value: 'research'},
          {title: 'Events', value: 'events'},
          {title: 'All', value: 'all'},
        ],
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Purple', value: 'purple'},
          {title: 'Amber', value: 'amber'},
          {title: 'Red', value: 'red'},
          {title: 'Teal', value: 'teal'},
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {name: 'name', type: 'type', color: 'color'},
    prepare({name, type, color}) {
      return {title: name, subtitle: `${type} · ${color}`}
    },
  },
})

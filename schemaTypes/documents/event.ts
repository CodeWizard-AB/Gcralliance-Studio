import {defineField, defineType} from 'sanity'
import {seoField, slugField} from '../shared/shared'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    slugField('title'),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Conference', value: 'conference'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Regional Meeting', value: 'regional'},
          {title: 'Onboarding', value: 'onboarding'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (R) => R.required().min(R.valueOfField('startDate')),
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      initialValue: 'GMT',
      placeholder: 'GMT, WAT, EAT, IST',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'isOnline',
      title: 'Online Event',
      type: 'boolean',
      initialValue: false,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      validation: (R) => R.required(),
      hidden: ({document}) => Boolean(document?.isOnline),
      fields: [
        defineField({
          name: 'venue',
          title: 'Venue Name',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          validation: (R) => R.required(),
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Shown in event cards. Max 150 characters.',
      validation: (R) => R.max(150),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: (R) => R.required().positive().integer(),
      initialValue: 10,
    }),
    defineField({
      name: 'isMembersOnly',
      title: 'Members Only',
      type: 'boolean',
      initialValue: false,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'isFree',
      title: 'Free Event',
      type: 'boolean',
      initialValue: true,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Event Banner',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      validation: (R) => R.required(),
    }),
    seoField,
  ],
  preview: {
    select: {title: 'title', startDate: 'startDate', eventType: 'eventType'},
    prepare({title, startDate, eventType}) {
      const date = new Date(startDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      return {
        title: `${title} (${eventType})`,
        subtitle: date,
      }
    },
  },
})

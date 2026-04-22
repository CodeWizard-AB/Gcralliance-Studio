import {defineField, defineType} from 'sanity'

export const ambassadorType = defineType({
  name: 'ambassador',
  title: 'Ambassador',
  type: 'document',
  icon: () => '🌍',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      placeholder: 'e.g. Country Ambassador, Public Health Researcher',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Max 150 words.',
    }),
    defineField({name: 'contactEmail', title: 'Contact Email', type: 'string'}),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          {title: 'West Africa', value: 'west_africa'},
          {title: 'East Africa', value: 'east_africa'},
          {title: 'Central Africa', value: 'central_africa'},
          {title: 'Southern Africa', value: 'southern_africa'},
          {title: 'North Africa & MENA', value: 'mena'},
          {title: 'South Asia', value: 'south_asia'},
          {title: 'East & SE Asia', value: 'east_asia'},
          {title: 'Latin America', value: 'latin_america'},
          {title: 'Europe', value: 'europe'},
          {title: 'North America', value: 'north_america'},
          {title: 'Oceania', value: 'oceania'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      description: 'Used to place the pin on the Mapbox map.',
      fields: [
        {name: 'lat', type: 'number', title: 'Latitude', description: 'e.g. 5.6037'},
        {name: 'lng', type: 'number', title: 'Longitude', description: 'e.g. -0.1870'},
      ],
    }),
    defineField({name: 'ambassadorSince', title: 'Ambassador Since', type: 'date'}),
    defineField({
      name: 'isActive',
      title: 'Active Ambassador',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide from public directory without deleting.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      country: 'country',
      region: 'region',
      media: 'photo',
      isActive: 'isActive',
    },
    prepare({name, country, region, media, isActive}) {
      return {
        title: name,
        subtitle: `${isActive ? '🟢' : '🔴'} ${country} · ${region ?? ''}`,
        media,
      }
    },
  },
  orderings: [
    {title: 'Country A-Z', name: 'countryAsc', by: [{field: 'country', direction: 'asc'}]},
    {title: 'Display Order', name: 'displayOrder', by: [{field: 'displayOrder', direction: 'asc'}]},
  ],
})

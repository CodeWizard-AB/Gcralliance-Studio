import {defineField, defineType} from 'sanity'

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
    description: 'Auto-generated from title. Click Generate. Do not change after publishing.',
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

// * OBJECT SCHEMAS - These are reusable building blocks used inside document schemas.

// * CTA (Call to Action)
export const ctaType = defineType({
  name: 'cta',
  title: 'CTA Button',
  type: 'object',
  fields: [
    {name: 'label', type: 'string', title: 'Button Label', validation: (R) => R.required()},
    {name: 'url', type: 'string', title: 'URL / Path', validation: (R) => R.required()},
    {
      name: 'variant',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Ghost', value: 'ghost'},
        ],
      },
      initialValue: 'primary',
    },
    {
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
    },
  ],
  preview: {
    select: {label: 'label', url: 'url'},
    prepare: ({label, url}) => ({title: label, subtitle: url}),
  },
})

// *  SEO Meta
export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: '50–60 characters recommended. Leave blank to use the document title.',
      validation: (R) => R.max(60),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 2,
      description: '150–160 characters recommended.',
      validation: (R) => R.max(160),
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Recommended: 1200×630px. Used when shared on social media.',
      options: {hotspot: true},
    },
    {
      name: 'noIndex',
      type: 'boolean',
      title: 'Hide from search engines (noindex)',
      initialValue: false,
    },
  ],
})

// * Hero section object
export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {name: 'headline', type: 'string', title: 'Headline'},
    {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
    {name: 'primaryCta', type: 'cta', title: 'Primary CTA'},
    {name: 'secondaryCta', type: 'cta', title: 'Secondary CTA'},
    {name: 'backgroundImage', type: 'image', title: 'Background Image', options: {hotspot: true}},
  ],
})

// * Stat item
export const statItemType = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    {
      name: 'value',
      type: 'string',
      title: 'Value',
      validation: (R) => R.required(),
      description: 'e.g. 2,400+',
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (R) => R.required(),
      description: 'e.g. Active Members',
    },
    {name: 'sublabel', type: 'string', title: 'Sub-label', description: 'e.g. Across 78 countries'},
  ],
  preview: {
    select: {value: 'value', label: 'label'},
    prepare: ({value, label}) => ({title: `${value} ${label}`}),
  },
})

// * Timeline item
export const timelineItemType = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'object',
  fields: [
    {name: 'year', type: 'string', title: 'Year', validation: (R) => R.required()},
    {name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()},
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (R) => R.required(),
    },
  ],
  preview: {
    select: {year: 'year', title: 'title'},
    prepare: ({year, title}) => ({title: `${year} — ${title}`}),
  },
})

// * Partner
export const partnerType = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'object',
  fields: [
    {name: 'name', type: 'string', title: 'Organisation Name', validation: (R) => R.required()},
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    },
    {name: 'url', type: 'url', title: 'Website URL'},
    {
      name: 'partnerType',
      type: 'string',
      title: 'Partnership Type',
      description: 'e.g. Academic partnership, Funding partner',
    },
  ],
  preview: {
    select: {name: 'name', partnerType: 'partnerType', media: 'logo'},
    prepare: ({name, partnerType, media}) => ({title: name, subtitle: partnerType, media}),
  },
})

// * Testimonial
export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    {name: 'quote', type: 'text', title: 'Quote', rows: 4, validation: (R) => R.required()},
    {
      name: 'attribution',
      type: 'string',
      title: 'Name, Title, Country',
      validation: (R) => R.required(),
    },
    {
      name: 'memberSince',
      type: 'string',
      title: 'Member Since',
      description: 'e.g. Full Member since 2019',
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    },
  ],
  preview: {
    select: {attribution: 'attribution', quote: 'quote'},
    prepare: ({attribution, quote}) => ({
      title: attribution,
      subtitle: `"${(quote ?? '').slice(0, 60)}…"`,
    }),
  },
})

// * FAQ item
export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    {name: 'question', type: 'string', title: 'Question', validation: (R) => R.required()},
    {name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (R) => R.required()},
  ],
  preview: {select: {question: 'question'}, prepare: ({question}) => ({title: question})},
})

// * Membership tier
export const membershipTierType = defineType({
  name: 'membershipTier',
  title: 'Membership Tier',
  type: 'object',
  fields: [
    {name: 'name', type: 'string', title: 'Tier Name', validation: (R) => R.required()},
    {name: 'tagline', type: 'string', title: 'Tagline'},
    {
      name: 'isRecommended',
      type: 'boolean',
      title: 'Highlighted as Recommended',
      initialValue: false,
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (R) => R.required(),
    },
    {name: 'features', type: 'array', title: 'Feature List', of: [{type: 'string'}]},
    {name: 'eligibilityCriteria', type: 'text', title: 'Eligibility Criteria', rows: 2},
    {name: 'reviewPeriod', type: 'string', title: 'Review Period', description: 'e.g. 3 weeks'},
    {name: 'ctaLabel', type: 'string', title: 'CTA Button Label', initialValue: 'Apply Now'},
  ],
  preview: {
    select: {name: 'name', isRecommended: 'isRecommended'},
    prepare: ({name, isRecommended}) => ({title: `${isRecommended ? '⭐ ' : ''}${name}`}),
  },
})

// * Training module
export const trainingModuleType = defineType({
  name: 'trainingModule',
  title: 'Training Module',
  type: 'object',
  fields: [
    {name: 'title', type: 'string', title: 'Title', validation: (R) => R.required()},
    {name: 'description', type: 'array', title: 'Description', of: [{type: 'block'}]},
    {name: 'duration', type: 'string', title: 'Duration', description: 'e.g. 8 weeks'},
    {
      name: 'availability',
      type: 'string',
      title: 'Availability',
      description: 'e.g. Cohorts start Jan, May, Sep',
    },
    {name: 'platform', type: 'string', title: 'Platform', description: 'e.g. Zoom + LMS'},
  ],
  preview: {
    select: {title: 'title', duration: 'duration'},
    prepare: ({title, duration}) => ({title, subtitle: duration}),
  },
})

// * Social links
export const socialLinksType = defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    {name: 'linkedin', type: 'url', title: 'LinkedIn URL'},
    {name: 'twitter', type: 'url', title: 'Twitter/X URL'},
    {name: 'facebook', type: 'url', title: 'Facebook URL'},
    {name: 'youtube', type: 'url', title: 'YouTube URL'},
    {name: 'researchgate', type: 'url', title: 'ResearchGate URL'},
  ],
})

// * Office
export const officeType = defineType({
  name: 'office',
  title: 'Office',
  type: 'object',
  fields: [
    {
      name: 'officeName',
      type: 'string',
      title: 'Office Name',
      description: 'e.g. Head Office — London',
    },
    {name: 'address', type: 'text', title: 'Full Address', rows: 3},
    {name: 'isPrimary', type: 'boolean', title: 'Primary Office', initialValue: false},
  ],
  preview: {select: {officeName: 'officeName'}, prepare: ({officeName}) => ({title: officeName})},
})

// * Speaker
export const speakerType = defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'object',
  fields: [
    {name: 'name', type: 'string', title: 'Full Name', validation: (R) => R.required()},
    {
      name: 'title',
      type: 'string',
      title: 'Title & Institution',
      description: 'e.g. Prof. of Global Health, LSHTM',
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    },
    {name: 'bio', type: 'text', title: 'Short Bio', rows: 3},
  ],
  preview: {
    select: {name: 'name', title: 'title', media: 'photo'},
    prepare: ({name, title, media}) => ({title: name, subtitle: title, media}),
  },
})

// * Research author
export const researchAuthorType = defineType({
  name: 'researchAuthor',
  title: 'Research Author',
  type: 'object',
  fields: [
    {name: 'name', type: 'string', title: 'Full Name', validation: (R) => R.required()},
    {name: 'institution', type: 'string', title: 'Institution'},
    {name: 'isCorresponding', type: 'boolean', title: 'Corresponding Author', initialValue: false},
  ],
  preview: {
    select: {name: 'name', institution: 'institution', isCorresponding: 'isCorresponding'},
    prepare: ({name, institution, isCorresponding}) => ({
      title: `${isCorresponding ? '★ ' : ''}${name}`,
      subtitle: institution,
    }),
  },
})

// * Callout block
export const calloutBlockType = defineType({
  name: 'calloutBlock',
  title: 'Callout Box',
  type: 'object',
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
          {title: 'Success', value: 'success'},
          {title: 'Danger', value: 'danger'},
        ],
      },
      initialValue: 'info',
    },
    {name: 'text', type: 'text', title: 'Content', rows: 3, validation: (R) => R.required()},
  ],
  preview: {
    select: {type: 'type', text: 'text'},
    prepare: ({type, text}) => ({title: `[${type?.toUpperCase()}] ${(text ?? '').slice(0, 60)}`}),
  },
})

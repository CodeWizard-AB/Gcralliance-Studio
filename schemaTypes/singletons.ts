import {defineField, defineType} from 'sanity'
import {seoField} from './shared'

// ── Home Page ─────────────────────────────────────────────────────────────
export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow Text',
          initialValue: 'Advancing Global Health Research',
        },
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          validation: (R) => R.required(),
          initialValue: 'Connecting Researchers. Transforming Healthcare Outcomes.',
        },
        {name: 'subheading', type: 'text', title: 'Subheading', rows: 3},
        {name: 'primaryCta', type: 'cta', title: 'Primary Button'},
        {name: 'secondaryCta', type: 'cta', title: 'Secondary Button'},
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Strip',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (R) => R.max(4),
      description: 'Max 4 stats shown in the strip below the hero.',
    }),
    defineField({
      name: 'featuredResearch',
      title: 'Featured Research Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Section Headline',
          initialValue: 'Evidence That Shapes Policy',
        },
        {name: 'sub', type: 'text', title: 'Section Subtext', rows: 2},
        // {
        //   name: 'items',
        //   type: 'array',
        //   title: 'Featured Publications (max 3)',
        //   of: [{type: 'reference', to: [{type: 'research'}]}],
        //   validation: (R) => R.max(3),
        //   description: 'Leave blank to auto-show the 3 most recent published research items.',
        // },
      ],
    }),
    defineField({
      name: 'missionSection',
      title: 'Mission Snapshot',
      type: 'object',
      fields: [
        {name: 'label', type: 'string', title: 'Label', initialValue: 'Our Mission'},
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Research Without Borders',
        },
        {name: 'body', type: 'text', title: 'Body Text', rows: 4},
        {
          name: 'ctaLabel',
          type: 'string',
          title: 'Link Label',
          initialValue: 'Learn About Our Story',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Section Image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        },
      ],
    }),
    defineField({
      name: 'membershipBanner',
      title: 'Membership CTA Banner',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Become Part of a Global Research Community',
        },
        {name: 'subtext', type: 'text', title: 'Subtext', rows: 3},
        {name: 'primaryCta', type: 'cta', title: 'Primary Button'},
        {name: 'secondaryCta', type: 'cta', title: 'Secondary Button'},
      ],
    }),
    defineField({
      name: 'newsletterSection',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Stay Informed'},
        {name: 'subtext', type: 'string', title: 'Subtext'},
      ],
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})

// ── About Page ────────────────────────────────────────────────────────────
export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => 'ℹ️',
  fields: [
    defineField({
      name: 'hero',
      title: 'Page Hero',
      type: 'object',
      fields: [
        {name: 'headline', type: 'string', title: 'Headline', initialValue: 'Who We Are'},
        {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      ],
    }),
    defineField({
      name: 'missionVision',
      title: 'Mission & Vision',
      type: 'object',
      fields: [
        {
          name: 'mission',
          type: 'text',
          title: 'Mission Statement',
          rows: 4,
          validation: (R) => R.required(),
        },
        {
          name: 'vision',
          type: 'text',
          title: 'Vision Statement',
          rows: 4,
          validation: (R) => R.required(),
        },
        {
          name: 'image',
          type: 'image',
          title: 'Section Image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Value Title', validation: (R) => R.required()},
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
              validation: (R) => R.required(),
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name (Lucide)',
              description: 'e.g. Globe, Users, BookOpen',
            },
          ],
        },
      ],
      validation: (R) => R.min(4).max(8),
    }),
    defineField({
      name: 'timeline',
      title: 'History Timeline',
      type: 'array',
      of: [{type: 'timelineItem'}],
    }),
    defineField({
      name: 'partners',
      title: 'Partners & Affiliations',
      type: 'array',
      of: [{type: 'partner'}],
    }),
    defineField({
      name: 'joinCta',
      title: 'Bottom CTA',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Ready to Join Our Community?',
        },
        {name: 'subtext', type: 'text', title: 'Subtext', rows: 2},
      ],
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'About Page'})},
})

// ── Membership Page ───────────────────────────────────────────────────────
export const membershipPageType = defineType({
  name: 'membershipPage',
  title: 'Membership Page',
  type: 'document',
  icon: () => '👥',
  fields: [
    defineField({
      name: 'hero',
      title: 'Page Hero',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Membership That Moves Your Career Forward',
        },
        {name: 'subheading', type: 'text', title: 'Subheading', rows: 2},
      ],
    }),
    defineField({
      name: 'tiers',
      title: 'Membership Tiers',
      type: 'array',
      of: [{type: 'membershipTier'}],
      validation: (R) => R.required().min(2),
    }),
    defineField({
      name: 'trainingSection',
      title: 'Training Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Section Headline',
          initialValue: 'What You Will Learn',
        },
        {name: 'sub', type: 'text', title: 'Section Subtext', rows: 2},
        {name: 'modules', type: 'array', title: 'Training Modules', of: [{type: 'trainingModule'}]},
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'testimonial'}],
      validation: (R) => R.max(6),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{type: 'faqItem'}],
      validation: (R) => R.min(4),
    }),
    defineField({
      name: 'applyCta',
      title: 'Bottom CTA Banner',
      type: 'object',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Start Your Application Today',
        },
        {name: 'subtext', type: 'text', title: 'Subtext', rows: 2},
        {
          name: 'contactEmail',
          type: 'string',
          title: 'Contact Email',
          initialValue: 'membership@org.net',
        },
      ],
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Membership Page'})},
})

// ── Site Settings ─────────────────────────────────────────────────────────
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '🌐',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organisation Name',
      type: 'string',
      initialValue: 'Global Health Research Organisation',
    }),
    defineField({
      name: 'orgShortName',
      title: 'Short Name / Acronym',
      type: 'string',
      initialValue: 'GHRO',
    }),
    defineField({name: 'logo', title: 'Logo (SVG or PNG)', type: 'image'}),
    defineField({name: 'favicon', title: 'Favicon', type: 'image'}),
    defineField({
      name: 'contact',
      title: 'Contact Details',
      type: 'object',
      fields: [
        {
          name: 'emailGeneral',
          type: 'string',
          title: 'General Email',
          initialValue: 'info@org.net',
        },
        {
          name: 'emailMembership',
          type: 'string',
          title: 'Membership Email',
          initialValue: 'membership@org.net',
        },
        {name: 'emailPress', type: 'string', title: 'Press Email', initialValue: 'press@org.net'},
        {name: 'phone', type: 'string', title: 'Phone', initialValue: '+44 (0)20 7123 4567'},
        {
          name: 'officeHours',
          type: 'string',
          title: 'Office Hours',
          initialValue: 'Monday–Friday, 09:00–17:00 GMT',
        },
        {name: 'offices', type: 'array', title: 'Offices', of: [{type: 'office'}]},
      ],
    }),
    defineField({name: 'social', title: 'Social Media', type: 'socialLinks'}),
    defineField({
      name: 'legal',
      title: 'Legal',
      type: 'object',
      fields: [
        {
          name: 'charityNumber',
          type: 'string',
          title: 'Charity / Org Number',
          initialValue: '1234567 (England & Wales)',
        },
        {
          name: 'copyrightText',
          type: 'string',
          title: 'Copyright Notice',
          initialValue: '© 2025 Global Health Research Organisation',
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Default Meta Title',
          initialValue: 'Global Health Research Organisation — Connecting Researchers Worldwide',
        },
        {name: 'metaDescription', type: 'text', title: 'Default Meta Description', rows: 2},
        {name: 'ogImage', type: 'image', title: 'Default OG Image'},
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})

// ── Navigation Settings ───────────────────────────────────────────────────
export const navigationSettingsType = defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: () => '🧭',
  fields: [
    defineField({
      name: 'navLinks',
      title: 'Main Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label', validation: (R) => R.required()},
            {name: 'url', type: 'string', title: 'URL', validation: (R) => R.required()},
            {
              name: 'dropdownItems',
              type: 'array',
              title: 'Dropdown Items (optional)',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'url', type: 'string', title: 'URL'},
                    {name: 'description', type: 'string', title: 'Short Description'},
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {label: 'label', url: 'url'},
            prepare: ({label, url}) => ({title: label, subtitle: url}),
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Primary CTA Button (top right)',
      type: 'cta',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Link Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Column Heading',
              validation: (R) => R.required(),
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'url', type: 'string', title: 'URL'},
                  ],
                },
              ],
            },
          ],
          preview: {select: {heading: 'heading'}, prepare: ({heading}) => ({title: heading})},
        },
      ],
      validation: (R) => R.max(4),
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue:
        'Advancing evidence-based healthcare through global research collaboration since 2007.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Footer Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'url', type: 'string', title: 'URL'},
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Navigation Settings'})},
})

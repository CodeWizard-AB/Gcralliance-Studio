import {ambassadorType} from './ambassador'
import {authorType} from './author'
import {categoryType} from './category'
import {eventType} from './event'
import {postType} from './post'
import {
  researchAuthorType,
  officeType,
  seoType,
  socialLinksType,
  trainingModuleType,
  membershipTierType,
  faqItemType,
  testimonialType,
  partnerType,
  timelineItemType,
  statItemType,
  heroType,
  ctaType,
  speakerType,
} from './shared'
import {
  aboutPageType,
  homePageType,
  membershipPageType,
  navigationSettingsType,
  siteSettingsType,
} from './singletons'
import {teamMemberType} from './teamMember'

export const schemaTypes = [
  // * Document types
  postType,
  authorType,
  categoryType,
  teamMemberType,
  ambassadorType,
  eventType,

  // * Singleton types
  homePageType,
  aboutPageType,
  membershipPageType,
  siteSettingsType,
  navigationSettingsType,

  // * Object types
  seoType,
  ctaType,
  seoType,
  heroType,
  statItemType,
  timelineItemType,
  partnerType,
  testimonialType,
  faqItemType,
  membershipTierType,
  trainingModuleType,
  socialLinksType,
  officeType,
  speakerType,
  researchAuthorType,
]

import {ambassadorType} from './documents/ambassador'
import {authorType} from './documents/author'
import {categoryType} from './documents/category'
import {eventType} from './documents/event'
import {postType} from './documents/post'
import {teamMemberType} from './documents/teamMember'
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
} from './shared/shared'
import {
  aboutPageType,
  homePageType,
  membershipPageType,
  navigationSettingsType,
  siteSettingsType,
} from './pages/singletons'

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

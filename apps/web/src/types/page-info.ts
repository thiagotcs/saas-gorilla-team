import type { RichTextContent } from '@graphcms/rich-text-types'
import { KnownTech, Academy } from './academys'
import { Rules } from './rules'

export type Social = {
  url: string
  iconSvg: string
}

export type HomePageInfo = {
  highlightRules: Rules[]
  introduction: {
    raw: RichTextContent
  }
  technologies: KnownTech[]
  profilePicture: {
    url: string
  }
  socials: Social[]
  knownTechs: KnownTech[]
  highlightAcademys: Academy[]
}

export type AcademyPageData = {
  academy: Academy
}

export type AcademysPageData = {
  academys: Academy[]
}

export type AcademysPageStaticData = {
  academys: {
    slug: string
  }[]
}

export type HomePageData = {
  page: HomePageInfo
}

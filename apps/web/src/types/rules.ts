import type { RichTextContent } from '@graphcms/rich-text-types'

export type Technology = {
  name: string
}

export type RulesSection = {
  title: string
  image: {
    url: string
  }
}

export type Rules = {
  slug: string
  thumbnail: {
    url: string
  }
  title: string
  shortDescription: string
  technologies: Technology[]
  pageThumbnail: {
    url: string
  }
  sections: RulesSection[]
  description: {
    raw: RichTextContent
    text: string
  }
  pdf?: {
    url: string
  }
  liveProjectUrl?: string
  githubUrl?: string
}

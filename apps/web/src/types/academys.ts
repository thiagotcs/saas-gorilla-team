import type { RichTextContent } from '@graphcms/rich-text-types'

export type KnownTech = {
  iconSvg: string
  name: string
  startDate: string
}

export type Technology = {
  name: string
}

export type AcademySection = {
  title: string
  image: {
    url: string
  }
}

export type Academy = {
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
  sections: AcademySection[]
  description: {
    raw: RichTextContent
    text: string
  }
  liveProjectUrl?: string
  githubUrl?: string
}

import { AboutsSection } from '@/components/pages/home/abouts-section'
import { AcademysSection } from '@/components/pages/home/academys-section'
import { AdultJiuSection } from '@/components/pages/home/adult-jiu-section'
import { HeroSection } from '@/components/pages/home/hero-section'
import { KidsJiuSection } from '@/components/pages/home/kids-jiu-section'
import ClassSchedule from './class-schedule/page'
import ContactSection from '@/components/pages/home/contact-section'
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { HomePageData } from '@/types/page-info'
import { RulesSection } from '@/components/pages/rules/rules-section'

export const metadata = {
  title: 'Home',
}

const getPageData = async (): Promise<HomePageData> => {
  const query = `
  query PageInfoQuery {
  page(where: { slug: "home" }) {
    introduction {
      raw
    }
    technologies {
      name
    }
    profilePicture {
      url
    }
    socials {
      url
      iconSvg
    }
    knownTechs {
      iconSvg
      name
      startDate
    }
    highlightAcademys {
      slug
      thumbnail {
        url
      }
      title
      shortDescription
      pageThumbnail {
        url
      }
      description {
        raw
        text
      }
      sections {
        title
        image {
          url
        }
      }
    }
    highlightRules {
      slug
      thumbnail {
        url
      }
      title
      shortDescription
      pageThumbnail {
        url
      }
      description {
        raw
        text
      }
      sections {
        title
        image {
          url
        }
      }
      pdf {
        url
      }
    }
  }
}


  `
  //60 * 60 * 24
  const data = await fetchHygraphQuery<HomePageData>(query, 0)

  return data
}

export default async function PublicHomePage() {
  const { page: pageData } = await getPageData()
  console.log(`pageData`, pageData)
  return (
    <div className="space-y-4">
      <HeroSection homeInfo={pageData} />
      <AcademysSection academys={pageData?.highlightAcademys ?? []} />
      <RulesSection rules={pageData?.highlightRules ?? []} />
      <AboutsSection />
      <AdultJiuSection />
      <KidsJiuSection />
      {/* <ClassSchedule /> */}
      <ContactSection />
    </div>
  )
}

import Image from 'next/image'
import heroMobile from '@/assets/hero-mobile.png'
import { TrialClass } from './trial-class'
import { HomePageInfo } from '@/types/page-info'
import { RichText } from '@/components/rich-text'

type HeroSectionProps = {
  homeInfo: HomePageInfo
}

export const HeroSection = ({ homeInfo }: HeroSectionProps) => {
  return (
    <section className=" flex w-full flex-col items-center  justify-end pb-10 sm:pb-32">
      <div className="relative w-full overflow-hidden lg:h-[640px]">
        <Image
          src={heroMobile}
          alt="Juares Santos"
          className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
          unoptimized
          priority
        />
        <div className="  w-full px-4 sm:bottom-10 sm:w-auto">
          <TrialClass />
        </div>
        <Image
          src={homeInfo?.profilePicture?.url}
          alt="Juares Santos"
          className="hidden object-cover sm:block"
          fill
          unoptimized
          priority
        />
      </div>
    </section>
  )
}

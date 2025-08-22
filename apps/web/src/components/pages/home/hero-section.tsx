import Image from 'next/image'
import imgHero from '@/assets/juares-santos.jpeg'
import titleHero from '@/assets/banner-hero-principal-novo.png'
export const HeroSection = () => {
  return (
    <section className=" flex w-full flex-col items-center  justify-end pb-10 sm:pb-32">
      <div className="relative h-[640px] w-full overflow-hidden">
        <Image
          objectFit="cover"
          layout="fill"
          src={titleHero}
          alt="Juares Santos"
        />
      </div>
    </section>
  )
}

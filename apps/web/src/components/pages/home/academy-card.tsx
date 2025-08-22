import Image, { StaticImageData } from 'next/image'

type AcademyCardProps = {
  title: string
  description?: string
  className?: string
  imgUrl?: string | StaticImageData
}

export const AcademyCard = ({
  title,
  description,
  imgUrl,
}: AcademyCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-600/20  text-gray-500 transition-all hover:bg-gray-600/30 hover:text-emerald-500">
      <Image
        className="rounded-t-lg object-cover sm:h-[200px] sm:w-full lg:h-[185px] lg:w-[328px]"
        src={imgUrl ?? '/placeholder.png'}
        alt={title}
      />
      <div className=" p-4">
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </div>
  )
}
// ;<div className="relative h-[640px] w-full overflow-hidden">
//   <Image objectFit="cover" layout="fill" src={titleHero} alt="Juares Santos" />
// </div>

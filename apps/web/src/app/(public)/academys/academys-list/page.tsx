import Link from 'next/link'
import { AcademyCard } from './academy-card/page'

type AcademyType = {
  slug: string
}

const academys: AcademyType[] = [
  { slug: 'academy-1' },
  { slug: 'academy-2' },
  { slug: 'academy-3' },
  { slug: 'academy-4' },
  { slug: 'academy-5' },
]

export const AcademysList = () => {
  return (
    <section className=" flex w-full flex-col py-16">
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-6 px-4 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]   md:grid-cols-3  lg:max-w-7xl">
        {academys.map((academy) => (
          <Link key={academy.slug} href={`/academys/${academy.slug}`}>
            <AcademyCard />
          </Link>
        ))}
      </div>
    </section>
  )
}

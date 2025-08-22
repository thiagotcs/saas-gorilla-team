'use client'

import Image from 'next/image'
const sections = [
  {
    title: 'Introduction to Gorilla',
    image:
      'https://sa-east-1.graphassets.com/A7tR3Jj4DQOKz2XzsHeVpz/mYImcL1BRr6AhUeU0kEg',
  },
  {
    title: 'Getting Started with Jiu-Jitsu',
    image:
      'https://sa-east-1.graphassets.com/A7tR3Jj4DQOKz2XzsHeVpz/mYImcL1BRr6AhUeU0kEg',
  },
  {
    title: 'Advanced Techniques',
    image:
      'https://sa-east-1.graphassets.com/A7tR3Jj4DQOKz2XzsHeVpz/mYImcL1BRr6AhUeU0kEg',
  },
]

export default function AcademySections() {
  return (
    <section className=" my-12 flex w-full flex-col gap-8 md:my-10 md:gap-10">
      {sections.map((section) => (
        <div
          key={section.title}
          className="lg:min-w-7xl flex flex-col items-center gap-6 md:gap-12"
        >
          <h2 className="text-2xl font-medium text-gray-300 md:text-3xl">
            {section.title}
          </h2>
          <div className="px-4 lg:h-[672px] lg:w-[1080px]">
            <Image
              width={1080}
              height={672}
              className="aspect-auto w-full rounded-lg object-cover"
              alt={`Imagem da sessão ${section.title}`}
              src={section.image}
              unoptimized
            />
          </div>
        </div>
      ))}
    </section>
  )
}

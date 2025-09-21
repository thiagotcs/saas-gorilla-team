import { Crown } from 'lucide-react'
import Image from 'next/image'
import profilePicture from '@/assets/bjj-pro-curitiba.jpeg'
import { Timeline, TimelineItem } from '@/components/timeline'

export const AboutTimeLine = () => {
  const items: TimelineItem[] = [
    {
      id: '1',
      date: 'SEPTEMBER 2019',
      title: 'ADCC Super Fight',
      description: (
        <p>
          Won 4th ADCC Super Fight title against Felipe Pena, making it his{' '}
          <strong>6th ADCC title overall!</strong>
        </p>
      ),
      icon: <Crown />,
      image: (
        <Image
          src={profilePicture}
          alt="Foto do campeonato Curitiba - Gorilla Team"
          className="aspect-auto w-full rounded-lg object-cover shadow-2xl"
          unoptimized
        />
      ),
    },
    {
      id: '2',
      date: 'JUNE 2018',
      description: (
        <p>
          Announced retirement from BJJ tournaments to focus on his business,
          with 2019 ADCC Super Fight to be his last fight.
        </p>
      ),
      icon: <Crown />,
    },
    {
      id: '3',
      date: 'APRIL 2018',
      description: <p>Angelica won the UAEJJF World Pro Championships.</p>,
      icon: <Crown />,
    },
  ]

  return (
    <main className="min-h-dvh  p-6">
      <div className="mx-auto max-w-6xl">
        <Timeline items={items} alternate />
      </div>
    </main>
  )
}

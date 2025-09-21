'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AcademyCard } from './academy-card/page'
import { Academy } from '@/types/academys'

export const AcademysList = ({ academys }: { academys: Academy[] }) => {
  return (
    <section className=" flex w-full flex-col  pb-16">
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-6  sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]   md:grid-cols-3  lg:max-w-7xl">
        {academys.map((academy, i) => (
          <motion.div
            key={academy.slug}
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 200, scale: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <Link href={`/academys/${academy.slug}`}>
              <AcademyCard academy={academy} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

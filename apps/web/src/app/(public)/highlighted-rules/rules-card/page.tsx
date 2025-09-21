'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Rules } from '@/types/rules'
export const RulesCard = ({ rule }: { rule: Rules }) => {
  return (
    <motion.div
      className="group flex flex-col items-center gap-6 overflow-hidden rounded-lg border-2 border-gray-800 bg-gray-800 opacity-70 transition-all hover:border-emerald-500 hover:opacity-100 lg:flex-row lg:gap-12"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-48 w-full overflow-hidden  sm:h-[300px] lg:min-h-full  lg:w-[300px]">
        <Image
          width={400}
          height={192}
          src={rule?.thumbnail?.url}
          alt={`regras`}
          className="h-full w-full rounded-l-lg object-cover transition-all duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-8">
        <h3 className="flex items-center gap-3 text-lg font-medium text-gray-50">
          {rule.title}
        </h3>
        <p className="my-6 text-gray-400">{rule.description.text}</p>
        <Link
          target="_blank"
          href={rule?.pdf?.url ?? '#'}
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-500"
        >
          Download
          <Download size={18} />
        </Link>
      </div>
    </motion.div>
  )
}

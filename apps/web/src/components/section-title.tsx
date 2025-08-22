'use client'

// import { cn } from '@/app/lib/utils'
// import { motion } from 'framer-motion'

type SectionTitleProps = {
  title: string
  subtitle?: string
  className?: string
}

export const SectionTitle = ({
  subtitle,
  title,
  className,
}: SectionTitleProps) => {
  const animProps = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <div className="m-auto flex flex-col gap-4 pb-16">
      {/* <motion.span
        className="font-mono text-sm text-emerald-400"
        {...animProps}
        transition={{ duration: 0.5 }}
      >{`../${subtitle}`}</motion.span> */}
      <h3
        className="m-auto text-center text-3xl font-medium uppercase text-gray-100"
        {...animProps}
        // transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </h3>
      <strong className="text-center text-2xl font-medium">{subtitle}</strong>
    </div>
  )
}

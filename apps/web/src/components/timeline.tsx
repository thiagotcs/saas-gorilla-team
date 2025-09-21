'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export type TimelineItem = {
  id: string
  date: string
  title?: string
  subtitle?: string
  description?: ReactNode
  icon?: ReactNode
  side?: 'left' | 'right'
  color?: 'slate' | 'blue' | 'emerald' | 'amber' | 'rose'
  image?: string | ReactNode
}

type TimelineProps = {
  items: TimelineItem[]
  alternate?: boolean
  className?: string
}

function TimelineCard({
  item,
  showDate = false,
}: {
  item: TimelineItem
  showDate?: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-lg bg-slate-800 p-5 text-slate-100 shadow-lg ring-1 ring-slate-700"
    >
      {/* Imagem (opcional) */}
      {typeof item.image === 'string' && (
        // Caso sua imagem venha como URL
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.title || 'Timeline image'}
          className="mb-3 w-full rounded-md object-cover"
        />
      )}
      {/* Se já vier como ReactNode (ex.: <Image /> do Next) */}
      {typeof item.image !== 'string' && item.image}

      <header className="text-left">
        {/* 2. AJUSTE: A data é renderizada aqui com fonte maior se showDate for true */}
        {showDate && (
          <p className="mb-2 text-xl font-bold uppercase tracking-wide text-emerald-500">
            {item.date}
          </p>
        )}
        {item.title && (
          <h3 className="mt-1 text-lg font-bold leading-snug">{item.title}</h3>
        )}
        {item.subtitle && (
          <p className="mt-1 text-sm text-slate-300">{item.subtitle}</p>
        )}
      </header>

      {item.description && (
        <div className="mt-2 text-left text-sm leading-relaxed text-slate-200">
          {item.description}
        </div>
      )}
    </motion.article>
  )
}

export function Timeline({
  items,
  alternate = true,
  className = '',
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pageTop = window.scrollY + rect.top // page Y of container top
      const start = pageTop - window.innerHeight * 0.6 // start a little before container fully visible
      const end = pageTop + el.scrollHeight // end when bottom reached
      const pos = window.scrollY
      const p = Math.min(
        1,
        Math.max(0, (pos - start) / Math.max(1, end - start))
      )
      setProgress(p)
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return (
    <section
      ref={containerRef}
      className={`relative mx-auto max-w-5xl ${className}`}
      aria-label="Timeline"
    >
      {/* Linha central + progresso */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-slate-700 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="absolute left-0 top-0 w-[3px] origin-top bg-emerald-500 md:left-1/2 md:-translate-x-1/2"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      <ol className="relative space-y-12 md:space-y-16">
        {items.map((item, idx) => {
          const isCardOnLeft =
            item.side === 'left' ||
            (alternate && idx % 2 === 0 && item.side !== 'right')

          return (
            <li
              key={item.id}
              className="group/item relative grid grid-cols-1 items-start gap-y-3 md:grid-cols-9 md:gap-x-6"
            >
              {/* === Mobile: Data antes do ícone === */}
              <h2 className="order-0 mb-2 text-center text-2xl font-semibold uppercase tracking-wide text-emerald-600 md:hidden">
                {item.date}
              </h2>

              {/* Coluna central (ícone) - Sempre no meio */}
              <div className="order-1 flex justify-center md:order-none md:col-span-1 md:col-start-5 md:self-center">
                <div
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full 
                  bg-white text-emerald-600 shadow-md ring-2 ring-emerald-500"
                >
                  <span className="text-xl">{item.icon}</span>
                </div>
              </div>
              {/* === Desktop: Layout Alternado === */}

              {/* Lado Esquerdo (desktop) */}
              {isCardOnLeft ? (
                // Se o CARD é na esquerda, renderiza o card aqui
                <div className="order-2 hidden md:order-none md:col-span-4 md:col-start-1 md:flex md:items-start md:justify-end">
                  <div className="w-full max-w-xl md:pr-6">
                    <TimelineCard item={item} />
                  </div>
                </div>
              ) : (
                // Se o CARD é na direita, renderiza o card depois do ícone
                <div className="order-2 hidden md:order-none md:col-span-4 md:col-start-1 md:flex md:items-start md:justify-end">
                  <h2 className="w-full max-w-xl pt-3 text-right text-2xl font-semibold uppercase tracking-wide text-slate-400 md:pr-6">
                    {item.date}
                  </h2>
                </div>
              )}
              {/* Lado Direito (desktop) */}
              {isCardOnLeft ? (
                // Se o CARD é na esquerda, renderiza a DATA aqui
                <div className="order-3 hidden md:order-none md:col-span-4 md:col-start-6 md:flex md:items-start">
                  <p className="w-full max-w-xl pt-3 text-left text-2xl font-semibold uppercase tracking-wide text-slate-400 md:pl-6">
                    {item.date}
                  </p>
                </div>
              ) : (
                // Senão, renderiza o CARD aqui
                <div className="order-3 hidden md:order-none md:col-span-4 md:col-start-6 md:flex md:items-start md:justify-start">
                  <div className="w-full max-w-xl md:pl-6">
                    <TimelineCard item={item} />
                  </div>
                </div>
              )}
              {/* === Mobile: Card depois do ícone === */}
              <div className="order-4 col-span-1 w-full md:hidden">
                <div className="px-2">
                  <TimelineCard item={item} />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

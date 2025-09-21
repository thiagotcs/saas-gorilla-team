'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SectionTitle } from '@/components/section-title'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { GalleryImage } from '@/types/gallery'
import { Separator } from '@/components/ui/separator'

type GalleryClientProps = {
  images: GalleryImage[]
}

export default function GalleryCard({ images }: GalleryClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const showPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen])

  // Swipe gesture
  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current
    if (deltaX > 50) showPrev()
    else if (deltaX < -50) showNext()
  }
  const touchStart = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  if (!mounted) return null

  return (
    <>
      {/* Grid */}
      <section className="flex w-full flex-col px-4 py-16">
        <div className="lg:min-w-7xl m-auto mt-0 flex max-w-lg flex-col gap-8 px-4">
          <SectionTitle
            title="Momentos Gorilla Team - Treinos e Conquistas"
            subtitle="Momentos que celebram a evolução, amizade e superação dentro e fora do tatame."
          />
          <Separator
            orientation="horizontal"
            className="my-8 max-w-7xl border-b border-b-gray-800"
          />
        </div>
        <div className="mx-auto grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-7xl lg:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="cursor-zoom-in overflow-hidden rounded-lg"
            >
              <Image
                src={img.url}
                alt={`Foto ${index + 1}`}
                width={500}
                height={500}
                className="h-auto max-w-full rounded-lg object-cover grayscale transition duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div
              ref={containerRef}
              className="h-11/12 relative w-11/12 xl:w-4/5"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleSwipe}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra superior */}
              <div className="absolute left-0 right-0 top-2 z-10 flex items-center justify-between px-4 text-white">
                <span>
                  {currentIndex + 1}/{images.length}
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      document.fullscreenElement
                        ? document.exitFullscreen()
                        : containerRef.current?.requestFullscreen()
                    }}
                  >
                    ⛶
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeLightbox()
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Imagem animada */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={images[currentIndex].url}
                    alt={`Foto ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, 80vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botão Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  showPrev()
                }}
                className="absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              {/* Botão Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  showNext()
                }}
                className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>

              {/* Miniaturas */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }}
                    className={clsx(
                      'h-16 w-16 cursor-pointer overflow-hidden rounded border-2',
                      idx === currentIndex
                        ? 'border-white'
                        : 'border-transparent'
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={`Miniatura ${idx + 1}`}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

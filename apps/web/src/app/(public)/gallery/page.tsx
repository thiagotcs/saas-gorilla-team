'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import imgTest from '@/assets/bjj-pro-curitiba.jpeg'
import { SectionTitle } from '@/components/section-title'
import clsx from 'clsx'

export default function Gallery() {
  const images = Array.from({ length: 12 }).map(() => imgTest)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    setTimeout(() => setAnimate(true), 20) // delay para animação
  }

  const closeLightbox = () => {
    setAnimate(false)
    setTimeout(() => setLightboxOpen(false), 300) // tempo igual ao da animação
  }

  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Esc para fechar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <>
      {/* Cabeçalho */}
      {/* <div className="space-y-4">
        <PublicHeaderInfo />
        <PublicHeader />
      </div> */}

      {/* Título */}
      <div className="m-auto mt-8 flex max-w-lg">
        <SectionTitle title="GALERIA DE FOTOS" />
      </div>

      {/* Grid */}
      <section className="flex w-full flex-col pb-16">
        <div className="mx-auto grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-7xl lg:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="cursor-zoom-in overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt={`Foto ${index + 1}`}
                className="h-auto max-w-full rounded-lg object-cover grayscale transition duration-300 ease-in-out hover:scale-105 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox com transição */}
      {lightboxOpen && (
        <div
          className={clsx(
            'fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 transition-opacity duration-300',
            animate ? 'opacity-100' : 'opacity-0'
          )}
          onClick={closeLightbox}
        >
          <div
            className={clsx(
              'h-11/12 relative flex w-11/12 transform items-center justify-center transition-transform duration-300 xl:w-4/5',
              animate ? 'scale-100' : 'scale-50 opacity-0'
            )}
          >
            {/* Botão Prev */}
            <button
              onClick={showPrev}
              className="absolute left-0 flex h-14 w-14 translate-x-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 xl:-translate-x-24"
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

            {/* Imagem */}
            <Image
              src={images[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
              className="h-full w-full cursor-zoom-out select-none object-contain object-center"
            />

            {/* Botão Next */}
            <button
              onClick={showNext}
              className="absolute right-0 flex h-14 w-14 -translate-x-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 xl:translate-x-24"
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
          </div>
        </div>
      )}
    </>
  )
}

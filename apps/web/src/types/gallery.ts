export type GalleryImage = {
  url: string
}

export type GalleryData = {
  gallery: {
    images: GalleryImage[]
  } | null
}

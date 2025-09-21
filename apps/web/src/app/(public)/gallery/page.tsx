import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query'
import { GalleryData } from '@/types/gallery'
import GalleryCard from './gallery-card'

const getGalleryData = async (): Promise<GalleryData> => {
  const query = `
    query GalleryQuery {
      gallery(where: { slug: "gallery-data" }) {
        images(first: 100) {
          url
        }
      }
    }
  `
  return fetchHygraphQuery<GalleryData>(query, 0)
}

export default async function GalleryServer() {
  const data = await getGalleryData()
  const images = data.gallery?.images ?? []
  return <GalleryCard images={images} />
}

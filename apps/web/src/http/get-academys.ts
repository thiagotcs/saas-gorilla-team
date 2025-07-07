import { api } from './api-client'

interface GetAcademysResponse {
  academys: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getAcademys() {
  const result = await api.get('academys').json<GetAcademysResponse>()

  return result
}

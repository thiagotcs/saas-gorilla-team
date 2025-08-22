import { api } from './api-client'

interface CreateAcademyRequest {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateAcademyResponse = void

export async function createAcademy({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateAcademyRequest): Promise<CreateAcademyResponse> {
  await api.post('academys', {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}

import { api } from './api-client'
import { Role } from '@saas/auth'
interface GetAcademyMembershipResponse {
  membership: {
    id: string
    role: Role
    academyId: string
    userId: string
  }
}

export async function getAcademyMembership(academySlug: string) {
  const result = await api
    .get(`academys/${academySlug}/membership`)
    .json<GetAcademyMembershipResponse>()

  return result
}

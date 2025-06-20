import 'fastify'

import type { Member, Academy } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug: string
    ): Promise<{ academy: Academy; membership: Member }>
  }
}

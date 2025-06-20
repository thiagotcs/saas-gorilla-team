import { academySchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function shutdownAcademy(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/academys/:slug',
      {
        schema: {
          tags: ['Academys'],
          summary: 'Shutdown academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, academy } = await request.getUserMembership(slug)
        const authAcademy = academySchema.parse(academy)
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', authAcademy)) {
          throw new UnauthorizedError(
            `You're not allowed to shutdown this academy. `
          )
        }

        await prisma.academy.delete({
          where: {
            id: academy.id,
          },
        })

        return reply.status(204).send()
      }
    )
}

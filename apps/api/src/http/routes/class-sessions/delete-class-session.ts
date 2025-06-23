import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function deleteClassSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/academys/:slug/class-sessions/:classSessionId',
      {
        schema: {
          tags: ['Class Sessions'],
          summary: 'Delete a class session',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            classSessionId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, classSessionId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const classSession = await prisma.classSession.findUnique({
          where: { id: classSessionId, academyId: academy.id },
        })

        if (!classSession) {
          throw new BadRequestError(
            'Class session not found or not in this academy.'
          )
        }

        if (cannot('delete', 'ClassSession')) {
          throw new UnauthorizedError(
            `You're not allowed to delete this class session.`
          )
        }

        await prisma.classSession.delete({
          where: { id: classSessionId },
        })

        return reply.status(204).send()
      }
    )
}

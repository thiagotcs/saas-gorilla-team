import { academySchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function transferAcademy(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/academys/:slug/owner',
      {
        schema: {
          tags: ['Academys'],
          summary: 'Transfer academy ownership',
          security: [{ bearerAuth: [] }],
          body: z.object({
            transferToUserId: z.string().uuid(),
          }),
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

        // Use "manage" as the action, since "transfer_ownership" is not a valid action type
        if (cannot('manage', authAcademy)) {
          throw new UnauthorizedError(
            `You're not allowed to transfer this academy ownership.`
          )
        }

        const { transferToUserId } = request.body

        const transferMembership = await prisma.member.findUnique({
          where: {
            academyId_userId: {
              academyId: academy.id,
              userId: transferToUserId,
            },
          },
        })

        if (!transferMembership) {
          throw new BadRequestError(
            'Target user is not a member of this academy.'
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              academyId_userId: {
                academyId: academy.id,
                userId: transferToUserId,
              },
            },
            data: {
              role: 'ADMIN',
            },
          }),
          prisma.academy.update({
            where: { id: academy.id },
            data: { ownerId: transferToUserId },
          }),
        ])

        return reply.status(204).send()
      }
    )
}

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'
import { trainingGroupSchema } from '@saas/auth'

export async function updateTrainingGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug/training-groups/:trainingGroupId',
      {
        schema: {
          tags: ['TrainingGroups'],
          summary: 'Update a training group',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
            trainingGroupId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, trainingGroupId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const trainingGroup = await prisma.trainingGroup.findUnique({
          where: {
            id: trainingGroupId,
            academyId: academy.id,
          },
        })
        if (!trainingGroup) {
          throw new BadRequestError('Training group not found.')
        }

        const { cannot } = getUserPermissions(userId, membership.role)
        const authTrainingGroup = trainingGroupSchema.parse(trainingGroup)

        if (cannot('update', authTrainingGroup)) {
          throw new UnauthorizedError(
            `You're not allowed to update this training group.`
          )
        }

        const { name, description } = request.body
        await prisma.trainingGroup.update({
          where: {
            id: trainingGroupId,
          },
          data: {
            name,
            description,
          },
        })
        return reply.status(204).send()
      }
    )
}

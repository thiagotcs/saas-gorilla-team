import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function createTrainingGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/training-groups',
      {
        schema: {
          tags: ['TrainingGroups'],
          summary: 'Create a new training group',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              trainingGroupId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'TrainingGroup')) {
          throw new UnauthorizedError(
            `You're not allowed to create new training groups.`
          )
        }

        const { name, description } = request.body

        const trainingGroup = await prisma.trainingGroup.create({
          data: {
            name,
            slug: createSlug(name),
            description,
            academyId: academy.id,
            ownerId: userId,
          },
        })

        return reply.status(201).send({
          trainingGroupId: trainingGroup.id,
        })
      }
    )
}

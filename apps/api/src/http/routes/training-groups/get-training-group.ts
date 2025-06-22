import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getTrainingGroup(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:gymSlug/training-groups/:trainingGroupSlug',
      {
        schema: {
          tags: ['TrainingGroups'],
          summary: 'Get training group details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            gymSlug: z.string(),
            trainingGroupSlug: z.string().uuid(),
          }),
          response: {
            200: z.object({
              trainingGroup: z.object({
                id: z.string().uuid(),
                description: z.string(),
                name: z.string(),
                slug: z.string(),
                avatarUrl: z.string().url().nullable(),
                academyId: z.string().uuid(),
                ownerId: z.string().uuid(),
                owner: z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  email: z.string().email().nullable(),
                  avatarUrl: z.string().url().nullable(),
                }),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { gymSlug, trainingGroupSlug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(gymSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'TrainingGroup')) {
          throw new UnauthorizedError(
            `You're not allowed to see this training group.`
          )
        }
        const trainingGroup = await prisma.trainingGroup.findUnique({
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            ownerId: true,
            avatarUrl: true,
            academyId: true,
            createdAt: true,
            updatedAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            slug: trainingGroupSlug,
            academyId: academy.id,
          },
        })
        if (!trainingGroup) {
          throw new BadRequestError('Training group not found.')
        }

        return reply.send({
          trainingGroup,
        })
      }
    )
}

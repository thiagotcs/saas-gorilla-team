import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function updateClassSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug/class-sessions/:classSessionId',
      {
        schema: {
          tags: ['Class Sessions'],
          summary: 'Update a class session',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            classSessionId: z.string().uuid(),
          }),
          body: z
            .object({
              date: z.string().datetime().optional(),
              startTime: z.string().datetime().optional(),
              endTime: z.string().datetime().optional(),
              status: z.string().optional(),
              location: z.string().nullish().optional(),
              capacity: z.number().int().nullish().optional(),
              trainingGroupId: z.string().uuid().optional(),
              instructorMemberId: z.string().uuid().nullish().optional(),
            })
            .partial(),
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

        if (cannot('update', 'ClassSession')) {
          throw new UnauthorizedError(
            `You're not allowed to update this class session.`
          )
        }

        const {
          date,
          startTime,
          endTime,
          status,
          location,
          capacity,
          trainingGroupId,
          instructorMemberId,
        } = request.body

        if (trainingGroupId) {
          const trainingGroup = await prisma.trainingGroup.findUnique({
            where: { id: trainingGroupId, academyId: academy.id },
          })
          if (!trainingGroup) {
            throw new BadRequestError(
              'Training group not found in this academy.'
            )
          }
        }

        if (instructorMemberId !== undefined) {
          if (instructorMemberId) {
            const instructor = await prisma.member.findUnique({
              where: { id: instructorMemberId, academyId: academy.id },
            })
            if (!instructor) {
              throw new BadRequestError(
                'Instructor member not found in this academy.'
              )
            }
          }
        }

        await prisma.classSession.update({
          where: { id: classSessionId },
          data: {
            date: date ? new Date(date) : undefined,
            startTime: startTime ? new Date(startTime) : undefined,
            endTime: endTime ? new Date(endTime) : undefined,
            status,
            location,
            capacity,
            trainingGroupId,
            instructorMemberId,
            updatedAt: new Date(),
          },
        })

        return reply.status(204).send()
      }
    )
}

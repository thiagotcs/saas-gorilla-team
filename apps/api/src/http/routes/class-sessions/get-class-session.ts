import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getClassSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/class-sessions/:classSessionId',
      {
        schema: {
          tags: ['Class Sessions'],
          summary: 'Get a specific class session by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            classSessionId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              classSession: z.object({
                id: z.string().uuid(),
                date: z.date(),
                startTime: z.date(),
                endTime: z.date(),
                status: z.string(),
                location: z.string().nullable(),
                capacity: z.number().int().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                trainingGroupId: z.string().uuid(),
                instructorMemberId: z.string().uuid().nullable(),
                academyId: z.string().uuid(),
                trainingGroup: z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                }),
                instructor: z
                  .object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                  })
                  .nullable(),
              }),
            }),
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
          include: {
            trainingGroup: { select: { id: true, name: true } },
            instructor: {
              select: { id: true, user: { select: { name: true } } },
            },
          },
        })

        if (!classSession) {
          throw new BadRequestError(
            'Class session not found or not in this academy.'
          )
        }

        if (cannot('get', 'ClassSession')) {
          throw new UnauthorizedError(
            `You're not allowed to see this class session.`
          )
        }

        const formattedClassSession = {
          ...classSession,
          instructor: classSession.instructor
            ? {
                id: classSession.instructor.id,
                name: classSession.instructor.user?.name ?? null,
              }
            : null,
        }

        return reply.send({
          classSession: formattedClassSession,
        })
      }
    )
}

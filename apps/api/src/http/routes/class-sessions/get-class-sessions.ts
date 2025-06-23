import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function getClassSessions(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/class-sessions',
      {
        schema: {
          tags: ['Class Sessions'],
          summary: 'Get all class sessions in an academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            date: z.string().datetime().optional(),
            trainingGroupId: z.string().uuid().optional(),
          }),
          response: {
            200: z.object({
              classSessions: z.array(
                z.object({
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
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'ClassSession')) {
          throw new UnauthorizedError(
            `You're not allowed to see class sessions in this academy.`
          )
        }

        const { date, trainingGroupId } = request.query

        const where: any = { academyId: academy.id }
        if (date) {
          const startOfDay = new Date(date)
          startOfDay.setUTCHours(0, 0, 0, 0)
          const endOfDay = new Date(date)
          endOfDay.setUTCHours(23, 59, 59, 999)

          where.date = {
            gte: startOfDay,
            lte: endOfDay,
          }
        }
        if (trainingGroupId) {
          where.trainingGroupId = trainingGroupId
        }

        const classSessions = await prisma.classSession.findMany({
          where,
          include: {
            trainingGroup: {
              select: { id: true, name: true },
            },
            instructor: {
              select: { id: true, user: { select: { name: true } } },
            },
          },
          orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        })

        const formattedClassSessions = classSessions.map((cs) => ({
          ...cs,
          instructor: cs.instructor
            ? { id: cs.instructor.id, name: cs.instructor.user?.name ?? null }
            : null,
        }))

        return reply.send({
          classSessions: formattedClassSessions,
        })
      }
    )
}

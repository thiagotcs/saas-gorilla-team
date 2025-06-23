import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function getAttendances(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/attendances',
      {
        schema: {
          tags: ['Attendances'],
          summary: 'Get all attendances in an academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            classSessionId: z.string().uuid().optional(),
            studentMemberId: z.string().uuid().optional(),
            status: z.string().optional(),
          }),
          response: {
            200: z.object({
              attendances: z.array(
                z.object({
                  id: z.string().uuid(),
                  checkInTime: z.date(),
                  checkOutTime: z.date().nullable(),
                  status: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  studentMemberId: z.string().uuid(),
                  classSessionId: z.string().uuid(),
                  academyId: z.string().uuid(),
                  student: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    email: z.string().email().nullable(),
                  }),
                  classSession: z.object({
                    id: z.string().uuid(),
                    date: z.date(),
                    startTime: z.date(),
                    trainingGroup: z.object({
                      name: z.string(),
                    }),
                  }),
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

        if (cannot('get', 'Attendance')) {
          throw new UnauthorizedError(
            `You're not allowed to see attendances in this academy.`
          )
        }

        const { classSessionId, studentMemberId, status } = request.query

        const where: any = { academyId: academy.id }
        if (classSessionId) {
          where.classSessionId = classSessionId
        }
        if (studentMemberId) {
          where.studentMemberId = studentMemberId
        }
        if (status) {
          where.status = status
        }

        const attendances = await prisma.attendance.findMany({
          where,
          include: {
            student: {
              select: {
                id: true,
                user: {
                  select: { name: true, email: true },
                },
              },
            },
            classSession: {
              select: {
                id: true,
                date: true,
                startTime: true,
                trainingGroup: {
                  select: { name: true },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        })

        const formattedAttendances = attendances.map((att) => ({
          ...att,
          student: {
            id: att.student.id,
            name: att.student.user?.name ?? null,
            email: att.student.user?.email ?? null,
          },
          classSession: {
            id: att.classSession.id,
            date: att.classSession.date,
            startTime: att.classSession.startTime,
            trainingGroup: {
              name: att.classSession.trainingGroup.name,
            },
          },
        }))

        return reply.send({
          attendances: formattedAttendances,
        })
      }
    )
}

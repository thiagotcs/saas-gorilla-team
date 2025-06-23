import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function createAttendance(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/class-sessions/:classSessionId/attendances',
      {
        schema: {
          tags: ['Attendances'],
          summary: 'Register attendance for a class session',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            classSessionId: z.string().uuid(),
          }),
          body: z.object({
            studentMemberId: z.string().uuid(),
            checkInTime: z.string().datetime().optional(),
            status: z.string().default('PRESENT'),
          }),
          response: {
            201: z.object({
              attendanceId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, classSessionId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Attendance')) {
          throw new UnauthorizedError(
            `You're not allowed to register attendance.`
          )
        }

        const { studentMemberId, checkInTime, status } = request.body

        const classSession = await prisma.classSession.findUnique({
          where: { id: classSessionId, academyId: academy.id },
        })
        if (!classSession) {
          throw new BadRequestError('Class session not found in this academy.')
        }

        const student = await prisma.member.findUnique({
          where: { id: studentMemberId, academyId: academy.id },
        })
        if (!student) {
          throw new BadRequestError('Student member not found in this academy.')
        }

        const existingAttendance = await prisma.attendance.findUnique({
          where: {
            studentMemberId_classSessionId: {
              studentMemberId,
              classSessionId,
            },
          },
        })
        if (existingAttendance) {
          throw new BadRequestError(
            'Attendance already registered for this student in this session.'
          )
        }

        const attendance = await prisma.attendance.create({
          data: {
            classSessionId,
            studentMemberId,
            checkInTime: checkInTime ? new Date(checkInTime) : new Date(),
            status,
            academyId: academy.id,
          },
        })

        return reply.status(201).send({
          attendanceId: attendance.id,
        })
      }
    )
}

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function updateAttendance(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug/attendances/:attendanceId',
      {
        schema: {
          tags: ['Attendances'],
          summary: 'Update an attendance record',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            attendanceId: z.string().uuid(),
          }),
          body: z
            .object({
              checkOutTime: z.string().datetime().nullish().optional(),
              status: z.string().optional(),
            })
            .partial(),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, attendanceId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const attendance = await prisma.attendance.findUnique({
          where: { id: attendanceId, academyId: academy.id },
        })

        if (!attendance) {
          throw new BadRequestError(
            'Attendance record not found or not in this academy.'
          )
        }

        if (cannot('update', 'Attendance')) {
          throw new UnauthorizedError(
            `You're not allowed to update this attendance record.`
          )
        }

        const { checkOutTime, status } = request.body

        await prisma.attendance.update({
          where: { id: attendanceId },
          data: {
            checkOutTime: checkOutTime ? new Date(checkOutTime) : undefined,
            status,
            updatedAt: new Date(),
          },
        })

        return reply.status(204).send()
      }
    )
}

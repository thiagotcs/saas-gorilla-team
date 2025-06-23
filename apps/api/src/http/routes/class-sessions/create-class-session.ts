import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function createClassSession(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/class-sessions',
      {
        schema: {
          tags: ['Class Sessions'],
          summary: 'Create a new class session',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            date: z.string().datetime(), // Ex: "2025-06-22T00:00:00.000Z"
            startTime: z.string().datetime(), // Ex: "1970-01-01T10:00:00.000Z" (apenas o horário importa)
            endTime: z.string().datetime(), // Ex: "1970-01-01T11:00:00.000Z"
            status: z.string(), // Ex: "SCHEDULED"
            location: z.string().nullish(),
            capacity: z.number().int().nullish(),
            trainingGroupId: z.string().uuid(),
            instructorMemberId: z.string().uuid().nullish(),
          }),
          response: {
            201: z.object({
              classSessionId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'ClassSession')) {
          throw new UnauthorizedError(
            `You're not allowed to create class sessions.`
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

        // Optional: Validate if trainingGroupId and instructorMemberId exist and belong to the academy
        const trainingGroup = await prisma.trainingGroup.findUnique({
          where: { id: trainingGroupId, academyId: academy.id },
        })
        if (!trainingGroup) {
          throw new BadRequestError('Training group not found in this academy.')
        }

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

        const classSession = await prisma.classSession.create({
          data: {
            date: new Date(date),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status,
            location,
            capacity,
            academyId: academy.id,
            trainingGroupId,
            instructorMemberId,
          },
        })

        return reply.status(201).send({
          classSessionId: classSession.id,
        })
      }
    )
}

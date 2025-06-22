import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'

export async function getAcademyBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/billing',
      {
        schema: {
          tags: ['Billing'],
          summary: 'Get billing information from academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number().min(0),
                  unit: z.number().min(0),
                  price: z.number().min(0),
                }),
                plan: z.object({
                  amount: z.number().min(0),
                  unit: z.number().min(0),
                  price: z.number().min(0),
                }),
                total: z.number().min(0),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Billing')) {
          throw new UnauthorizedError(
            `You're not allowed to get billing details from this academy.`
          )
        }

        const [amountOfMembers, amountOfTrainingGroups] = await Promise.all([
          prisma.member.count({
            where: {
              academyId: academy.id,
              role: {
                not: 'BILLING',
              },
            },
          }),
          prisma.trainingGroup.count({
            where: {
              academyId: academy.id,
            },
          }),
        ])

        return {
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: 180,
              price: amountOfMembers * 180,
            },
            plan: {
              amount: amountOfTrainingGroups,
              unit: 20,
              price: amountOfTrainingGroups * 20,
            },
            total: amountOfMembers * 10 + amountOfTrainingGroups * 20,
          },
        }
      }
    )
}

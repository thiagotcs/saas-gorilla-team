import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function getSubscriptionPlans(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/subscription-plans',
      {
        schema: {
          tags: ['Subscription Plans'],
          summary: 'Get all subscription plans in an academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            isActive: z.boolean().optional(),
          }),
          response: {
            200: z.object({
              subscriptionPlans: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  price: z.number(),
                  durationInMonths: z.number().int().nullable(),
                  description: z.string().nullable(),
                  isActive: z.boolean(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  academyId: z.string().uuid(),
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

        if (cannot('get', 'SubscriptionPlan')) {
          throw new UnauthorizedError(
            `You're not allowed to see subscription plans in this academy.`
          )
        }

        const { isActive } = request.query

        const where: any = { academyId: academy.id }
        if (typeof isActive === 'boolean') {
          where.isActive = isActive
        }

        const subscriptionPlans = await prisma.subscriptionPlan.findMany({
          where,
          orderBy: { name: 'asc' },
        })

        return reply.send({
          subscriptionPlans: subscriptionPlans.map((plan) => ({
            ...plan,
            price:
              typeof plan.price === 'number' ? plan.price : Number(plan.price),
          })),
        })
      }
    )
}

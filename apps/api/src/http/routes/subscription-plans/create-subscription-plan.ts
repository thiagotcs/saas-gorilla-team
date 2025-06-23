import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function createSubscriptionPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/subscription-plans',
      {
        schema: {
          tags: ['Subscription Plans'],
          summary: 'Create a new subscription plan',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            name: z.string(),
            price: z.number(),
            durationInMonths: z.number().int().nullish(),
            description: z.string().nullish(),
            isActive: z.boolean().default(true),
          }),
          response: {
            201: z.object({
              subscriptionPlanId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'SubscriptionPlan')) {
          throw new UnauthorizedError(
            `You're not allowed to create subscription plans.`
          )
        }

        const { name, price, durationInMonths, description, isActive } =
          request.body

        const subscriptionPlan = await prisma.subscriptionPlan.create({
          data: {
            name,
            price,
            durationInMonths,
            description,
            isActive,
            academyId: academy.id,
          },
        })

        return reply.status(201).send({
          subscriptionPlanId: subscriptionPlan.id,
        })
      }
    )
}

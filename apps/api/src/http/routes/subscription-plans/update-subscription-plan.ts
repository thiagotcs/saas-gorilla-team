import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function updateSubscriptionPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug/subscription-plans/:subscriptionPlanId',
      {
        schema: {
          tags: ['Subscription Plans'],
          summary: 'Update a subscription plan',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            subscriptionPlanId: z.string().uuid(),
          }),
          body: z
            .object({
              name: z.string().optional(),
              price: z.number().optional(),
              durationInMonths: z.number().int().nullish().optional(),
              description: z.string().nullish().optional(),
              isActive: z.boolean().optional(),
            })
            .partial(),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, subscriptionPlanId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
          where: { id: subscriptionPlanId, academyId: academy.id },
        })

        if (!subscriptionPlan) {
          throw new BadRequestError(
            'Subscription plan not found or not in this academy.'
          )
        }

        if (cannot('update', 'SubscriptionPlan')) {
          throw new UnauthorizedError(
            `You're not allowed to update this subscription plan.`
          )
        }

        const { name, price, durationInMonths, description, isActive } =
          request.body

        await prisma.subscriptionPlan.update({
          where: { id: subscriptionPlanId },
          data: {
            name,
            price,
            durationInMonths,
            description,
            isActive,
            updatedAt: new Date(),
          },
        })

        return reply.status(204).send()
      }
    )
}

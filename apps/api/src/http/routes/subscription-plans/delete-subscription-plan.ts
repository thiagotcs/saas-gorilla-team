import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function deleteSubscriptionPlan(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/academys/:slug/subscription-plans/:subscriptionPlanId',
      {
        schema: {
          tags: ['Subscription Plans'],
          summary: 'Delete a subscription plan',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            subscriptionPlanId: z.string().uuid(),
          }),
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

        if (cannot('delete', 'SubscriptionPlan')) {
          throw new UnauthorizedError(
            `You're not allowed to delete this subscription plan.`
          )
        }

        // Prevenir exclusão se houver assinaturas ativas associadas
        const activeSubscriptions = await prisma.subscription.count({
          where: {
            subscriptionPlanId,
            status: { in: ['ACTIVE', 'PAUSED'] }, // Ajuste os status conforme sua lógica
          },
        })

        if (activeSubscriptions > 0) {
          throw new BadRequestError(
            'Cannot delete subscription plan with active or paused subscriptions.'
          )
        }

        await prisma.subscriptionPlan.delete({
          where: { id: subscriptionPlanId },
        })

        return reply.status(204).send()
      }
    )
}

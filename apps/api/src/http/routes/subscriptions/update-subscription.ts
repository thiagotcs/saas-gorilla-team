import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function updateSubscription(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/academys/:slug/subscriptions/:subscriptionId',
      {
        schema: {
          tags: ['Subscriptions'],
          summary: 'Update a subscription',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            subscriptionId: z.string().uuid(),
          }),
          body: z
            .object({
              endDate: z.string().datetime().nullish().optional(),
              status: z.string().optional(),
              paymentProviderRef: z.string().nullish().optional(),
              paymentProvider: z.string().nullish().optional(),
            })
            .partial(),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, subscriptionId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const subscription = await prisma.subscription.findUnique({
          where: { id: subscriptionId, academyId: academy.id },
        })

        if (!subscription) {
          throw new BadRequestError(
            'Subscription not found or not in this academy.'
          )
        }

        if (cannot('update', 'Subscription')) {
          throw new UnauthorizedError(
            `You're not allowed to update this subscription.`
          )
        }

        const { endDate, status, paymentProviderRef, paymentProvider } =
          request.body

        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: {
            endDate: endDate ? new Date(endDate) : undefined,
            status,
            paymentProviderRef,
            paymentProvider,
            updatedAt: new Date(),
          },
        })

        return reply.status(204).send()
      }
    )
}

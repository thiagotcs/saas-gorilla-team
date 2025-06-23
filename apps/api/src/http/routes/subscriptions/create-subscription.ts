import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function createSubscription(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/subscriptions',
      {
        schema: {
          tags: ['Subscriptions'],
          summary: 'Create a new subscription for a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            memberId: z.string().uuid(),
            subscriptionPlanId: z.string().uuid(),
            startDate: z.string().datetime(),
            endDate: z.string().datetime().nullish().optional(),
            status: z.string().default('ACTIVE'),
            paymentProviderRef: z.string().nullish().optional(),
            paymentProvider: z.string().nullish().optional(),
          }),
          response: {
            201: z.object({
              subscriptionId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Subscription')) {
          throw new UnauthorizedError(
            `You're not allowed to create subscriptions.`
          )
        }

        const {
          memberId,
          subscriptionPlanId,
          startDate,
          endDate,
          status,
          paymentProviderRef,
          paymentProvider,
        } = request.body

        const member = await prisma.member.findUnique({
          where: { id: memberId, academyId: academy.id },
        })
        if (!member) {
          throw new BadRequestError('Member not found in this academy.')
        }

        const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
          where: { id: subscriptionPlanId, academyId: academy.id },
        })
        if (!subscriptionPlan) {
          throw new BadRequestError(
            'Subscription plan not found in this academy.'
          )
        }

        const existingActiveSubscription = await prisma.subscription.findFirst({
          where: {
            memberId,
            status: 'ACTIVE',
          },
        })
        if (existingActiveSubscription) {
          throw new BadRequestError(
            'Member already has an active subscription.'
          )
        }

        const subscription = await prisma.subscription.create({
          data: {
            memberId,
            subscriptionPlanId,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            status,
            paymentProviderRef,
            paymentProvider,
            academyId: academy.id,
          },
        })

        return reply.status(201).send({
          subscriptionId: subscription.id,
        })
      }
    )
}

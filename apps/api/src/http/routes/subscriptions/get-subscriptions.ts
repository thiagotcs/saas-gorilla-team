import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function getSubscriptions(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/subscriptions',
      {
        schema: {
          tags: ['Subscriptions'],
          summary: 'Get all subscriptions in an academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            memberId: z.string().uuid().optional(),
            status: z.string().optional(),
          }),
          response: {
            200: z.object({
              subscriptions: z.array(
                z.object({
                  id: z.string().uuid(),
                  startDate: z.date(),
                  endDate: z.date().nullable(),
                  status: z.string(),
                  paymentProviderRef: z.string().nullable(),
                  paymentProvider: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  memberId: z.string().uuid(),
                  subscriptionPlanId: z.string().uuid(),
                  academyId: z.string().uuid(),
                  member: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    email: z.string().email().nullable(),
                  }),
                  subscriptionPlan: z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    price: z.number(),
                  }),
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

        if (cannot('get', 'Subscription')) {
          throw new UnauthorizedError(
            `You're not allowed to see subscriptions in this academy.`
          )
        }

        const { memberId, status } = request.query

        const where: any = { academyId: academy.id }
        if (memberId) {
          where.memberId = memberId
        }
        if (status) {
          where.status = status
        }

        const subscriptions = await prisma.subscription.findMany({
          where,
          include: {
            member: {
              select: {
                id: true,
                user: { select: { name: true, email: true } },
              },
            },
            subscriptionPlan: {
              select: { id: true, name: true, price: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        })

        const formattedSubscriptions = subscriptions.map((sub) => ({
          ...sub,
          member: {
            id: sub.member.id,
            name: sub.member.user?.name ?? null,
            email: sub.member.user?.email ?? null,
          },
          subscriptionPlan: {
            ...sub.subscriptionPlan,
            price:
              typeof sub.subscriptionPlan.price === 'number'
                ? sub.subscriptionPlan.price
                : Number(sub.subscriptionPlan.price),
          },
        }))

        return reply.send({
          subscriptions: formattedSubscriptions,
        })
      }
    )
}

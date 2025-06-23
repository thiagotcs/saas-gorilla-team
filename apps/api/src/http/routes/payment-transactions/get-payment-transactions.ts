import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'

export async function getPaymentTransactions(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/payment-transactions',
      {
        schema: {
          tags: ['Payment Transactions'],
          summary: 'Get all payment transactions in an academy',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          querystring: z.object({
            subscriptionId: z.string().uuid().optional(),
            status: z.string().optional(),
            type: z.string().optional(),
            // startDate: z.string().datetime().optional(), // Filter by date range
            // endDate: z.string().datetime().optional(),
          }),
          response: {
            200: z.object({
              paymentTransactions: z.array(
                z.object({
                  id: z.string().uuid(),
                  amount: z.number(),
                  currency: z.string(),
                  status: z.string(),
                  type: z.string(),
                  transactionDate: z.date(),
                  externalRef: z.string().nullable(),
                  description: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  subscriptionId: z.string().uuid().nullable(),
                  academyId: z.string().uuid(),
                  subscription: z
                    .object({
                      id: z.string().uuid(),
                      member: z.object({
                        id: z.string().uuid(),
                        name: z.string().nullable(),
                      }),
                    })
                    .nullable(),
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

        if (cannot('get', 'PaymentTransaction')) {
          throw new UnauthorizedError(
            `You're not allowed to see payment transactions in this academy.`
          )
        }

        const { subscriptionId, status, type } = request.query

        const where: any = { academyId: academy.id }
        if (subscriptionId) {
          where.subscriptionId = subscriptionId
        }
        if (status) {
          where.status = status
        }
        if (type) {
          where.type = type
        }

        const paymentTransactions = await prisma.paymentTransaction.findMany({
          where,
          include: {
            subscription: {
              select: {
                id: true,
                member: {
                  select: { id: true, user: { select: { name: true } } },
                },
              },
            },
          },
          orderBy: { transactionDate: 'desc' },
        })

        const formattedPaymentTransactions = paymentTransactions.map((pt) => ({
          ...pt,
          amount:
            typeof pt.amount === 'object' &&
            pt.amount !== null &&
            'toNumber' in pt.amount
              ? (pt.amount as any).toNumber()
              : pt.amount,
          subscription: pt.subscription
            ? {
                id: pt.subscription.id,
                member: {
                  id: pt.subscription.member.id,
                  name: pt.subscription.member.user?.name ?? null,
                },
              }
            : null,
        }))

        return reply.send({
          paymentTransactions: formattedPaymentTransactions,
        })
      }
    )
}

import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getPaymentTransaction(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/academys/:slug/payment-transactions/:paymentTransactionId',
      {
        schema: {
          tags: ['Payment Transactions'],
          summary: 'Get a specific payment transaction by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            paymentTransactionId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              paymentTransaction: z.object({
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
                      email: z.string().email().nullable(),
                    }),
                  })
                  .nullable(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug, paymentTransactionId } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        const paymentTransaction = await prisma.paymentTransaction.findUnique({
          where: { id: paymentTransactionId, academyId: academy.id },
          include: {
            subscription: {
              select: {
                id: true,
                member: {
                  select: {
                    id: true,
                    userId: true,
                    user: { select: { name: true, email: true } },
                  },
                },
              },
            },
          },
        })

        if (!paymentTransaction) {
          throw new BadRequestError(
            'Payment transaction not found or not in this academy.'
          )
        }

        if (cannot('get', 'PaymentTransaction')) {
          throw new UnauthorizedError(
            `You're not allowed to see this payment transaction.`
          )
        }

        const formattedPaymentTransaction = {
          ...paymentTransaction,
          amount:
            typeof paymentTransaction.amount === 'object' &&
            'toNumber' in paymentTransaction.amount
              ? paymentTransaction.amount.toNumber()
              : paymentTransaction.amount,
          subscription: paymentTransaction.subscription
            ? {
                id: paymentTransaction.subscription.id,
                member: {
                  id: paymentTransaction.subscription.member?.id ?? '',
                  name:
                    paymentTransaction.subscription.member?.user?.name ?? null,
                  email:
                    paymentTransaction.subscription.member?.user?.email ?? null,
                },
              }
            : null,
        }

        return reply.send({
          paymentTransaction: formattedPaymentTransaction,
        })
      }
    )
}

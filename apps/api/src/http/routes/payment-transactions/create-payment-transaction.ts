import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function createPaymentTransaction(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/academys/:slug/payment-transactions',
      {
        schema: {
          tags: ['Payment Transactions'],
          summary: 'Create a new payment transaction',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            amount: z.number(),
            currency: z.string().default('BRL'),
            status: z.string().default('COMPLETED'),
            type: z.string(),
            transactionDate: z.string().datetime().optional(),
            externalRef: z.string().nullish().optional(),
            description: z.string().nullish().optional(),
            subscriptionId: z.string().uuid(),
          }),
          response: {
            201: z.object({
              paymentTransactionId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { academy, membership } = await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'PaymentTransaction')) {
          throw new UnauthorizedError(
            `You're not allowed to create payment transactions.`
          )
        }

        const {
          amount,
          currency,
          status,
          type,
          transactionDate,
          externalRef,
          description,
          subscriptionId,
        } = request.body

        if (subscriptionId) {
          const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId, academyId: academy.id },
          })
          if (!subscription) {
            throw new BadRequestError('Subscription not found in this academy.')
          }
        }

        const paymentTransaction = await prisma.paymentTransaction.create({
          data: {
            amount,
            currency,
            status,
            type,
            transactionDate: transactionDate
              ? new Date(transactionDate)
              : new Date(),
            externalRef,
            description,
            subscriptionId,
            academyId: academy.id,
          },
        })

        return reply.status(201).send({
          paymentTransactionId: paymentTransaction.id,
        })
      }
    )
}

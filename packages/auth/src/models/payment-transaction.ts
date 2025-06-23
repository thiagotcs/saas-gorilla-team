import { z } from 'zod'

export const paymentTransactionSchema = z.object({
  __typename: z.literal('PaymentTransaction').default('PaymentTransaction'),
  id: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  type: z.string(),
  transactionDate: z.string().datetime(),
  externalRef: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  subscriptionId: z.string().uuid(),
  academyId: z.string().uuid(),
  memberId: z.string().uuid().optional(),
})

export type PaymentTransaction = z.infer<typeof paymentTransactionSchema>

import { z } from 'zod'

export const subscriptionSchema = z.object({
  __typename: z.literal('Subscription').default('Subscription'),
  id: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullable().optional(),
  status: z.string(),
  paymentProviderRef: z.string().nullable().optional(),
  paymentProvider: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  memberId: z.string().uuid(),
  subscriptionPlanId: z.string().uuid(),
  academyId: z.string().uuid(),
})

export type Subscription = z.infer<typeof subscriptionSchema>

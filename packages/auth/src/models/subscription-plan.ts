import { z } from 'zod'

export const subscriptionPlanSchema = z.object({
  __typename: z.literal('SubscriptionPlan').default('SubscriptionPlan'),
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  durationInMonths: z.number().int().nullable().optional(),
  description: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  academyId: z.string().uuid(),
})

export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>

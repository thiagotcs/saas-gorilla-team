import { z } from 'zod'
import { subscriptionPlanSchema } from '../models/subscription-plan'

export const subscriptionPlanSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('SubscriptionPlan'), subscriptionPlanSchema]),
])

export type SubscriptionPlanSubject = z.infer<typeof subscriptionPlanSubject>

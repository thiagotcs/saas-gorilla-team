import { z } from 'zod'
import { subscriptionSchema } from '../models/subscription'

export const subscriptionSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Subscription'), subscriptionSchema]),
])

export type SubscriptionSubject = z.infer<typeof subscriptionSubject>

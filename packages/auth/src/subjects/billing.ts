import { z } from 'zod'

export const billingSubject = z.tuple([
  z.union([
    z.literal('export'),
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Billing'),
])

export type BillingSubject = z.infer<typeof billingSubject>

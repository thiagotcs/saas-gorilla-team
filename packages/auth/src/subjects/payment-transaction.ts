import { z } from 'zod'
import { paymentTransactionSchema } from '../models/payment-transaction'

export const paymentTransactionSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('PaymentTransaction'), paymentTransactionSchema]),
])

export type PaymentTransactionSubject = z.infer<
  typeof paymentTransactionSubject
>

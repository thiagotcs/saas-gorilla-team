import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('create'),
  ]),
  z.literal('User'),
])

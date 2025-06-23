import { z } from 'zod'
import { userSchema } from '../models/user'

export const userSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('User'), userSchema]),
])

export type UserSubject = z.infer<typeof userSubject>

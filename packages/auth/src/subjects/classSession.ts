import { z } from 'zod'
import { classSessionSchema } from '../models/class-session'

export const classSessionSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('view'),
  ]),
  z.union([z.literal('ClassSession'), classSessionSchema]),
])

export type ClassSessionSubject = z.infer<typeof classSessionSubject>

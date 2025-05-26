import { z } from 'zod'

export const classSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Class'),
])

export type ClassSubject = z.infer<typeof classSubject>

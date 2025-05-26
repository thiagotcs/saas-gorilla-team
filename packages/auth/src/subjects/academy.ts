import { z } from 'zod'
import { academySchema } from '../models/academy'

export const academySubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Academy'), academySchema]),
])

export type AcademySubject = z.infer<typeof academySubject>

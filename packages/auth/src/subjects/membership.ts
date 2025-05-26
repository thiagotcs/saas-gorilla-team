import { z } from 'zod'

export const membershipSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  z.literal('Invite'),
])

export type MembershipSubject = z.infer<typeof membershipSubject>

import { z } from 'zod'

export const membershipSchema = z.object({
  __typename: z.literal('Membership').default('Membership'),
  userId: z.string(),
  academyId: z.string(),
  role: z.string(),
})

export type Membership = z.infer<typeof membershipSchema>

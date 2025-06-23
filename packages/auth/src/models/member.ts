import { z } from 'zod'
import { roleSchema } from '../roles'

export const memberSchema = z.object({
  __typename: z.literal('Member').default('Member'),
  id: z.string().uuid(),
  role: roleSchema,
  academyId: z.string().uuid(),
  userId: z.string().uuid(),
})

export type Member = z.infer<typeof memberSchema>

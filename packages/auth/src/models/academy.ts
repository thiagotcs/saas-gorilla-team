import { z } from 'zod'

export const academySchema = z.object({
  __typename: z.literal('Academy').default('Academy'),
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
  cnpj: z.string().optional(),
})

export type Academy = z.infer<typeof academySchema>

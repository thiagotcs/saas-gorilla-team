import { z } from 'zod'

export const trainingGroupSchema = z.object({
  __typename: z.literal('TrainingGroup').default('TrainingGroup'),
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  avatarUrl: z.string().url().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  academyId: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type TrainingGroup = z.infer<typeof trainingGroupSchema>

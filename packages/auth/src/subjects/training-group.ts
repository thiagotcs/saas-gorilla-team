import { z } from 'zod'
import { trainingGroupSchema } from '../models/training-group'

export const trainingGroupSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('TrainingGroup'), trainingGroupSchema]),
])

export type TrainingGroupSubject = z.infer<typeof trainingGroupSubject>

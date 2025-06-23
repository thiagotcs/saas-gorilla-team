import { z } from 'zod'

export const classSessionSchema = z.object({
  __typename: z.literal('ClassSession').default('ClassSession'),
  id: z.string().uuid(), // Assumindo que o ID é um UUID
  date: z.string().datetime(), // Mapeia o @db.Date como string ISO (ex: "2025-06-22T00:00:00.000Z")
  startTime: z.string().datetime(), // Mapeia o @db.Time(4) como string ISO (ex: "1970-01-01T10:00:00.000Z")
  endTime: z.string().datetime(), // Mapeia o @db.Time(4) como string ISO
  status: z.string(), // Ex: "SCHEDULED", "COMPLETED", "CANCELED"
  location: z.string().nullable().optional(),
  capacity: z.number().int().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  trainingGroupId: z.string().uuid(),
  instructorMemberId: z.string().uuid().nullable().optional(),
  academyId: z.string().uuid(),
})

export type ClassSession = z.infer<typeof classSessionSchema>

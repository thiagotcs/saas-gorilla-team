import { z } from 'zod'

export const attendanceSchema = z.object({
  __typename: z.literal('Attendance').default('Attendance'),
  id: z.string().uuid(),
  checkInTime: z.string().datetime(),
  checkOutTime: z.string().datetime().nullable().optional(),
  status: z.string(), // Ex: "PRESENT", "ABSENT", "LATE", "EXCUSED"
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  studentMemberId: z.string().uuid(),
  classSessionId: z.string().uuid(),
  academyId: z.string().uuid(), // Campo para o isolamento
})

export type Attendance = z.infer<typeof attendanceSchema>

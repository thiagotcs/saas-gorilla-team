import { z } from 'zod'
import { attendanceSchema } from '../models/attendance'

export const attendanceSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Attendance'), attendanceSchema]),
])

export type AttendanceSubject = z.infer<typeof attendanceSubject>

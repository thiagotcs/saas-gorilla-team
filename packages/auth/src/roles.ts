import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('ADMIN'), // dono da academia
  z.literal('INSTRUTOR'), // professor
  z.literal('RECEPCAO'), // gerência/admin local
  z.literal('ALUNO'), // praticante
  z.literal('RESPONSAVEL'), // pai/mãe ou tutor
  z.literal('LEAD'), // interessado/contato
])

export type Role = z.infer<typeof roleSchema>

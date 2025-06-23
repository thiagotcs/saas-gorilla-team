import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

interface UserWithContext extends User {
  academyId?: string
  memberId?: string
}
type PermissionsByRole = (
  user: UserWithContext,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  INSTRUTOR(user, { can }) {
    can('manage', 'TrainingGroup', { academyId: { $eq: user.academyId } })
    can('manage', 'ClassSession', { academyId: { $eq: user.academyId } })
    can('manage', 'ClassSession', {
      instructorMemberId: { $eq: user.memberId },
    })
    can(['create', 'get', 'update'], 'Attendance', {
      academyId: { $eq: user.academyId },
    })
    can('get', 'Member', {
      academyId: { $eq: user.academyId },
      role: 'ALUNO',
    })
    can('get', 'User')
  },
  RECEPCAO(user, { can }) {
    can('manage', 'Member', { academyId: { $eq: user.academyId } })
    can('get', 'User')
    can('manage', 'TrainingGroup', { academyId: { $eq: user.academyId } })
    can('manage', 'ClassSession', { academyId: { $eq: user.academyId } })
    can('manage', 'Attendance', { academyId: { $eq: user.academyId } })
    can(['create', 'get', 'update'], 'SubscriptionPlan', {
      academyId: { $eq: user.academyId },
    })
    can('manage', 'Subscription', { academyId: { $eq: user.academyId } })
    can('get', 'PaymentTransaction', { academyId: { $eq: user.academyId } })
  },
  ALUNO(user, { can }) {
    can('get', 'User', { id: { $eq: user.id } })
    can('get', 'Member', { id: { $eq: user.memberId } })
    can('get', 'Academy', { id: { $eq: user.academyId } })
    can('get', 'TrainingGroup', { academyId: { $eq: user.academyId } })
    can('get', 'ClassSession', { academyId: { $eq: user.academyId } })
    can('get', 'Attendance', { studentMemberId: { $eq: user.memberId } })
    can('get', 'Subscription', { memberId: { $eq: user.memberId } })
    can('get', 'PaymentTransaction', { memberId: { $eq: user.memberId } })
  },
  RESPONSAVEL(user, { can }) {
    can('get', 'Academy', { id: { $eq: user.academyId } })
    can('get', 'TrainingGroup', { academyId: { $eq: user.academyId } })
    can('get', 'ClassSession', { academyId: { $eq: user.academyId } })
    can('get', 'User')
    can('get', 'Member')
  },
  LEAD(_, { can }) {
    can('create', 'User')
    can('get', 'Academy')
  },
  MEMBER(user, { can }) {
    // Role básica para qualquer membro que não se encaixa em outra role específica.
    // Geralmente, apenas permissões de get do seu próprio contexto.
    can('get', 'User', { id: { $eq: user.id } })
    can('get', 'Member', { id: { $eq: user.memberId } })
    can('get', 'Academy', { id: { $eq: user.academyId } })
    can('get', 'TrainingGroup', { academyId: { $eq: user.academyId } })
  },
  BILLING(user, { can }) {
    // Focada em dados financeiros e administrativos
    can('get', 'Academy', { id: { $eq: user.academyId } })
    can('get', 'SubscriptionPlan', { academyId: { $eq: user.academyId } })
    can('get', 'Subscription', { academyId: { $eq: user.academyId } })
    can('get', 'PaymentTransaction', { academyId: { $eq: user.academyId } })
    // Pode ser necessário get dados de membros para reconciliação financeira
    can('get', 'Member', { academyId: { $eq: user.academyId } })
  },
}

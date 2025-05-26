import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  INSTRUTOR(_, { can }) {
    // can(['get', 'update'], 'User', { role: { $eq: 'ALUNO' } })
    can('manage', 'Class')
  },
  RECEPCAO(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Class')
    // can(['update', 'delete'], 'Class', { ownerId: { $eq: user.id } })
  },
  ALUNO(user, { can }) {
    // can('get', 'User', { id: { $eq: user.id } })
    // can('get', 'Class', { ownerId: { $eq: user.id } })
  },
  RESPONSAVEL(_, { can }) {
    can('get', 'User')
    can('get', 'Class')
  },
  LEAD(_, { can }) {
    can('create', 'User')
  },
}

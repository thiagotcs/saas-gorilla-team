import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'
import { User } from './models/user'
import { permissions } from './permissions'
import { userSubject } from './subjects/user'
import { academySubject } from './subjects/academy'
import { roleSchema } from './roles'
import { trainingGroupSubject } from './subjects/training-group'
import { inviteSubject } from './subjects/invite'
import { billingSubject } from './subjects/billing'

export * from './models/academy'
export * from './models/training-group'
export * from './models/membership'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  userSubject,
  academySubject,
  inviteSubject,
  billingSubject,
  trainingGroupSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (!roleSchema.safeParse(user.role).success) {
    console.error('Invalid role received:', user.role)
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      if (typeof subject === 'string') return subject
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}

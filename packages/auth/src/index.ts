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
import { classSubject } from './subjects/class'
import { roleSchema } from './roles'

export * from './models/academy'
export * from './models/membership'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  userSubject,
  academySubject,
  classSubject,
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

  return builder.build({
    detectSubjectType(subject) {
      if (typeof subject === 'string') return subject
      return subject.__typename
    },
  })
}

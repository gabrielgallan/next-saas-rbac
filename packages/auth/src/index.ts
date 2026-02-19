import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { CreateAbility, MongoAbility } from '@casl/ability'

import { permissions } from './permissions'

// -> models
import type { User } from './models/user'

export * from './models/user'
export * from './models/organization'
export * from './models/project'

// -> subjects
import type { UserSubject } from './subjects/user'
import type { ProjectSubject } from './subjects/project'
import type { OrganizationSubject } from './subjects/organization'
import type { InviteSubject } from './subjects/invite'
import type { BillingSubject } from './subjects/billing'


type AppAbilities = 
  | UserSubject 
  | ProjectSubject
  | OrganizationSubject 
  | InviteSubject
  | BillingSubject
  | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found!`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    }
  })

  return ability
}
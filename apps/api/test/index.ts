import { defineAbilityFor, organizationSchema, projectSchema, userSchema } from '@saas/auth'

const user1 = userSchema.parse({
    id: 'user-1',
    role: 'ADMIN'
})

const user2 = userSchema.parse({
    id: 'user-2',
    role: 'ADMIN'
})

const organization = organizationSchema.parse({
    id: 'project-1',
    ownerId: 'user-2'
})

const abilitiesUser1 = defineAbilityFor(user1)
const abilitiesUser2 = defineAbilityFor(user2)

console.log(abilitiesUser1.can('update', organization))
console.log(abilitiesUser2.can('transfer_ownership', organization))
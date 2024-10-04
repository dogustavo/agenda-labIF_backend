import { db } from '~/db'
import { userRoleSchema } from './schemas/UserRoles.schema'

import type { UserRole } from '~/types/userRole.types'
import { eq } from 'drizzle-orm'

export const userRolesModel = {
  create: async ({ role }: UserRole) => {
    return await db.insert(userRoleSchema).values({ role }).execute()
  },
  selectById: async (id: number) => {
    const [userRole] = await db
      .select()
      .from(userRoleSchema)
      .where(eq(userRoleSchema.id, id))

    return userRole
  },
  selectByRole: async ({ role }: UserRole) => {
    const [userRole] = await db
      .select()
      .from(userRoleSchema)
      .where(eq(userRoleSchema.role, role))

    return userRole
  },
  getAll: async () => {
    return await db.select().from(userRoleSchema)
  }
}

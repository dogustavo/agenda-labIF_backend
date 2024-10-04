import { db } from '~/db'
import { userSchema } from './schemas/User.schema'
import type { IUser } from '~/types/user.type'
import { eq } from 'drizzle-orm'
import { userRoleSchema } from './schemas/UserRoles.schema'

export const userModel = {
  getAll: async () => {
    return await db.select().from(userSchema).execute()
  },
  getByID: async (id: number) => {
    const [user] = await db
      .select({
        id: userSchema.id,
        name: userSchema.name,
        role: userRoleSchema.role
      })
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .where(eq(userSchema.id, id))

    return user
  },
  create: async (userData: IUser) => {
    return await db.insert(userSchema).values(userData).execute()
  }
}

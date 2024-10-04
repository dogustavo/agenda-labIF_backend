import { db } from '~/db'
import { userSchema } from './schemas/User.schema'
import type { IUser } from '~/types/user.type'
import { eq } from 'drizzle-orm'
import { userRoleSchema } from './schemas/UserRoles.schema'

const userData = {
  id: userSchema.id,
  name: userSchema.name,
  email: userSchema.email,
  role: userRoleSchema.role
}

interface UserResponse {
  id: number
  name: string
  email: string
  password: string
  role: 'user' | 'approver' | 'admin'
}

export const userModel = {
  getAll: async () => {
    return await db.select().from(userSchema).execute()
  },
  getByID: async (id: number) => {
    const [user] = await db
      .select(userData)
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .where(eq(userSchema.id, id))

    return user
  },
  findByEmail: async (
    username: string
  ): Promise<UserResponse | null> => {
    const [user] = await db
      .select({ ...userData, password: userSchema.password })
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .where(eq(userSchema.email, username))

    return user || null
  },
  create: async (userData: IUser) => {
    return await db.insert(userSchema).values(userData).execute()
  }
}

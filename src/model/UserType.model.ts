import { db } from '~/db'
import { userTypeSchema } from './schemas/UserType.schema'

import type { IUserType } from '~/types/user.type'
import { eq } from 'drizzle-orm'

export const userTypesModel = {
  create: async (userType: IUserType) => {
    return await db.insert(userTypeSchema).values(userType).execute()
  },
  selectById: async (id: number) => {
    const [userRole] = await db
      .select()
      .from(userTypeSchema)
      .where(eq(userTypeSchema.id, id))

    return userRole
  }
}

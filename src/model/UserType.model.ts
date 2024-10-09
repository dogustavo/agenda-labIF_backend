import { db } from '~/db'
import { userTypeSchema } from './schemas/UserType.schema'

import type { IUserType } from '~/types/user.type'
import { and, count, eq, gte, like, lte } from 'drizzle-orm'

type UserTypeFilters = Array<
  | ReturnType<typeof eq>
  | ReturnType<typeof gte>
  | ReturnType<typeof lte>
  | ReturnType<typeof like>
>

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
  },
  getAll: async ({
    filters,
    offset
  }: {
    offset: number
    filters: UserTypeFilters
  }) => {
    return await db
      .select()
      .from(userTypeSchema)
      .where(and(...filters))
      .limit(15)
      .offset(offset)
  },
  getUserTypeCount: async () => {
    return await db.select({ count: count() }).from(userTypeSchema)
  }
}

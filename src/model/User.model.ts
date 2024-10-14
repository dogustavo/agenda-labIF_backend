import { db } from '~/db'
import { userSchema } from './schemas/User.schema'
import type {
  IEditUser,
  IEditUserModel,
  IUserModel
} from '~/types/user.type'
import { and, count, eq, gte, like, lte } from 'drizzle-orm'
import { userRoleSchema } from './schemas/UserRoles.schema'
import { userTypeSchema } from './schemas/UserType.schema'
import { UserRole } from '~/types/userRole.types'

const userData = {
  id: userSchema.id,
  name: userSchema.name,
  email: userSchema.email,
  role: userRoleSchema.role,
  userType: userTypeSchema.description,
  isBlocked: userSchema.isBlocked,
  isReseted: userSchema.isReseted
}

interface UserResponse {
  id: number
  name: string
  email: string
  password: string
  isBlocked?: boolean
  role: 'user' | 'approver' | 'admin'
}

const userSearch = {
  id: userSchema.id,
  name: userSchema.name,
  email: userSchema.email,
  roleId: userRoleSchema.role,
  userTypeId: userSchema.userTypeId
}

type ScheduleFilters = Array<
  | ReturnType<typeof eq>
  | ReturnType<typeof gte>
  | ReturnType<typeof lte>
  | ReturnType<typeof like>
>

export const userModel = {
  create: async (userData: IUserModel) => {
    return await db.insert(userSchema).values(userData).execute()
  },
  getAll: async ({
    pageSize,
    offset,
    filters
  }: {
    pageSize: number
    offset: number
    filters: ScheduleFilters
  }) => {
    return await db
      .select(userData)
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .innerJoin(
        userTypeSchema,
        eq(userSchema.userTypeId, userTypeSchema.id)
      )
      .where(and(...filters))
      .limit(pageSize)
      .offset(offset)
  },
  getByID: async (id: number) => {
    const [user] = await db
      .select(userData)
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .innerJoin(
        userTypeSchema,
        eq(userSchema.userTypeId, userTypeSchema.id)
      )
      .where(eq(userSchema.id, id))

    return user
  },
  getByRole: async ({ role }: UserRole) => {
    const userRole = await db
      .select(userSearch)
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .where(eq(userRoleSchema.role, role))

    return userRole
  },
  findByEmail: async (
    username: string
  ): Promise<UserResponse | null> => {
    const [user] = await db
      .select({
        ...userData,
        password: userSchema.password,
        isBlocked: userSchema.isBlocked
      })
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .innerJoin(
        userTypeSchema,
        eq(userSchema.userTypeId, userTypeSchema.id)
      )
      .where(eq(userSchema.email, username))

    return user || null
  },
  getUserCount: async ({ filters }: { filters: ScheduleFilters }) => {
    return await db
      .select({ count: count() })
      .from(userSchema)
      .innerJoin(
        userRoleSchema,
        eq(userSchema.roleId, userRoleSchema.id)
      )
      .innerJoin(
        userTypeSchema,
        eq(userSchema.userTypeId, userTypeSchema.id)
      )
      .where(and(...filters))
  },
  editUser: async ({
    data,
    id
  }: {
    id: number
    data: IEditUserModel
  }) => {
    return db
      .update(userSchema)
      .set(data)
      .where(eq(userSchema.id, id))
  },
  blockUser: async ({
    userId,
    isBlocked
  }: {
    userId: number
    isBlocked: boolean
  }) => {
    return await db
      .update(userSchema)
      .set({ isBlocked })
      .where(eq(userSchema.id, userId))
  }
}

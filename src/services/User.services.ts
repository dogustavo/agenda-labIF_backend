import { userRolesModel } from '~/model/UserRoles.model'
import { userModel } from '~/model/User.model'
import type {
  IEditUser,
  IUser,
  IUserTypeFind
} from '~/types/user.type'

import { encryptPwd } from '~/utils/encryption'
import { throwError } from '~/utils/error'
import { userTypesModel } from '~/model/UserType.model'
import { UserRole } from '~/types/userRole.types'
import { eq, like, ne } from 'drizzle-orm'
import { userSchema } from '~/model/schemas/User.schema'
import { generateToken } from '~/utils/jwt'

export const userService = {
  getAllUsers: async ({
    query,
    userId
  }: {
    query?: IUserTypeFind
    userId: number
  }) => {
    const page = parseInt(query?.page as string) || 1
    const pageSize = 25
    const offset = (page - 1) * pageSize

    const filters = []

    if (query?.name) {
      filters.push(like(userSchema.name, `%${query.name}%`))
    }
    if (query?.email) {
      filters.push(eq(userSchema.email, query.email))
    }

    filters.push(ne(userSchema.id, userId))
    const users = await userModel.getAll({
      offset,
      pageSize,
      filters
    })

    const totalRecords = await userModel.getUserCount({
      filters
    })

    const totalPages = Math.ceil(totalRecords[0].count / pageSize)

    return {
      data: users,
      meta: {
        totalRecords: totalRecords[0].count,
        totalPages,
        currentPage: page,
        pageSize
      }
    }
  },
  getUserByRole: async ({ role }: UserRole) => {
    const users = await userModel.getByRole({
      role
    })

    return users
  },
  createUser: async ({ user }: { user: IUser }) => {
    const isValidRole = await userRolesModel.selectByRole(user.role)
    const isValidUserType = await userTypesModel.selectByType(
      user.userType
    )

    if (!isValidRole) {
      return throwError({
        message: 'Nível de usuário não encontrado',
        statusCode: 404
      })
    }
    if (!isValidUserType) {
      return throwError({
        message: 'Tipo de usuário não encontrado',
        statusCode: 404
      })
    }

    const { role, userType, ...rest } = user

    const newUser = await userModel.create({
      ...rest,
      roleId: isValidRole.id,
      userTypeId: isValidUserType.id,
      password: encryptPwd(user.password)
    })

    const userResponse = await userModel.getByID(newUser[0].insertId)

    return userResponse
  },
  getUserById: async (id: number) => {
    return await userModel.getByID(id)
  },
  editUser: async ({ user, id }: { user: IEditUser; id: string }) => {
    const isValidRole = await userRolesModel.selectByRole(user.role)
    const isValidUserType = await userTypesModel.selectByType(
      user.userType
    )

    if (!isValidRole) {
      return throwError({
        message: 'Nível de usuário não encontrado',
        statusCode: 404
      })
    }
    if (!isValidUserType) {
      return throwError({
        message: 'Tipo de usuário não encontrado',
        statusCode: 404
      })
    }

    const { role, userType, ...rest } = user

    await userModel.editUser({
      id: Number(id),
      data: {
        ...rest,
        roleId: isValidRole.id,
        userTypeId: isValidUserType.id
      }
    })

    return await userModel.getByID(Number(id))
  },
  blockUser: async ({
    action,
    userId
  }: {
    userId: number
    action: 'block' | 'unblock'
  }) => {
    const user = await userModel.getByID(userId)

    if (!user) {
      return throwError({
        message: 'Usuário não encontrada',
        statusCode: 404
      })
    }

    await userModel.blockUser({
      userId,
      isBlocked: action === 'block'
    })
  },
  resetUserPwd: async ({ userId }: { userId: number }) => {
    const user = await userModel.getByID(userId)

    if (!user) {
      return throwError({
        message: 'Usuário não encontrada',
        statusCode: 404
      })
    }

    await userModel.resetUser({
      userId,
      password: encryptPwd(`${process.env.RESET_USER_DEFAULT_PWD}`)
    })
  },
  updateUserPwd: async ({
    userId,
    password
  }: {
    userId: number
    password: string
  }) => {
    const user = await userModel.getByID(userId)

    if (!user) {
      return throwError({
        message: 'Usuário não encontrada',
        statusCode: 404
      })
    }

    await userModel.updateUserPdw({
      userId,
      password: encryptPwd(password)
    })

    const updatedUser = await userModel.getByID(userId)

    const jwt = generateToken({
      id: userId,
      role: updatedUser.role
    })

    return {
      ...updatedUser,
      token: jwt
    }
  }
}

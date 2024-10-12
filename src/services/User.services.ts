import { userRolesModel } from '~/model/UserRoles.model'
import { userModel } from '~/model/User.model'
import type { IUser } from '~/types/user.type'

import { encryptPwd } from '~/utils/encryption'
import { throwError } from '~/utils/error'
import { userTypesModel } from '~/model/UserType.model'
import { UserRole } from '~/types/userRole.types'

export const userService = {
  getAllUsers: async () => {
    const users = await userModel.getAll()

    return users
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
  }
}

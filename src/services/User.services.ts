import bcrypt from 'bcrypt'

import { userRolesModel } from '~/model/UserRoles.model'
import { userModel } from '~/model/User.model'
import type { IUser } from '~/types/user.type'

import { encryptPwd } from '~/utils/encryption'
import { generateToken } from '~/utils/jwt'
import { throwError } from '~/utils/error'

export const userService = {
  getAllUsers: async () => {
    const users = await userModel.getAll()

    return users
  },
  createUser: async ({ user }: { user: IUser }) => {
    const isValidRole = await userRolesModel.selectById(user.roleId)

    if (!isValidRole) {
      return throwError({
        message: 'Nível de usuário não encontrado',
        statusCode: 404
      })
    }

    const newUser = await userModel.create({
      ...user,
      password: encryptPwd(user.password)
    })

    const userResponse = await userModel.getByID(newUser[0].insertId)

    return userResponse
  }
}

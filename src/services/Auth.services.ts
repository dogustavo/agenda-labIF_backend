import { userModel } from '~/model/User.model'
import { userRolesModel } from '~/model/UserRoles.model'
import { IUser } from '~/types/user.type'

import { encryptPwd } from '~/utils/encryption'
import { generateToken } from '~/utils/jwt'

export const authService = {
  register: async ({ user }: { user: IUser }) => {
    const isValidRole = await userRolesModel.selectById(user.roleId)

    if (!isValidRole) {
      throw new Error('Nível de usuário não encontrado')
    }

    const newUser = await userModel.create({
      ...user,
      password: encryptPwd(user.password)
    })

    const userData = newUser[0].insertId
    const userResponse = await userModel.getByID(userData)

    const jwt = generateToken({
      id: userResponse.id,
      role: userResponse.role
    })

    return {
      ...userResponse,
      jwt
    }
  },
  loginUser: async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {}
}

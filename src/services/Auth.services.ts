import { userModel } from '~/model/User.model'
import { userRolesModel } from '~/model/UserRoles.model'
import { IUser } from '~/types/user.type'
import bcrypt from 'bcrypt'
import { encryptPwd } from '~/utils/encryption'
import { generateToken } from '~/utils/jwt'

export const authService = {
  register: async ({ user }: { user: IUser }) => {
    const isValidRole = await userRolesModel.selectById(user.roleId)

    if (!isValidRole) {
      throw new Error('Nível de usuário não encontrado')
    }

    if (isValidRole.role !== 'user') {
      throw new Error(
        'Para criar esse tipo de usuário precisa estar autenticado como admin'
      )
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
      token: jwt
    }
  },
  loginUser: async (login: {
    username: string
    password: string
  }) => {
    const userData = await userModel.findByEmail(login.username)

    if (!userData) {
      throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compareSync(
      login.password,
      userData.password
    )

    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const { password, ...rest } = userData

    const jwt = generateToken({
      id: userData.id,
      role: userData.role
    })

    return {
      ...rest,
      token: jwt
    }
  }
}

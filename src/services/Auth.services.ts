import { userModel } from '~/model/User.model'
import { userRolesModel } from '~/model/UserRoles.model'
import { IUser } from '~/types/user.type'
import bcrypt from 'bcrypt'
import { encryptPwd } from '~/utils/encryption'
import { generateToken } from '~/utils/jwt'
import { throwError } from '~/utils/error'
import { UserRole } from '~/types/userRole.types'
import { userTypesModel } from '~/model/UserType.model'

export const authService = {
  register: async ({ user }: { user: IUser }) => {
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

    if (isValidRole.role !== 'user') {
      return throwError({
        message:
          'Para criar esse tipo de usuário precisa estar autenticado como admin',
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
      return throwError({
        message: `Usuário não encontrado`,
        statusCode: 404
      })
    }

    if (userData.isBlocked) {
      return throwError({
        message: `Usuário bloqueado, entre em contato com admin`,
        statusCode: 401
      })
    }

    const isPasswordValid = await bcrypt.compareSync(
      login.password,
      userData.password
    )

    if (!isPasswordValid) {
      return throwError({
        message: `As credenciais fornecidas estão incorretas. Verifique seu nome de usuário e senha e tente novamente.`,
        statusCode: 404
      })
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

import { authController } from '~/controller/Auth.controller.js'
import type { Route } from '~/types/route.type.js'

import { validatorMiddleware } from '~/middleware/validator.middleware.js'

import {
  LoginSchema,
  RegisterSchema
} from '~/validators/Auth.schema.js'
import { authMiddleware } from '~/middleware/auth.middleware'
import { USER_ROLES } from '~/enums/Roles.enums'

export const auth: Route[] = [
  {
    method: 'post',
    path: '/register',
    handler: authController.register,
    description: 'Cadastro de usuário público',
    middlewares: [validatorMiddleware(RegisterSchema)]
  },
  {
    method: 'post',
    path: '/login',
    handler: authController.login,
    description: 'Login de usuário',
    middlewares: [validatorMiddleware(LoginSchema)]
  },
  {
    method: 'get',
    path: '/profile',
    handler: authController.getProfile,
    description: 'Rota dados do usuário logado',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER,
        USER_ROLES.USER_AUTH
      ])
    ]
  },
  {
    method: 'put',
    path: '/edit-profile',
    handler: authController.editAuthUser,
    description: 'Rota dados do usuário logado',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER,
        USER_ROLES.USER_AUTH
      ])
    ]
  }
]

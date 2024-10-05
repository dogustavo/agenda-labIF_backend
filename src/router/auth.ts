import { authController } from '~/controller/Auth.controller'
import type { Route } from '~/types/route.type'

import { validatorMiddleware } from '~/middleware/validator.middleware'

import { LoginSchema, RegisterSchema } from '~/validators/Auth.schema'

export const auth: Route[] = [
  {
    method: 'post',
    path: '/register',
    handler: authController.register,
    description: 'Rota para retornar todos users',
    middlewares: [validatorMiddleware(RegisterSchema)]
  },
  {
    method: 'post',
    path: '/login',
    handler: authController.login,
    description: 'Rota para retornar todos users',
    middlewares: [validatorMiddleware(LoginSchema)]
  }
]

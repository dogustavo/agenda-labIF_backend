import { authController } from '~/controller/Auth.controller.js'
import type { Route } from '~/types/route.type.js'

import { validatorMiddleware } from '~/middleware/validator.middleware.js'

import { LoginSchema, RegisterSchema } from '~/validators/Auth.schema.js'

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

import { authController } from '~/controller/Auth.controller'
import type { Route } from '~/types/route.type'

export const auth: Route[] = [
  {
    method: 'post',
    path: '/register',
    handler: authController.register,
    description: 'Rota para retornar todos users',
    middlewares: []
  }
]

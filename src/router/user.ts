import { userController } from '~/controller/User.controller'
import type { Route } from '~/types/route.type'

export const users: Route[] = [
  {
    method: 'get',
    path: '/users',
    handler: userController.getAllUsers,
    description: 'Rota para retornar todos users',
    middlewares: []
  }
]

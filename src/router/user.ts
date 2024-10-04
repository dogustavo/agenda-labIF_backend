import { userController } from '~/controller/User.controller'
import type { Route } from '~/types/route.type'

export const users: Route[] = [
  {
    method: 'get',
    path: '/users',
    handler: userController.getAllUsers,
    description: 'Rota para retornar todos users',
    middlewares: []
  },
  {
    method: 'post',
    path: '/users',
    handler: userController.create,
    description: 'Rota para criação de users',
    middlewares: []
  }
]

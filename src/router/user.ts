import { userController } from '~/controller/User.controller'
import { USER_ROLES } from '~/enums/Roles.enums'
import { authMiddleware } from '~/middleware/auth.middleware'
import type { Route } from '~/types/route.type'

import { validatorMiddleware } from '~/middleware/validator.middleware'
import { EditSchema, RegisterSchema } from '~/validators/Auth.schema'

export const users: Route[] = [
  {
    method: 'get',
    path: '/users',
    handler: userController.getAllUsers,
    description: 'Rota para retornar todos users',
    middlewares: [authMiddleware([USER_ROLES.USER_ADMIN])]
  },
  {
    method: 'get',
    path: '/users/:id',
    handler: userController.getUserById,
    description: 'Rota para criação de users',
    middlewares: [authMiddleware([USER_ROLES.USER_ADMIN])]
  },
  {
    method: 'post',
    path: '/users',
    handler: userController.create,
    description: 'Rota para criação de users',
    middlewares: [
      authMiddleware([USER_ROLES.USER_ADMIN]),
      validatorMiddleware(RegisterSchema)
    ]
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: userController.editUser,
    description: 'Rota para edição de users',
    middlewares: [
      authMiddleware([USER_ROLES.USER_ADMIN]),
      validatorMiddleware(EditSchema)
    ]
  }
]

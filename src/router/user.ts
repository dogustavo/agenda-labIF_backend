import { userController } from '~/controller/User.controller'
import { USER_ROLES } from '~/enums/Roles.enums'
import { authMiddleware } from '~/middleware/auth.middleware'
import type { Route } from '~/types/route.type'

import { validatorMiddleware } from '~/middleware/validator.middleware'
import {
  BlockUserSchema,
  EditSchema,
  RegisterSchema
} from '~/validators/Auth.schema'

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
  },
  {
    method: 'patch',
    path: '/users/:id',
    handler: userController.blockUser,
    description: 'Rota para bloquear/desbloquear user',
    middlewares: [
      authMiddleware([USER_ROLES.USER_ADMIN]),
      validatorMiddleware(BlockUserSchema)
    ]
  },
  {
    method: 'patch',
    path: '/users/pwd-reset/:id',
    handler: userController.resetUserPwd,
    description: 'Rota para bloquear/desbloquear user',
    middlewares: [authMiddleware([USER_ROLES.USER_ADMIN])]
  },
  {
    method: 'patch',
    path: '/users/new-pwd/:id',
    handler: userController.updateUserPwd,
    description: 'Rota para atualizar senha user',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER,
        USER_ROLES.USER_AUTH
      ])
    ]
  }
]

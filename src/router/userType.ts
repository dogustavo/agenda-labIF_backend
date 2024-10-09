import type { Route } from '~/types/route.type'

import { authMiddleware } from '~/middleware/auth.middleware'
import { USER_ROLES } from '~/enums/Roles.enums'

import { validatorMiddleware } from '~/middleware/validator.middleware'
import { userTypeController } from '~/controller/UserType.controller'
import { UserTypeSchema } from '~/validators/UserType.schema'

export const userType: Route[] = [
  {
    method: 'post',
    path: '/user-type',
    handler: userTypeController.createUserType,
    description: 'Cria tipos de usuário',
    middlewares: [
      authMiddleware([USER_ROLES.USER_ADMIN]),
      validatorMiddleware(UserTypeSchema)
    ]
  },
  {
    method: 'get',
    path: '/user-type',
    handler: userTypeController.getAll,
    description: 'Rota para cadastrar equipamentos',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER,
        USER_ROLES.USER_AUTH
      ])
    ]
  }
]

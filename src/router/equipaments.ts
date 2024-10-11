import { equipamentController } from '~/controller/Equipament.controller'
import type { Route } from '~/types/route.type'

import { validatorMiddleware } from '~/middleware/validator.middleware'
import { EquipamentSchema } from '~/validators/Equipament.schema'
import { authMiddleware } from '~/middleware/auth.middleware'
import { USER_ROLES } from '~/enums/Roles.enums'

export const equipament: Route[] = [
  {
    method: 'post',
    path: '/equipaments',
    handler: equipamentController.create,
    description: 'Rota para cadastrar equipamentos',
    middlewares: [
      authMiddleware([USER_ROLES.USER_ADMIN]),
      validatorMiddleware(EquipamentSchema)
    ]
  },
  {
    method: 'get',
    path: '/equipaments/availability/:equipamentId',
    handler: equipamentController.getAvailabilty,
    description: 'Rota para cadastrar equipamentos',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_AUTH,
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER
      ])
    ]
  },
  {
    method: 'get',
    path: '/equipaments',
    handler: equipamentController.getAll,
    description: 'Rota para cadastrar equipamentos',
    middlewares: [
      authMiddleware([
        USER_ROLES.USER_AUTH,
        USER_ROLES.USER_ADMIN,
        USER_ROLES.USER_APPROVER
      ])
    ]
  }
]

import { scheduleController } from '~/controller/Schedule.controller'
import type { Route } from '~/types/route.type'

import { authMiddleware } from '~/middleware/auth.middleware'
import { USER_ROLES } from '~/enums/Roles.enums'

export const schedules: Route[] = [
  {
    method: 'post',
    path: '/schedule',
    handler: scheduleController.create,
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

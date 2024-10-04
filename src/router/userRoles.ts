import { userRoleController } from '~/controller/UserRoles.controlle'
import type { Route } from '~/types/route.type'

import { authMiddleware } from '~/middleware/auth.middleware'
import { USER_ROLES } from '~/enums/Roles.enums'

export const userRole: Route[] = [
  {
    method: 'post',
    path: '/user-role',
    handler: userRoleController.createUserRole,
    description: 'Cria nives de usuário',
    middlewares: [authMiddleware([USER_ROLES.USER_ADMIN])]
  },
  {
    method: 'get',
    path: '/user-role',
    handler: userRoleController.getAllUserRole,
    description: 'Busca todos os tipos de roles',
    middlewares: [authMiddleware([USER_ROLES.USER_ADMIN])]
  }
]

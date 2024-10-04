import { userRoleController } from '~/controller/UserRoles.controlle'
import type { Route } from '~/types/route.type'

export const userRole: Route[] = [
  {
    method: 'post',
    path: '/user-role',
    handler: userRoleController.createUserRole,
    description: 'Cria nives de usuário',
    middlewares: []
  },
  {
    method: 'get',
    path: '/user-role',
    handler: userRoleController.getAllUserRole,
    description: 'Busca todos os tipos de roles',
    middlewares: []
  }
]

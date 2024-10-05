import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { userRoleService } from '~/services/UserRole.services'
import type { UserRole } from '~/types/userRole.types'
import { handleError } from '~/utils/error'

export const userRoleController = {
  createUserRole: async (
    _request: ExpressRequest<{}, {}, UserRole>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const { role } = _request.body

      if (!role) {
        return response.status(400).json({ error: 'Role' })
      }

      const userRole = await userRoleService.createUserRole({ role })

      return response.json(userRole)
    } catch (error) {
      return handleError(error, response)
    }
  },
  getAllUserRole: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userRoles = await userRoleService.getAllUserRole()

      return response.json(userRoles)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

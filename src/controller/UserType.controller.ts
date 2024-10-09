import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { userTypeService } from '~/services/UserType.services'
import { IUserType } from '~/types/user.type'
import { handleError } from '~/utils/error'

export const userTypeController = {
  createUserType: async (
    _request: ExpressRequest<{}, {}, IUserType>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userType = _request.body

      const userRole = await userTypeService.createUserType(userType)

      return response.json(userRole)
    } catch (error) {
      return handleError(error, response)
    }
  },
  getAll: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ) => {
    try {
      const { name, page } = _request.query

      const userTypes = await userTypeService.getAll({
        query: {
          name,
          page
        }
      })

      return response.json(userTypes)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

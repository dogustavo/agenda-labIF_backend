import { DrizzleError } from 'drizzle-orm'
import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { userService } from '~/services/User.services'

import type { IUser } from '~/types/user.type'
import { handleError } from '~/utils/error'

export const userController = {
  getAllUsers: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const users = await userService.getAllUsers()
      return response.json(users)
    } catch (error) {
      return handleError(error, response)
    }
  },
  create: async (
    _request: ExpressRequest<{}, {}, IUser>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userData = _request.body

      const user = await userService.createUser({ user: userData })

      return response.json(user)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

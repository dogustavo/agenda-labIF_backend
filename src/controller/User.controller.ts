import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { userService } from '~/services/User.services'

import type { IUser } from '~/types/user.type'

export const userController = {
  getAllUsers: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const users = await userService.getAllUsers()
      return response.json(users)
    } catch (error) {
      if (error instanceof Error)
        return response.status(404).json({ error: error.message })

      return response.status(500).json({ error: 'Unexpected error' })
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
      if (error instanceof Error)
        return response.status(404).json({ error: error.message })

      return response.status(500).json({ error: 'Unexpected error' })
    }
  }
}

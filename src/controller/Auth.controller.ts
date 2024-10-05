import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'
import { authService } from '~/services/Auth.services'
import { IUser } from '~/types/user.type'
import { handleError } from '~/utils/error'

export const authController = {
  register: async (
    _request: ExpressRequest<{}, {}, IUser>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userData = _request.body

      const user = await authService.register({ user: userData })

      return response.json(user)
    } catch (error) {
      return handleError(error, response)
    }
  },
  login: async (
    _request: ExpressRequest<
      {},
      {},
      { username: string; password: string }
    >,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userData = _request.body
      const user = await authService.loginUser(userData)

      return response.json(user)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

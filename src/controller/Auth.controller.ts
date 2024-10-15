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
  },
  getProfile: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ) => {
    try {
      const user = _request.user

      const userData = await authService.getProfile(Number(user?.id))

      return response.json(userData)
    } catch (error) {
      return handleError(error, response)
    }
  },
  editAuthUser: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ) => {
    try {
      const body = _request.body
      const user = _request.user

      const userData = await authService.editAuthUser({
        id: Number(user?.id),
        data: body
      })

      return response.json(userData)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

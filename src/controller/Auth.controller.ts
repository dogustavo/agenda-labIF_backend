import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'
import { authService } from '~/services/Auth.services'
import { IUser } from '~/types/user.type'

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
      if (error instanceof Error)
        return response.status(404).json({ error: error.message })

      return response.status(500).json({ error: 'Unexpected error' })
    }
  }
}

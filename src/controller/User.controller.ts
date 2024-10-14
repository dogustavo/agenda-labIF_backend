import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { userService } from '~/services/User.services'

import type { IEditUser, IUser } from '~/types/user.type'
import { handleError } from '~/utils/error'

export const userController = {
  getAllUsers: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const { name, email, page } = _request.query
      const user = _request.user

      const users = await userService.getAllUsers({
        query: {
          name,
          email,
          page
        },
        userId: Number(user?.id)
      })
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
  },
  getUserById: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ) => {
    try {
      const { id } = _request.params

      const user = await userService.getUserById(Number(id))

      return response.json(user || {})
    } catch (error) {
      return handleError(error, response)
    }
  },
  editUser: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const userData = _request.body
      const { id: userId } = _request.params

      const user = await userService.editUser({
        user: userData,
        id: userId
      })

      return response.json(user)
    } catch (error) {
      return handleError(error, response)
    }
  },
  blockUser: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const { id: userId } = _request.params
      const { action } = _request.body

      const user = await userService.blockUser({
        action,
        userId: Number(userId)
      })

      return response.json(user)
    } catch (error) {
      return handleError(error, response)
    }
  }
}

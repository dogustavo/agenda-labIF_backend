import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { handleError } from '~/utils/error'

import type { ISchedules } from '~/types/schedule.type'

import { scheduleService } from '~/services/Schedule.services'
import { getUserInfoFromToken } from '~/utils/jwt'

export const scheduleController = {
  create: async (
    _request: ExpressRequest<{}, {}, ISchedules>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const schedule = _request.body

      const res = await scheduleService.create(schedule)

      return response.json(res)
    } catch (error) {
      return handleError(error, response)
    }
  },
  getAllSchedules: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const token = _request.headers.authorization?.split(' ')[1]
      const userInfo = getUserInfoFromToken(token)

      const res = await scheduleService.getSchedules(
        userInfo.id,
        userInfo.role
      )

      return response.json(res)
    } catch (error) {
      return handleError(error, response)
    }
  },
  evaluate: async (
    request: ExpressRequest<{}, {}, ISchedules>,
    response: ExpressResponse
  ) => {
    try {
      return response.json({
        message: 'rota funcionando'
      })
    } catch (error) {
      return handleError(error, response)
    }
  }
}

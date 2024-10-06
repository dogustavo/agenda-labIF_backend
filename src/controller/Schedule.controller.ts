import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { handleError } from '~/utils/error'

import type { ISchedulesRequest } from '~/types/schedule.type'

import { scheduleService } from '~/services/Schedule.services'
import { getUserInfoFromToken } from '~/utils/jwt'

export const scheduleController = {
  create: async (
    _request: ExpressRequest<{}, {}, ISchedulesRequest>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const schedule = _request.body
      const userInfo = getUserInfoFromToken(
        _request.headers.authorization
      )

      const data = {
        ...schedule,
        scheduledBy: userInfo.id
      }

      const res = await scheduleService.create(data)

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
      const userInfo = getUserInfoFromToken(
        _request.headers.authorization
      )

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
    request: ExpressRequest<{}, {}, { action: string }>,
    response: ExpressResponse
  ) => {
    try {
      return response.status(201).end()
    } catch (error) {
      return handleError(error, response)
    }
  }
}

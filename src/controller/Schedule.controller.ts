import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { handleError } from '~/utils/error'

import type { ISchedulesRequest } from '~/types/schedule.type'

import { scheduleService } from '~/services/Schedule.services'

export const scheduleController = {
  create: async (
    _request: ExpressRequest<{}, {}, ISchedulesRequest>,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    try {
      const schedule = _request.body
      const userInfo = _request.user

      const data = {
        ...schedule,
        scheduledBy: userInfo?.id as number
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
      const userInfo = _request.user
      const { name, status, startDate, endDate, page } =
        _request.query

      const res = await scheduleService.getSchedules({
        user: {
          id: userInfo?.id as number,
          role: userInfo?.role as string
        },
        query: {
          endDate,
          name,
          page,
          startDate,
          status
        }
      })

      return response.json(res)
    } catch (error) {
      return handleError(error, response)
    }
  },
  evaluate: async (
    _request: ExpressRequest,
    response: ExpressResponse
  ) => {
    try {
      const { scheduleId } = _request.params
      const { action } = _request.body
      const user = _request.user

      const schedule = {
        scheduleId: Number(scheduleId),
        action,
        aproverId: user?.id as number,
        role: user?.role
      }

      await scheduleService.evaluate(schedule)

      return response.status(201).end()
    } catch (error) {
      return handleError(error, response)
    }
  }
}

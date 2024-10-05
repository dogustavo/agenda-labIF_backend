import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express'

import { handleError } from '~/utils/error'

import type { ISchedules } from '~/types/schedule.type'

import { scheduleService } from '~/services/Schedule.services'

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
  }
}

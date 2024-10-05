import type { ISchedules } from '~/types/schedule.type'

import { scheduleModel } from '~/model/Schedule.model'
import { throwError } from '~/utils/error'

export const scheduleService = {
  create: async (data: ISchedules) => {
    const result = await scheduleModel.create(data)
    const insertId = result[0].insertId

    return await scheduleModel.findById(insertId)
  }
}

import type { ISchedules } from '~/types/schedule.type'

import { scheduleModel } from '~/model/Schedule.model'
import { equipamentModel } from '~/model/Equipament.model'
import { throwError } from '~/utils/error'
import { compareTimes } from '~/utils/avaliableTime'
import { USER_ROLES } from '~/enums/Roles.enums'

export const scheduleService = {
  create: async (data: ISchedules) => {
    const equipament = await equipamentModel.findById(
      data.equipamentId
    )
    const isValidInitTime = compareTimes(
      data.timeInit,
      equipament.availableFrom
    )
    const isValidEndTime = compareTimes(
      equipament.availableTo,
      data.timeEnd
    )

    if (!isValidInitTime) {
      return throwError({
        message: 'Horario inicial indisponivel para reserva',
        statusCode: 400
      })
    }

    if (!isValidEndTime) {
      return throwError({
        message: 'Horario final indisponivel para reserva',
        statusCode: 400
      })
    }

    const result = await scheduleModel.create(data)
    const insertId = result[0].insertId

    return await scheduleModel.findById(insertId)
  },
  getSchedules: async (id: number, role: string) => {
    if (USER_ROLES.USER_AUTH === role) {
      return await scheduleModel.getPendingSchedulesForUser(id)
    }

    return await scheduleModel.getAllPending()
  }
}

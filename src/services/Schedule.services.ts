import type { ISchedules } from '~/types/schedule.type'

import { scheduleModel } from '~/model/Schedule.model'
import { equipamentModel } from '~/model/Equipament.model'

import { throwError } from '~/utils/error'
import {
  compareEndTime,
  compareInitTime
} from '~/utils/avaliableTime'

import { USER_ROLES } from '~/enums/Roles.enums'
import { IScheduleEvaluate } from '~/types/schedule.type'

export const scheduleService = {
  create: async (data: ISchedules) => {
    const equipament = await equipamentModel.findById(
      data.equipamentId
    )

    const isValidInitTime = compareInitTime(
      data.timeInit,
      equipament.availableFrom
    )
    const isValidEndTime = compareEndTime(
      equipament.availableTo,
      data.timeEnd,
      data.timeInit
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
  },
  evaluate: async (evaluate: IScheduleEvaluate) => {
    const schedule = await scheduleModel.findById(evaluate.scheduleId)

    if (!schedule) {
      return throwError({
        message: 'Reserva não encontrada',
        statusCode: 404
      })
    }

    if (schedule.status !== 'pending') {
      return throwError({
        message: 'Essa reserva já foi avaliada',
        statusCode: 401
      })
    }

    const evaluateResponse = await scheduleModel.evaluateSchedule({
      scheduleId: evaluate.scheduleId,
      data: {
        status: evaluate.action,
        evaluatedAt: new Date(),
        evaluatedBy: evaluate.aproverId
      }
    })

    console.log('evaluate', evaluateResponse)
  }
}

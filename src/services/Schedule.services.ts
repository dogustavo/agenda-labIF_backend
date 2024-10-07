import type { ISchedules } from '~/types/schedule.type'

import { scheduleModel } from '~/model/Schedule.model'
import { equipamentModel } from '~/model/Equipament.model'

import { throwError } from '~/utils/error'
import {
  compareEndTime,
  compareInitTime
} from '~/utils/avaliableTime'

import { USER_ROLES } from '~/enums/Roles.enums'
import {
  IScheduleEvaluate,
  IScheduleFind
} from '~/types/schedule.type'

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
  getSchedules: async ({ user, query }: IScheduleFind) => {
    const page = parseInt(query?.page as string) || 1 // Página atual (padrão: 1)
    const pageSize = 12 // Tamanho da página (padrão: 10)

    const offset = (page - 1) * pageSize
    const totalRecords = await scheduleModel.getScheduleCount()
    const totalPages = Math.ceil(totalRecords[0].count / pageSize)
    let schedules = []

    if (USER_ROLES.USER_AUTH === user.role) {
      schedules = await scheduleModel.getAllSchedulesForUser({
        offset,
        pageSize,
        userId: user.id
      })
    } else {
      schedules = await scheduleModel.getAdminAll({
        offset: offset,
        pageSize
      })
    }

    return {
      data: schedules,
      meta: {
        totalRecords: totalRecords[0].count,
        totalPages,
        currentPage: page,
        pageSize
      }
    }
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

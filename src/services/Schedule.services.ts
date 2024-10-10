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

import { eq, like, gte, lte } from 'drizzle-orm'
import { scheduleSchema } from '~/model/schemas/Schedule.schema'
import { userSchema } from '~/model/schemas/User.schema'

export const scheduleService = {
  create: async (data: ISchedules) => {
    const equipament = await equipamentModel.findById(
      data.equipamentId
    )

    const getDateWithoutTime = (date: Date) => {
      return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      )
    }

    const scheduleDay = getDateWithoutTime(
      new Date(data.scheduleDate)
    )
    const today = getDateWithoutTime(new Date())

    if (scheduleDay <= today) {
      return throwError({
        message:
          'Não é possível realizar uma reserva anterior ou igual ao dia de hoje',
        statusCode: 400
      })
    }

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
    const page = parseInt(query?.page as string) || 1
    const pageSize = 12

    const offset = (page - 1) * pageSize

    const today = new Date()
    const todayFormatted = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    const twoWeeksLater = new Date(todayFormatted)
    twoWeeksLater.setDate(todayFormatted.getDate() + 7)

    const filters = []

    if (query?.startDate) {
      filters.push(gte(scheduleSchema.scheduleDate, query.startDate))
    } else {
      filters.push(gte(scheduleSchema.scheduleDate, todayFormatted))
    }
    if (query?.endDate) {
      filters.push(lte(scheduleSchema.scheduleDate, query.endDate))
    } else {
      filters.push(lte(scheduleSchema.scheduleDate, twoWeeksLater))
    }

    if (query?.status) {
      filters.push(eq(scheduleSchema.status, query.status))
    }

    if (USER_ROLES.USER_AUTH === user.role) {
      filters.push(eq(scheduleSchema.scheduledBy, user.id))
    }

    const totalRecords = await scheduleModel.getScheduleCount({
      filters,
      userName: query?.name
    })
    const totalPages = Math.ceil(totalRecords[0].count / pageSize)

    const schedules = await scheduleModel.getAll({
      offset,
      pageSize,
      filters,
      userName: query?.name
    })

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

    await scheduleModel.evaluateSchedule({
      scheduleId: evaluate.scheduleId,
      data: {
        status: evaluate.action,
        evaluatedAt: new Date(),
        evaluatedBy: evaluate.aproverId
      }
    })
  }
}

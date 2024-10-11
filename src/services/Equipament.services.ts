import type {
  IEquipament,
  IEquipamentFind
} from '~/types/equipament.type'

import { equipamentModel } from '~/model/Equipament.model'
import { scheduleModel } from '~/model/Schedule.model'
import { throwError } from '~/utils/error'
import { generateAvaliabilityTimes } from '~/utils/avaliableTime'
import { eq } from 'drizzle-orm'
import { equipamentSchema } from '~/model/schemas/Equipaments.schema'

export const equipamentService = {
  create: async (data: IEquipament) => {
    const result = await equipamentModel.create(data)
    const insertId = result[0].insertId

    return await equipamentModel.findById(insertId)
  },
  getAll: async ({ query }: IEquipamentFind) => {
    const page = 1
    const pageSize = 25

    const offset = (page - 1) * pageSize
    const filters = []

    if (query?.name) {
      filters.push(eq(equipamentSchema.equipamentName, query.name))
    }

    const totalRecords = await equipamentModel.getEquipamentsCount({
      filters
    })
    const totalPages = Math.ceil(totalRecords[0].count / pageSize)

    const result = await equipamentModel.getAll({
      filters,
      offset
    })

    return {
      data: result,
      meta: {
        totalRecords: totalRecords[0].count,
        totalPages,
        currentPage: page,
        pageSize
      }
    }
  },
  getAvailabilty: async ({
    id,
    selectedDay
  }: {
    id: number
    selectedDay: string
  }) => {
    const equipament = await equipamentModel.findById(id)

    if (!equipament) {
      return throwError({
        message: 'Equipamento não encontrado',
        statusCode: 404
      })
    }

    const availableTimes = generateAvaliabilityTimes(
      equipament.availableFrom,
      equipament.availableTo
    )

    const schedules = await scheduleModel.findAllAvaliability({
      equipamentId: equipament.id,
      scheduleDate: selectedDay
    })

    const unavailiableTimes = schedules
      .reduce((acc, schedule) => {
        const hourInit = +schedule.timeInit.split(':')[0]
        const hourEnd = +schedule.timeEnd.split(':')[0]

        for (let index = hourInit; index < hourEnd; index++) {
          acc.push(`${index.toString().padStart(2, '0')}:00`)
        }

        return acc
      }, [] as string[])
      .sort()

    return {
      availableTimes: availableTimes.filter(
        (val) => !unavailiableTimes.includes(val)
      )
    }
  }
}

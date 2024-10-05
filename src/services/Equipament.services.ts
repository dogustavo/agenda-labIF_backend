import type { IEquipament } from '~/types/equipament.type'

import { equipamentModel } from '~/model/Equipament.model'
import { throwError } from '~/utils/error'

export const equipamentService = {
  create: async (data: IEquipament) => {
    const result = await equipamentModel.create(data)
    const insertId = result[0].insertId

    return await equipamentModel.findById(insertId)
  },
  getAvailabilty: async (id: number) => {
    const equipament = await equipamentModel.findById(id)

    if (!equipament) {
      return throwError({
        message: 'Equipamento não encontrado',
        statusCode: 404
      })
    }

    const availableFrom = equipament.availableFrom
    const availableTo = equipament.availableTo

    return equipament
  }
}

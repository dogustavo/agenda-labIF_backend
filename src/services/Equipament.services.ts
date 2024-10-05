import type { IEquipament } from '~/types/equipament.type'

import { equipamentModel } from '~/model/Equipament.model'

export const equipamentService = {
  create: async (data: IEquipament) => {
    const result = await equipamentModel.create(data)
    const insertId = result[0].insertId

    return await equipamentModel.findById(insertId)
  }
}

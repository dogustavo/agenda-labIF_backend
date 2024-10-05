import { db } from '~/db'
import { equipamentSchema } from './schemas/Equipaments.schema'

import type { IEquipament } from '~/types/equipament.type'
import { eq } from 'drizzle-orm'

export const equipamentModel = {
  create: async (data: IEquipament) => {
    return await db.insert(equipamentSchema).values(data).execute()
  },
  findById: async (id: number) => {
    const [equipament] = await db
      .select()
      .from(equipamentSchema)
      .where(eq(equipamentSchema.id, id))

    return equipament
  }
}

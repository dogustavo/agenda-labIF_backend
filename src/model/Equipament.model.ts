import { db } from '~/db'
import { equipamentSchema } from './schemas/Equipaments.schema'

import type {
  IEquipament,
  IEquipamentFind
} from '~/types/equipament.type'
import { eq, count, gte, lte, like, and } from 'drizzle-orm'

const equipamentSearch = {
  id: equipamentSchema.id, // ID do agendamento
  equipamentName: equipamentSchema.equipamentName,
  availableFrom: equipamentSchema.availableFrom,
  availableTo: equipamentSchema.availableTo
}

type EquipamentsFilters = Array<
  | ReturnType<typeof eq>
  | ReturnType<typeof gte>
  | ReturnType<typeof lte>
  | ReturnType<typeof like>
>

export const equipamentModel = {
  create: async (data: IEquipament) => {
    return await db.insert(equipamentSchema).values(data).execute()
  },
  getAll: async ({
    filters,
    offset
  }: {
    offset: number
    filters: EquipamentsFilters
  }) => {
    return await db
      .select(equipamentSearch)
      .from(equipamentSchema)
      .where(and(...filters))
      .limit(15)
      .offset(offset)
  },
  findById: async (id: number) => {
    const [equipament] = await db
      .select()
      .from(equipamentSchema)
      .where(eq(equipamentSchema.id, id))

    return equipament
  },
  getEquipamentsCount: async ({
    filters
  }: {
    filters: EquipamentsFilters
  }) => {
    return await db
      .select({ count: count() })
      .from(equipamentSchema)
      .where(and(...filters))
  }
}

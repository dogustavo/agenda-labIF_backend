import { db } from '~/db'
import { equipamentSchema } from './schemas/Equipaments.schema'

import type {
  IEquipament,
  IEquipamentFind
} from '~/types/equipament.type'
import { eq, count, gte, lte, like, and, sql } from 'drizzle-orm'

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
  edit: async ({ data, id }: { id: number; data: IEquipament }) => {
    return await db
      .update(equipamentSchema)
      .set(data)
      .where(eq(equipamentSchema.id, id))
  },
  getAll: async ({
    pageSize,
    offset,
    equipament
  }: {
    offset: number
    pageSize: number
    equipament?: string
  }) => {
    const filters = []

    if (equipament) {
      filters.push(
        like(equipamentSchema.equipamentName, `%${equipament}%`)
      )
    }

    return await db
      .select(equipamentSearch)
      .from(equipamentSchema)
      .where(and(...filters))
      .limit(pageSize)
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
    equipament
  }: {
    equipament?: string
  }) => {
    const filters = []

    if (equipament) {
      filters.push(
        like(equipamentSchema.equipamentName, `%${equipament}%`)
      )
    }
    return await db
      .select({ count: count() })
      .from(equipamentSchema)
      .where(and(...filters))
  }
}

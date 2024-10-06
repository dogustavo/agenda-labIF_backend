import { db } from '~/db'
import { scheduleSchema } from './schemas/Schedule.schema'

import type { ISchedules } from '~/types/schedule.type'
import { and, eq, or, sql } from 'drizzle-orm'
import { userSchema } from './schemas/User.schema'
import { equipamentSchema } from './schemas/Equipaments.schema'

const scheduleSearch = {
  id: scheduleSchema.id, // ID do agendamento
  status: scheduleSchema.status, // Status do agendamento
  scheduledBy: userSchema.name, // Nome do usuário que agendou
  equipamentName: equipamentSchema.equipamentName, // Nome do equipamento
  approvedBy: scheduleSchema.approvedBy,
  scheduleDate: scheduleSchema.scheduleDate,
  timeInit: scheduleSchema.timeInit,
  timeEnd: scheduleSchema.timeEnd
}

export const scheduleModel = {
  create: async (schedule: ISchedules) => {
    return await db.insert(scheduleSchema).values(schedule).execute()
  },
  findById: async (id: number) => {
    const [schedule] = await db
      .select()
      .from(scheduleSchema)
      .where(eq(scheduleSchema.id, id))

    return schedule
  },
  findAllAvaliability: async (schedule: {
    equipamentId: number
    scheduleDate: string
  }) => {
    const schedules = await db
      .select()
      .from(scheduleSchema)
      .where(
        and(
          eq(scheduleSchema.equipamentId, schedule.equipamentId),
          eq(
            scheduleSchema.scheduleDate,
            sql`${schedule.scheduleDate}`
          ),
          or(
            eq(scheduleSchema.status, 'approved'),
            eq(scheduleSchema.status, 'pending')
          )
        )
      )

    return schedules
  },
  getAllPending: async () => {
    return await db
      .select(scheduleSearch)
      .from(scheduleSchema)
      .innerJoin(
        userSchema,
        eq(scheduleSchema.scheduledBy, userSchema.id)
      )
      .innerJoin(
        equipamentSchema,
        eq(scheduleSchema.equipamentId, equipamentSchema.id)
      )
      .where(eq(scheduleSchema.status, 'pending'))
  },
  getPendingSchedulesForUser: async (userId: number) => {
    return await db
      .select(scheduleSearch)
      .from(scheduleSchema)
      .innerJoin(
        userSchema,
        eq(scheduleSchema.scheduledBy, userSchema.id)
      )
      .innerJoin(
        equipamentSchema,
        eq(scheduleSchema.equipamentId, equipamentSchema.id)
      )
      .where(
        and(
          eq(scheduleSchema.scheduledBy, userId),
          eq(scheduleSchema.status, 'pending')
        )
      )
  }
}

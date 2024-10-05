import { db } from '~/db'
import { scheduleSchema } from './schemas/Schedule.schema'

import type { ISchedules } from '~/types/schedule.type'
import { and, eq, or, sql } from 'drizzle-orm'

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
  }
}

import { db } from '~/db'
import { scheduleSchema } from './schemas/Schedule.schema'

import type { ISchedules } from '~/types/schedule.type'
import { eq } from 'drizzle-orm'

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
  }
}

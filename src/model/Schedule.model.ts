import { db } from '~/db'
import { scheduleSchema } from './schemas/Schedule.schema'

import type { ISchedules } from '~/types/schedule.type'
import { and, count, eq, gte, like, lte, or, sql } from 'drizzle-orm'
import { userSchema } from './schemas/User.schema'
import { equipamentSchema } from './schemas/Equipaments.schema'

const scheduleSearch = {
  id: scheduleSchema.id, // ID do agendamento
  status: scheduleSchema.status, // Status do agendamento
  scheduledBy: userSchema.name, // Nome do usuário que agendou
  equipamentName: equipamentSchema.equipamentName, // Nome do equipamento
  evaluatedBy: scheduleSchema.evaluatedBy,
  scheduleDate: scheduleSchema.scheduleDate,
  timeInit: scheduleSchema.timeInit,
  timeEnd: scheduleSchema.timeEnd
}

type ScheduleFilters = Array<
  | ReturnType<typeof eq>
  | ReturnType<typeof gte>
  | ReturnType<typeof lte>
  | ReturnType<typeof like>
>

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
  getAll: async ({
    pageSize,
    offset,
    filters,
    userName
  }: {
    pageSize: number
    offset: number
    filters: ScheduleFilters
    userName?: string
  }) => {
    if (userName) {
      filters.push(like(userSchema.name, `%${userName}%`))
    }
    const query = db
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
      .where(and(...filters))

    return await query
      .orderBy(scheduleSchema.scheduleDate, scheduleSchema.timeInit)
      .limit(pageSize)
      .offset(offset)
  },
  evaluateSchedule: async ({
    scheduleId,
    data
  }: {
    scheduleId: number
    data: {
      status: 'approved' | 'repproved'
      evaluatedBy: number
      evaluatedAt: Date
    }
  }) => {
    return await db
      .update(scheduleSchema)
      .set(data)
      .where(eq(scheduleSchema.id, scheduleId))
  },
  getScheduleCount: async ({
    filters,
    userName
  }: {
    filters: ScheduleFilters
    userName?: string
  }) => {
    if (userName) {
      filters.push(like(userSchema.name, `%${userName}%`))
    }
    return await db
      .select({ count: count() })
      .from(scheduleSchema)
      .innerJoin(
        userSchema,
        eq(scheduleSchema.scheduledBy, userSchema.id)
      )
      .where(and(...filters))
  }
}

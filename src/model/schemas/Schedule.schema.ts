import {
  relations,
  type InferSelectModel,
  type InferInsertModel
} from 'drizzle-orm'

import {
  mysqlEnum,
  mysqlTable,
  int,
  varchar,
  timestamp,
  date,
  time
} from 'drizzle-orm/mysql-core'

import { userSchema } from './User.schema'
import { equipamentSchema } from './Equipaments.schema'

export const statusEnum = mysqlEnum('status', [
  'pending',
  'approved',
  'repproved'
])

export const scheduleSchema = mysqlTable('schedules', {
  id: int('id').primaryKey().autoincrement().notNull(),
  status: statusEnum.notNull().default('pending'),
  scheduledBy: int('scheduled_by')
    .notNull()
    .references(() => userSchema.id), // Foreign key to users
  approvedBy: int('approved_by').references(() => userSchema.id), // Foreign key to users
  approvedAt: timestamp('approved_at'),
  scheduleDate: date('schedule_date').notNull(), // Somente a data do agendamento
  timeInit: time('time_init').notNull(), // Horário de início
  timeEnd: time('time_end').notNull(), // Horário de fim
  equipamentId: int('equipament_id').references(
    () => equipamentSchema.id
  ), // Foreign key to equipaments
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const scheduleRelations = relations(
  scheduleSchema,
  ({ one }) => ({
    scheduledByUser: one(userSchema, {
      fields: [scheduleSchema.scheduledBy],
      references: [userSchema.id],
      relationName: 'scheduledByUser'
    }),
    approvedByUser: one(userSchema, {
      fields: [scheduleSchema.approvedBy],
      references: [userSchema.id],
      relationName: 'approvedByUser'
    }),
    equipament: one(equipamentSchema, {
      fields: [scheduleSchema.equipamentId],
      references: [equipamentSchema.id]
    })
  })
)

export type SelectUser = InferSelectModel<typeof scheduleSchema>
export type InsertUser = InferInsertModel<typeof scheduleSchema>

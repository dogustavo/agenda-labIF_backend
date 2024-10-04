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
  timestamp
} from 'drizzle-orm/mysql-core'

import { userSchema } from './User.schema'
import { equipamentSchema } from './Equipaments.schema'

// roles
export const roleEnum = mysqlEnum('role', [
  'pending',
  'approved',
  'repproved'
])

export const scheduleSchema = mysqlTable('schedules', {
  id: int('id').primaryKey().autoincrement().notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  scheduledBy: int('scheduled_by').notNull(), // Foreign key to users
  approvedBy: int('approved_by'), // Foreign key to users
  approvedAt: timestamp('approved_at'),
  scheduleDate: timestamp('schedule_date').notNull(),
  equipamentId: varchar('equipament_id', { length: 255 }).notNull(), // Foreign key to equipaments
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const scheduleRelations = relations(
  scheduleSchema,
  ({ one }) => ({
    scheduledByUser: one(userSchema, {
      fields: [scheduleSchema.scheduledBy],
      references: [userSchema.id]
    }),
    approvedByUser: one(userSchema, {
      fields: [scheduleSchema.approvedBy],
      references: [userSchema.id]
    }),
    equipament: one(equipamentSchema, {
      fields: [scheduleSchema.equipamentId],
      references: [equipamentSchema.id]
    })
  })
)

export type SelectUser = InferSelectModel<typeof scheduleSchema>
export type InsertUser = InferInsertModel<typeof scheduleSchema>

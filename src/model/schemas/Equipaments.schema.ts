import {
  relations,
  type InferSelectModel,
  type InferInsertModel
} from 'drizzle-orm'

import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  time
} from 'drizzle-orm/mysql-core'
import { scheduleSchema } from './Schedule.schema'

export const equipamentSchema = mysqlTable('equipaments', {
  id: int('id').primaryKey().autoincrement().unique().notNull(),
  equipamentName: varchar('equipament_name', {
    length: 50
  })
    .notNull()
    .unique(),
  availableFrom: time('available_from').notNull(), // Ex: 09:00:00
  availableTo: time('available_to').notNull(), // Ex: 21:00:00
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const equipamentRelations = relations(
  equipamentSchema,
  ({ many }) => ({
    schedules: many(scheduleSchema)
  })
)

export type SelectUser = InferSelectModel<typeof equipamentSchema>
export type InsertUser = InferInsertModel<typeof equipamentSchema>

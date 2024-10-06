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

import { scheduleSchema } from './Schedule.schema'
import { userRoleSchema } from './UserRoles.schema'

export const userSchema = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement().unique().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  roleId: int('role_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userRelations = relations(
  userSchema,
  ({ many, one }) => ({
    scheduledBySchedules: many(scheduleSchema, {
      relationName: 'scheduledByUser'
    }),
    approvedBySchedules: many(scheduleSchema, {
      relationName: 'approvedByUser'
    }),
    role: one(userRoleSchema, {
      fields: [userSchema.roleId],
      references: [userRoleSchema.id]
    })
  })
)

export type SelectUser = InferSelectModel<typeof userSchema>
export type InsertUser = InferInsertModel<typeof userSchema>

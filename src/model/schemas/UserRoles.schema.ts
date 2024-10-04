import {
  relations,
  type InferSelectModel,
  type InferInsertModel
} from 'drizzle-orm'

import {
  mysqlTable,
  int,
  timestamp,
  mysqlEnum
} from 'drizzle-orm/mysql-core'
import { userSchema } from './User.schema'

export const roleEnum = mysqlEnum('role', [
  'user',
  'approver',
  'admin'
])

export const userRoleSchema = mysqlTable('user_roles', {
  id: int('id').primaryKey().autoincrement().notNull(),
  role: roleEnum.notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const userRoleRelations = relations(
  userRoleSchema,
  ({ many }) => ({
    users: many(userSchema)
  })
)

export type SelectUser = InferSelectModel<typeof userRoleSchema>
export type InsertUser = InferInsertModel<typeof userRoleSchema>

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

// roles
export const roleEnum = mysqlEnum('role', [
  'user',
  'approver',
  'admin'
])

export const userSchema = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement().unique().notNull(),
  name: varchar('name', { length: 50 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 50 }).notNull(),
  role: roleEnum.notNull().default('user'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
})

export type SelectUser = InferSelectModel<typeof userSchema>
export type InsertUser = InferInsertModel<typeof userSchema>

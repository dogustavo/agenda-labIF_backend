import {
  relations,
  type InferSelectModel,
  type InferInsertModel
} from 'drizzle-orm'

import {
  mysqlTable,
  int,
  timestamp,
  varchar,
  boolean
} from 'drizzle-orm/mysql-core'
import { userSchema } from './User.schema'

export const userTypeSchema = mysqlTable('user_type', {
  id: int('id').primaryKey().autoincrement().unique().notNull(),
  description: varchar('description', { length: 100 }).notNull(),
  is_intern: boolean('is_intern').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const userTypeRelations = relations(
  userTypeSchema,
  ({ many }) => ({
    users: many(userSchema, {
      relationName: 'userType'
    })
  })
)

export type SelectUserType = InferSelectModel<typeof userTypeSchema>
export type InsertUserType = InferInsertModel<typeof userTypeSchema>

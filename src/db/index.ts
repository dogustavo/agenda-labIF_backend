// index.js
import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'

import {
  userSchema,
  userRelations
} from '~/model/schemas/User.schema'
import {
  scheduleSchema,
  scheduleRelations
} from '~/model/schemas/Schedule.schema'
import {
  equipamentSchema,
  equipamentRelations
} from '~/model/schemas/Equipaments.schema'
import {
  userRoleSchema,
  userRoleRelations
} from '~/model/schemas/UserRoles.schema'

const connection = await mysql.createConnection({
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOST || 'localhost',
  database: process.env.MYSQL_DATABASE || 'hobby',
  port: Number(process.env.MYSQL_PORT) || 3306
})

export const db = drizzle(connection, {
  mode: 'default',
  schema: {
    userSchema,
    userRelations,
    scheduleSchema,
    scheduleRelations,
    equipamentSchema,
    equipamentRelations,
    userRoleSchema,
    userRoleRelations
  }
})

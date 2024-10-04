// index.js
import { drizzle } from 'drizzle-orm/mysql2'
import * as mysql from 'mysql2/promise'

import { userSchema } from './schemas/User.schema'

const connection = await mysql.createConnection({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'hobby',
  port: Number(process.env.DB_PORT) || 3306
})

export const db = drizzle(connection, {
  mode: 'default',
  schema: {
    userSchema
  }
})

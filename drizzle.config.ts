import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schemas',
  out: './drizzle',
  dialect: 'mysql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'labmaker',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'mydatabase'
  }
})

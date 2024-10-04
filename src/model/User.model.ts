import { db as database } from '~/db'
import { userSchema } from './schemas/User.schema'

export const userModel = {
  getAll: async () => {
    return database.select().from(userSchema).execute()
  },
  create: async (userData: {
    username: string
    email: string
    password: string
    roleId: number
  }) => {
    return database.insert(userSchema).values(userData).execute()
  }
}

import { userModel } from '~/model/User.model'

export const userService = {
  getAllUsers: async () => {
    const users = await userModel.getAll()

    return users
  }
}

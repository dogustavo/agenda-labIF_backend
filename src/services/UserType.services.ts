import { userTypesModel } from '~/model/UserType.model'
import { IUserType } from '~/types/user.type'

export const userTypeService = {
  createUserType: async (userType: IUserType) => {
    const result = await userTypesModel.create(userType)

    const insertId = result[0].insertId
    return await userTypesModel.selectById(insertId)
  }
}

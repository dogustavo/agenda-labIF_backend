import { eq } from 'drizzle-orm'
import { userTypeSchema } from '~/model/schemas/UserType.schema'
import { userTypesModel } from '~/model/UserType.model'
import { IUserType, IUserTypeFind } from '~/types/user.type'

export const userTypeService = {
  createUserType: async (userType: IUserType) => {
    const result = await userTypesModel.create(userType)

    const insertId = result[0].insertId
    return await userTypesModel.selectById(insertId)
  },
  getAll: async ({ query }: IUserTypeFind) => {
    const page = 1
    const pageSize = 12

    const offset = (page - 1) * pageSize
    const totalRecords = await userTypesModel.getUserTypeCount()
    const totalPages = Math.ceil(totalRecords[0].count / pageSize)
    const filters = []

    if (query?.name) {
      filters.push(eq(userTypeSchema.description, query.name))
    }

    const result = await userTypesModel.getAll({
      filters,
      offset
    })

    return {
      data: result,
      meta: {
        totalRecords: totalRecords[0].count,
        totalPages,
        currentPage: page,
        pageSize
      }
    }
  }
}

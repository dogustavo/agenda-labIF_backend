import { userRolesModel } from '~/model/UserRoles.model'
import type { UserRole } from '~/types/userRole.types'

export const userRoleService = {
  createUserRole: async ({ role }: UserRole) => {
    const result = await userRolesModel.create({ role })

    const insertId = result[0].insertId
    return await userRolesModel.selectById(insertId)
  },
  getAllUserRole: async () => {
    return await userRolesModel.getAll()
  }
}

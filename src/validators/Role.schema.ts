import { z } from 'zod'

export const UserRoleSchema = z.object({
  role: z.enum(['user', 'approver', 'admin'])
})

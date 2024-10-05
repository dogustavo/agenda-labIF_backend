import { z } from 'zod'

export const EquipamentSchema = z.object({
  equipamentName: z.string().trim().max(50),
  availableFrom: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'Invalid time format. Expected format is HH:mm:ss.'
    }),
  availableTo: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'Invalid time format. Expected format is HH:mm:ss.'
    })
})

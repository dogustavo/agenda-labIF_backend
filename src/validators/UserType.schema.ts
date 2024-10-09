import { z } from 'zod'

export const UserTypeSchema = z.object({
  description: z
    .string({
      required_error: 'Descrição é obrigatório.'
    })
    .max(100, { message: 'Número de caracteres máximo é 100.' })
    .trim(),
  is_intern: z.boolean()
})

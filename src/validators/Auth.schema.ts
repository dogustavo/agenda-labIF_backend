import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string().email(),
  password: z
    .string({ required_error: 'Campo senha é obrigatório' })
    .min(6, 'Campo senha deve ter ao menos 6 caracteres')
})

export const RegisterSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório.'
    })
    .trim()
    .max(70, { message: 'Número de caracteres máximo é 70.' })
    .refine(
      (nome) => {
        const regex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)+$/
        return regex.test(nome)
      },
      { message: 'Insira um nome completo.' }
    ),
  email: z
    .string({
      required_error: 'E-mail é obrigatório.'
    })
    .email('Insira um endereço de e-mail válido.'),
  password: z
    .string({ required_error: 'Campo senha é obrigatório' })
    .min(6, 'Campo senha deve ter ao menos 6 caracteres'),
  roleId: z.number()
})

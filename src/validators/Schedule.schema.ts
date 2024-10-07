import { z } from 'zod'

function validateTime(time: string) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return regex.test(time)
}

export const CreateScheduleSchema = z.object({
  scheduleDate: z.string().refine(
    (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/
      return regex.test(date)
    },
    {
      message: 'Formato de data inválido. Use o formato YYYY-MM-DD.'
    }
  ),

  timeInit: z.string().refine((time) => validateTime(time), {
    message: 'Formato de hora inválido. Use o formato HH:MM.'
  }),

  timeEnd: z.string().refine((time) => validateTime(time), {
    message: 'Formato de hora inválido. Use o formato HH:MM.'
  }),

  equipamentId: z.number().positive({
    message: 'O ID do equipamento deve ser um número positivo.'
  })
})

export const ScheduleEvaluateSchema = z.object({
  action: z.enum(['approved', 'repproved'])
})

import { scheduleController } from '~/controller/Schedule.controller'
import type { Route } from '~/types/route.type'

export const schedules: Route[] = [
  {
    method: 'post',
    path: '/schedule',
    handler: scheduleController.create,
    description: 'Rota para cadastrar equipamentos',
    middlewares: []
  }
]

import express, { Request, Response, NextFunction } from 'express'

import { users } from './user'
import { userRole } from './userRoles'
import { auth } from './auth'
import { equipament } from './equipaments'
import { schedules } from './schedules'
import { userType } from './userType'

import type { Route } from '~/types/route.type'

const routes: Route[] = [
  ...users,
  ...userRole,
  ...auth,
  ...equipament,
  ...schedules,
  ...userType
]

export const registerRoutes = (app: express.Application) => {
  routes.forEach((route) => {
    const middlewares = route.middlewares || []

    app[route.method](
      route.path,
      ...middlewares,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await route.handler(req, res)
        } catch (error) {
          next(error)
        }
      }
    )
  })
}

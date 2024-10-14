import express, { Request, Response, NextFunction } from 'express'

import { users } from './user.js'
import { userRole } from './userRoles.js'
import { auth } from './auth.js'
import { equipament } from './equipaments.js'
import { schedules } from './schedules.js'
import { userType } from './userType.js'

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

import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validatorMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors })
      }
      return res.status(500).json({ error: 'Unexpected error' })
    }
  }
}
